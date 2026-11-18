<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Casebook settings</title>
<style>
/*__SHARED_CSS__*/
/*__BAR_CSS__*/
body { padding-bottom: 40px }
h1 { font: 700 1.6rem/1.2 var(--display); margin: 24px 0 4px; letter-spacing: -0.01em }
.lead { margin: 0 0 18px; color: var(--muted) }
section { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 16px 18px; margin: 0 0 16px; max-width: 760px }
h2 { font: 700 1.05rem var(--display); margin: 0 0 4px }
.why { margin: 0 0 12px; color: var(--muted); font-size: 0.92rem; max-width: 70ch }
.now { margin: 0 0 12px }
.now b { font-size: 1.15rem }
.now .unset { color: var(--fail); font-weight: 650 }
.opts { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 10px }
.opts label { display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--line); border-radius: 6px; padding: 6px 10px; cursor: pointer }
.opts label:has(input:checked) { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent) }
.opts input[type=number] { font: inherit; color: inherit; background: transparent; width: 6em; border: 1px solid var(--line); border-radius: 4px; padding: 2px 6px }
.row2 { display: flex; flex-wrap: wrap; gap: 8px; align-items: center }
#note { font: inherit; color: inherit; background: transparent; border: 1px solid var(--line); border-radius: 6px; padding: 6px 10px; flex: 1 1 260px; min-width: 0 }
#save { font: inherit; font-weight: 650; border: 0; border-radius: 6px; background: var(--accent); color: #fff; padding: 7px 16px; cursor: pointer }
#save:disabled { opacity: .5; cursor: not-allowed }
#msg { margin: 10px 0 0; font-size: 0.92rem }
#msg.ok { color: var(--pass) } #msg.err { color: var(--fail) }
#msg code, .hist code { font: 0.82rem var(--mono); overflow-wrap: anywhere }
.hist { margin: 14px 0 0; padding: 0; list-style: none; font-size: 0.88rem; color: var(--muted) }
.hist li { padding: 3px 0; border-top: 1px solid var(--line) }
.hist li:first-child { border-top: 0 }
.hist b { color: var(--text, inherit) }
.file { margin-top: 12px; font-size: 0.82rem; color: var(--muted) }
.file code { font: 0.8rem var(--mono); overflow-wrap: anywhere }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px }
</style>
</head>
<body>
<nav class="cb-tabs" aria-label="Casebook"><a class="cb-home" href="/" data-en="All features" data-zh="全部功能">All features</a><b data-en="Settings" data-zh="設定">Settings</b><span class="cb-note">__NOTE__</span><span class="cb-lang" role="group" aria-label="Language"><button type="button" data-l="en">English</button><button type="button" data-l="zh">中文</button></span></nav>
<h1 id="t"></h1>
<p class="lead" id="lead"></p>
<section>
  <h2 id="seat-h"></h2>
  <p class="why" id="seat-why"></p>
  <p class="now" id="now"></p>
  <form id="f">
    <div class="opts" id="opts"></div>
    <div class="row2"><input id="note" type="text" maxlength="200" autocomplete="off"><button id="save" type="submit"></button></div>
  </form>
  <p id="msg" hidden></p>
  <ul class="hist" id="hist"></ul>
  <p class="file" id="file"></p>
</section>
<script>
/*__SHARED_JS__*/
let D = __DATA__;
let L = 'en'; try { if (localStorage.getItem('casebook-lang') === 'zh') L = 'zh'; } catch (e) {}
const $ = id => document.getElementById(id), tx = (en, zh) => L === 'zh' ? zh : en;
let picked = D.now ? D.now.seat : null, custom = '', last = null;
const fmt = n => `${n}×`;
function render() {
  document.documentElement.lang = L === 'zh' ? 'zh-Hant' : 'en';
  document.querySelectorAll('.cb-tabs [data-zh]').forEach(e => e.textContent = e.dataset[L]);
  document.querySelectorAll('.cb-lang button').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.l === L)));
  $('t').textContent = tx('Settings', '設定');
  $('lead').textContent = tx('Settings of this computer, kept outside the repo. Every table and run on this computer uses them.', '這台電腦的設定，存放在 repo 之外；這台電腦上的每份表格與每次執行都會使用。');
  $('seat-h').textContent = tx('Claude account seat size', 'Claude 帳號席位大小');
  $('seat-why').textContent = tx('How large the account running the agent is, in Pro units. Progress and Design turn the usage card\'s percentages into Pro-% with it, so a run on a 6.25× Team seat is not read as six times the Pro usage. Saving marks the change in the usage log of every run active in the last 12 hours.',
    '執行 agent 的帳號有多大，以 Pro 為單位。Progress 與 Design 頁用它把用量卡的百分比換算成 Pro-%，6.25× Team 席位上的執行才不會被當成六倍的 Pro 用量。儲存時，會在過去 12 小時內有活動的每次執行的用量紀錄中標記此變更。');
  $('now').innerHTML = D.now ? `${tx('Now', '目前')}: <b>${fmt(D.now.seat)}</b> <span class="cb-muted">· ${tx('since', '自')} ${cbEsc(cbWhen(D.now.at))}</span>`
    : `<span class="unset">${tx('Not set', '尚未設定')}</span> · ${tx('usage readings fall back to the previous reading\'s seat, else 1×', '用量讀數會沿用前一筆讀數的席位，沒有則為 1×')}`;
  const isPreset = D.presets.some(p => p.seat === picked);
  $('opts').innerHTML = D.presets.map(p => `<label><input type="radio" name="seat" value="${p.seat}"${picked === p.seat ? ' checked' : ''}> ${cbEsc(tx(p.en, p.zh))}</label>`).join('')
    + `<label><input type="radio" name="seat" value="custom"${picked != null && !isPreset ? ' checked' : ''}> ${tx('Other', '其他')} <input type="number" id="custom" min="0.1" max="100" step="0.05" value="${cbEsc(picked != null && !isPreset ? String(picked) : custom)}" aria-label="${tx('Seat size in Pro units', '席位大小（Pro 單位）')}">×</label>`;
  document.querySelectorAll('input[name=seat]').forEach(r => r.onchange = () => { picked = r.value === 'custom' ? Number($('custom').value) || null : Number(r.value); });
  $('custom').oninput = e => { custom = e.target.value; const r = document.querySelector('input[name=seat][value=custom]'); r.checked = true; picked = Number(custom) || null; };
  $('note').placeholder = tx('Note (optional), e.g. which account', '備註（選填），例如哪個帳號');
  $('save').textContent = tx('Save', '儲存');
  $('save').disabled = !D.local;
  $('save').title = D.local ? '' : tx('Only this computer can change its settings.', '只有這台電腦能修改它的設定。');
  const m = $('msg');
  if (last) { m.hidden = false; m.className = last.ok ? 'ok' : 'err';
    m.innerHTML = last.ok ? `${tx('Saved', '已儲存')}: ${fmt(last.seat)}. ` + (last.marked.length ? `${tx('Marked in', '已標記於')} ${last.marked.map(x => `<code>${cbEsc(x)}</code>`).join(', ')}.` : tx('No active run needed a marker.', '沒有需要標記的執行。')) : cbEsc(last.error); }
  else if (!D.local) { m.hidden = false; m.className = ''; m.textContent = tx('Only this computer can change its settings; other computers see them read-only.', '只有這台電腦能修改它的設定；其他電腦只能檢視。'); }
  else m.hidden = true;
  $('hist').innerHTML = [...D.seats].reverse().slice(0, 12).map(e => `<li><b>${fmt(e.seat)}</b> · ${cbEsc(cbWhen(e.at))}${e.note ? ` · ${cbEsc(e.note)}` : ''}</li>`).join('');
  $('file').innerHTML = `${tx('Stored in', '存放於')} <code>${cbEsc(D.file)}</code> · ${tx('also', '也可用')} <code>node scripts/settings.ts seat N</code>`;
}
$('f').onsubmit = async e => {
  e.preventDefault();
  if (!(picked > 0)) { last = { ok: false, error: tx('Choose a seat size first.', '請先選擇席位大小。') }; render(); return; }
  $('save').disabled = true;
  try {
    const r = await fetch('/settings/seat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ seat: picked, note: $('note').value.trim() }) });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || r.statusText);
    D = j.data; last = { ok: true, seat: j.entry.seat, marked: j.marked }; $('note').value = '';
  } catch (err) { last = { ok: false, error: String(err.message || err) }; }
  render();
};
document.querySelectorAll('.cb-lang button').forEach(b => b.onclick = () => { L = b.dataset.l; try { localStorage.setItem('casebook-lang', L); } catch (e) {} render(); });
render();
</script>
</body>
</html>
