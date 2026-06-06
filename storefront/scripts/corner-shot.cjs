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
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('http://shop.huayuesc.local/', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 5000));
  // bottom-left corner where the Next dev indicator lives
  await page.screenshot({
    path: '/work/scripts/gen-out/corner.png',
    clip: { x: 0, y: 568, width: 460, height: 200 },
  });
  console.log('corner shot saved');
  await browser.close();
})();
