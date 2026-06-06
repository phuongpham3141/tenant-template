const puppeteer = require('puppeteer');
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

  // locate hero banner section bounding box
  const sec = await page.evaluate(() => {
    const s = document.querySelector('section');
    const b = s.getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  });

  // 1) sidebar alone (no hover) — clip the left column
  await page.screenshot({
    path: '/work/scripts/gen-out/hero-sidebar-new.png',
    clip: { x: Math.max(0, sec.x), y: Math.max(0, sec.y), width: 260, height: Math.min(sec.h, 900 - sec.y) },
  });
  console.log('sidebar-new shot OK');

  // 2) hover a mid-list hero sub-item to reveal its SubItemPanel, then
  //    screenshot the full hero row (sidebar + overlaying panel)
  const subBox = await page.evaluate(() => {
    const subs = [...document.querySelectorAll('section .mm-wrap .mm-l1 .mm-sub')];
    if (subs.length < 12) return { count: subs.length, box: null };
    const el = subs[11]; // 12th hero sub-item
    const b = el.getBoundingClientRect();
    return { count: subs.length, name: el.textContent.trim(), box: { x: b.x, y: b.y, w: b.width, h: b.height } };
  });
  console.log('hero mm-sub count =', subBox.count, '| hovering:', subBox.name);
  if (subBox.box) {
    await page.mouse.move(subBox.box.x + subBox.box.w / 2, subBox.box.y + subBox.box.h / 2);
    await new Promise((r) => setTimeout(r, 700));
  }
  await page.screenshot({
    path: '/work/scripts/gen-out/hero-hover-panel.png',
    clip: { x: Math.max(0, sec.x), y: Math.max(0, sec.y), width: Math.min(sec.w, 1440 - sec.x), height: Math.min(sec.h, 900 - sec.y) },
  });
  console.log('hover-panel shot OK');
  await browser.close();
})();
