#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ORG = process.env.ORG || 'parthshah-klizer';
const SITE = process.env.SITE || 'mps-demo';
const TOKEN = process.env.IMS_TOKEN || process.env.DA_TOKEN;
const ROOT = process.env.SEED_DIR || __dirname;

if (!TOKEN) {
  console.error('Missing IMS_TOKEN');
  console.error('1) Open https://da.live/#/parthshah-klizer/mps-demo/ and sign in');
  console.error('2) DevTools → Network → admin.da.live → copy Bearer token');
  console.error("3) IMS_TOKEN='…' node tools/da-seed/upload.mjs");
  process.exit(1);
}

function walk(dir, base = dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name === 'upload.mjs' || name === 'README.md') continue;
    const abs = join(dir, name);
    const st = statSync(abs);
    if (st.isDirectory()) out.push(...walk(abs, base));
    else if (name.endsWith('.html') || name.endsWith('.json')) out.push(relative(base, abs));
  }
  return out;
}

async function ensureFolders(relPath) {
  const parts = relPath.split('/');
  let cur = '';
  for (let i = 0; i < parts.length - 1; i++) {
    cur = cur ? `${cur}/${parts[i]}` : parts[i];
    await fetch(`https://admin.da.live/source/${ORG}/${SITE}/${cur}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
  }
}

async function upload(rel) {
  await ensureFolders(rel);
  const buf = readFileSync(join(ROOT, rel));
  const type = rel.endsWith('.json') ? 'application/json' : 'text/html';
  const body = new FormData();
  body.append('data', new Blob([buf], { type }), rel.split('/').pop());
  const res = await fetch(`https://admin.da.live/source/${ORG}/${SITE}/${rel}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}` },
    body,
  });
  console.log(`${rel} → ${res.status}`);
  if (!res.ok) throw new Error(`Upload failed: ${rel} (${res.status})`);
}

const probe = await fetch(`https://admin.da.live/list/${ORG}/${SITE}/`, {
  headers: { Authorization: `Bearer ${TOKEN}` },
});
console.log(`auth list → ${probe.status}`);
if (probe.status === 401 || probe.status === 403) throw new Error('Token rejected — copy a fresh Bearer from da.live');

const files = walk(ROOT).sort();
console.log(`Uploading ${files.length} files to ${ORG}/${SITE}...`);
for (const f of files) await upload(f);

// preview key pages
const pages = ['/', '/cart', '/checkout', '/search', '/products/default', '/customer/login', '/wishlist'];
for (const p of pages) {
  const url = `https://admin.hlx.page/preview/${ORG}/${SITE}/main${p === '/' ? '' : p}`;
  const res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}` } });
  console.log(`preview ${p} → ${res.status}`);
}
console.log(`Done → https://da.live/#/${ORG}/${SITE}/`);
