const puppeteer = require('puppeteer');
const OUT = '/work/scripts/gen-out/';
(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--host-resolver-rules=MAP shop.huayuesc.local:80 192.168.40.3:18080',
    ],
  });
  const page = await browser.newPage();
  const msgs = [];
  page.on('console', (m) => {
    const t = m.type();
    if (t === 'error' || t === 'warning' || t === 'warn') msgs.push(`[${t}] ${m.text()}`);
  });
  page.on('pageerror', (e) => msgs.push(`[pageerror] ${e.message}`));

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://shop.huayuesc.local/', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 3000));

  const sec = await page.evaluate(() => {
    const b = document.querySelector('section').getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  });

  // 1) DEFAULT (no hover) — move mouse far away first, panel must be hidden
  await page.mouse.move(1430, 5);
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: OUT + 'v1-hero-default.png',
    clip: { x: sec.x, y: sec.y, width: Math.min(sec.w, 1440 - sec.x), height: Math.min(sec.h, 900 - sec.y) },
  });

  // 2) DEEP sub hover (>16) to prove the extended CSS panels work
  const deep = await page.evaluate(() => {
    const subs = [...document.querySelectorAll('section .mm-wrap .mm-l1 .mm-sub')];
    const el = subs[39] || subs[subs.length - 1]; // ~40th sub
    el.scrollIntoView({ block: 'center' });
    const b = el.getBoundingClientRect();
    const cls = [...el.classList].find((c) => /^mm-sub-\d+$/.test(c));
    return { name: el.textContent.trim(), cls, box: { x: b.x, y: b.y, w: b.width, h: b.height } };
  });
  await page.mouse.move(deep.box.x + deep.box.w / 2, deep.box.y + deep.box.h / 2);
  await new Promise((r) => setTimeout(r, 700));
  // which panel is visible?
  const visiblePanel = await page.evaluate(() => {
    const panels = [...document.querySelectorAll('section .mm-wrap .mm-sub-panel')];
    const vis = panels.filter((p) => getComputedStyle(p).display !== 'none');
    return vis.map((p) => [...p.classList].find((c) => /^mm-sub-panel-\d+$/.test(c)));
  });
  await page.screenshot({
    path: OUT + 'v2-hero-deep-hover.png',
    clip: { x: sec.x, y: sec.y, width: Math.min(sec.w, 1440 - sec.x), height: Math.min(sec.h, 900 - sec.y) },
  });

  // 3) regression: navbar mega-menu still opens
  await page.mouse.move(1430, 5);
  await new Promise((r) => setTimeout(r, 300));
  const navBox = await page.evaluate(() => {
    const roots = [...document.querySelectorAll('nav .mm-root')];
    for (const r of roots) {
      const b = r.getBoundingClientRect();
      if (b.width > 0 && b.top >= 0 && b.top < 700) return { x: b.x, y: b.y, w: b.width, h: b.height };
    }
    return null;
  });
  if (navBox) {
    await page.mouse.move(navBox.x + navBox.w / 2, navBox.y + navBox.h / 2);
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: OUT + 'v3-navbar-still-works.png', clip: { x: 0, y: navBox.y, width: 1200, height: Math.min(820, 900 - navBox.y) } });
  }

  // console summary
  const keyish = msgs.filter((m) => /key|hydrat/i.test(m));
  const fs = require('fs');
  fs.writeFileSync(OUT + 'v-console.txt',
    `TOTAL err/warn: ${msgs.length}\nKEY/HYDRATION: ${keyish.length}\n` +
    keyish.join('\n') + '\n--- deep hover ---\nhovered: ' + deep.name + ' (' + deep.cls + ')\nvisible panels: ' + JSON.stringify(visiblePanel) + '\n');
  console.log('DONE. console total', msgs.length, 'keyish', keyish.length);
  console.log('deep hover', deep.name, deep.cls, '-> visible panel', JSON.stringify(visiblePanel));

  // 4) tablet width — hero category column must be hidden (max-xl:hidden)
  await page.setViewport({ width: 1100, height: 800 });
  await page.goto('http://shop.huayuesc.local/', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  const heroColHidden = await page.evaluate(() => {
    const col = document.querySelector('section .mm-wrap');
    if (!col) return 'no mm-wrap';
    // its containing grid cell has max-xl:hidden
    const cell = col.closest('div[style]');
    return cell ? getComputedStyle(cell).display : 'unknown';
  });
  console.log('tablet(1100) hero category cell display =', heroColHidden);
  await browser.close();
})();
