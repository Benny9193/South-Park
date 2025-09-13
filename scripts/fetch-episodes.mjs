#!/usr/bin/env node
// Fetch South Park episode metadata (season, episode, title, airDate) from Wikipedia
// Writes to Assets/data/episodes.json
// Note: pulls factual metadata only (no synopses) to avoid licensing concerns.

import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const API = 'https://en.wikipedia.org/w/api.php';

async function api(params) {
  const url = API + '?' + new URLSearchParams(params).toString();
  const res = await fetch(url, { headers: { 'User-Agent': 'SouthParkHub/1.0 (+local build script)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json();
}

function stripTags(html) {
  return html
    .replace(/<sup[^>]*>[\s\S]*?<\/sup>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toISO(dateText) {
  // Wikipedia air dates are like: August 13, 1997
  let txt = (dateText || '').trim();
  const m = txt.match(/[A-Za-z]+\s+\d{1,2},\s+\d{4}/);
  if (m) txt = m[0];
  const dt = Date.parse(txt);
  if (!Number.isNaN(dt)) {
    const d = new Date(dt);
    const mm = String(d.getMonth()+1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  }
  return null;
}

function parseSeasonHTML(html, seasonNumber) {
  // Find all rows; for each row containing class="summary", extract title and airdate
  const rows = html.split(/<tr[\s\S]*?>/i).slice(1).map(x => x.split(/<\/tr>/i)[0]);
  const episodes = [];
  for (const row of rows) {
    if (!/class="summary"/i.test(row)) continue;
    const titleCell = (row.match(/<td[^>]*class="[^"]*summary[^"]*"[^>]*>([\s\S]*?)<\/td>/i) || [])[1];
    const airCell = (row.match(/<td[^>]*class="[^"]*airdate[^"]*"[^>]*>([\s\S]*?)<\/td>/i) || [])[1];
    if (!titleCell) continue;
    let titleRaw = stripTags(titleCell);
    // Trim duplicate patterns like: Title""Title
    if (titleRaw.includes('""')) titleRaw = titleRaw.split('""')[0];
    let title = titleRaw;
    const c1 = titleRaw.match(/“([^”]+)”/);
    const c2 = titleRaw.match(/"([^\"]+)"/);
    if (c1) title = c1[1];
    else if (c2) title = c2[1];
    title = title.replace(/\s+/g, ' ').trim();
    const air = airCell ? stripTags(airCell) : '';
    episodes.push({ season: seasonNumber, title, airText: air });
  }
  // Assign episode numbers in-order within season
  return episodes.map((ep, idx) => ({
    id: `s${String(seasonNumber).padStart(2,'0')}e${String(idx+1).padStart(2,'0')}`,
    season: seasonNumber,
    episode: idx + 1,
    title: ep.title,
    synopsis: undefined,
    tags: [],
    characters: [],
    locations: [],
    airDate: toISO(ep.airText)
  }));
}

async function fetchSeason(sectionIndex, seasonNumber) {
  const data = await api({
    action: 'parse',
    page: 'List_of_South_Park_episodes',
    section: sectionIndex,
    prop: 'text',
    format: 'json',
    formatversion: '2'
  });
  const html = data?.parse?.text || '';
  if (!html) return [];
  return parseSeasonHTML(html, seasonNumber);
}

async function main() {
  // Discover sections for seasons
  const sectionsRes = await api({
    action: 'parse',
    page: 'List_of_South_Park_episodes',
    prop: 'sections',
    format: 'json',
    formatversion: '2'
  });
  const sections = sectionsRes?.parse?.sections || [];
  const seasonSections = sections
    .filter(s => /^Season\s+\d+/i.test(s.line))
    .map(s => { const m = (s.line.match(/\d+/) || ['0']); return ({ index: s.index, season: parseInt(m[0], 10) }); })
    .sort((a,b) => a.season - b.season);

  const all = [];
  for (const s of seasonSections) {
    try {
      const eps = await fetchSeason(s.index, s.season);
      // Ignore empty seasons
      if (eps.length) all.push(...eps);
    } catch (e) {
      console.error('Failed season', s.season, e.message);
    }
  }

  // Write file
  const outPath = resolve('Assets/data/episodes.json');
  const json = JSON.stringify(all, null, 2) + '\n';
  await writeFile(outPath, json, 'utf8');
  console.log(`Wrote ${all.length} episodes to ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
