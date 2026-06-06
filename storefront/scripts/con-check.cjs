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
  await page.setViewport({ width: 1366, height: 900 });
  const msgs = [];
  page.on('console', (m) => {
    const t = m.type();
    if (t === 'error' || t === 'warning' || t === 'warn') msgs.push(`[${t}] ${m.text()}`);
  });
  page.on('pageerror', (e) => msgs.push(`[pageerror] ${e.message}`));
  await page.goto('http://shop.huayuesc.local/', { waitUntil: 'networkidle2', timeout: 60000 });
  // give React time to hydrate / log key warnings
  await new Promise((r) => setTimeout(r, 6000));
  await page.screenshot({ path: '/work/scripts/gen-out/con-home.png' });
  const keyish = msgs.filter((m) => /key|hydrat/i.test(m));
  console.log('=== TOTAL console error/warn:', msgs.length, '===');
  console.log('=== KEY/HYDRATION related:', keyish.length, '===');
  for (const m of keyish) console.log(m.slice(0, 300));
  if (!keyish.length && msgs.length) {
    console.log('--- other (non-key) messages ---');
    for (const m of msgs.slice(0, 20)) console.log(m.slice(0, 200));
  }
  await browser.close();
})();
