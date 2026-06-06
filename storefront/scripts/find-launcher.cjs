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
  const info = await page.evaluate(() => {
    const out = [];
    // top-level custom elements / portals
    document.querySelectorAll('body > *').forEach((el) => {
      out.push(`BODY>${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className && typeof el.className === 'string' ? '.' + el.className.split(/\s+/).join('.') : ''}${el.shadowRoot ? ' [shadow]' : ''}`);
    });
    // element at bottom-left corner (where the N sits)
    const x = 38, y = 768 - 40;
    let elAt = document.elementFromPoint(x, y);
    const chain = [];
    while (elAt) {
      chain.push(`${elAt.tagName ? elAt.tagName.toLowerCase() : '?'}${elAt.id ? '#' + elAt.id : ''}`);
      elAt = elAt.parentElement;
    }
    // search shadow roots for the data-nextjs devtools host
    const hosts = [];
    document.querySelectorAll('*').forEach((el) => {
      if (el.shadowRoot) hosts.push(el.tagName.toLowerCase() + (el.id ? '#' + el.id : ''));
      const id = el.id || '';
      if (/next/i.test(el.tagName) || /next.*dev|dev.*tool|devtools/i.test(id)) {
        hosts.push('NEXTISH:' + el.tagName.toLowerCase() + (id ? '#' + id : ''));
      }
    });
    return { bodyChildren: out, cornerChain: chain, shadowHosts: [...new Set(hosts)] };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
