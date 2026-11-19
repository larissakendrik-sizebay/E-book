// Gera dist/figma.html: o mesmo e-book, autocontido (fontes em base64) e sem margens de tela
// (A4 nativo 794x1123 px; no Figma os frames são escalados 1.5x), pronto para ser enviado ao Figma via html_to_figma.
const fs = require('fs'), path = require('path');
let html = fs.readFileSync(path.join(__dirname, 'dist/calendario-moda-2027.html'), 'utf8');
html = html.replace(/url\('\.\.\/fonts\/([^']+)'\)/g, (_, f) =>
  `url('data:font/ttf;base64,${fs.readFileSync(path.join(__dirname, 'fonts', f)).toString('base64')}')`);
html = html.replace('</style>', '@media screen{.page{margin:0 !important}} body{background:#fff;margin:0}</style>');
fs.writeFileSync(path.join(__dirname, 'dist/figma.html'), html);
console.log('ok', (html.length / 1e6).toFixed(2) + ' MB');
