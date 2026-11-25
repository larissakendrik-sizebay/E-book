// Generates dist/fashion-retail-calendar-2027.html and .pdf from content-en.js (English edition).
// Same visual system as build.js (PT edition). Usage: node build-en.js [--shots DIR]
const fs = require('fs');
const path = require('path');
const C = require('./content-en.js');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

// ---------- identity (same as PT): black / white / pink ----------
const T = {
  white: { bg: '#FFFFFF', ink: '#0B0B0B', accent: '#FF9ACB', sbg: '#FF9ACB', sfg: '#0B0B0B' },
  black: { bg: '#0B0B0B', ink: '#FFFFFF', accent: '#FF9ACB', sbg: '#FF9ACB', sfg: '#0B0B0B' },
  pink: { bg: '#FF9ACB', ink: '#0B0B0B', accent: '#0B0B0B', sbg: '#0B0B0B', sfg: '#FF9ACB' },
};
const Q = [T.white, T.black, T.white, T.black];
const tStyle = (t) => `--bg:${t.bg};--ink:${t.ink};--accent:${t.accent};--sbg:${t.sbg};--sfg:${t.sfg}`;
const qStyle = (q) => tStyle(Q[q]);

const STATUS = { C: ['Confirmed', 'ok'], P: ['Expected', 'pr'] };
const ROT = [-1.6, 1.1, -0.7, 1.5];
const NAME = 'The 2027 Fashion Retail Calendar';

// "Jan 1 (Fri)" -> big "Jan 1" + small "Fri"; "Late Jan", "All month"... -> small label
const fmtDate = (raw) => {
  const wk = raw.match(/^(.*?)\s*\((.+)\)$/);
  const base = (wk ? wk[1] : raw).replace(/–/g, '–');
  const numeric = /^[A-Z][a-z]{2} \d/.test(base);
  return { t: base, wk: wk ? wk[2] : '', small: !numeric };
};

let pageNo = 0;
const folio = () => `<footer class="folio"><span>Sizebay</span><span>${String(pageNo).padStart(2, '0')}</span></footer>`;
const running = (right) => `<header class="run"><span>${NAME}</span><span>${right}</span></header>`;
const stamp = (text, i = 0) => `<span class="stamp" style="--r:${ROT[i % 4]}deg">${esc(text)}</span>`;
const badge = (st) => {
  const [label, cls] = STATUS[st];
  return `<span class="badge ${cls}">${label}</span>`;
};

const eventRows = (list) =>
  list
    .map((e) => {
      const dt = fmtDate(e.d);
      return `<div class="row">
        <div class="d ${dt.small ? 'sm' : ''}">${esc(dt.t)}${dt.wk ? `<small>${esc(dt.wk)}</small>` : ''}</div>
        <div class="n"><b>${esc(e.n)}</b>${e.where ? ` <i>· ${esc(e.where)}</i>` : ''}<span class="why">${esc(e.why)}</span></div>
        ${badge(e.s)}
      </div>`;
    })
    .join('');

const tipPanel = (tip, i) =>
  `<div class="tip" style="${tStyle(T.pink)}">
     ${stamp('E-commerce tip', i)}
     <p>${md(tip)}</p>
   </div>`;

// ---------- pages ----------
const pages = [];
const monthPages = {}; // name -> first page number (for the contents)
const specialPages = {};

// COVER
pageNo++;
pages.push(`
<section class="page cover">
  <header class="run"><span>Sizebay</span><span>E-book · 2027 Edition</span></header>
  <div class="cluster">
    <span class="stamp big" style="--r:-2.2deg;left:0;top:0;z-index:1">Fashion weeks</span>
    <span class="stamp big" style="--r:1.6deg;left:70mm;top:20mm;z-index:2">Collections</span>
    <span class="stamp big" style="--r:-1.1deg;left:6mm;top:42mm;z-index:3">Trade shows</span>
    <span class="stamp big" style="--r:2.1deg;left:62mm;top:63mm;z-index:4">Retail peaks</span>
  </div>
  <div class="spacer"></div>
  <h1 class="ctitle">
    <span class="l1">Fashion</span>
    <span class="l2"><em>retail</em><span class="script">Calendar</span></span>
    <span class="l3">2027</span>
  </h1>
  <div class="cbottom">
    <p class="csub">${esc(C.cover.subtitle)}</p>
    <p class="ctext">${esc(C.cover.text.split(' | ').join('  ·  '))}</p>
  </div>
</section>`);

// CONTENTS (filled in after we know the page numbers)
pageNo++;
const contentsIndex = pages.length;
pages.push('');
const contentsPageNo = pageNo;

// HOW TO USE
pageNo++;
specialPages.howto = pageNo;
const H = C.howto;
pages.push(`
<section class="page plan howto" style="${tStyle(T.white)}">
  ${running('How to use this calendar')}
  <div class="stampwrap">${stamp('How to use', 0)}</div>
  <h2 class="h-mid">${esc(H.title)}</h2>
  <div class="two"><p>${esc(H.text)}</p></div>
  <div class="ptable">
    <div class="ph"><span>Layer</span><span>What it tells you</span><span>Who uses it most</span></div>
    ${H.layers
      .map(
        (r, i) => `<div class="pr" style="${tStyle([T.pink, T.black, T.pink, T.black][i])}">
        <div class="pp">${esc(r[0])}</div><div class="pm">${esc(r[1])}</div><div class="pw">${esc(r[2])}</div></div>`
      )
      .join('')}
  </div>
  <p class="hread"><b>How to read each date.</b> ${esc(H.read)}</p>
  <div class="special">
    <div class="sphead"><h3>${esc(H.waysTitle)}</h3></div>
    <ul>${H.ways.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('')}</ul>
  </div>
  <div class="spacer"></div>
  <div class="note"><b>Note:</b> ${esc(H.note)}</div>
  ${folio()}
</section>`);

// AT A GLANCE — heat grid: number of calendar entries per month and layer (computed from the month data)
pageNo++;
specialPages.glance = pageNo;
const G = C.glance;
const LAYERS = [
  ['Fashion Week', 'Fashion weeks'],
  ['Collections', 'Collections'],
  ['Trade Show', 'Trade shows'],
  ['Retail', 'Retail moments'],
];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const cnt = (li, mi) => C.months[mi].events.filter((e) => e.layer === LAYERS[li][0]).length;
const cell = (n) => `<div class="gc l${n === 0 ? 0 : n <= 2 ? 1 : n <= 4 ? 2 : 3}">${n || ''}</div>`;
pages.push(`
<section class="page glance" style="${tStyle(T.black)}">
  ${running('2027 at a glance')}
  <div class="stampwrap">${stamp('2027 at a glance', 1)}</div>
  <h2 class="h-mid">${esc(G.title)}</h2>
  <p class="gtext">${esc(G.text)}</p>
  <div class="gcap">${esc(G.caption)}</div>
  <div class="gridmap">
    <div class="gc gh"></div>${MON.map((m) => `<div class="gc gh">${m}</div>`).join('')}
    ${LAYERS.map(([k, label], li) => `<div class="gc gl">${esc(label)}</div>${MON.map((_, mi) => cell(cnt(li, mi))).join('')}`).join('')}
  </div>
  <div class="gkey"><span>Entries per month</span><i class="k l1"></i>1–2<i class="k l2"></i>3–4<i class="k l3"></i>5+</div>
  <div class="spacer"></div>
  <div class="reads">
    <h3>${esc(G.readsTitle)}</h3>
    <div class="rcards">
      ${G.reads.map(([a, b], i) => `<div class="rc" style="${tStyle([T.pink, T.white, T.pink][i])}"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join('')}
    </div>
  </div>
  ${folio()}
</section>`);

// MONTHS — page 1: theme, context, fashion weeks + trade shows (+ retail when there are few rows)
//          page 2: retail moments (if not on page 1), collections + tip
C.months.forEach((m, i) => {
  const q = Math.floor(i / 3);
  const num = String(i + 1).padStart(2, '0');
  const by = (l) => m.events.filter((e) => e.layer === l);
  const fw = by('Fashion Week'), ts = by('Trade Show'), rt = by('Retail'), co = by('Collections');
  const retailOnFirst = fw.length + ts.length < 6;
  const p1rows = fw.length + ts.length + (retailOnFirst ? rt.length : 0);
  const nameSize = p1rows >= 9 ? 70 : p1rows >= 6 ? 96 : 126;

  const sec = (label, k, list) => (list.length ? `<div class="sec">${stamp(label, k)}<div class="rows">${eventRows(list)}</div></div>` : '');

  pageNo++;
  monthPages[m.name] = pageNo;
  pages.push(`
<section class="page hero" style="${qStyle(q)}">
  ${running(`${num} / 12`)}
  <div class="mhead">
    <div class="mtop"><span class="num">${num}</span><span class="script yr">2027</span></div>
    <h2 class="mname" style="font-size:${nameSize}pt">${esc(m.name)}</h2>
  </div>
  <p class="theme">${esc(m.theme)}</p>
  <p class="mctx">${esc(m.context)}</p>
  ${sec('Fashion weeks', 0, fw)}
  ${sec('Trade shows', 1, ts)}
  ${retailOnFirst ? sec('Retail moments', 3, rt) : ''}
  ${folio()}
</section>`);

  pageNo++;
  pages.push(`
<section class="page second${!retailOnFirst && rt.length + co.length >= 6 ? ' dense' : ''}" style="${qStyle(q)}">
  ${running(`${m.name} · continued`)}
  ${retailOnFirst ? '' : sec('Retail moments', 3, rt)}
  <div class="sec coll">
    ${stamp('Collections', 2)}
    <p class="ctit">${esc(m.collTitle)}</p>
    <p class="ctx">${esc(m.collText)}</p>
    ${co.length ? `<div class="rows">${eventRows(co)}</div>` : ''}
  </div>
  ${tipPanel(m.tip, 1)}
  ${folio()}
</section>`);
});

// QUARTERLY PLANNING TABLE
pageNo++;
specialPages.quarter = pageNo;
const K = C.checklist;
pages.push(`
<section class="page plan qplan" style="${tStyle(T.white)}">
  ${running('Quarterly planning')}
  <div class="stampwrap">${stamp('Quarterly planning', 3)}</div>
  <h2 class="h-mid">${esc(K.title)}</h2>
  <div class="two"><p>${esc(K.text)}</p></div>
  <div class="qtable">
    ${K.table
      .map(
        (r, i) => `<div class="qr" style="${tStyle([T.pink, T.black, T.pink, T.black][i])}">
        <div class="qa"><span class="q1">${esc(r[0])}</span><span class="q2">${esc(r[1])}</span></div>
        <div class="qb"><em>Run it by</em><b>${esc(r[2])}</b></div>
        <div class="qc"><em>Peaks to prepare</em><span>${esc(r[3])}</span></div>
        <div class="qd"><em>Quarter-specific checks</em><span>${esc(r[4])}</span></div></div>`
      )
      .join('')}
  </div>
  ${folio()}
</section>`);

// CHECKLIST
pageNo++;
specialPages.checklist = pageNo;
pages.push(`
<section class="page check" style="${tStyle(T.white)}">
  ${running('Quarterly planning checklist')}
  <div class="stampwrap">${stamp('Checklist', 1)}</div>
  <h2 class="h-mid">${esc(K.listTitle)}</h2>
  <p class="cintro">${esc(K.listText)}</p>
  <div class="grid">
    ${K.quarters
      .map(
        ([t, p, items], i) => `<div class="qcard" style="${tStyle([T.pink, T.black, T.black, T.pink][i])}">
        <div class="qh"><span class="qt">${esc(t)}</span><span class="qp">${esc(p)}</span></div>
        <ul>${items.map((it) => `<li><span class="box"></span><span>${esc(it)}</span></li>`).join('')}</ul>
      </div>`
      )
      .join('')}
  </div>
  <p class="closing">${esc(K.closing)}</p>
  ${folio()}
</section>`);

// NEXT STEP + CTA
pageNo++;
specialPages.next = pageNo;
const X = C.closing;
pages.push(`
<section class="page cta" style="${tStyle(T.pink)}">
  ${running('Sizebay')}
  <div class="cluster">
    <span class="stamp big" style="--r:-2deg;left:0;top:0;z-index:1">Right size</span>
    <span class="stamp big" style="--r:1.5deg;left:38mm;top:20mm;z-index:2">More conversion</span>
    <span class="stamp big" style="--r:-1deg;left:6mm;top:40mm;z-index:3">Fewer returns</span>
  </div>
  <div class="spacer"></div>
  <h2 class="h-huge">The dates bring the traffic. <span class="script">Confidence</span> closes the sale.</h2>
  <div class="ctabody">
    ${X.paragraphs.map((p) => `<p>${md(p)}</p>`).join('')}
  </div>
  <p class="kicker">${esc(X.kicker)}</p>
  <a class="btn" href="${esc(X.ctaUrl)}">${esc(X.cta)} →</a>
  <p class="loop">${esc(X.loop)}<br><b>${esc(X.social)}</b></p>
  ${folio()}
</section>`);

// BACK COVER
pageNo++;
pages.push(`
<section class="page back" style="${tStyle(T.black)}">
  <div class="stamps">
    <span class="stamp big" style="--r:-2deg">Fashion</span>
    <span class="stamp big" style="--r:1.5deg">E-commerce</span>
    <span class="stamp big" style="--r:-1deg">Experience</span>
  </div>
  <div class="spacer"></div>
  <div class="brand">${esc(C.back.brand)}</div>
  <p class="bt">${esc(C.back.text)}</p>
  <div class="links">${C.back.links.map(([n, u]) => `<a href="${esc(u)}">${esc(n)}</a>`).join('<span>·</span>')}</div>
</section>`);

// fill the contents page now that page numbers are known
{
  const rows = [
    ['How to use this calendar', specialPages.howto],
    ['2027 at a glance', specialPages.glance],
    ...C.months.map((m) => [m.name, monthPages[m.name]]),
    ['Quarterly planning checklist', specialPages.quarter],
    ['Your next step', specialPages.next],
  ];
  const pn = (n) => String(n).padStart(2, '0');
  pages[contentsIndex] = `
<section class="page contents" style="${tStyle(T.pink)}">
  <div class="band"><span>${NAME} · ${NAME} · ${NAME}</span></div>
  <div class="inner">
    ${running('Contents')}
    <div class="stampwrap">${stamp('Contents', 0)}</div>
    <h2 class="h-big">What's <span class="script">inside</span></h2>
    <div class="toc">
      ${rows.map(([n, p]) => `<div class="tr"><span class="tn">${esc(n)}</span><span class="tp">${pn(p)}</span></div>`).join('')}
    </div>
    <footer class="folio"><span>Sizebay</span><span>${pn(contentsPageNo)}</span></footer>
  </div>
</section>`;
}

// ---------- CSS ----------
const fontsCss = fs.readFileSync(path.join(__dirname, 'fonts/fonts.css'), 'utf8');
const css = `
${fontsCss}
@page { size: 210mm 297mm; margin: 0; }
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{background:#777;font-family:'Instrument Sans',sans-serif;color:#0B0B0B}
a{color:inherit;text-decoration:none}
.page{width:210mm;height:297mm;overflow:hidden;position:relative;display:flex;flex-direction:column;
  padding:13mm 14mm 16mm;background:var(--bg);color:var(--ink);break-after:page;page-break-after:always}
@media screen{.page{margin:8mm auto}}
.spacer{flex:1}
.script{font-family:'Pinyon Script',cursive;font-weight:400;letter-spacing:0}

/* topo / rodapé */
.run{display:flex;justify-content:space-between;font-size:8.5pt;font-weight:600;letter-spacing:.14em;text-transform:uppercase;margin-bottom:6mm}
.folio{position:absolute;left:14mm;right:14mm;bottom:8mm;display:flex;justify-content:space-between;font-size:8.5pt;font-weight:600;letter-spacing:.14em;text-transform:uppercase;opacity:.7}

/* carimbo (tag rosa com borda pontilhada) */
.stamp{display:inline-block;font-family:'Anton',sans-serif;text-transform:uppercase;font-size:15pt;line-height:1;letter-spacing:.01em;
  padding:1.6mm 4mm 1.4mm;background:var(--sbg);color:var(--sfg);border:.45mm dotted var(--sfg);transform:rotate(var(--r,-1.5deg));transform-origin:left center;position:relative}
.stamp.big{font-size:50pt;padding:2mm 5mm 1.6mm;letter-spacing:-.015em;position:absolute;white-space:nowrap;background:#FF9ACB;color:#0B0B0B;border-color:#0B0B0B}
.stampwrap{margin-bottom:4mm;padding-left:1mm}

/* linhas (eventos / datas) */
.sec{margin-top:5.5mm}
.sec>.stamp{margin-bottom:3mm;margin-left:1mm}
.rows{border-top:1.2mm solid #FF9ACB}
.row{display:grid;grid-template-columns:34mm 1fr auto;align-items:center;gap:3mm;padding:1.9mm 0;border-bottom:.3mm solid color-mix(in srgb,var(--ink) 35%,transparent)}
.row .d{font-family:'Anton',sans-serif;font-size:17pt;line-height:1;letter-spacing:.01em}
.row .d.sm{font-family:'Instrument Sans';font-size:8.5pt;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.75}
.row .d.dot span{display:inline-block;width:2.4mm;height:2.4mm;border-radius:50%;background:currentColor}
.row .n{display:block}
.row .n b{font-weight:600;font-size:14pt;line-height:1.2}
.row .n i{white-space:nowrap;font-family:'Instrument Serif',serif;font-size:14pt;line-height:1.2;opacity:.85}
.row.slim{padding:1.9mm 0}
.row.slim{grid-template-columns:34mm 1fr}
.row.slim .n b{font-weight:500;font-size:14pt}
.badge{font-size:8pt;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:1mm 2.4mm;border-radius:10mm;border:.35mm solid currentColor;white-space:nowrap}
.badge.ok{background:#FF9ACB;color:#0B0B0B;border-color:#FF9ACB}
.badge.an{border-style:dashed}

/* hero de mês */
.mhead{margin-top:2mm}
.mtop{display:flex;align-items:flex-end;gap:5mm;margin-bottom:2mm;position:relative;z-index:2}
.num{font-family:'Anton',sans-serif;font-size:30pt;line-height:1}
.yr{font-size:40pt;line-height:.9;color:var(--accent);transform:rotate(-5deg);display:inline-block;margin-bottom:-1mm}
.mname{font-family:'Instrument Serif',serif;font-weight:400;font-size:158pt;line-height:.9;letter-spacing:-.04em;margin-left:-2mm}
.coll{margin-top:0}
.ctit{font-family:'Instrument Serif',serif;font-style:italic;font-size:42pt;line-height:1;letter-spacing:-.02em;margin-bottom:5mm;max-width:175mm}
.ctx{font-size:15pt;line-height:1.45;max-width:165mm;font-weight:500}

/* painel da dica */
.tip{background:var(--bg);color:var(--ink);padding:9mm 10mm;margin-top:8mm;flex:1;display:flex;flex-direction:column;justify-content:center;gap:6mm;min-height:52mm}
.tip .stamp{align-self:flex-start}
.tip p{font-family:'Instrument Serif',serif;font-size:26pt;line-height:1.14;letter-spacing:-.005em}
.tip strong{font-weight:400;font-style:italic;color:var(--accent);background:none}
.second .tip{margin-bottom:6mm}


/* capa */
.cover{background:#0B0B0B;color:#FFFFFF}
.cover .cluster{position:relative;height:92mm;margin-top:10mm}
.ctitle{font-weight:400;display:flex;flex-direction:column;line-height:.9}
.ctitle .l1{font-family:'Instrument Serif',serif;font-size:104pt;letter-spacing:-.04em;margin-left:-1.5mm}
.ctitle .l2{display:flex;align-items:flex-end;gap:2mm;margin-top:-4mm;height:42mm}
.ctitle .l2 em{font-family:'Instrument Serif',serif;font-style:italic;font-size:34pt;margin-bottom:11mm}
.ctitle .l2 .script{font-size:150pt;color:#FF9ACB;line-height:.78;margin-left:2mm}
.ctitle .l3{font-family:'Anton',sans-serif;font-size:98pt;color:#FF9ACB;letter-spacing:.01em;line-height:.9;align-self:flex-end;margin-top:-14mm;margin-right:0}
.cbottom{margin-top:10mm;border-top:.3mm solid rgba(255,241,230,.4);padding-top:6mm;display:grid;grid-template-columns:1.1fr 1fr;gap:10mm;padding-bottom:6mm}
.csub{font-family:'Instrument Serif',serif;font-size:20pt;line-height:1.1}
.ctext{font-size:13pt;line-height:1.5;opacity:.85}

/* apresentação */
.intro{padding:0;flex-direction:row}
.intro .inner{flex:1;padding:13mm 12mm 12mm 14mm;display:flex;flex-direction:column;position:relative}
.intro .folio{left:14mm;right:12mm}
.intro .band{width:42mm;background:#0B0B0B;color:#FF9ACB;overflow:hidden;position:relative;flex:none}
.intro .band span{position:absolute;top:100%;left:0;white-space:nowrap;font-family:'Anton',sans-serif;font-size:36pt;text-transform:uppercase;letter-spacing:.01em;line-height:42mm;
  transform-origin:0 0;transform:rotate(-90deg);top:297mm;width:297mm;display:block}
.h-big{font-family:'Instrument Serif',serif;font-weight:400;font-size:52pt;line-height:.98;letter-spacing:-.03em;margin-bottom:10mm}
.h-big .script{font-size:60pt;color:#0B0B0B;letter-spacing:0}
.intro .body p{font-size:14pt;line-height:1.5;margin-bottom:4.5mm;max-width:122mm}
.intro .body p.lead{font-family:'Instrument Serif',serif;font-size:21pt;line-height:1.15;margin-bottom:5mm}

/* planejamento */
.h-mid{font-family:'Instrument Serif',serif;font-weight:400;font-size:27pt;line-height:1;letter-spacing:-.025em;margin-bottom:3.5mm;max-width:180mm}
.plan .two{margin-bottom:4mm}
.plan .two p{margin-bottom:2mm}
.plan .two p{font-size:13pt;line-height:1.45}
.ptable .ph,.ptable .pr{display:grid;grid-template-columns:36mm 54mm 1fr;gap:4mm;align-items:center}
.ptable .ph{font-size:8.5pt;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:0 5mm 2mm}
.ptable .pr{background:var(--bg);color:var(--ink);padding:2.2mm 5mm;margin-bottom:1mm}
.pp{font-family:'Anton',sans-serif;font-size:17pt;line-height:1;text-transform:uppercase}
.pm{font-family:'Instrument Serif',serif;font-size:16pt;line-height:1.08}
.pw{font-size:13pt;line-height:1.35;font-weight:500}
.special{margin-top:5mm;display:block}
.special h3{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;font-size:26pt;line-height:1;margin-bottom:1.5mm}
.special .sphead{margin-bottom:2.5mm}
.special .sphead p{font-size:13pt;line-height:1.45}
.special ul{list-style:none;border-top:.3mm solid rgba(11,11,11,.35)}
.special li{display:grid;grid-template-columns:42mm 1fr;gap:3mm;padding:1.3mm 0;border-bottom:.3mm solid rgba(11,11,11,.35);font-size:13pt;line-height:1.3}
.special li b{font-family:'Anton',sans-serif;font-weight:400;text-transform:uppercase;font-size:13pt;letter-spacing:.02em}
.note{background:#FF9ACB;padding:3.5mm 6mm;font-family:'Instrument Serif',serif;font-size:15pt;line-height:1.16;margin-top:4mm}
.note b{font-family:'Anton',sans-serif;font-weight:400;text-transform:uppercase;font-size:13pt;letter-spacing:.03em;margin-right:1mm}

/* checklist */
.cintro{font-size:13pt;margin-bottom:3mm;max-width:175mm}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:3mm;flex:1;margin-bottom:3mm}
.qcard{background:var(--bg);color:var(--ink);padding:4.5mm 5mm 4mm;display:flex;flex-direction:column}
.qh{margin-bottom:2.5mm;display:flex;flex-direction:column;gap:1mm}
.qt{font-family:'Anton',sans-serif;text-transform:uppercase;font-size:21pt;line-height:1}
.qp{font-family:'Instrument Serif',serif;font-style:italic;font-size:14pt;color:var(--accent)}
.qcard ul{list-style:none;display:flex;flex-direction:column;gap:1.7mm}
.qcard li{display:flex;gap:3mm;font-size:13pt;line-height:1.28;font-weight:500}
.qcard .box{flex:none;width:4mm;height:4mm;border:.45mm solid currentColor;margin-top:.3mm}
.closing{font-family:'Instrument Serif',serif;font-style:italic;font-size:14pt;line-height:1.15;max-width:180mm}

/* cta */
.h-huge{font-family:'Instrument Serif',serif;font-weight:400;font-size:46pt;line-height:.98;letter-spacing:-.03em;margin-bottom:9mm}
.h-huge .script{font-size:54pt;color:#0B0B0B;letter-spacing:0}
.cta .cluster{position:relative;height:66mm;margin-top:8mm}
.cta .cluster .stamp{background:#0B0B0B;color:#FF9ACB;border-color:#FF9ACB}
.ctabody{columns:2;column-gap:8mm;margin-bottom:9mm}
.ctabody p{font-size:13pt;line-height:1.5;margin-bottom:3.5mm;break-inside:avoid;opacity:.92}
.ctabody strong{color:#0B0B0B;background:#FFFFFF;padding:0 1mm}
.kicker{font-family:'Instrument Serif',serif;font-style:italic;font-size:22pt;line-height:1.1;margin-bottom:7mm;color:#0B0B0B}
.btn{align-self:flex-start;font-family:'Anton',sans-serif;text-transform:uppercase;font-size:16pt;letter-spacing:.04em;background:#0B0B0B;color:#FF9ACB;padding:3.4mm 8mm 3mm;border:.45mm dotted #FF9ACB;outline:.45mm solid #0B0B0B;outline-offset:1.2mm;margin-bottom:12mm;transform:rotate(-1deg)}

/* contracapa */
.back{background:#0B0B0B;color:#FF9ACB}
.back .stamps{position:relative;height:90mm;margin-top:6mm}
.back .stamps .stamp{background:#FF9ACB;color:#0B0B0B;border-color:#0B0B0B;position:absolute}
.back .stamps .stamp:nth-child(1){left:0;top:0}
.back .stamps .stamp:nth-child(2){left:36mm;top:26mm;z-index:2}
.back .stamps .stamp:nth-child(3){left:6mm;top:52mm;z-index:3}
.brand{font-family:'Instrument Serif',serif;font-size:120pt;line-height:.9;letter-spacing:-.045em;margin-left:-2mm}
.bt{font-family:'Instrument Serif',serif;font-style:italic;font-size:20pt;line-height:1.1;margin:4mm 0 8mm;max-width:130mm}
.links{display:flex;gap:4mm;align-items:center;font-size:10pt;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding-bottom:6mm}
.links a{border-bottom:.35mm solid #FF9ACB}

/* --- EN edition additions --- */
.row{grid-template-columns:36mm 1fr auto;align-items:start}
.row .d{font-size:15pt;padding-top:.6mm}
.row .d small{display:block;font-family:'Instrument Sans';font-size:7.5pt;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.7;margin-top:.8mm}
.row .d.sm{font-size:8pt;padding-top:1.2mm}
.row .n b{font-size:12.5pt}
.row .n i{white-space:normal;font-size:12.5pt}
.row .n .why{display:block;font-size:9.5pt;line-height:1.3;font-weight:500;opacity:.8;margin-top:.6mm}
.row .badge{margin-top:.8mm}
.badge.pr{background:transparent}
.sec{margin-top:4.5mm}
.mhead{margin-top:0}
.theme{font-family:'Instrument Serif',serif;font-style:italic;font-size:21pt;line-height:1.05;margin:1mm 0 2.5mm;color:var(--accent)}
.mctx{font-size:10.5pt;line-height:1.42;font-weight:500;max-width:172mm}
.second .sec:first-of-type{margin-top:0}
.second .coll .ctit{margin-top:3mm;font-size:34pt}
.second .coll .ctx{margin-bottom:4mm;font-size:13pt}
.tip p{font-size:24pt}
.coll .rows{margin-top:2mm}
.howto .hread{font-size:11.5pt;line-height:1.4;margin:3mm 0 2mm}
.howto .special li{grid-template-columns:62mm 1fr;font-size:11.5pt;line-height:1.35}
.howto .special li b{font-size:12pt}
.howto .pr .pm,.howto .pr .pw{font-size:12.5pt}
.howto .pp{font-size:14pt}
.howto .ptable .ph,.howto .ptable .pr{grid-template-columns:40mm 62mm 1fr}
/* glance */
.gtext{font-size:12.5pt;line-height:1.45;max-width:172mm;margin-bottom:6mm}
.gcap{font-size:8.5pt;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:2.5mm;color:#FF9ACB}
.gridmap{display:grid;grid-template-columns:26mm repeat(12,1fr);gap:1mm}
.gc{height:15mm;display:flex;align-items:center;justify-content:center;font-family:'Anton',sans-serif;font-size:16pt}
.gc.gh{height:7mm;font-family:'Instrument Sans';font-size:8pt;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.gc.gl{justify-content:flex-start;font-family:'Anton',sans-serif;text-transform:uppercase;font-size:11.5pt;letter-spacing:.02em;line-height:1.05}
.gc.l0{border:.3mm solid rgba(255,255,255,.25)}
.gc.l1{background:#FFD3E9;color:#0B0B0B}
.gc.l2{background:#FF9ACB;color:#0B0B0B}
.gc.l3{background:#FFFFFF;color:#0B0B0B}
.gkey{display:flex;align-items:center;gap:2mm;margin-top:3mm;font-size:8pt;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.85}
.gkey span{margin-right:2mm}
.gkey .k{display:inline-block;width:5mm;height:5mm;margin-left:2mm}
.gkey .k.l1{background:#FFD3E9}.gkey .k.l2{background:#FF9ACB}.gkey .k.l3{background:#FFFFFF}
.reads h3{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;font-size:24pt;margin-bottom:3mm}
.rcards{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm;margin-bottom:6mm}
.rc{background:var(--bg);color:var(--ink);padding:5mm;display:flex;flex-direction:column;gap:2mm;min-height:38mm;justify-content:space-between}
.rc b{font-family:'Anton',sans-serif;font-weight:400;text-transform:uppercase;font-size:15pt;line-height:1.05}
.rc span{font-family:'Instrument Serif',serif;font-size:17pt;line-height:1.05}
/* contents */
.contents{padding:0;flex-direction:row}
.contents .inner{flex:1;padding:13mm 12mm 12mm 14mm;display:flex;flex-direction:column;position:relative}
.contents .folio{left:14mm;right:12mm}
.contents .band{width:42mm;background:#0B0B0B;color:#FF9ACB;overflow:hidden;position:relative;flex:none}
.contents .band span{position:absolute;white-space:nowrap;font-family:'Anton',sans-serif;font-size:36pt;text-transform:uppercase;letter-spacing:.01em;line-height:42mm;transform-origin:0 0;transform:rotate(-90deg);top:297mm;width:297mm;display:block}
.contents .h-big{margin-bottom:8mm}
.toc{border-top:1.2mm solid #0B0B0B}
.tr{display:flex;justify-content:space-between;align-items:baseline;padding:2.1mm 0;border-bottom:.3mm solid rgba(11,11,11,.4)}
.tn{font-family:'Instrument Serif',serif;font-size:19pt;line-height:1.1}
.tp{font-family:'Anton',sans-serif;font-size:15pt}
/* quarter table */
.qtable{display:flex;flex-direction:column;gap:2mm;margin-top:4mm;flex:1;margin-bottom:6mm}
.qr{background:var(--bg);color:var(--ink);padding:5mm 5mm;display:grid;grid-template-columns:20mm 1fr;gap:3mm 5mm;flex:1;align-content:center}
.qa{grid-row:1 / span 3;display:flex;flex-direction:column}
.q1{font-family:'Anton',sans-serif;font-size:32pt;line-height:1}
.q2{font-family:'Instrument Serif',serif;font-style:italic;font-size:13pt;color:var(--accent)}
.qb,.qc,.qd{display:grid;grid-template-columns:38mm 1fr;gap:3mm;font-size:11pt;line-height:1.3;align-items:baseline}
.qr em{font-style:normal;font-size:7.5pt;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.75}
.qb b{font-family:'Anton',sans-serif;font-weight:400;text-transform:uppercase;font-size:14pt}
.qc span,.qd span{font-weight:500}
.qplan .two p{font-size:12.5pt}
/* cta extras */
.ctabody p{font-size:11.5pt;line-height:1.45}
.loop{font-size:10pt;line-height:1.45;margin-bottom:12mm;max-width:150mm}
.loop b{letter-spacing:.06em}
.btn{margin-bottom:8mm}
.cta .cluster{height:62mm}
.h-huge{font-size:40pt}
.h-huge .script{font-size:48pt}
.cover .ctitle .l2 .script{font-size:76pt;line-height:.9;margin-bottom:-1mm}
.cover .ctitle .l3{margin-top:-4mm}
.mname{padding-bottom:2.5mm}
.theme{color:var(--ink)}
.second.dense .tip p{font-size:18pt}
.second.dense .tip{min-height:0;padding:7mm 9mm;gap:4mm}
.second.dense .coll .ctit{font-size:28pt}
.howto .two p{font-size:12pt;line-height:1.4}
.howto .ptable .pr{padding:1.6mm 5mm}
.howto .special li{padding:1mm 0}
.howto .special{margin-top:3mm}
.howto .note{margin-top:2mm;font-size:13pt}
`;

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>The 2027 Fashion Retail Calendar — Sizebay</title>
<style>${css}</style></head>
<body>${pages.join('\n')}</body></html>`;

fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
const htmlPath = path.join(__dirname, 'dist/fashion-retail-calendar-2027.html');
fs.writeFileSync(htmlPath, html);

(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 1 });
  await page.goto('file://' + htmlPath);
  await page.evaluate(() => document.fonts.ready);

  // checagem de estouro: nenhum conteúdo pode ultrapassar a página
  const report = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.page').forEach((p, i) => {
      const pr = p.getBoundingClientRect();
      let bad = 0;
      p.querySelectorAll('*').forEach((el) => {
        if (el.closest('.band') || el.closest('.cluster') || el.closest('.stamps')) return;
        const r = el.getBoundingClientRect();
        if (r.width && (r.bottom > pr.bottom + 1 || r.right > pr.right + 1)) bad++;
      });
      const folio = p.querySelector('.folio');
      let overlap = false;
      if (folio) {
        const f = folio.getBoundingClientRect();
        p.querySelectorAll('.tip,.rows,.sec,.qcard,.note,.btn,.closing,.coll,.body').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom > f.top + 2) overlap = true;
        });
      }
      if (bad || overlap || p.scrollHeight > p.clientHeight + 1) out.push({ page: i + 1, bad, overlap, sh: p.scrollHeight, ch: p.clientHeight });
    });
    return out;
  });
  console.log('Páginas:', pages.length);
  console.log('Estouros:', JSON.stringify(report));

  await page.pdf({ path: path.join(__dirname, 'dist/fashion-retail-calendar-2027.pdf'), width: '210mm', height: '297mm', printBackground: true, preferCSSPageSize: true });

  const si = process.argv.indexOf('--shots');
  if (si > -1) {
    const dir = process.argv[si + 1];
    fs.mkdirSync(dir, { recursive: true });
    const els = await page.$$('.page');
    for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: path.join(dir, `p${String(i + 1).padStart(2, '0')}.png`) });
  }
  await browser.close();
})();
