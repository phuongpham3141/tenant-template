const puppeteer = require('puppeteer');
const SUBS = ['shop', 'en', 'cn'];
(async () => {
  for (const sub of SUBS) {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox', '--disable-setuid-sandbox',
        `--host-resolver-rules=MAP ${sub}.huayuesc.local:80 192.168.40.3:18080`,
      ],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1400 });
    await page.goto(`http://${sub}.huayuesc.local/`, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2500));
    await page.screenshot({ path: `/work/scripts/gen-out/loc-${sub}.png` });
    console.log(sub, 'shot OK');
    await browser.close();
  }
})();
