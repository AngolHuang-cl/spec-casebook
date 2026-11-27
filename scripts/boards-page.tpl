<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- tab icon (dashboard: four tiles), different on each page so the browser tabs are easy to tell apart -->
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%23171717'/><rect x='7' y='7' width='8' height='8' rx='2' fill='%23fff'/><rect x='17' y='7' width='8' height='8' rx='2' fill='%23fff' fill-opacity='.55'/><rect x='7' y='17' width='8' height='8' rx='2' fill='%23fff' fill-opacity='.55'/><rect x='17' y='17' width='8' height='8' rx='2' fill='%23fff'/></svg>">
<title>Casebook</title>
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)">
<style>
/*__SHARED_CSS__*/
/*__BAR_CSS__*/
/* The Dashboard in the Vercel (Geist) style (user, 2026-11-27). Every rule here is written for this page: no
   stylesheet, script, font or image is loaded from anywhere (the two chevrons are inline SVG), and the Geist fonts are
   only named, so a computer without them shows its system font. The rules:
   Layout   a top bar with slash-separated switchers (Casebook / product / platform), underline tabs beneath it, then the
            page at the casebook's shared width.
   Grouping each version is a section: a 24px tight-tracked heading, its meta beside it (features, GM date), the
            cases-run gauge at the far right, then one bordered card with a 12px radius; the card's footer holds the eBug read.
   Rows     the feature's name with a muted second line (cases, last run, badges), then right-aligned figures in the
            monospace face with tabular numerals.
   Versions by GM date on the roadmap: the next version still before its GM on top (with its roadmap items that have no
            table yet), later ones, then versions past GM, newest first and folded to one line (their total); every
            version folds and opens from its heading, remembered per browser.
   Results  Pass, Fail and Blocked count each case at its newest result from any run (Results › Latest results).
   Empty    a figure that never had a value is 「–」, one that had a value and is now none is 0 (no run yet –, no failure
            in a run 0; no eBug ever filed –, all closed 0 / N; no question ever asked –, all settled 0).
   Type     14px sans, headings 600 with -0.03em tracking, column headers 12px in sentence case.
   Colour   black, white and grey borders; red only for failures and open bugs, blue and amber only inside badges.
   Theme    light and dark, each with its own palette: the system's, unless this browser chose Light or Dark on the
            Settings page (lib/page-shared.ts, set before the page draws); the browser bar (theme-color) matches the top bar.
   Shape    4px spacing grid (4 / 8 / 12 / 16 / 24 / 32, as Geist); radius 6px on controls, 12px on cards, pill badges
            20px tall; no shadows.
   Actions  ghost buttons with a border; no filled colour buttons. A reversible action takes an undo, not a confirm box.
   Focus    every control reachable by keyboard with a 2px blue ring (:focus-visible); the tabs move with the arrow
            keys, Home and End, and name the panel they switch.
   Targets  every control at least 24px tall, 44px on a touch screen; no double-tap zoom (touch-action).
   Fields   16px text in inputs and menus on a phone (iOS zooms on anything smaller); a placeholder ends with an
            ellipsis (「Search features…」).
   Labels   every figure and mark says what it is on the page, at every width; a hover tip only adds detail, since
            touch screens never show it.
   State    the view (product, platform, tab, version, sort, search) is in the address, so a link opens the same view;
            the browser also remembers it for the next visit without one.
   Quiet    「Mark as AT」 shows only on the line under the pointer or with focus, when there is a mouse.
   Narrow   below 1060px each table is a card with each figure's column name in front; below 600px the gauge takes its
            own line and the two menus share one under the search. */
:root { --bg: #fafafa; --panel: #fff; --line: #eaeaea; --slash: #c9c9c9; --ink: #171717; --muted: #666; --hover: #f5f5f5; --sel: #ebebeb; --fail: #d5202c; --amber: #a35200; --amber-bg: #fff4d6; --blue: #0068d6; --blue-bg: #e9f4ff; --accent: #171717;
  --body: Geist, "Helvetica Neue", system-ui, "PingFang TC", "Noto Sans TC", sans-serif; --display: var(--body);
  --mono: "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg: #000; --panel: #0a0a0a; --line: #2e2e2e; --slash: #454545; --ink: #ededed; --muted: #a1a1a1; --hover: #1a1a1a; --sel: #1f1f1f; --fail: #ff6166; --amber: #f5a623; --amber-bg: #2e1c00; --blue: #52a8ff; --blue-bg: #06193a; --accent: #ededed; color-scheme: dark } }
:root[data-theme="dark"] { --bg: #000; --panel: #0a0a0a; --line: #2e2e2e; --slash: #454545; --ink: #ededed; --muted: #a1a1a1; --hover: #1a1a1a; --sel: #1f1f1f; --fail: #ff6166; --amber: #f5a623; --amber-bg: #2e1c00; --blue: #52a8ff; --blue-bg: #06193a; --accent: #ededed; color-scheme: dark }
body { padding-bottom: 48px; font: 14px/1.5 var(--body); -webkit-font-smoothing: antialiased }
h1 { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); margin: 0 }
button, select, input { font: inherit; color: inherit }
a, button, select, input, label { touch-action: manipulation }
:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px }
/* the top bar: Casebook / product / platform (user, 2026-11-26: the product first, then its platform; a platform with
   no table cannot be chosen), then this computer's note, Settings and the language */
.cb-tabs { gap: 4px 8px; padding-block: 12px 4px; background: var(--panel); color: var(--ink); font: 500 14px/1.4 var(--body); border-bottom: 0 }
.cb-tabs b { color: var(--ink); font-weight: 600; letter-spacing: -0.02em }
.cb-tabs .crumb { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; max-width: 100% } /* a slash stays with the menu after it */
.cb-tabs .sl { color: var(--slash); font-size: 20px; line-height: 1; font-weight: 400 }
.cb-tabs select { appearance: none; -webkit-appearance: none; field-sizing: content; height: 32px; padding: 0 28px 0 8px; border: 0; border-radius: 6px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4.5 6 8 2.5 11.5 6M4.5 10 8 13.5 11.5 10'/%3E%3C/svg%3E") no-repeat right 8px center; font-weight: 500; cursor: pointer; max-width: 100% }
.cb-tabs select:hover { background-color: var(--hover) }
.cb-tabs .cb-note { color: var(--muted); font-size: 13px; font-weight: 400; opacity: 1 }
.cb-tabs a.cb-set { display: inline-flex; align-items: center; height: 32px; padding: 0 12px; border: 1px solid var(--line); border-radius: 6px; color: var(--ink) }
.cb-tabs a.cb-set:hover { background: var(--hover); color: var(--ink) }
.cb-tabs .cb-lang { height: 32px; border-color: var(--line); margin-left: 0 }
.cb-tabs .cb-lang button { color: var(--muted); font-size: 13px; font-weight: 500; padding: 0 12px }
.cb-tabs .cb-lang button[aria-pressed="true"] { background: var(--sel); color: var(--ink) }
.nav2 { margin-inline: calc(-1 * var(--gutter)); padding-inline: calc(var(--gutter) - 12px); background: var(--panel); border-bottom: 1px solid var(--line) }
.tabs { display: flex; gap: 4px; overflow-x: auto }
.tabs button { flex: none; padding: 12px; border: 0; border-bottom: 2px solid transparent; background: none; color: var(--muted); cursor: pointer; outline-offset: -2px }
.tabs button:hover { color: var(--ink) }
.tabs button[aria-selected="true"] { color: var(--ink); border-bottom-color: var(--ink) }
/* one toolbar: the search, then Version and Sort, the same height */
.bar { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0 0 }
.bar input, .bar select { height: 40px; border: 1px solid var(--line); border-radius: 6px; background-color: var(--panel); min-width: 0 }
.bar input { flex: 1 1 240px; padding: 0 12px }
.bar input::placeholder { color: var(--muted) }
.bar select { appearance: none; -webkit-appearance: none; flex: 0 1 auto; padding: 0 36px 0 12px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; cursor: pointer }
.bar input:hover, .bar select:hover { border-color: var(--muted) }
/* a version: heading, meta, the cases-run gauge, then its card */
.sec { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 16px; margin: 32px 0 12px }
h2 { margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.3; font-variant-numeric: tabular-nums }
.meta { color: var(--muted) } .meta b { font-weight: 500; color: var(--ink); font-variant-numeric: tabular-nums }
.sec .right { margin-left: auto; display: inline-flex; align-items: center; gap: 8px }
.gauge { width: 120px; height: 4px; border-radius: 2px; background: var(--line); overflow: hidden } .gauge i { display: block; height: 100%; background: var(--ink) }
.mono { font-family: var(--mono); font-variant-numeric: tabular-nums } .mono b { font-weight: 500 }
h2 .fold { display: inline-flex; align-items: center; gap: 4px; margin-left: -4px; padding: 0 4px 0 0; min-height: 32px; border: 0; border-radius: 6px; background: none; color: inherit; font: inherit; letter-spacing: inherit; cursor: pointer; text-align: left }
h2 .fold:hover { background: var(--hover) }
h2 .fold svg { flex: none; color: var(--muted); transition: transform .15s ease } h2 .fold[aria-expanded="true"] svg { transform: rotate(90deg) }
@media (prefers-reduced-motion: reduce) { h2 .fold svg { transition: none } }
.folded h2 { color: var(--muted) } .folded .sec { margin-bottom: 8px }
.nw { white-space: nowrap }
.sec .meta .badge { margin-right: 8px; vertical-align: 1px }
.feat.road .name > b { font-weight: 500; color: var(--ink) } .feat.road .name small { gap: 4px 8px }
.feat.empty { color: var(--muted) }
.card { border: 1px solid var(--line); border-radius: 12px; background: var(--panel); overflow: hidden }
/* a feature: its name over a muted line, then the figures; the columns have fixed widths, so they line up down the page */
.feat { display: grid; grid-template-columns: minmax(180px, 1fr) auto; gap: 0 16px; padding: 12px 16px; border-top: 1px solid var(--line); align-items: center }
.feat:not(.hd):not(.tot):hover { background: var(--hover) }
.feat.hd { border-top: 0; padding-block: 8px; align-items: end; font-size: 12px; font-weight: 500; color: var(--muted); line-height: 1.35 }
.name { min-width: 0; overflow-wrap: anywhere }
.name > a, .name > b { display: block; font-weight: 500; color: var(--ink); text-decoration: none }
.name > a:hover { text-decoration: underline }
.name small { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; font-size: 13px; color: var(--muted) }
.name small a { color: inherit; text-decoration: none; white-space: nowrap } .name small a:hover { color: var(--ink); text-decoration: underline }
.name small a.draft { color: var(--amber) }
.feat.hd .name, .feat.tot .name > b { font-weight: inherit } .feat.tot { font-weight: 600 } .feat.tot .name small { font-weight: 400 }
.line { display: grid; grid-template-columns: 48px 48px 60px 96px 96px 96px 76px 104px; gap: 0 16px; align-items: center; font: 13px/1.5 var(--mono); font-variant-numeric: tabular-nums }
.feat.hd .line { font: inherit; align-items: end }
.c { min-width: 0; text-align: right; white-space: nowrap }
.c a { color: inherit; text-decoration: none } .c a:hover { text-decoration: underline }
.c b { font-weight: 500 }
.c-at { font-family: var(--body); font-size: 13px }
.dim, .c .no { color: var(--muted) } .x, .c a.x { color: var(--fail) }
.at-in { color: var(--ink) }
.badge { display: inline-flex; align-items: center; height: 20px; padding: 0 8px; border-radius: 10px; background: var(--sel); color: var(--muted); font: 500 12px/1 var(--body); white-space: nowrap }
.badge.blue { background: var(--blue-bg); color: var(--blue) } .badge.amber { background: var(--amber-bg); color: var(--amber) }
/* ghost buttons: Refresh eBugs in a card's footer, 「Mark as AT」 on a line (this computer only) */
.ghost, .atb { height: 32px; padding: 0 12px; border: 1px solid var(--line); border-radius: 6px; background: var(--panel); color: var(--ink); font: 500 13px/1 var(--body); white-space: nowrap; cursor: pointer }
.atb { height: 28px; padding: 0 8px }
.ghost:hover, .atb:hover { background: var(--hover); border-color: var(--muted) } .ghost:disabled { color: var(--muted); cursor: progress }
.atb.undo { height: 24px; padding: 0 4px; border: 0; background: none; color: var(--muted); font-weight: 400; text-decoration: underline }
.cfoot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 16px; padding: 12px 16px; border-top: 1px solid var(--line); background: var(--bg); color: var(--muted); font-size: 13px }
/* with a mouse, 「Mark as AT」 shows on the line under the pointer (or with keyboard focus), so the column stays quiet */
@media (hover: hover) and (min-width: 1061px) { .line .atb[data-on="1"] { opacity: 0 } .feat:hover .atb, .atb:focus-visible { opacity: 1 } }
/* narrow: a card per table, each figure with its column's name in front */
@media (max-width: 1060px) {
  .feat { grid-template-columns: minmax(0, 1fr); gap: 8px }
  .feat.hd { display: none }
  .feat:first-child, .feat.hd + .feat { border-top: 0 }
  .line { display: flex; flex-wrap: wrap; gap: 4px 16px }
  .c { text-align: left }
  .c[data-l]::before { content: attr(data-l) ' '; font: 12px var(--body); color: var(--muted) }
  .c-at[data-l]::before { content: none } .c-at:has(.at-in)::before { content: attr(data-l) ' ' }
  .c.blank { display: none }
}
footer { color: var(--muted); font-size: 13px; margin-top: 24px }
#none { margin: 32px 0 0; padding: 48px 24px; border: 1px dashed var(--line); border-radius: 12px; color: var(--muted); text-align: center }
/* a phone: the gauge takes its own line, the two menus share one under the search */
/* a touch screen: every control 44px tall; a phone: 16px text in fields and menus, or iOS zooms in on them */
@media (pointer: coarse) { .cb-tabs select, .cb-tabs a.cb-set, .cb-tabs .cb-lang, .bar input, .bar select, .ghost, .atb, .atb.undo { min-height: 44px } .tabs button { min-height: 44px } }
@media (max-width: 600px) { .bar input, .bar select, .cb-tabs select { font-size: 16px } }
@media (max-width: 600px) { .cb-tabs .cb-note { display: none } .cb-tabs a.cb-set { margin-left: auto } .sec .right { margin-left: 0; flex: 1 1 100% } .bar input { flex-basis: 100% } .bar select { flex: 1 1 0 } }
</style>
</head>
<body>
<nav class="cb-tabs" aria-label="Casebook"><b>Casebook</b><span class="crumb"><span class="sl" aria-hidden="true">/</span><select id="prods"></select></span><span class="crumb"><span class="sl" aria-hidden="true">/</span><select id="plats"></select></span><span class="cb-note">__NOTE__</span><a class="cb-set" href="/settings/" data-en="Settings" data-zh="設定">Settings</a><span class="cb-lang" role="group" aria-label="Language"><button type="button" data-l="en">English</button><button type="button" data-l="zh">中文</button></span></nav>
<div class="nav2"><div class="tabs" id="tabs" role="tablist"></div></div>
<h1 id="t"></h1>
<div class="bar"><input id="q" type="search" autocomplete="off"><select id="fver"></select><select id="sort"></select></div>
<main id="list" role="tabpanel"></main>
<p id="none" hidden></p>
<footer id="f"></footer>
<script>
/*__SHARED_JS__*/
let D = __DATA__;
let L = 'en'; try { if (localStorage.getItem('casebook-lang') === 'zh') L = 'zh'; } catch (e) {}
const $ = id => document.getElementById(id), tx = (en, zh) => L === 'zh' ? zh : en;
const PAGES = [['cases', 'Cases', '案例'], ['progress', 'Progress', '進度'], ['results', 'Results', '結果'], ['coverage', 'Coverage', '覆蓋率'], ['design', 'Design', '設計比對']];
// Products and platforms the Dashboard offers (user, 2026-11-26), in this order; one without a table yet shows dimmed.
const CATALOG = [['pdr', 'PowerDirector'], ['phd', 'PhotoDirector'], ['promeo', 'Promeo'], ['myedit-web', 'MyEdit Web']], PLATS = ['pc', 'mac', 'android', 'ios'];
const platName = p => ({ pc: 'PC', mac: 'Mac', android: 'Android', ios: 'iOS' })[p] ?? '';
// what this browser opened last, per table (the tab bar writes it): where a feature's name leads
const seen = () => { try { return JSON.parse(localStorage.getItem('casebook-seen') || '{}'); } catch (e) { return {}; } };
const lastTab = (root, s) => s[root]?.path ?? 'cases';
// ---- The table. One line per table (platform), the same columns in every group; each figure links to the page behind it.
// A figure that never had a value shows 「–」; one that had a value and is now none shows 0 (user, 2026-11-27): no run yet
// is –, a run with no failure is 0; no eBug ever filed is –, all filed ones closed is 0 / N; no question ever asked is –,
// all answered or settled is 0.
const md = d => d ? d.slice(5) : '', num = x => x.toLocaleString('en-US'), dash = '<span class="dim">–</span>';
const verKey = v => v.split('.').map(n => n.padStart(6, '0')).join('.');
// a table is in Regression (AT) once it is marked converted (lib/regression.ts); until then it is an agentic run
// Cases and the last run sit on the feature's second line (subLine), so the columns are the results and what waits on a person.
const COLS = () => [['pass', tx('Pass', '通過')], ['fail', tx('Fail', '失敗')], ['blocked', tx('Blocked', '受阻')],
  ['bugs', tx('eBugs<br>open\u00a0/\u00a0filed', 'eBug<br>未結\u00a0/\u00a0已開')], ['mui', tx('MUI bugs<br>open\u00a0/\u00a0filed', 'MUI bug<br>未結\u00a0/\u00a0已開')], ['design', tx('Design bugs<br>open\u00a0/\u00a0filed', '設計 bug<br>未結\u00a0/\u00a0已開')], ['qs', tx('PM<br>questions', 'PM<br>待答問題')], ['at', 'AT']];
const line = cells => `<div class="line">${COLS().map(([id, label], i) => `<div class="c c-${id}${cells[i] === dash || !cells[i] ? ' blank' : ''}" data-l="${cbEsc(label.replace(/<br>/g, ' ').replace(/<[^>]+>/g, ''))}">${cells[i] ?? ''}</div>`).join('')}</div>`;
// eBugs of one kind: those still open (eCL's status at the last Refresh, else the status when filed) of those filed
const bugPair = (b, href, what) => b?.filed ? `<a href="${href}" title="${cbEsc(tx(`${b.open} still open of ${b.filed} ${what} filed`, `${what}：已開 ${b.filed} 張，${b.open} 張未結`))}"><b${b.open ? ' class="x"' : ''}>${b.open}</b><span class="dim"> / ${b.filed}</span></a>` : '';
// A table listed under its roadmap version but run on another build says so under the run's date; a run on the newest
// version tested on this platform is highlighted (user, 2026-11-26).
let NEWEST = '';
const ranOn = p => p.ran && p.ran !== p.app ? `<span class="badge${p.ran === NEWEST ? ' amber' : ''}" title="${cbEsc(p.ran === NEWEST ? tx(`Last run on ${p.ran}, the newest version tested`, `最近一次在 ${p.ran} 執行，為目前測過的最新版本`) : tx(`Last run on ${p.ran}`, `最近一次在 ${p.ran} 執行`))}">${tx('on', '於')} ${cbEsc(p.ran)}${p.ran === NEWEST ? tx(' · newest', '・最新') : ''}</span>` : '';
function subLine(f, p) {
  const root = `/${f.id}/${p.platform}`, r = p.last;
  const draft = p.drafts.at(-1), draftLink = draft ? `<a class="draft" href="${root}/draft/${draft}/cases/" title="${cbEsc(tx(`Open draft ${draft}, waiting for review`, `開啟待審草稿 ${draft}`))}">${tx('draft', '草稿')}</a>` : '';
  // Cases: the approved table's rows (its MUI section is counted under MUI, not here); a draft waiting for review beside it
  const cases = p.version ? `<a href="${root}/cases/" title="${cbEsc(tx(`${num(p.cases)} test cases in the approved table (v${p.version})${p.mui_cases ? `, plus ${p.mui_cases} MUI rows counted under MUI` : ''}`, `已核准表格（v${p.version}）有 ${num(p.cases)} 個測試案例${p.mui_cases ? `，另有 ${p.mui_cases} 列 MUI 計入 MUI 欄` : ''}`))}">${num(p.cases)} ${tx(p.cases === 1 ? 'case' : 'cases', '個案例')}</a>` : '';
  // the latest full run's date (no build: groups go by version); opens the run plan
  const when = p.tested ? md(p.tested.date) : r ? cbWhen(r.at).slice(0, 5) : '';
  const run = when ? `<a href="${root}/${p.plan ? 'progress' : 'results'}/" title="${cbEsc(r ? r.id : '')}">${tx('last run', '最近執行')} ${cbEsc(when)}</a>` : '';
  const badges = (r?.live ? `<span class="badge blue">${tx('Running', '執行中')}</span>` : '') + (!when && p.version ? `<span class="badge">${tx('Not run', '尚未執行')}</span>` : '') + ranOn(p);
  return `<small>${[cases, draftLink, run].filter(Boolean).map((x, i) => (i ? '<span aria-hidden="true">·</span>' : '') + x).join('')}${badges}</small>`;
}
function tableLine(f, p, s) {
  const root = `/${f.id}/${p.platform}`, r = p.latest, w = p.waiting ?? {}, m = p.mui, B = p.bugs ?? {};
  // Pass, Fail, Blocked (user, 2026-11-27): each case at its newest result from any run, not the last run alone; each count
  // opens Results' 「Latest results」 filtered to that result
  const res = (n, k, cls) => r ? `<a${cls && n ? ` class="${cls}"` : ''} href="${root}/results/?run=latest&res=${k}" title="${cbEsc(tx('Cases at their newest result from any run', '各案例在所有執行中的最新結果'))}">${n}</a>` : dash;
  const bugs = bugPair(B.fn, `${root}/results/?bugs=1`, tx('eBugs (functional and UX)', '功能與 UX eBug')) || dash;
  const wait = (w.questions ?? 0) + (w.answers ?? 0) + (w.notes ?? 0);
  const qTip = tx(`${w.questions ?? 0} open questions (not answered, not filed, not determined by a run; ${w.filed ?? 0} more are filed as an eBug), ${w.answers ?? 0} answers to apply, ${w.notes ?? 0} new-case notes`, `${w.questions ?? 0} 個無人回答也未開單的問題、${w.filed ?? 0} 個已開單、${w.answers ?? 0} 個待套用答案、${w.notes ?? 0} 則新案例備註`);
  const qs = wait || w.asked ? `<a href="${root}/cases/#questions" title="${cbEsc(qTip)}">${wait ? `<b>${wait}</b>` : '0'}</a>` : dash;
  // MUI and Design (user, 2026-11-26): the eBugs of that kind, open of filed, like the eBugs column; nothing else
  const mui = bugPair(B.mui, `${root}/results/?bugs=1${m?.run ? `&run=${encodeURIComponent(m.run)}` : ''}`, tx('MUI eBugs', 'MUI eBug')) || dash;
  const design = bugPair(B.ui, `${root}/results/?bugs=1`, tx('Design ([UI]) eBugs', '設計（[UI]）eBug')) || dash;
  const btn = on => D.local ? `<button type="button" class="atb${on ? '' : ' undo'}" data-f="${cbEsc(f.id)}" data-p="${p.platform}" data-on="${on ? '1' : ''}" data-t="${cbEsc(`${f.title} · ${platName(p.platform)}`)}">${on ? tx('Mark as AT', '標為已轉 AT') : tx('undo', '復原')}</button>` : '';
  const at = !p.version ? dash : p.at ? `<span class="at-in" title="${cbEsc([tx(`In regression (AT) since ${p.at.since}`, `${p.at.since} 起納入回歸（AT）`), p.at.note].filter(Boolean).join('\n'))}">✓ ${md(p.at.since)}</span>${D.local ? ` · ${btn(false)}` : ''}`
    : btn(true) || `<span class="no">${tx('Waiting', '待轉')}</span>`;
  return line([res(r?.pass, 'Pass', ''), res(r?.fail, 'Fail', 'x'), res(r?.blocked, 'Blocked', ''), bugs, mui, design, qs, at]);
}
// a group's last line: its tables added up, under the same columns
function totalLine(list) {
  const t = list.map(x => x.p), sum = k => t.reduce((a, p) => a + (k(p) ?? 0), 0);
  const pass = sum(p => p.latest?.pass), fail = sum(p => p.latest?.fail), blocked = sum(p => p.latest?.blocked);
  const pair = k => { const filed = sum(p => k(p)?.filed), open = sum(p => k(p)?.open); return filed ? `<span${open ? ' class="x"' : ''}>${num(open)}</span><span class="dim"> / ${num(filed)}</span>` : ''; };
  const qs = sum(p => (p.waiting?.questions ?? 0) + (p.waiting?.answers ?? 0) + (p.waiting?.notes ?? 0));
  const ranAny = t.some(p => p.latest), asked = t.some(p => p.waiting?.asked);
  return line([ranAny ? num(pass) : dash, ranAny ? `<span${fail ? ' class="x"' : ''}>${num(fail)}</span>` : dash, ranAny ? num(blocked) : dash,
    pair(p => p.bugs?.fn) || dash, pair(p => p.bugs?.mui) || dash, pair(p => p.bugs?.ui) || dash, qs || asked ? num(qs) : dash, '']);
}
// when the group's eBug statuses were last read from eCL, and the button that reads them again
function refreshHtml(list) {
  const withBugs = list.filter(x => { const b = x.p.bugs; return b && b.fn.filed + b.ui.filed + b.mui.filed; });
  if (!withBugs.length) return '';
  const at = Math.min(...withBugs.map(x => x.p.bugs.checked));
  const when = at ? tx(`eBug status read ${cbWhen(new Date(at).toISOString())}`, `eBug 狀態讀取於 ${cbWhen(new Date(at).toISOString())}`) : tx('eBug status as filed, not read from eCL yet', 'eBug 狀態為開單當時，尚未從 eCL 讀取');
  const key = JSON.stringify(withBugs.map(x => [x.f.id, x.p.platform]).sort()), going = (D.refreshing ?? []).includes(key);
  return `<div class="cfoot"><span>${when}</span><button type="button" class="ghost" data-refresh="${cbEsc(key)}"${going ? ' disabled' : ''}>${going ? tx('Reading eCL…', '讀取 eCL 中…') : tx('Refresh eBugs', '更新 eBug')}</button></div>`;
}
// a group: the tables of one platform under one product and version, one line each, then the roadmap items of the next
// version that no table covers yet (user, 2026-11-27). Folded (user, 2026-11-27), the version is one line: its total.
const nFeat = n => tx(`${n} feature${n === 1 ? '' : 's'}`, `${n} 個功能`);
const itemLine = it => `<div class="feat road"><div class="name"><b>${cbEsc(it.title)}</b><small><span class="badge">${tx('No table yet', '尚無表格')}</span>${tx('Roadmap', '路線圖')} · P${cbEsc(it.priority || '–')} · ${cbEsc(it.category)}</small></div>${line(Array(8).fill(dash))}</div>`;
const groupHtml = (g, s) => { const { key, title, list, gm, gauge, stage, items, folded } = g, cases = list.reduce((n, x) => n + (x.p.version ? x.p.cases : 0), 0);
  const stageTag = stage === 'next' ? `<span class="badge blue">${tx('Next GM', '下一個 GM')}</span>` : stage === 'past' ? `<span class="badge">${tx('GM passed', '已過 GM')}</span>` : '';
  const meta = [list.length ? nFeat(list.length) : '', items.length ? tx(`${items.length} roadmap item${items.length === 1 ? '' : 's'} without a table`, `${items.length} 個路線圖項目尚無表格`) : ''].filter(Boolean).join(' · ');
  const head = `<div class="sec"><h2><button type="button" class="fold" data-fold="${cbEsc(key)}" aria-expanded="${!folded}" aria-controls="v-${cbEsc(key)}"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4l4 4-4 4"/></svg>${cbEsc(title)}</button></h2><span class="meta">${stageTag}${meta}${meta ? gm : gm.replace('· ', '')}</span>${gauge}</div>`;
  const total = (name) => `<div class="feat tot"><div class="name"><b>${name}</b><small>${num(cases)} ${tx('cases', '個案例')}</small></div>${totalLine(list)}</div>`;
  if (folded) return `<section class="folded">${head}<div class="card" id="v-${cbEsc(key)}">${list.length ? total(nFeat(list.length)) : `<div class="feat empty"><div class="name"><small>${meta || tx('Nothing listed', '沒有項目')}</small></div></div>`}</div></section>`;
  const rows = list.map(({ f, p }) => { const root = `/${f.id}/${p.platform}`; return `<div class="feat"><div class="name"><a href="${root}/${lastTab(root, s)}/" title="${cbEsc(f.id)}">${cbEsc(f.title)}</a>${subLine(f, p)}</div>${tableLine(f, p, s)}</div>`; }).join('');
  const none = !list.length && !items.length ? `<div class="feat empty"><div class="name"><small>${tx('No feature table for this version yet.', '此版本還沒有功能表格。')}</small></div></div>` : '';
  return `<section>${head}<div class="card" id="v-${cbEsc(key)}"><div class="feat hd"><div class="name">${tx('Feature', '功能')}</div>${line(COLS().map(c => c[1]))}</div>
  ${rows}${items.map(itemLine).join('')}${none}${list.length > 1 ? total(tx('Total', '合計')) : ''}${refreshHtml(list)}</div></section>`; };
// which versions are folded, per browser (product/platform/version → true or false); unset, a past version is folded
let FOLD = {}; try { FOLD = JSON.parse(localStorage.getItem('casebook-fold') || '{}'); } catch (e) {}
// The view (user, 2026-11-25/26), remembered per browser: the product, its platform (never two listed together), the tab
// (agentic runs · Regression (AT)) and one version or all ('none' = not tested yet).
let VIEW = { tab: 'runs', plat: '', prod: '', ver: '' }; try { VIEW = { ...VIEW, ...JSON.parse(localStorage.getItem('casebook-dash') || '{}') }; } catch (e) {}
const keep = () => { try { localStorage.setItem('casebook-dash', JSON.stringify(VIEW)); } catch (e) {} };
// Sort (user, 2026-11-24), inside each group, remembered per browser: recent activity (a run's last result, an approval or a draft,
// whichever is newest on either platform), what waits on a person (open questions, answers and notes, then failed
// cases of the last run), or name.
const SORTS = [['recent', 'Recent activity', '最近活動'], ['attention', 'Needs attention', '待處理'], ['name', 'Name', '名稱']];
let SORT = 'recent'; try { SORT = SORTS.some(x => x[0] === localStorage.getItem('casebook-sort')) ? localStorage.getItem('casebook-sort') : 'recent'; } catch (e) {}
// The view is also in the address (?prod=pdr&plat=android&tab=runs&ver=16.9.0&sort=name&q=…), so a link opens the same
// view; a link's view wins over what this browser remembers, and is remembered only once the reader changes something.
{ const u = new URLSearchParams(location.search), g = k => u.get(k) ?? '';
  if (g('prod')) VIEW.prod = g('prod'); if (g('plat')) VIEW.plat = g('plat'); if (['runs', 'at'].includes(g('tab'))) VIEW.tab = g('tab');
  if (u.has('ver')) VIEW.ver = g('ver'); if (SORTS.some(x => x[0] === g('sort'))) SORT = g('sort'); if (g('q')) $('q').value = g('q'); }
const toUrl = () => { const u = new URLSearchParams(), q = $('q').value.trim();
  for (const [k, v] of [['prod', VIEW.prod], ['plat', VIEW.plat], ['tab', VIEW.tab], ['ver', VIEW.ver], ['sort', SORT], ['q', q]]) if (v || k === 'ver') u.set(k, v);
  const next = `${location.pathname}?${u}`; if (next !== location.pathname + location.search) history.replaceState(null, '', next); };
const draftAt = d => (d.match(/^(\d{4})(\d\d)(\d\d)-(\d\d)(\d\d)(\d\d)/) ?? []).slice(1).reduce((a, x, i) => a + ['', '-', '-', 'T', ':', ':'][i] + x, '');
const activity = f => f.platforms.flatMap(p => [p.last?.at, p.approved_at, ...p.drafts.map(draftAt)]).filter(Boolean).map(t => t.slice(0, 19)).sort().at(-1) ?? '';
const attention = f => f.platforms.reduce((n, p) => n + (p.waiting?.questions ?? 0) + (p.waiting?.answers ?? 0) + (p.waiting?.notes ?? 0), 0);
const fails = f => f.platforms.reduce((n, p) => n + (p.latest?.fail ?? 0), 0);
const byName = (a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });
const order = (a, b) => SORT === 'name' ? byName(a, b) : SORT === 'attention' ? attention(b) - attention(a) || fails(b) - fails(a) || byName(a, b) : activity(b).localeCompare(activity(a)) || byName(a, b);
function render() {
  document.documentElement.lang = L === 'zh' ? 'zh-Hant' : 'en';
  document.querySelectorAll('.cb-tabs [data-zh]').forEach(e => e.textContent = e.dataset[L]);
  document.querySelectorAll('.cb-lang button').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.l === L)));
  const features = D.products.flatMap(p => p.features.map(f => Object.assign(f, { product: p.id })));
  // one entry per table; a table not approved yet (a draft only) is an agentic run too
  const tables = features.flatMap(f => f.platforms.map(p => ({ f, p }))), isAt = x => !!(x.p.version && x.p.at);
  const inTab = x => isAt(x) === (VIEW.tab === 'at');
  $('t').textContent = tx('Dashboard', '總覽');
  // the product first, then the platform (user, 2026-11-26): the catalog's products in its order, whether or not they
  // have a table yet; a product the library holds beyond the catalog follows them
  const PRODS = [...CATALOG, ...D.products.filter(p => !CATALOG.some(c => c[0] === p.id)).map(p => [p.id, p.name])];
  const nProd = id => tables.filter(x => x.f.product === id).length;
  if (!PRODS.some(p => p[0] === VIEW.prod)) VIEW.prod = [...PRODS].sort((a, b) => nProd(b[0]) - nProd(a[0]))[0][0];
  const prodName = PRODS.find(p => p[0] === VIEW.prod)[1], mine = tables.filter(x => x.f.product === VIEW.prod);
  $('prods').setAttribute('aria-label', tx('Product', '產品')); $('plats').setAttribute('aria-label', tx('Platform', '平台'));
  $('prods').innerHTML = PRODS.map(([id, name]) => `<option value="${id}"${VIEW.prod === id ? ' selected' : ''}>${cbEsc(name)}</option>`).join('');
  // the platform: the one chosen while this product has tables on it, else the one with the most; one without a table
  // cannot be chosen
  const nPlat = pl => mine.filter(x => x.p.platform === pl).length;
  if (!nPlat(VIEW.plat)) VIEW.plat = mine.length ? [...PLATS].sort((a, b) => nPlat(b) - nPlat(a))[0] : '';
  $('plats').innerHTML = (VIEW.plat ? '' : `<option value="" selected disabled hidden>${tx('No platform yet', '尚無平台')}</option>`) + PLATS.map(pl => `<option value="${pl}"${VIEW.plat === pl ? ' selected' : ''}${nPlat(pl) ? '' : ' disabled'}>${platName(pl)}</option>`).join('');
  const platted = mine.filter(x => x.p.platform === VIEW.plat), nAt = platted.filter(isAt).length;
  $('tabs').innerHTML = [['runs', tx('Agentic runs', 'Agent 執行'), platted.length - nAt, tx('Tables tested by the agent, waiting for their conversion to AT', '由 Agent 測試、待轉成 AT 的表格')], ['at', tx('Regression (AT)', '回歸測試（AT）'), nAt, tx('Tables converted to automated tests', '已轉成自動化測試的表格')]]
    .map(([id, label, n, tip]) => `<button type="button" role="tab" id="tab-${id}" data-tab="${id}" aria-controls="list" aria-selected="${VIEW.tab === id}" tabindex="${VIEW.tab === id ? 0 : -1}" title="${cbEsc(tip)}">${label}</button>`).join('');
  $('list').setAttribute('aria-labelledby', `tab-${VIEW.tab}`);
  // the version menu offers what this product, platform and tab hold; a choice that no longer exists falls back to All
  const tabbed = platted.filter(inTab), vOf = x => x.p.app || 'none';
  // Versions by their GM date on the roadmap (user, 2026-11-27): the next version still before its GM on top (shown on
  // Agentic runs even before it has a table, with its roadmap items), then later ones, then those whose GM has passed,
  // newest first and folded; a version the roadmap does not date is placed by its number; 「Not tested yet」 last.
  const rels = D.products.find(p => p.id === VIEW.prod)?.releases ?? [], relOf = v => rels.find(r => r.platform === VIEW.plat && r.version === v);
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei' }).format(new Date());
  const next = rels.filter(r => r.platform === VIEW.plat && r.gm >= today).sort((a, b) => a.gm.localeCompare(b.gm) || verKey(a.version).localeCompare(verKey(b.version)))[0]?.version ?? '';
  const stageOf = v => v === 'none' ? 'none' : v === next ? 'next' : relOf(v)?.gm ? (relOf(v).gm < today ? 'past' : 'later') : next && verKey(v) > verKey(next) ? 'later' : 'past';
  const RANK = { next: 0, later: 1, past: 2, none: 3 };
  const vers = [...new Set([...tabbed.map(vOf), ...(next && VIEW.tab === 'runs' ? [next] : [])])]
    .sort((a, b) => RANK[stageOf(a)] - RANK[stageOf(b)] || (stageOf(a) === 'later' ? verKey(a).localeCompare(verKey(b)) : verKey(b).localeCompare(verKey(a))));
  if (VIEW.ver && !vers.includes(VIEW.ver)) VIEW.ver = '';
  const vName = v => v === 'none' ? tx('Not tested yet', '尚未測試') : v;
  const opt = (v, label, n) => `<option value="${cbEsc(v)}"${VIEW.ver === v ? ' selected' : ''}>${cbEsc(label)} (${n})</option>`, nVer = v => tabbed.filter(x => vOf(x) === v).length;
  $('fver').setAttribute('aria-label', tx('Version', '版本'));
  $('fver').innerHTML = opt('', tx('All versions', '全部版本'), tabbed.length) + vers.map(v => opt(v, vName(v), nVer(v))).join('');
  $('q').placeholder = tx('Search features…', '搜尋功能…');
  $('sort').setAttribute('aria-label', tx('Sort features', '功能排序'));
  $('sort').innerHTML = SORTS.map(([id, en, zh]) => `<option value="${id}"${id === SORT ? ' selected' : ''}>${tx(`Sort: ${en}`, `排序：${zh}`)}</option>`).join('');
  document.querySelector('.bar').hidden = !platted.length;
  const s = seen();
  const q = $('q').value.trim().toLowerCase();
  const shown = tabbed.filter(x => (!VIEW.ver || vOf(x) === VIEW.ver) && (!q || `${x.f.title} ${x.f.id}`.toLowerCase().includes(q))).sort((a, b) => order(a.f, b.f));
  // per version: how many of its cases have been run on a device, of the cases created (user, 2026-11-26): the approved
  // tables' rows without MUI, and those of them with a Pass, Fail or Blocked result from any run (lib/boards.ts ranCases). Every table of the version counts, whatever the tab or the search shows.
  NEWEST = platted.map(x => x.p.ran).filter(Boolean).sort((a, b) => verKey(a).localeCompare(verKey(b))).at(-1) ?? '';
  const casesHtml = v => { const all = platted.filter(x => vOf(x) === v && x.p.version), total = all.reduce((n, x) => n + (x.p.cases ?? 0), 0);
    const ran = all.reduce((n, x) => n + (x.p.ran_cases ?? 0), 0);
    return total ? `<span class="right" title="${cbEsc(tx(`${num(ran)} of the ${num(total)} cases created in this version's tables have a result from a run on a device (${Math.round(ran / total * 100)}%)`, `此版本的表格共建立 ${num(total)} 個案例，其中 ${num(ran)} 個已在裝置上執行並有結果（${Math.round(ran / total * 100)}%）`))}"><span class="gauge"><i style="width:${ran / total * 100}%"></i></span><span class="mono"><b>${num(ran)}</b>/${num(total)}</span><span class="meta">${tx('cases run', '案例已執行')}</span></span>` : ''; };
  // the version's GM date, from the Kanban roadmap (releases.json of the product)
  const gmHtml = v => { const gm = relOf(v)?.gm; return gm ? ` <span class="nw" title="${cbEsc(tx('GM date on the Kanban roadmap', 'Kanban 路線圖上的 GM 日期'))}">· GM <b>${cbEsc(gm)}</b></span>` : ''; };
  // the next version's roadmap items that no table's release.json covers (a search matches their titles too)
  const covered = new Set(platted.flatMap(x => x.p.items ?? []).map(t => t.trim().toLowerCase()));
  const itemsOf = v => v === next && VIEW.tab === 'runs' ? (relOf(v)?.items ?? []).filter(it => !covered.has(it.title.trim().toLowerCase()) && (!q || it.title.toLowerCase().includes(q))) : [];
  const groups = vers.filter(v => !VIEW.ver || v === VIEW.ver).map(v => { const key = `${VIEW.prod}/${VIEW.plat}/${v}`, list = shown.filter(x => vOf(x) === v), items = itemsOf(v);
    return { key, title: `${prodName} ${vName(v)}`, list, items, gm: gmHtml(v), gauge: casesHtml(v), stage: stageOf(v), folded: FOLD[key] ?? stageOf(v) === 'past' }; })
    .filter(g => g.list.length || g.items.length || (g.stage === 'next' && !q));
  $('list').innerHTML = groups.map(g => groupHtml(g, s)).join('');
  $('none').hidden = !!groups.length;
  const where = `${prodName} ${platName(VIEW.plat)}`;
  $('none').textContent = !mine.length ? tx(`No table for ${prodName} yet.`, `${prodName} 還沒有表格。`) : tabbed.length ? tx('No feature matches.', '沒有符合的功能。') : VIEW.tab === 'at'
    ? tx(`No ${where} table is converted to AT yet: they are under Agentic runs, waiting for their conversion.${D.local ? ' Use 「Mark as AT」 on a table there once it is converted.' : ''}`, `尚無 ${where} 表格轉成 AT：都在「Agent 執行」，待轉換。${D.local ? '轉換完成後，在該頁的表格按「標為已轉 AT」。' : ''}`)
    : tx(`Every ${where} table is converted to AT: they are under Regression (AT).`, `${where} 表格都已轉成 AT：在「回歸測試（AT）」。`);
  $('f').textContent = tx(`A page starts when it is opened and stops after ${D.idleMinutes} idle minutes. Running now: ${D.live}. All times Taipei.`,
    `頁面開啟時才啟動，閒置 ${D.idleMinutes} 分鐘後停止。目前執行中：${D.live}。時間皆為台北時間。`);
  toUrl();
}
// fold or open a version; remembered per browser (Settings › Remembered views forgets it)
$('list').addEventListener('click', e => { const b = e.target.closest('[data-fold]'); if (!b) return;
  FOLD[b.dataset.fold] = b.getAttribute('aria-expanded') === 'true'; try { localStorage.setItem('casebook-fold', JSON.stringify(FOLD)); } catch (x) {}
  render(); document.querySelector(`[data-fold="${CSS.escape(b.dataset.fold)}"]`)?.focus(); });
$('tabs').onclick = e => { const b = e.target.closest('[data-tab]'); if (b) { VIEW.tab = b.dataset.tab; keep(); render(); } };
// the tabs move with the arrow keys, Home and End (the tab pattern): the new tab is chosen and keeps the focus
$('tabs').onkeydown = e => {
  const all = [...$('tabs').querySelectorAll('[role="tab"]')], i = all.indexOf(document.activeElement); if (i < 0) return;
  const j = { ArrowLeft: i - 1, ArrowRight: i + 1, Home: 0, End: all.length - 1 }[e.key]; if (j === undefined) return;
  e.preventDefault(); VIEW.tab = all[(j + all.length) % all.length].dataset.tab; keep(); render(); $(`tab-${VIEW.tab}`).focus();
};
$('plats').onchange = () => { VIEW.plat = $('plats').value; keep(); render(); };
$('prods').onchange = () => { VIEW.prod = $('prods').value; VIEW.ver = ''; keep(); render(); };
$('fver').onchange = () => { VIEW.ver = $('fver').value; keep(); render(); };
$('q').oninput = render;
// the AT button (this computer only): save through the pages server, redraw from its answer
$('list').addEventListener('click', async e => {
  const b = e.target.closest('.atb'); if (!b) return;
  const on = !!b.dataset.on; // no confirm box: the line's 「undo」 reverses it
  b.disabled = true;
  try {
    const r = await fetch('/regression', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ feature: b.dataset.f, platform: b.dataset.p, on }) }), j = await r.json();
    if (!r.ok) throw new Error(j.error ?? r.status);
    D = j; render();
  } catch (err) { b.disabled = false; alert(tx(`Not saved: ${err.message}`, `未儲存：${err.message}`)); }
});
// Refresh eBugs (any computer; one read at a time per group, the server joins a second click to the first): read the group's eBug statuses from eCL, then redraw from the answer
$('list').addEventListener('click', async e => {
  const b = e.target.closest('[data-refresh]'); if (!b) return;
  b.disabled = true; b.textContent = tx('Reading eCL…', '讀取 eCL 中…');
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
