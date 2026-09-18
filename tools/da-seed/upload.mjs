#!/usr/bin/env node
/**
 * Upload default DA pages to admin.da.live
 *
 * Usage:
 *   IMS_TOKEN='eyJ...' node tools/da-seed/upload.mjs
 *   IMS_TOKEN='eyJ...' ORG=parthshah-klizer SITE=mps-demo node tools/da-seed/upload.mjs
 *
 * Get IMS_TOKEN while logged into da.live:
 *   DevTools → Network → any admin.da.live request → Authorization: Bearer …
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ORG = process.env.ORG || 'parthshah-klizer';
const SITE = process.env.SITE || 'mps-demo';
const TOKEN = process.env.IMS_TOKEN || process.env.DA_TOKEN;

if (!TOKEN) {
  console.error('Missing IMS_TOKEN. Open https://da.live/#/parthshah-klizer/mps-demo/');
  console.error('DevTools → Network → admin.da.live → copy Bearer token');
  console.error("Then: IMS_TOKEN='…' node tools/da-seed/upload.mjs");
  process.exit(1);
}

const ROOT = __dirname;
const FILES = [
  'index.html',
  'nav.html',
  'footer.html',
  '404.html',
  'drafts/demo.html',
  'placeholders.json',
  'metadata.json',
];

async function ensureFolder(path) {
  const url = `https://admin.da.live/source/${ORG}/${SITE}/${path}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  console.log(`folder ${path || '(root)'} → ${res.status}`);
  return res.status;
}

async function uploadFile(relPath) {
  const abs = join(ROOT, relPath);
  const body = new FormData();
  const buf = readFileSync(abs);
  const type = relPath.endsWith('.json') ? 'application/json' : 'text/html';
  body.append('data', new Blob([buf], { type }), relPath.split('/').pop());
  const url = `https://admin.da.live/source/${ORG}/${SITE}/${relPath}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}` },
    body,
  });
  const text = await res.text();
  console.log(`file ${relPath} → ${res.status} ${text.slice(0, 180)}`);
  if (!res.ok) throw new Error(`Upload failed for ${relPath}`);
}

async function main() {
  // probe auth
  const probe = await fetch(`https://admin.da.live/list/${ORG}/${SITE}/`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  console.log(`list ${ORG}/${SITE} → ${probe.status}`);
  if (probe.status === 401 || probe.status === 403) {
    throw new Error('IMS token rejected. Copy a fresh Bearer token from da.live Network tab.');
  }

  await ensureFolder('drafts');
  for (const f of FILES) {
    await uploadFile(f);
  }
  console.log('\nDone. Open https://da.live/#/' + ORG + '/' + SITE + '/');
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
