#!/usr/bin/env node
// Generate a factual organizations list (name, type, firstAppearance) using a seed list
// Writes to Assets/data/organizations.json (overwrites)

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
const norm = s => (s||'').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

async function loadEpisodes() {
  try {
    const txt = await readFile(resolve('Assets/data/episodes.json'), 'utf8');
    const eps = JSON.parse(txt);
    const byTitle = new Map();
    const titles = [];
    for (const ep of eps) {
      const key = norm(ep.title);
      byTitle.set(key, ep.id);
      titles.push({ key, id: ep.id });
    }
    return { eps, byTitle, titles };
  } catch { return { eps: [], byTitle: new Map() }; }
}

function extractInfobox(html) {
  const m = html.match(/<table[^>]*class=\"[^\"]*infobox[\s\S]*?<\/table>/i);
  return m ? m[0] : '';
}

function parseFirstAppearance(infoboxHtml) {
  const rows = infoboxHtml.split(/<tr[\s\S]*?>/i).slice(1).map(x => x.split(/<\/tr>/i)[0]);
  for (const row of rows) {
    const th = (row.match(/<th[\s\S]*?>([\s\S]*?)<\/th>/i) || [])[1] || '';
    if (!/first appearance/i.test(th)) continue;
    const td = (row.match(/<td[\s\S]*?>([\s\S]*?)<\/td>/i) || [])[1] || '';
    return stripTags(td);
  }
  return '';
}

async function fetchPageHtml(title) {
  const data = await api({ action: 'parse', page: title, prop: 'text' });
  return data?.parse?.text || '';
}

async function main() {
  const { byTitle, titles } = await loadEpisodes();
  // Seed list: add/remove names freely; script fetches first appearance facts
  const seed = [
    { name: 'Coon and Friends', type: 'Superhero team' },
    { name: 'Goth Kids', type: 'Student clique' },
    { name: 'South Park Police Department', type: 'Police' },
    { name: 'City Wok', type: 'Business' },
    { name: 'South Park Elementary', type: 'School' },
    { name: 'Super Adventure Club', type: 'Cult' }
  ];

  const out = [];
  for (const org of seed) {
    try {
      const html = await fetchPageHtml(org.name);
      const infobox = extractInfobox(html);
      const faRaw = parseFirstAppearance(infobox);
      let firstAppearance = null;
      const m1 = faRaw.match(/[“\"]([^”\"]+)[”\"]/);
      const guess = m1 ? m1[1] : faRaw;
      const direct = byTitle.get(norm(guess));
      if (direct) firstAppearance = direct; else {
        const faNorm = norm(faRaw);
        for (const t of titles) { if (faNorm.includes(t.key)) { firstAppearance = t.id; break; } }
      }
      out.push({ id: slug(org.name), name: org.name, type: org.type, members: [], firstAppearance, notes: undefined });
    } catch (e) {
      out.push({ id: slug(org.name), name: org.name, type: org.type, members: [], firstAppearance: null, notes: undefined });
    }
  }

  const path = resolve('Assets/data/organizations.json');
  await writeFile(path, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${out.length} organizations to ${path}`);
}

main().catch(err => { console.error(err); process.exit(1); });
