const p = require("puppeteer");
const pages = (process.env.PAGES || "careers,audit-process,network").split(",");
(async () => {
  const b = await p.launch({ headless: true, args: ["--no-sandbox"] });
  for (const slug of pages) {
    const pg = await b.newPage();
    await pg.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
    await pg.goto(`http://caddy:80/info/${slug}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 4000));
    await pg.screenshot({ path: `/snapshot/page-${slug}.png`, fullPage: true });
    await pg.close();
    console.log(`DONE ${slug}`);
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
