const puppeteer = require('puppeteer');
const SHOTS = [
  ['/', 'path-vi'],
  ['/en', 'path-en'],
  ['/cn', 'path-cn'],
  ['/en/products', 'path-en-products'],
];
(async () => {
  for (const [path, name] of SHOTS) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox',
        '--host-resolver-rules=MAP shop.huayuesc.local:80 192.168.40.3:18080'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });
    await page.goto(`http://shop.huayuesc.local${path}`, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2000));
    await page.screenshot({ path: `/work/scripts/gen-out/${name}.png` });
    console.log(name, 'OK');
    await browser.close();
  }
})();
