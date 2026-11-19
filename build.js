// Gera dist/calendario-moda-2027.html e .pdf a partir de content.js
// Uso: node build.js            (HTML + PDF)
//      node build.js --shots DIR (também salva PNG de cada página para conferência)
const fs = require('fs');
const path = require('path');
const C = require('./content.js');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

// ---------- identidade ----------
// Paleta: só preto, branco e rosa.
// Páginas de calendário (dados) = fundo branco ou preto, com o rosa só nos detalhes.
// Fundo rosa/preto cheio fica para capa, respiros e blocos de destaque (dica, CTA, contracapa).
const T = {
  white: { bg: '#FFFFFF', ink: '#0B0B0B', accent: '#FF9ACB', sbg: '#FF9ACB', sfg: '#0B0B0B' },
  black: { bg: '#0B0B0B', ink: '#FFFFFF', accent: '#FF9ACB', sbg: '#FF9ACB', sfg: '#0B0B0B' },
  pink: { bg: '#FF9ACB', ink: '#0B0B0B', accent: '#0B0B0B', sbg: '#0B0B0B', sfg: '#FF9ACB' },
};
// Trimestres alternam branco / preto (ritmo de leitura)
const Q = [T.white, T.black, T.white, T.black];
const tStyle = (t) => `--bg:${t.bg};--ink:${t.ink};--accent:${t.accent};--sbg:${t.sbg};--sfg:${t.sfg}`;

const STATUS = { C: ['Confirmado', 'ok'], P: ['Previsto', 'pr'], A: ['A anunciar', 'an'] };
const ROT = [-1.6, 1.1, -0.7, 1.5];

const MONTHS_RE = /^(Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro)$/;

const fmtDate = (raw) => {
  if (MONTHS_RE.test(raw)) return { t: 'No mês', small: true };
  return { t: raw.replace(' a ', '–'), small: false };
};

let pageNo = 0;
const folio = () => `<footer class="folio"><span>Sizebay</span><span>${String(pageNo).padStart(2, '0')}</span></footer>`;
const running = (right) => `<header class="run"><span>Calendário de moda 2027</span><span>${right}</span></header>`;

const stamp = (text, i = 0, extra = '') =>
  `<span class="stamp" style="--r:${ROT[i % 4]}deg">${esc(text)}</span>${extra}`;

const badge = (st, url) => {
  const [label, cls] = STATUS[st];
  return `<a class="badge ${cls}" href="${esc(url)}">${label}</a>`;
};

const eventRows = (list) =>
  list
    .map(([d, n, s, st, u]) => {
      const dt = fmtDate(d);
      return `<div class="row">
        <div class="d ${dt.small ? 'sm' : ''}">${esc(dt.t)}</div>
        <div class="n"><b>${esc(n)}${s ? ' ·' : ''}</b>${s ? ` <i>${esc(s)}</i>` : ''}</div>
        ${badge(st, u)}
      </div>`;
    })
    .join('');

const dateRows = (list) =>
  list
    .map((raw) => {
      const m = raw.match(/^(\d{2}(?: e \d{2})?\/\d{2}|Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro) — (.*)$/);
      if (m) {
        const dt = fmtDate(m[1]);
        return `<div class="row slim"><div class="d ${dt.small ? 'sm' : ''}">${esc(dt.t)}</div><div class="n"><b>${esc(m[2])}</b></div></div>`;
      }
      return `<div class="row slim"><div class="d dot"><span></span></div><div class="n"><b>${esc(raw)}</b></div></div>`;
    })
    .join('');

const tipPanel = (tip, q, i) =>
  `<div class="tip" style="${tStyle(T.pink)}">
     ${stamp('Dica para o e-commerce', i)}
     <p>${md(tip)}</p>
   </div>`;

const qStyle = (q) => tStyle(Q[q]);

// ---------- páginas ----------
const pages = [];

// CAPA
pageNo++;
pages.push(`
<section class="page cover">
  <header class="run"><span>Sizebay</span><span>E-book · Edição 2027</span></header>
  <div class="cluster">
    <span class="stamp big" style="--r:-2.2deg;left:0;top:0;z-index:1">Planejamento</span>
    <span class="stamp big" style="--r:1.6deg;left:62mm;top:20mm;z-index:2">Tendências</span>
    <span class="stamp big" style="--r:-1.1deg;left:6mm;top:42mm;z-index:3">Coleções</span>
    <span class="stamp big" style="--r:2.1deg;left:52mm;top:63mm;z-index:4">Campanhas</span>
  </div>
  <div class="spacer"></div>
  <h1 class="ctitle">
    <span class="l1">Calendário</span>
    <span class="l2"><em>de</em><span class="script">Moda</span></span>
    <span class="l3">2027</span>
  </h1>
  <div class="cbottom">
    <p class="csub">${esc(C.cover.subtitle)}</p>
    <p class="ctext">${esc(C.cover.text)}</p>
  </div>
</section>`);

// APRESENTAÇÃO
pageNo++;
pages.push(`
<section class="page intro" style="${tStyle(T.pink)}">
  <div class="band"><span>Calendário de moda 2027 · Calendário de moda 2027 · Calendário de moda 2027</span></div>
  <div class="inner">
    ${running('Apresentação')}
    <div class="stampwrap">${stamp('Apresentação', 0)}</div>
    <h2 class="h-big">Um ano inteiro de <span class="script">oportunidades</span> começa com planejamento.</h2>
    <div class="body">
      ${C.intro.paragraphs.map((p, i) => `<p class="${i === 1 || i === 4 ? 'lead' : ''}">${esc(p)}</p>`).join('')}
    </div>
    ${folio()}
  </div>
</section>`);

// MESES — página 1: semanas de moda, feiras e eventos, datas comerciais
//         página 2: coleções + dica para o e-commerce
C.months.forEach((m, i) => {
  const q = Math.floor(i / 3);
  const num = String(i + 1).padStart(2, '0');
  const rowsCount = m.weeks.length + m.fairs.length + m.dates.length;
  // o nome do mês cresce quando há pouco conteúdo na página
  const nameSize = rowsCount >= 13 ? 92 : rowsCount >= 11 ? 100 : rowsCount >= 9 ? 126 : 156;

  const sec = (label, k, rows) =>
    `<div class="sec">${stamp(label, k)}<div class="rows">${rows}</div></div>`;

  pageNo++;
  pages.push(`
<section class="page hero" style="${qStyle(q)}">
  ${running(`${num} / 12`)}
  <div class="mhead">
    <div class="mtop"><span class="num">${num}</span><span class="script yr">2027</span></div>
    <h2 class="mname" style="font-size:${nameSize}pt">${esc(m.name)}</h2>
  </div>
  ${m.weeks.length ? sec('Semanas de moda', 0, eventRows(m.weeks)) : ''}
  ${m.fairs.length ? sec('Feiras e eventos', 1, eventRows(m.fairs)) : ''}
  ${sec('Datas comerciais', 3, dateRows(m.dates))}
  ${folio()}
</section>`);

  pageNo++;
  pages.push(`
<section class="page second" style="${qStyle(q)}">
  ${running(`${m.name} · continuação`)}
  <div class="sec coll">
    ${stamp('Coleções', 2)}
    <p class="ctit">${esc(m.collection[0])}</p>
    <p class="ctx">${esc(m.collection[1])}</p>
  </div>
  ${tipPanel(m.tip, q, 1)}
  ${folio()}
</section>`);
});

// PLANEJAMENTO DE COLEÇÕES
pageNo++;
pages.push(`
<section class="page plan" style="${tStyle(T.white)}">
  ${running('Planejamento de coleções')}
  <h2 class="h-mid">${esc(C.planning.title)}</h2>
  <div class="two">${C.planning.text.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
  <div class="ptable">
    <div class="ph"><span>Período</span><span>Movimento da indústria</span><span>O que planejar</span></div>
    ${C.planning.table
      .map(
        (r, i) => `<div class="pr" style="${tStyle([T.pink, T.black, T.pink, T.black][i])}">
        <div class="pp">${esc(r[0])}</div><div class="pm">${esc(r[1])}</div><div class="pw">${esc(r[2])}</div></div>`
      )
      .join('')}
  </div>
  <div class="special">
    <div class="sphead">
      <h3>${esc(C.planning.specialTitle)}</h3>
      <p>${esc(C.planning.specialIntro)}</p>
    </div>
    <ul>${C.planning.special.map(([a, b]) => `<li><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join('')}</ul>
  </div>
  <div class="spacer"></div>
  <div class="note"><b>Dica:</b> ${esc(C.planning.tip)}</div>
  ${folio()}
</section>`);

// CHECKLIST
pageNo++;
pages.push(`
<section class="page check" style="${tStyle(T.white)}">
  ${running('Checklist de planejamento trimestral')}
  <div class="stampwrap">${stamp('Checklist', 1)}</div>
  <h2 class="h-mid">${esc(C.checklist.title)}</h2>
  <p class="cintro">${esc(C.checklist.text)}</p>
  <div class="grid">
    ${C.checklist.quarters
      .map(
        ([t, p, items], i) => `<div class="qcard" style="${tStyle([T.pink, T.black, T.black, T.pink][i])}">
        <div class="qh"><span class="qt">${esc(t)}</span><span class="qp">${esc(p)}</span></div>
        <ul>${items.map((it) => `<li><span class="box"></span><span>${esc(it)}</span></li>`).join('')}</ul>
      </div>`
      )
      .join('')}
  </div>
  <p class="closing">${esc(C.checklist.closing)}</p>
  ${folio()}
</section>`);

// FECHAMENTO + CTA
pageNo++;
pages.push(`
<section class="page cta" style="${tStyle(T.pink)}">
  ${running('Sizebay')}
  <div class="cluster">
    <span class="stamp big" style="--r:-2deg;left:0;top:0;z-index:1">Tamanho certo</span>
    <span class="stamp big" style="--r:1.5deg;left:38mm;top:20mm;z-index:2">Mais conversão</span>
    <span class="stamp big" style="--r:-1deg;left:6mm;top:40mm;z-index:3">Menos trocas</span>
  </div>
  <div class="spacer"></div>
  <h2 class="h-huge">Um ano de <span class="script">oportunidades.</span> Uma boa estratégia faz toda a diferença.</h2>
  <div class="ctabody">
    ${C.closing.paragraphs.map((p) => `<p>${md(p)}</p>`).join('')}
  </div>
  <p class="kicker">${esc(C.closing.kicker)}</p>
  <a class="btn" href="${esc(C.closing.ctaUrl)}">${esc(C.closing.cta)} →</a>
  ${folio()}
</section>`);

// CONTRACAPA
pageNo++;
pages.push(`
<section class="page back" style="${tStyle(T.black)}">
  <div class="stamps">
    <span class="stamp big" style="--r:-2deg">Moda</span>
    <span class="stamp big" style="--r:1.5deg">E-commerce</span>
    <span class="stamp big" style="--r:-1deg">Experiência</span>
  </div>
  <div class="spacer"></div>
  <div class="brand">${esc(C.back.brand)}</div>
  <p class="bt">${esc(C.back.text)}</p>
  <div class="links">${C.back.links.map(([n, u]) => `<a href="${esc(u)}">${esc(n)}</a>`).join('<span>·</span>')}</div>
</section>`);

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
`;

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<title>Calendário de moda 2027 — Sizebay</title>
<style>${css}</style></head>
<body>${pages.join('\n')}</body></html>`;

fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
const htmlPath = path.join(__dirname, 'dist/calendario-moda-2027.html');
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

  await page.pdf({ path: path.join(__dirname, 'dist/calendario-moda-2027.pdf'), width: '210mm', height: '297mm', printBackground: true, preferCSSPageSize: true });

  const si = process.argv.indexOf('--shots');
  if (si > -1) {
    const dir = process.argv[si + 1];
    fs.mkdirSync(dir, { recursive: true });
    const els = await page.$$('.page');
    for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: path.join(dir, `p${String(i + 1).padStart(2, '0')}.png`) });
  }
  await browser.close();
})();
