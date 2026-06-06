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

  // Find the navbar's mm-root trigger (inside <nav>, on-screen, near the top)
  const box = await page.evaluate(() => {
    const roots = [...document.querySelectorAll('nav .mm-root')];
    for (const r of roots) {
      const b = r.getBoundingClientRect();
      if (b.width > 0 && b.height > 0 && b.top >= 0 && b.top < 700) {
        return { x: b.x, y: b.y, w: b.width, h: b.height };
      }
    }
    return null;
  });
  if (!box) { console.log('navbar mm-root box NOT FOUND'); await browser.close(); return; }
  console.log('navbar trigger box', JSON.stringify(box));
  // move mouse onto the trigger to fire :hover
  await page.mouse.move(box.x + box.w / 2, box.y + box.h / 2);
  await new Promise((r) => setTimeout(r, 900));
  // screenshot the now-visible mm-wrap dropdown of the navbar instance
  const shot = await page.evaluate(() => {
    const roots = [...document.querySelectorAll('nav .mm-root')];
    for (const r of roots) {
      const b = r.getBoundingClientRect();
      if (b.width > 0 && b.top >= 0 && b.top < 700) {
        const wrap = r.querySelector('.mm-wrap');
        if (wrap) {
          const wb = wrap.getBoundingClientRect();
          return { x: wb.x, y: wb.y, w: wb.width, h: wb.height };
        }
      }
    }
    return null;
  });
  if (!shot) { console.log('mm-wrap box NOT FOUND'); await browser.close(); return; }
  console.log('mm-wrap box', JSON.stringify(shot));
  await page.screenshot({
    path: '/work/scripts/gen-out/menu-B-navbar-mega.png',
    clip: { x: Math.max(0, shot.x), y: Math.max(0, shot.y), width: Math.min(shot.w, 1440 - shot.x), height: Math.min(shot.h, 900 - shot.y) },
  });
  console.log('B navbar mega shot OK');
  await browser.close();
})();
