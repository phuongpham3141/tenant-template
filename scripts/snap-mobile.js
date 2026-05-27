const p = require("puppeteer");
(async () => {
  const b = await p.launch({ headless: true, args: ["--no-sandbox"] });
  const pg = await b.newPage();
  // iPhone 13/14 viewport
  await pg.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await pg.goto("http://caddy:80/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 5000));

  // Capture top of page (no scroll) — header should be fully visible
  await pg.screenshot({ path: "/snapshot/mobile-top.png", clip: { x: 0, y: 0, width: 390, height: 700 } });

  // Scroll down to trigger StickyHeader (scrollY > 240) and check no overlap
  await pg.evaluate(() => window.scrollTo(0, 600));
  await new Promise((r) => setTimeout(r, 800));
  await pg.screenshot({ path: "/snapshot/mobile-scrolled.png", clip: { x: 0, y: 0, width: 390, height: 500 } });

  await b.close();
  console.log("DONE");
})().catch((e) => { console.error(e); process.exit(1); });
