// Renderiza logo/logos.html em PNG (folha + um PNG por opção)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1960, height: 1400 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(__dirname, 'logos.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  fs.mkdirSync(path.join(__dirname, 'png'), { recursive: true });
  await p.screenshot({ path: path.join(__dirname, 'png/folha-logos.png'), fullPage: true });
  const cards = await p.$$('.card');
  for (let i = 0; i < cards.length; i++) {
    await cards[i].screenshot({ path: path.join(__dirname, `png/logo-0${i + 1}.png`) });
  }
  await b.close();
})();
