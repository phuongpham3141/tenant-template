const p = require("puppeteer");
(async () => {
  const b = await p.launch({ headless: true, args: ["--no-sandbox"] });
  const pg = await b.newPage();
  await pg.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
  await pg.goto("http://caddy:80/info/network", { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 5000));
  await pg.screenshot({ path: "/snapshot/network.png", fullPage: true });
  await b.close();
  console.log("DONE");
})().catch((e) => { console.error(e); process.exit(1); });
