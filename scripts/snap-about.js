const p = require("puppeteer");
(async () => {
  const b = await p.launch({ headless: true, args: ["--no-sandbox"] });
  const pg = await b.newPage();
  await pg.setViewport({ width: 1440, height: 1400, deviceScaleFactor: 1 });
  await pg.goto("http://caddy:80/info/about-us", { waitUntil: "domcontentloaded", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 5000));
  await pg.screenshot({ path: "/snapshot/about.png", fullPage: true });
  await b.close();
  console.log("DONE");
})().catch((e) => { console.error(e); process.exit(1); });
