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
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://shop.huayuesc.local/', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));

  const sec = await page.evaluate(() => {
    const b = document.querySelector('section').getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  });

  // count hero sidebar items (should be 8 mains, NO sub-items)
  const heroCounts = await page.evaluate(() => ({
    cats: document.querySelectorAll('section .mm-wrap .mm-l1 .mm-cat').length,
    subs: document.querySelectorAll('section .mm-wrap .mm-l1 .mm-sub').length,
  }));
  console.log('HERO sidebar -> mm-cat:', heroCounts.cats, '| mm-sub:', heroCounts.subs);

  // 1) hero default (no hover)
  await page.mouse.move(1430, 5);
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: OUT + 'c1-hero-default.png', clip: { x: sec.x, y: sec.y, width: Math.min(sec.w, 1440 - sec.x), height: Math.min(sec.h, 900 - sec.y) } });

  // 2) hover a hero main category -> overview panel overlays hero
  const catBox = await page.evaluate(() => {
    const el = document.querySelectorAll('section .mm-wrap .mm-l1 .mm-cat')[2]; // 3rd main
    const b = el.getBoundingClientRect();
    return { name: el.textContent.trim(), box: { x: b.x, y: b.y, w: b.width, h: b.height } };
  });
  await page.mouse.move(catBox.box.x + catBox.box.w / 2, catBox.box.y + catBox.box.h / 2);
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: OUT + 'c2-hero-hover.png', clip: { x: sec.x, y: sec.y, width: Math.min(sec.w, 1440 - sec.x), height: Math.min(sec.h, 900 - sec.y) } });
  console.log('hero hover main =', catBox.name);

  // 3) navbar "TẤT CẢ DANH MỤC" dropdown — hover to open
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
    const navCounts = await page.evaluate(() => {
      const roots = [...document.querySelectorAll('nav .mm-root')];
      for (const r of roots) {
        const b = r.getBoundingClientRect();
        if (b.width > 0 && b.top >= 0 && b.top < 700) {
          return {
            cats: r.querySelectorAll('.mm-l1 .mm-cat').length,
            subs: r.querySelectorAll('.mm-l1 .mm-sub').length,
          };
        }
      }
      return null;
    });
    console.log('NAVBAR dropdown -> mm-cat:', navCounts.cats, '| mm-sub:', navCounts.subs);
    await page.screenshot({ path: OUT + 'c3-navbar-dropdown.png', clip: { x: 0, y: navBox.y, width: 1200, height: Math.min(640, 900 - navBox.y) } });
  } else {
    console.log('navbar mm-root NOT FOUND');
  }
  await browser.close();
})();
