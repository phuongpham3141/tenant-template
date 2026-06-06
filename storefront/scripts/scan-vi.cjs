const puppeteer = require('puppeteer');
const VN = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const PATHS = ['/en', '/cn'];
(async () => {
  for (const path of PATHS) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox',
        '--host-resolver-rules=MAP shop.huayuesc.local:80 192.168.40.3:18080'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });
    await page.goto(`http://shop.huayuesc.local${path}`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await new Promise((r) => setTimeout(r, 2500));
    // collect visible text from every element (leaf text nodes) + alt/placeholder/title
    const items = await page.evaluate(() => {
      const out = new Set();
      const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walk.nextNode())) {
        const t = n.textContent.trim();
        if (t) out.add(t);
      }
      document.querySelectorAll('[alt],[placeholder],[title]').forEach((el) => {
        ['alt', 'placeholder', 'title'].forEach((a) => { const v = el.getAttribute(a); if (v) out.add(v.trim()); });
      });
      return [...out];
    });
    const vi = [...new Set(items.filter((s) => VN.test(s) && s.length <= 120))];
    console.log(`\n===== ${path} : ${vi.length} đoạn còn TIẾNG VIỆT =====`);
    vi.forEach((s) => console.log('  • ' + s.replace(/\s+/g, ' ')));
    await browser.close();
  }
})();
