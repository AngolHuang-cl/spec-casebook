// Builds draft.csv and requirements.md for pdr/christmas-new-year-sale (android), update of v3.
// Run: node library/pdr/christmas-new-year-sale/android/drafts/20261127-140007/build-draft.ts
// User, 2026-11-27 (REQ-011): DRA262611P0311 re-verified under R-048 (Q-14): without Credit Auto Pass the page leads with the
// Auto Pass sale, with Auto Pass it shows the 2000-credit pack sale. v3's TC-120 / TC-121 expected the 2000 pack without
// Auto Pass, and TC-122 / TC-123 tap 「Get 2000 credits」 with no Auto Pass precondition. New TC-205: New Year with Auto Pass.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const parseCsv = (t: string) => {
  const out: string[][] = []; let row: string[] = [], f = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; continue; }
    if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n') { row.push(f); out.push(row); row = []; f = ''; } else if (c !== '\r') f += c;
  }
  if (f || row.length) { row.push(f); out.push(row); }
  return out;
};
const esc = (s: string) => /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
const why = 'REQ-011: R-048 (Q-14) — without Credit Auto Pass the Auto Pass sale leads; the 2000-credit pack sale only with Auto Pass (DRA262611P0311 NAB)';

const [head, ...v3] = parseCsv(readFileSync(join(here, '../../cases.csv'), 'utf8').replace(/^﻿/, '')).filter(r => r.length > 1);
const page = (season: 'Christmas' | 'New Year') => [
  `Top banner 「${season} Special」, the same image in every language`,
  'The top card is the Auto Pass credit sale (Credit Auto Pass, 2000 credits a year)',
  'No 「1000+1000」 Special Offer pack and no 「Get 2000 credits for …」 (they need Auto Pass, TC-126 / TC-205)',
  'Packs 50, 100, 200, 500, 1000, 2000 credits, each with its original price struck through and the member price',
  '「Subscribe for 3000 free credits!」',
  '「Each credit for about $0.1」 and 「The expiration period for consumed credits is one year.」',
  '「Privacy Policy」 | 「Terms of Use」',
  season === 'Christmas' ? 'No countdown above the CTA' : 'Above the CTA a clock icon and a countdown 「<d>D hh:mm:ss」 (TC-089 checks its value)',
].join('\n');
const ref = 'R-045, R-048, R-050, R-052, R-049';
const out: string[][] = [];
for (const r of v3) {
  const id = r[0];
  if (id === 'TC-120' || id === 'TC-121') {
    const season = id === 'TC-120' ? 'Christmas' : 'New Year';
    const notes = r[7].replace(/^US mockup prices: [^.]*\. /, 'US mockup prices: $9.99→$4.99, $17.99→$8.99, $31.99→$15.99, $69.99→$34.99, $119.99→$59.99, $199.99→$99.99. ');
    out.push([id, r[1], r[2], r[3], page(season), r[5], ref, `${notes} Without Auto Pass: Q-14 ruling (REQ-002), REQ-011.`, 'modified', why]);
  } else if (id === 'TC-122' || id === 'TC-123') {
    const pre = r[2].split('\n').map(l => l.replace(/^\d+\. /, ''));
    pre.splice(2, 0, 'Credit Auto Pass subscribed (the 2000-credit pack sale shows only then, R-048)');
    out.push([id, r[1], pre.map((s, i) => `${i + 1}. ${s}`).join('\n'), r[3], r[4], r[5], r[6].includes('R-048') ? r[6] : `${r[6]}, R-048`,
      [r[7], 'Run after the Auto Pass purchase row (TC-150).'].filter(Boolean).join(' '), 'modified', why]);
  } else {
    out.push([...r, 'unchanged', '']);
  }
  if (id === 'TC-126') {
    out.push(['TC-205', 'Credit purchase page', '1. Pro account (subscribed) signed in\n2. New Year window: stage server, RD test date 2026-12-30\n3. Credit Auto Pass subscribed',
      'Open the credit purchase page', 'Top banner 「New Year Special」\nThe balance line reads 「Auto Pass activated」\nThe 2000-credit pack sale shows: 「1000+1000」 「$166.99」 and 「Get 2000 credits for $166.99」\nNo Auto Pass sale card and no 「Subscribe for 3000 free credits!」',
      'P1', 'R-048, R-046, R-045', 'New Year counterpart of TC-126. Run after the Auto Pass purchase row. Q-14 ruling (REQ-002), REQ-011.', 'new', why]);
  }
}
writeFileSync(join(here, 'draft.csv'), [[...head, 'Change', 'Change Reason'], ...out].map(r => r.map(esc).join(',')).join('\n') + '\n');

let req = readFileSync(join(here, '../../requirements.md'), 'utf8');
const sub = (a: string | RegExp, b: string) => { const n = req.replace(a, b); if (n === req) throw new Error(`anchor not found: ${a}`); req = n; };
sub('- R-046 [PM:pm-xmas-rules ➎; DS:ds-xmas-iap-credit] For a paid user the Special Offer pack',
    '- R-046 [PM:pm-xmas-rules ➎; DS:ds-xmas-iap-credit; ruling Q-14, REQ-011] For a paid user with Credit Auto Pass (R-048) the Special Offer pack');
sub('| R-048 | without Auto Pass | TC-125 |\n| R-048 | with Auto Pass | TC-126 |',
    '| R-048 | without Auto Pass, Christmas | TC-125, TC-120 |\n| R-048 | without Auto Pass, New Year | TC-121 |\n| R-048 | with Auto Pass, Christmas | TC-126, TC-122 |\n| R-048 | with Auto Pass, New Year | TC-205, TC-123 |');
sub(/(\| REQ-002 \| Question answers 2026-11-20[^\n]*\n)/, `$1| REQ-011 | DRA262611P0311 re-verified under the Q-14 ruling: the 2000-credit pack sale only with Credit Auto Pass: R-046, R-048 |\n`);
writeFileSync(join(here, 'requirements.md'), req);
console.log(`draft.csv: ${out.length} rows`);
