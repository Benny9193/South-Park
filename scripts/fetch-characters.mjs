#!/usr/bin/env node
// Generate a factual character list (name, aliases, firstAppearance) from Wikipedia
// Writes to Assets/data/characters.json

import { writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const API = 'https://en.wikipedia.org/w/api.php';

async function api(params) {
  const url = API + '?' + new URLSearchParams({ format: 'json', formatversion: '2', ...params }).toString();
  const res = await fetch(url, { headers: { 'User-Agent': 'SouthParkHub/1.0 (+local build script)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function stripTags(html) {
  return (html || '')
    .replace(/<sup[^>]*>[\s\S]*?<\/sup>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<script[\s\S]*?<script>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function norm(s) {
  return (s||'').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

async function loadEpisodes() {
  try {
    const txt = await readFile(resolve('Assets/data/episodes.json'), 'utf8');
    const eps = JSON.parse(txt);
    const byTitle = new Map();
    const titles = [];
    for (const ep of eps) {
      const key = norm(ep.title);
      byTitle.set(key, ep.id);
      titles.push({ key, id: ep.id, title: ep.title });
    }
    return { eps, byTitle, titles };
  } catch {
    return { eps: [], byTitle: new Map() };
  }
}

function extractInfobox(html) {
  const m = html.match(/<table[^>]*class=\"[^\"]*infobox[\s\S]*?<\/table>/i);
  return m ? m[0] : '';
}

function parseFirstAppearance(infoboxHtml) {
  // Look for a row where the header mentions first appearance
  const rows = infoboxHtml.split(/<tr[\s\S]*?>/i).slice(1).map(x => x.split(/<\/tr>/i)[0]);
  for (const row of rows) {
    const th = (row.match(/<th[\s\S]*?>([\s\S]*?)<\/th>/i) || [])[1] || '';
    if (!/first appearance/i.test(th)) continue;
    const td = (row.match(/<td[\s\S]*?>([\s\S]*?)<\/td>/i) || [])[1] || '';
    return stripTags(td);
  }
  return '';
}

function parseAliases(infoboxHtml) {
  const rows = infoboxHtml.split(/<tr[\s\S]*?>/i).slice(1).map(x => x.split(/<\/tr>/i)[0]);
  for (const row of rows) {
    const th = (row.match(/<th[\s\S]*?>([\s\S]*?)<\/th>/i) || [])[1] || '';
    if (!/(alias|also known as|alter ego)/i.test(th)) continue;
    const td = (row.match(/<td[\s\S]*?>([\s\S]*?)<\/td>/i) || [])[1] || '';
    const text = stripTags(td);
    return text.split(/,|;|\band\b/i).map(s => s.trim()).filter(Boolean);
  }
  return [];
}

async function fetchCharacterPages(limit = 100) {
  // Category:South Park characters
  const members = [];
  let cmcontinue;
  do {
    const res = await api({ action: 'query', list: 'categorymembers', cmtitle: 'Category:South_Park_characters', cmlimit: '50', cmcontinue });
    const part = res?.query?.categorymembers || [];
    members.push(...part);
    cmcontinue = res?.continue?.cmcontinue;
  } while (cmcontinue && members.length < limit);
  return members.slice(0, limit);
}

async function fetchPageHtml(title) {
  const data = await api({ action: 'parse', page: title, prop: 'text' });
  return data?.parse?.text || '';
}

async function main() {
  const { byTitle, titles } = await loadEpisodes();
  let pages = await fetchCharacterPages(120);
  if (!pages || pages.length === 0) {
    // Fallback seed if category fetch fails
    const seed = [
      'Eric Cartman','Stan Marsh','Kyle Broflovski','Kenny McCormick','Butters Stotch','Wendy Testaburger','Randy Marsh',
      'Mr. Mackey','Mr. Garrison','Chef (South Park)','Tolkien Black','Tweek Tweak','Craig Tucker','Clyde Donovan',
      'Jimmy Valmer','Timmy Burch','Bebe Stevens','Heidi Turner','Liane Cartman','Sharon Marsh','Sheila Broflovski','Gerald Broflovski',
      'PC Principal','Mr. Hankey','Ike Broflovski'
    ];
    pages = seed.map((t,i) => ({ pageid: i+1, ns: 0, title: t }));
  }
  const out = [];
  const mainSet = new Set(['Eric Cartman','Stan Marsh','Kyle Broflovski','Kenny McCormick','Butters Stotch','Wendy Testaburger','Randy Marsh']);
  for (const p of pages) {
    try {
      const html = await fetchPageHtml(p.title);
      const infobox = extractInfobox(html);
      const faRaw = parseFirstAppearance(infobox);
      const aliases = parseAliases(infobox);
      let firstAppearance = null;
      // Try quoted title first
      const m1 = faRaw.match(/[“\"]([^”\"]+)[”\"]/);
      const titleGuess = m1 ? m1[1] : faRaw;
      const matchId = byTitle.get(norm(titleGuess));
      if (matchId) firstAppearance = matchId; // only trust exact title match
      out.push({
        id: slug(p.title),
        name: p.title,
        aliases,
        tags: mainSet.has(p.title) ? ['main','student'] : [],
        homeLocation: undefined,
        firstAppearance
      });
    } catch (e) {
      // skip on error
    }
  }
  const path = resolve('Assets/data/characters.json');
  await writeFile(path, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${out.length} characters to ${path}`);
}

main().catch(err => { console.error(err); process.exit(1); });
