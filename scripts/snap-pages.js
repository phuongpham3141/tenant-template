const p = require("puppeteer");
const pages = (process.env.PAGES || "network").split(",");
(async () => {
  const b = await p.launch({ headless: true, args: ["--no-sandbox"] });
  for (const slug of pages) {
    const pg = await b.newPage();
    await pg.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
    try {
      await pg.goto(`http://caddy:80/info/${slug}`, { waitUntil: "networkidle2", timeout: 60000 });
    } catch (err) {
      console.error(`goto failed for ${slug}: ${err.message}`);
      try { await pg.goto(`http://caddy:80/info/${slug}`, { waitUntil: "load", timeout: 60000 }); } catch (e) {}
    }
    await new Promise((r) => setTimeout(r, 5000));
    await pg.screenshot({ path: `/snapshot/page-${slug}.png`, fullPage: true });
    await pg.close();
    console.log(`DONE ${slug}`);
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
