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

  // A) Hero-left CategoryMenu (the "all categories" sidebar = screenshot 2)
  const heroSidebar = await page.$('section .mm-wrap .mm-l1');
  if (heroSidebar) {
    await heroSidebar.screenshot({ path: '/work/scripts/gen-out/menu-A-hero-sidebar.png' });
    console.log('A hero sidebar shot OK');
  } else {
    console.log('A NOT FOUND');
  }

  // B) Main navbar mega-menu "TẤT CẢ DANH MỤC" — hover to open, shoot the dropdown
  const navRoot = await page.$('nav .mm-root');
  if (navRoot) {
    await navRoot.hover();
    await new Promise((r) => setTimeout(r, 800));
    const wrap = await page.$('nav .mm-root .mm-wrap');
    if (wrap) {
      await wrap.screenshot({ path: '/work/scripts/gen-out/menu-B-navbar-mega.png' });
      console.log('B navbar mega shot OK');
    } else console.log('B wrap NOT FOUND');
    // also just the left sidebar of the main menu for a clean compare
    const navL1 = await page.$('nav .mm-root .mm-wrap .mm-l1');
    if (navL1) {
      await navL1.screenshot({ path: '/work/scripts/gen-out/menu-B-navbar-l1.png' });
      console.log('B navbar l1 shot OK');
    }
  } else {
    console.log('B navRoot NOT FOUND');
  }
  await browser.close();
})();
