const puppeteer = require("puppeteer");
const SHOTS = [["/en","fin-en-home"],["/cn","fin-cn-home"],["/en/products","fin-en-products"]];
(async () => {
  for (const [path,name] of SHOTS) {
    const b = await puppeteer.launch({args:["--no-sandbox","--disable-setuid-sandbox","--host-resolver-rules=MAP shop.huayuesc.local:80 192.168.40.3:18080"]});
    const p = await b.newPage();
    await p.setViewport({width:1440,height:1600});
    await p.goto(`http://shop.huayuesc.local${path}`,{waitUntil:"networkidle2",timeout:60000});
    await new Promise(r=>setTimeout(r,2500));
    await p.screenshot({path:`/work/scripts/gen-out/${name}.png`});
    console.log(name,"OK"); await b.close();
  }
})();
