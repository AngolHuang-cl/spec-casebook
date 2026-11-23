// The Python the scripts run: the repo's own venv when it exists (README › Install puts Pillow there), else python3
// on PATH. Isolated runs (`python3 -I`) skip user installs and PYTHONPATH, so only an interpreter with Pillow in its
// own site-packages works for them (user, 2026-11-23).
import { existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const venv = process.platform === 'win32' ? join(ROOT, '.venv', 'Scripts', 'python.exe') : join(ROOT, '.venv', 'bin', 'python');

export const PYTHON = process.env.CASEBOOK_PYTHON || (existsSync(venv) ? venv : 'python3');
