// Gera logo/dist/logos-figma.html: logos.html autocontido (fontes em base64), pronto para html_to_figma.
const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'logos.html'), 'utf8');
let css = fs.readFileSync(path.join(__dirname, 'fonts.css'), 'utf8');
css = css.replace(/url\('fonts\/([^']+)'\)/g, (_, f) =>
  `url('data:font/ttf;base64,${fs.readFileSync(path.join(__dirname, 'fonts', f)).toString('base64')}')`);
html = html.replace("@import url('fonts.css');", css);
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist/logos-figma.html'), html);
console.log('ok', (html.length / 1e6).toFixed(2) + ' MB');
