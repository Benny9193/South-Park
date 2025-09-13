#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const files = [
  'Assets/data/episodes.json',
  'Assets/data/organizations.json',
  'Assets/data/quotes.json',
  'Assets/data/timeline.json',
  'Assets/data/characters.json',
  'Assets/data/locations.json',
];

function fail(msg) { console.error('\u274C ' + msg); process.exitCode = 1; }
function ok(msg) { console.log('\u2705 ' + msg); }

function isStr(x) { return typeof x === 'string'; }
function isArr(x) { return Array.isArray(x); }

function expect(cond, where, msg) { if (!cond) fail(where + ': ' + msg); }

function validateEpisodes(data, where) {
  data.forEach((e, i) => {
    const w = where + `[${i}]`;
    expect(isStr(e.id) && /s\d{2}e\d{2}/i.test(e.id), w, 'id like s14e03');
    expect(Number.isInteger(e.season), w, 'season integer');
    expect(Number.isInteger(e.episode), w, 'episode integer');
    expect(isStr(e.title), w, 'title string');
    if (e.tags) expect(isArr(e.tags), w, 'tags array');
    if (e.characters) expect(isArr(e.characters), w, 'characters array');
    if (e.locations) expect(isArr(e.locations), w, 'locations array');
    if (e.airDate) expect(/\d{4}-\d{2}-\d{2}/.test(e.airDate), w, 'airDate YYYY-MM-DD');
  });
}

function validateSimpleArrayOfObjects(data, where, req) {
  data.forEach((o, i) => {
    const w = where + `[${i}]`;
    for (const key of req) expect(o[key] != null && o[key] !== '', w, `missing ${key}`);
  });
}

async function readJson(path) {
  const p = resolve(root, path);
  const txt = await readFile(p, 'utf8');
  try { return JSON.parse(txt); } catch (e) { throw new Error('Invalid JSON in ' + path + ': ' + e.message); }
}

async function main() {
  for (const f of files) {
    try {
      const data = await readJson(f);
      if (!Array.isArray(data)) fail(f + ': top-level is not an array');
      switch (f) {
        case 'Assets/data/episodes.json': validateEpisodes(data, f); break;
        case 'Assets/data/organizations.json': validateSimpleArrayOfObjects(data, f, ['id','name']); break;
        case 'Assets/data/quotes.json': validateSimpleArrayOfObjects(data, f, ['id','text']); break;
        case 'Assets/data/timeline.json': validateSimpleArrayOfObjects(data, f, ['id','date','title']); break;
        case 'Assets/data/characters.json': validateSimpleArrayOfObjects(data, f, ['id','name']); break;
        case 'Assets/data/locations.json': validateSimpleArrayOfObjects(data, f, ['id','name']); break;
      }
      ok(f + ' OK');
    } catch (e) {
      fail(f + ': ' + e.message);
    }
  }
  if (process.exitCode) process.exit(process.exitCode);
}

main();

