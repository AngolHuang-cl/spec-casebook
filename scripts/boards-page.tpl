<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Casebook</title>
<style>
/*__SHARED_CSS__*/
/*__BAR_CSS__*/
body { padding-bottom: 40px }
.head { display: flex; flex-wrap: wrap; gap: 10px 20px; align-items: end; justify-content: space-between; margin: 24px 0 8px }
h1 { font: 700 1.6rem/1.2 var(--display); margin: 0; letter-spacing: -0.01em }
.head p { margin: 2px 0 0; color: var(--muted) }
/* Dashboard (user, 2026-11-25): two tabs (agentic runs, waiting for their conversion to AT · Regression (AT), converted),
   product and version filters, then one aligned line per table: every figure has its own column, named once in the
   group's header, so nothing has to be read out of a sentence. */
/* Navigation, one line: the two tabs on the left, the platform switch (iOS · Android, never both in one list) on the
   right. Then one toolbar: Product, Version, Sort and the search, the same control height, left to right, nothing
   stranded on a line of its own (page-checks.md, UI design rules). */
.nav2 { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 8px 16px; margin: 18px 0 0; border-bottom: 1px solid var(--line) }
.tabs { display: flex; gap: 4px }
.tabs button { font: 650 1rem var(--display); color: var(--muted); background: none; border: 0; border-bottom: 3px solid transparent; padding: 8px 14px; margin-bottom: -1px; cursor: pointer }
.tabs button[aria-selected="true"] { color: var(--ink); border-bottom-color: var(--accent) }
.tabs button span, .seg button span { font: 600 0.78rem var(--mono); color: var(--muted); margin-left: 6px }
.seg { display: inline-flex; margin-bottom: 8px; border: 1px solid var(--line); border-radius: 6px; overflow: hidden; background: var(--panel) }
.seg button { font: 600 0.88rem var(--body); color: var(--muted); background: none; border: 0; padding: 5px 14px; cursor: pointer }
.seg button + button { border-left: 1px solid var(--line) }
.seg button[aria-selected="true"] { background: var(--chip-bg); color: var(--ink); box-shadow: inset 0 -2px 0 var(--accent) }
.bar { display: flex; flex-wrap: wrap; gap: 10px 16px; align-items: center; margin: 14px 0 0 }
.bar label { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: 0.88rem }
.bar select, .bar input { font: inherit; font-size: 0.9rem; color: var(--ink); background: var(--panel); border: 1px solid var(--line); border-radius: 6px; height: 36px; padding: 0 10px; box-sizing: border-box }
.bar select { min-width: 150px; max-width: 100% }
.bar input { flex: 1 1 200px; min-width: 0; max-width: 300px }
.tabs button:focus-visible, .seg button:focus-visible, .bar select:focus-visible, .bar input:focus-visible, .atb:focus-visible, a:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px }
h2 { font: 700 1.25rem var(--display); margin: 28px 0 0 }
.grp { display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 12px; margin: 18px 0 8px }
.grp h3 { font: 700 1.05rem var(--display); margin: 0; font-variant-numeric: tabular-nums }
.grp span { color: var(--muted); font-size: 0.86rem }
.grp .ref { margin-left: auto; display: inline-flex; gap: 10px; align-items: center }
@media (max-width: 600px) { .grp .ref { margin-left: 0; flex: 1 1 100%; justify-content: space-between } }
.grp .ref button { white-space: nowrap; flex: none; font: inherit; font-size: 0.86rem; color: var(--accent); background: none; border: 1px solid var(--line); border-radius: 6px; padding: 3px 10px; cursor: pointer }
.grp .ref button:hover { border-color: var(--accent) } .grp .ref button:disabled { color: var(--muted); cursor: progress }
.grp .ref button:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px }
.rows { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; overflow: hidden }
.rows.empty { padding: 14px 16px; color: var(--muted); font-size: 0.92rem }
/* a feature: its name, then one line per table; the lines' columns have fixed widths, so they line up down the page */
.feat { display: grid; grid-template-columns: minmax(130px, 1fr) auto; gap: 0 14px; padding: 9px 16px; border-top: 1px solid var(--line); align-items: start }
.feat.hd { border-top: 0; padding-block: 7px; background: var(--chip-bg); font: 600 0.68rem var(--mono); text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted) }
.feat.tot { background: var(--chip-bg); font-weight: 650 }
.name { font-weight: 650; overflow-wrap: anywhere; padding-block: 2px }
.feat.hd .name, .feat.tot .name { font-weight: inherit }
.lines { display: grid; gap: 4px }
.line { display: grid; grid-template-columns: 86px 58px 40px 40px 52px 92px 78px 92px 116px 84px; gap: 0 12px; align-items: baseline; font-size: 0.9rem; font-variant-numeric: tabular-nums; padding-block: 2px }
.feat.hd .line { font-size: inherit; align-items: end }
.c small { display: block; font-size: 0.8rem; color: var(--muted); white-space: nowrap }
.feat.hd { align-items: end } .c small a { color: inherit } .c small a:hover { color: var(--accent) }
.c { min-width: 0 }
.c a { color: var(--accent); text-decoration: none } .c a:hover { text-decoration: underline }
.c-cases, .c-pass, .c-fail, .c-blocked, .c-bugs, .c-qs { text-align: right }
.name a { color: var(--accent); text-decoration: none } .name a:hover { text-decoration: underline }
.c .no, .c .dim { color: var(--muted) } .c .no { white-space: nowrap }
.c .draft { color: var(--blocked) }
.c b { font-weight: 650 }
.p { color: var(--pass) } .x { color: var(--fail) } .k { color: var(--blocked) } .w { color: var(--question) }
.c a .p, .c a .x, .c a .k, .c a.x, .c a.p, .c a.w, .c a.k { text-decoration-color: currentColor }
.c a.x { color: var(--fail) } .c a.p { color: var(--pass) } .c a.w { color: var(--question) } .c a.k { color: var(--blocked) }
.live { color: var(--pass); font-weight: 650 }
.at-in { color: var(--pass); font-weight: 600 }
/* this computer only: move a table into Regression (AT) or back */
.atb { font: inherit; color: var(--accent); background: none; border: 0; padding: 0; cursor: pointer; white-space: nowrap }
.atb:hover { text-decoration: underline }
/* with a mouse, 「Mark as AT」 shows on the line under the pointer (or with keyboard focus), so the column stays quiet */
@media (hover: hover) and (min-width: 1061px) { .line .atb[data-on="1"] { opacity: 0 } .line:hover .atb, .atb:focus-visible { opacity: 1 } }
/* narrow: a card per table, each figure with its column's name in front */
@media (max-width: 1060px) {
  .feat { grid-template-columns: minmax(0, 1fr); gap: 4px }
  .feat.hd { display: none }
  .lines { gap: 8px }
  .line { display: flex; flex-wrap: wrap; gap: 2px 14px }
  .c-cases, .c-pass, .c-fail, .c-blocked, .c-bugs, .c-qs { text-align: left }
  .c small { display: inline; margin-left: 6px }
  .c[data-l]::before { content: attr(data-l) ' '; font: 600 0.66rem var(--mono); text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted) }
  .c.blank { display: none }
}
footer { color: var(--muted); font-size: 0.86rem; margin-top: 18px }
#none { color: var(--muted); margin-top: 24px }
/* a phone: the toolbar's controls stack, each the full width with its label in one column */
@media (max-width: 600px) { .bar label { flex: 1 1 100% } .bar label span { flex: 0 0 4em } .bar select { flex: 1 1 auto; min-width: 0 } .bar input { flex-basis: 100%; max-width: none } }
</style>
</head>
<body>
<nav class="cb-tabs" aria-label="Casebook"><b>Casebook</b><span class="cb-note">__NOTE__</span><a class="cb-set" href="/settings/" data-en="Settings" data-zh="設定">Settings</a><span class="cb-lang" role="group" aria-label="Language"><button type="button" data-l="en">English</button><button type="button" data-l="zh">中文</button></span></nav>
<div class="head"><div><h1 id="t"></h1><p id="s"></p></div></div>
<div class="nav2"><div class="tabs" id="tabs" role="tablist"></div><div class="seg" id="plats" role="tablist"></div></div>
<div class="bar"><label><span id="lprod"></span><select id="fprod"></select></label><label><span id="lver"></span><select id="fver"></select></label><label><span id="lsort"></span><select id="sort"></select></label><input id="q" type="search" autocomplete="off"></div>
<main id="list"></main>
<p id="none" hidden></p>
<footer id="f"></footer>
<script>
/*__SHARED_JS__*/
let D = __DATA__;
let L = 'en'; try { if (localStorage.getItem('casebook-lang') === 'zh') L = 'zh'; } catch (e) {}
const $ = id => document.getElementById(id), tx = (en, zh) => L === 'zh' ? zh : en;
const PAGES = [['cases', 'Cases', '案例'], ['progress', 'Progress', '進度'], ['results', 'Results', '結果'], ['coverage', 'Coverage', '覆蓋率'], ['design', 'Design', '設計比對']];
const platName = p => p === 'ios' ? 'iOS' : 'Android';
// what this browser opened last, per table (the tab bar writes it): where a feature's name leads
const seen = () => { try { return JSON.parse(localStorage.getItem('casebook-seen') || '{}'); } catch (e) { return {}; } };
const lastTab = (root, s) => s[root]?.path ?? 'cases';
// ---- The table. One line per table (platform), the same columns in every group; each figure links to the page behind it.
const md = d => d ? d.slice(5) : '', num = x => x.toLocaleString('en-US'), dash = '<span class="dim">–</span>';
const verKey = v => v.split('.').map(n => n.padStart(6, '0')).join('.');
// a table is in Regression (AT) once it is marked converted (lib/regression.ts); until then it is an agentic run
const COLS = () => [['cases', tx('Cases', '案例')], ['run', tx('Last run', '最近執行')], ['pass', `<span class="p">${tx('Pass', '通過')}</span>`], ['fail', `<span class="x">${tx('Fail', '失敗')}</span>`], ['blocked', `<span class="k">${tx('Blocked', '受阻')}</span>`],
  ['bugs', tx('eBugs<br>open\u00a0/\u00a0filed', 'eBug<br>未結\u00a0/\u00a0已開')], ['qs', tx('Questions', '待答問題')], ['mui', 'MUI'], ['design', tx('Design', '設計比對')], ['at', 'AT']];
const line = cells => `<div class="line">${COLS().map(([id, label], i) => `<div class="c c-${id}${cells[i] === dash || !cells[i] ? ' blank' : ''}" data-l="${cbEsc(label.replace(/<br>/g, ' ').replace(/<[^>]+>/g, ''))}">${cells[i] ?? ''}</div>`).join('')}</div>`;
// eBugs of one kind: those still open (eCL's status at the last Refresh, else the status when filed) of those filed
const bugPair = (b, href, what) => b?.filed ? `<a href="${href}" title="${cbEsc(tx(`${b.open} still open of ${b.filed} ${what} filed`, `${what}：已開 ${b.filed} 張，${b.open} 張未結`))}"><b class="${b.open ? 'x' : 'p'}">${b.open}</b> / ${b.filed}</a>` : '';
function tableLine(f, p, s) {
  const root = `/${f.id}/${p.platform}`, r = p.last, w = p.waiting ?? {}, m = p.mui, d = p.design, B = p.bugs ?? {};
  const draft = p.drafts.at(-1), draftLink = draft ? `<a class="draft" href="${root}/draft/${draft}/cases/" title="${cbEsc(tx(`Open draft ${draft}, waiting for review`, `開啟待審草稿 ${draft}`))}">${tx('draft', '草稿')}</a>` : '';
  // Cases: the approved table's rows (its MUI section is counted under MUI, not here); a draft waiting for review beside it
  const cases = [p.version ? `<a href="${root}/cases/" title="${cbEsc(tx(`${num(p.cases)} test cases in the approved table (v${p.version})${p.mui_cases ? `, plus ${p.mui_cases} MUI rows counted under MUI` : ''}`, `已核准表格（v${p.version}）有 ${num(p.cases)} 個測試案例${p.mui_cases ? `，另有 ${p.mui_cases} 列 MUI 計入 MUI 欄` : ''}`))}">${num(p.cases)}</a>` : '', draftLink].filter(Boolean).join(' · ') || dash;
  // the latest full run's date (no build: groups go by version); opens the run plan
  const when = p.tested ? md(p.tested.date) : r ? cbWhen(r.at).slice(0, 5) : '';
  const run = when ? `<a href="${root}/${p.plan ? 'progress' : 'results'}/" title="${cbEsc(r ? r.id : '')}">${cbEsc(when)}</a>${r?.live ? `<small class="live">${tx('Running', '執行中')}</small>` : ''}` : dash;
  // each count opens Results on that run, filtered to that result
  const res = (n, k, cls) => r ? `<a class="${cls}" href="${root}/results/?run=${encodeURIComponent(r.id)}&res=${k}" title="${cbEsc(`${r.id}\n${cbWhenZ(r.at, L)}`)}">${n}</a>` : dash;
  const bugs = bugPair(B.fn, `${root}/results/?bugs=1`, tx('eBugs (functional and UX)', '功能與 UX eBug')) || dash;
  const wait = (w.questions ?? 0) + (w.answers ?? 0) + (w.notes ?? 0);
  const qTip = tx(`${w.questions ?? 0} open questions (not answered, not filed, not determined by a run; ${w.filed ?? 0} more are filed as an eBug), ${w.answers ?? 0} answers to apply, ${w.notes ?? 0} new-case notes`, `${w.questions ?? 0} 個無人回答也未開單的問題、${w.filed ?? 0} 個已開單、${w.answers ?? 0} 個待套用答案、${w.notes ?? 0} 則新案例備註`);
  const qs = wait ? `<a class="w" href="${root}/cases/#questions" title="${cbEsc(qTip)}"><b>${wait}</b></a>` : dash;
  const muiBugs = bugPair(B.mui, `${root}/results/?bugs=1${m?.run ? `&run=${encodeURIComponent(m.run)}` : ''}`, tx('MUI eBugs', 'MUI eBug'));
  const mui = (m?.run ? `<a class="${m.fail ? 'x' : m.blocked ? 'k' : 'p'}" href="${root}/results/?run=${encodeURIComponent(m.run)}&res=${m.fail ? 'Fail' : 'all'}" title="${cbEsc(tx(`MUI run ${m.run}: ${m.pass} pass, ${m.fail} fail, ${m.blocked} blocked`, `MUI 執行 ${m.run}：${m.pass} 通過、${m.fail} 失敗、${m.blocked} 受阻`))}">${m.fail ? tx(`${m.fail} fail`, `${m.fail} 失敗`) : m.blocked ? tx(`${m.blocked} blocked`, `${m.blocked} 受阻`) : tx('All pass', '全部通過')}</a>` : m?.due ? `<span class="no">${tx('Not run', '未執行')}</span>` : '')
    + (muiBugs ? `<small>eBugs ${muiBugs}</small>` : '') || dash;
  const dTip = d?.screens ? tx(`${d.screens} screens measured: ${d.differs} differ, ${d.question} with a question, ${d.unreviewed} not reviewed`, `已量測 ${d.screens} 個畫面：${d.differs} 個有差異、${d.question} 個待確認、${d.unreviewed} 個未審`) : '';
  const uiBugs = bugPair(B.ui, `${root}/results/?bugs=1`, tx('UI eBugs', 'UI eBug'));
  const design = (d?.screens ? `<a class="${d.differs ? 'x' : d.question || d.unreviewed ? 'w' : 'p'}" href="${root}/design/" title="${cbEsc(dTip)}">${d.differs ? tx(`${d.differs} differ`, `${d.differs} 有差異`) : d.question || d.unreviewed ? tx(`${d.question + d.unreviewed} to review`, `${d.question + d.unreviewed} 待審`) : tx('Matches', '相符')}</a>`
    : d?.due && p.version ? `<a class="no" href="${root}/design/">${tx('Not checked', '未比對')}</a>` : '') + (uiBugs ? `<small>${tx('UI eBugs', 'UI eBug')} ${uiBugs}</small>` : '') || dash;
  const btn = on => D.local ? `<button type="button" class="atb" data-f="${cbEsc(f.id)}" data-p="${p.platform}" data-on="${on ? '1' : ''}" data-t="${cbEsc(`${f.title} · ${platName(p.platform)}`)}">${on ? tx('Mark as AT', '標為已轉 AT') : tx('undo', '復原')}</button>` : '';
  const at = !p.version ? dash : p.at ? `<span class="at-in" title="${cbEsc([tx(`In regression (AT) since ${p.at.since}`, `${p.at.since} 起納入回歸（AT）`), p.at.note].filter(Boolean).join('\n'))}">✓ ${md(p.at.since)}</span>${D.local ? ` · ${btn(false)}` : ''}`
    : btn(true) || `<span class="no">${tx('Waiting', '待轉')}</span>`;
  return line([cases, run, res(r?.pass, 'Pass', 'p'), res(r?.fail, 'Fail', 'x'), res(r?.blocked, 'Blocked', 'k'), bugs, qs, mui, design, at]);
}
// a group's last line: its tables added up, under the same columns
function totalLine(list) {
  const t = list.map(x => x.p), sum = k => t.reduce((a, p) => a + (k(p) ?? 0), 0);
  const pass = sum(p => p.last?.pass), fail = sum(p => p.last?.fail), blocked = sum(p => p.last?.blocked), ran = pass + fail + blocked;
  const filed = sum(p => p.bugs?.fn.filed), open = sum(p => p.bugs?.fn.open), qs = sum(p => (p.waiting?.questions ?? 0) + (p.waiting?.answers ?? 0) + (p.waiting?.notes ?? 0));
  return line([num(sum(p => p.version ? p.cases : 0)), '', ran ? `<span class="p">${num(pass)}</span>` : '', ran ? `<span class="x">${num(fail)}</span>` : '', ran ? `<span class="k">${num(blocked)}</span>` : '',
    filed ? `<span class="${open ? 'x' : 'p'}">${num(open)}</span> / ${num(filed)}` : '', qs ? `<span class="w">${num(qs)}</span>` : '', '', '', '']);
}
// when the group's eBug statuses were last read from eCL, and (this computer) the button that reads them again
function refreshHtml(list) {
  const withBugs = list.filter(x => { const b = x.p.bugs; return b && b.fn.filed + b.ui.filed + b.mui.filed; });
  if (!withBugs.length) return '';
  const at = Math.min(...withBugs.map(x => x.p.bugs.checked));
  const when = at ? tx(`eBug status read ${cbWhen(new Date(at).toISOString())}`, `eBug 狀態讀取於 ${cbWhen(new Date(at).toISOString())}`) : tx('eBug status as filed, not read from eCL yet', 'eBug 狀態為開單當時，尚未從 eCL 讀取');
  return `<span class="ref"><span>${when}</span>${D.local ? `<button type="button" data-refresh="${cbEsc(JSON.stringify(withBugs.map(x => [x.f.id, x.p.platform])))}">${tx('Refresh eBugs', '更新 eBug')}</button>` : ''}</span>`;
}
// a group: the tables of one platform under one product and version, one line each
const groupHtml = (title, list, s) => `<div class="grp"><h3>${cbEsc(title)}</h3><span>${tx(`${list.length} feature${list.length === 1 ? '' : 's'}`, `${list.length} 個功能`)}</span>${refreshHtml(list)}</div>
  <div class="rows"><div class="feat hd"><div class="name">${tx('Feature', '功能')}</div><div class="lines">${line(COLS().map(c => c[1]))}</div></div>
  ${list.map(({ f, p }) => { const root = `/${f.id}/${p.platform}`; return `<div class="feat"><div class="name"><a href="${root}/${lastTab(root, s)}/" title="${cbEsc(f.id)}">${cbEsc(f.title)}</a></div><div class="lines">${tableLine(f, p, s)}</div></div>`; }).join('')}
  ${list.length > 1 ? `<div class="feat tot"><div class="name">${tx('Total', '合計')}</div><div class="lines">${totalLine(list)}</div></div>` : ''}</div>`;
// The view (user, 2026-11-25), remembered per browser: the tab (agentic runs · Regression (AT)), one product or all, one
// version or all ('none' = not tested yet), and the platform: iOS and Android are never listed together.
let VIEW = { tab: 'runs', plat: '', prod: '', ver: '' }; try { VIEW = { ...VIEW, ...JSON.parse(localStorage.getItem('casebook-dash') || '{}') }; } catch (e) {}
const keep = () => { try { localStorage.setItem('casebook-dash', JSON.stringify(VIEW)); } catch (e) {} };
// Sort (user, 2026-11-24), inside each group, remembered per browser: recent activity (a run's last result, an approval or a draft,
// whichever is newest on either platform), what waits on a person (open questions, answers and notes, then failed
// cases of the last run), or name.
const SORTS = [['recent', 'Recent activity', '最近活動'], ['attention', 'Needs attention', '待處理'], ['name', 'Name', '名稱']];
let SORT = 'recent'; try { SORT = SORTS.some(x => x[0] === localStorage.getItem('casebook-sort')) ? localStorage.getItem('casebook-sort') : 'recent'; } catch (e) {}
const draftAt = d => (d.match(/^(\d{4})(\d\d)(\d\d)-(\d\d)(\d\d)(\d\d)/) ?? []).slice(1).reduce((a, x, i) => a + ['', '-', '-', 'T', ':', ':'][i] + x, '');
const activity = f => f.platforms.flatMap(p => [p.last?.at, p.approved_at, ...p.drafts.map(draftAt)]).filter(Boolean).map(t => t.slice(0, 19)).sort().at(-1) ?? '';
const attention = f => f.platforms.reduce((n, p) => n + (p.waiting?.questions ?? 0) + (p.waiting?.answers ?? 0) + (p.waiting?.notes ?? 0), 0);
const fails = f => f.platforms.reduce((n, p) => n + (p.last?.fail ?? 0), 0);
const byName = (a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });
const order = (a, b) => SORT === 'name' ? byName(a, b) : SORT === 'attention' ? attention(b) - attention(a) || fails(b) - fails(a) || byName(a, b) : activity(b).localeCompare(activity(a)) || byName(a, b);
function render() {
  document.documentElement.lang = L === 'zh' ? 'zh-Hant' : 'en';
  document.querySelectorAll('.cb-tabs [data-zh]').forEach(e => e.textContent = e.dataset[L]);
  document.querySelectorAll('.cb-lang button').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.l === L)));
  const features = D.products.flatMap(p => p.features.map(f => Object.assign(f, { product: p.id })));
  // one entry per table; a table not approved yet (a draft only) is an agentic run too
  const tables = features.flatMap(f => f.platforms.map(p => ({ f, p }))), isAt = x => !!(x.p.version && x.p.at);
  const inTab = x => isAt(x) === (VIEW.tab === 'at'), nAt = tables.filter(isAt).length;
  $('t').textContent = tx('Dashboard', '總覽');
  $('s').textContent = tx(`${features.length} features · ${tables.length} tables`, `${features.length} 個功能 · ${tables.length} 份表格`);
  $('tabs').innerHTML = [['runs', tx('Agentic runs', 'Agent 執行'), tables.length - nAt, tx('Tables tested by the agent, waiting for their conversion to AT', '由 Agent 測試、待轉成 AT 的表格')], ['at', tx('Regression (AT)', '回歸測試（AT）'), nAt, tx('Tables converted to automated tests', '已轉成自動化測試的表格')]]
    .map(([id, label, n, tip]) => `<button type="button" role="tab" data-tab="${id}" aria-selected="${VIEW.tab === id}" title="${cbEsc(tip)}">${label}<span>${n}</span></button>`).join('');
  const tabbed = tables.filter(inTab), PLATS = ['ios', 'android'];
  // the platform: the one chosen, else the one with more tables in this tab
  if (!PLATS.includes(VIEW.plat)) VIEW.plat = tabbed.filter(x => x.p.platform === 'ios').length > tabbed.filter(x => x.p.platform === 'android').length ? 'ios' : 'android';
  $('plats').innerHTML = PLATS.map(pl => `<button type="button" role="tab" data-plat="${pl}" aria-selected="${VIEW.plat === pl}">${platName(pl)}<span>${tabbed.filter(x => x.p.platform === pl).length}</span></button>`).join('');
  // the filters offer what the tab and platform hold; a choice that no longer exists falls back to All
  const platted = tabbed.filter(x => x.p.platform === VIEW.plat);
  if (VIEW.prod && !platted.some(x => x.f.product === VIEW.prod)) VIEW.prod = '';
  const prodded = platted.filter(x => !VIEW.prod || x.f.product === VIEW.prod), vOf = x => x.p.app || 'none';
  const vers = [...new Set(prodded.map(vOf))].sort((a, b) => (a === 'none') - (b === 'none') || verKey(b).localeCompare(verKey(a)));
  if (VIEW.ver && !vers.includes(VIEW.ver)) VIEW.ver = '';
  const vName = v => v === 'none' ? tx('Not tested yet', '尚未測試') : v;
  // Product and Version are menus like Sort; with every product shown, the versions are listed under their product
  const opt = (k, v, label, n) => `<option value="${cbEsc(v)}"${VIEW[k] === v ? ' selected' : ''}>${cbEsc(label)} (${n})</option>`;
  const prodsIn = D.products.filter(p => platted.some(x => x.f.product === p.id)), nVer = (v, pid) => prodded.filter(x => vOf(x) === v && (!pid || x.f.product === pid)).length;
  $('lprod').textContent = tx('Product', '產品'); $('lver').textContent = tx('Version', '版本'); $('lsort').textContent = tx('Sort', '排序');
  $('fprod').innerHTML = opt('prod', '', tx('All products', '全部產品'), platted.length) + prodsIn.map(p => opt('prod', p.id, p.name, platted.filter(x => x.f.product === p.id).length)).join('');
  const real = vers.filter(v => v !== 'none');
  $('fver').innerHTML = opt('ver', '', tx('All versions', '全部版本'), prodded.length)
    + (!VIEW.prod && prodsIn.length > 1 ? prodsIn.map(p => { const mine = real.filter(v => nVer(v, p.id)); return mine.length ? `<optgroup label="${cbEsc(p.name)}">${mine.map(v => opt('ver', v, v, nVer(v, p.id))).join('')}</optgroup>` : ''; }).join('') : real.map(v => opt('ver', v, v, nVer(v))).join(''))
    + (vers.includes('none') ? opt('ver', 'none', vName('none'), nVer('none')) : '');
  $('q').placeholder = tx('Search features', '搜尋功能');
  $('sort').setAttribute('aria-label', tx('Sort features', '功能排序'));
  $('sort').innerHTML = SORTS.map(([id, en, zh]) => `<option value="${id}"${id === SORT ? ' selected' : ''}>${tx(en, zh)}</option>`).join('');
  const s = seen();
  const q = $('q').value.trim().toLowerCase();
  const shown = prodded.filter(x => (!VIEW.ver || vOf(x) === VIEW.ver) && (!q || `${x.f.title} ${x.f.id}`.toLowerCase().includes(q))).sort((a, b) => order(a.f, b.f));
  // a product's name heads its groups only when more than one product shows
  const prods = D.products.filter(p => shown.some(x => x.f.product === p.id));
  $('list').innerHTML = prods.map(p => `${prods.length > 1 ? `<h2>${cbEsc(p.name)}</h2>` : ''}${vers.filter(v => shown.some(x => x.f.product === p.id && vOf(x) === v))
    .map(v => groupHtml(prods.length > 1 ? vName(v) : `${p.name} ${vName(v)}`, shown.filter(x => x.f.product === p.id && vOf(x) === v), s)).join('')}`).join('');
  $('none').hidden = !!shown.length;
  $('none').textContent = platted.length ? tx('No feature matches.', '沒有符合的功能。') : VIEW.tab === 'at'
    ? tx(`No ${platName(VIEW.plat)} table is converted to AT yet: they are under Agentic runs, waiting for their conversion.${D.local ? ' Use 「Mark as AT」 on a table there once it is converted.' : ''}`, `尚無 ${platName(VIEW.plat)} 表格轉成 AT：都在「Agent 執行」，待轉換。${D.local ? '轉換完成後，在該頁的表格按「標為已轉 AT」。' : ''}`)
    : tx(`No ${platName(VIEW.plat)} table here.`, `這裡沒有 ${platName(VIEW.plat)} 表格。`);
  $('f').textContent = tx(`A page starts when it is opened and stops after ${D.idleMinutes} idle minutes. Running now: ${D.live}. All times Taipei.`,
    `頁面開啟時才啟動，閒置 ${D.idleMinutes} 分鐘後停止。目前執行中：${D.live}。時間皆為台北時間。`);
}
$('tabs').onclick = e => { const b = e.target.closest('[data-tab]'); if (b) { VIEW.tab = b.dataset.tab; keep(); render(); } };
$('plats').onclick = e => { const b = e.target.closest('[data-plat]'); if (b) { VIEW.plat = b.dataset.plat; keep(); render(); } };
$('fprod').onchange = () => { VIEW.prod = $('fprod').value; keep(); render(); };
$('fver').onchange = () => { VIEW.ver = $('fver').value; keep(); render(); };
$('q').oninput = render;
// the AT button (this computer only): confirm, save through the pages server, redraw from its answer
$('list').addEventListener('click', async e => {
  const b = e.target.closest('.atb'); if (!b) return;
  const on = !!b.dataset.on;
  if (!confirm(on ? tx(`Mark ${b.dataset.t} as converted to AT (in regression)?`, `將 ${b.dataset.t} 標為已轉 AT（納入回歸）？`) : tx(`Take ${b.dataset.t} out of regression (back to waiting for AT)?`, `將 ${b.dataset.t} 移出回歸（回到待轉 AT）？`))) return;
  b.disabled = true;
  try {
    const r = await fetch('/regression', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ feature: b.dataset.f, platform: b.dataset.p, on }) }), j = await r.json();
    if (!r.ok) throw new Error(j.error ?? r.status);
    D = j; render();
  } catch (err) { b.disabled = false; alert(tx(`Not saved: ${err.message}`, `未儲存：${err.message}`)); }
});
// Refresh eBugs (this computer only): read the group's eBug statuses from eCL, then redraw from the answer
$('list').addEventListener('click', async e => {
  const b = e.target.closest('[data-refresh]'); if (!b) return;
  b.disabled = true; b.textContent = tx('Reading eCL (about a second per eBug)…', '讀取 eCL 中（每張約 1 秒）…');
  try {
    const r = await fetch('/ebugs/refresh', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ tables: JSON.parse(b.dataset.refresh) }) }), j = await r.json();
    if (!r.ok) throw new Error(j.error ?? r.status);
    D = j; render();
    if (j.refreshed?.error) alert(tx(`Read ${j.refreshed.read + j.refreshed.fresh} of ${j.refreshed.asked} eBugs; then: ${j.refreshed.error}`, `已讀取 ${j.refreshed.read + j.refreshed.fresh} / ${j.refreshed.asked} 張 eBug；之後：${j.refreshed.error}`));
  } catch (err) { b.disabled = false; b.textContent = tx('Refresh eBugs', '更新 eBug'); alert(tx(`Not refreshed: ${err.message}`, `未更新：${err.message}`)); }
});
$('sort').onchange = () => { SORT = $('sort').value; try { localStorage.setItem('casebook-sort', SORT); } catch (e) {} render(); };
document.querySelectorAll('.cb-lang button').forEach(b => b.onclick = () => { L = b.dataset.l; try { localStorage.setItem('casebook-lang', L); } catch (e) {} render(); });
// back on this page: the list may have moved on
addEventListener('pageshow', e => { if (e.persisted) refresh(); });
addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
// a version known only from a TR is still being looked up: fetch the list once more when it is in
let trWait = 0; const trAgain = () => { if (D.trPending && trWait++ < 5) setTimeout(refresh, 3000); };
async function refresh() { try { const r = await fetch('/boards.json', { cache: 'no-store' }); if (r.ok) { D = await r.json(); render(); trAgain(); } } catch (e) {} }
render(); trAgain();
</script>
</body>
</html>
