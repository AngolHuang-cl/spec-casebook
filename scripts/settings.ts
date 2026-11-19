// This computer's casebook settings from the command line (the same as the pages server's Settings page).
// Usage: node scripts/settings.ts                show them
//        node scripts/settings.ts seat <N> [note]   the Claude account's seat size from now on (Pro 1, Team 1.25 or 6.25)
import { LIBRARY } from './lib/library.ts';
import { readSettings, seatAt, setSeat, settingsFile } from './lib/settings.ts';

const [cmd, value, ...note] = process.argv.slice(2);
if (cmd === 'seat') {
  const { entry, marked } = setSeat(Number(value), LIBRARY, note.join(' '));
  console.log(`Seat ${entry.seat}× Pro from ${entry.at} (${settingsFile()}).`);
  for (const m of marked) console.log(`  account marker → ${m}/usage.jsonl`);
} else if (!cmd) {
  const s = readSettings(), now = seatAt();
  console.log(`${settingsFile()}\nSeat now: ${now ? `${now.seat}× Pro (set ${now.at})` : 'not set (usage-log.ts falls back to the previous reading, else 1×)'}`);
  for (const e of s.seats) console.log(`  ${e.at}  ${e.seat}×${e.note ? `  ${e.note}` : ''}`);
} else { console.error('Usage: node scripts/settings.ts [seat <N> [note]]'); process.exit(2); }
