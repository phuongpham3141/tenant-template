const p = require("puppeteer");
(async () => {
  const b = await p.launch({ headless: true, args: ["--no-sandbox"] });
  const pg = await b.newPage();
  await pg.setViewport({ width: 1440, height: 600, deviceScaleFactor: 1 });
  await pg.goto("http://caddy:80/", { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 6000));

  await pg.mouse.move(720, 300);
  for (let i = 0; i < 10; i++) {
    await pg.mouse.wheel({ deltaY: 200 });
    await new Promise((r) => setTimeout(r, 80));
  }
  await new Promise((r) => setTimeout(r, 1500));

  const info = await pg.evaluate(() => {
    const sticky = document.querySelector("header + div, body > div > div.fixed, [class*='translate-y']");
    const allFixed = Array.from(document.querySelectorAll("*")).filter(el => {
      const cs = window.getComputedStyle(el);
      return cs.position === "fixed" && cs.top === "0px";
    });
    return {
      scrollY: window.scrollY,
      fixedElements: allFixed.slice(0, 10).map(e => ({
        tag: e.tagName,
        cls: (e.className?.toString?.() ?? "").slice(0, 120),
        transform: window.getComputedStyle(e).transform,
        visible: window.getComputedStyle(e).visibility,
        ariaHidden: e.getAttribute("aria-hidden"),
      })),
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
