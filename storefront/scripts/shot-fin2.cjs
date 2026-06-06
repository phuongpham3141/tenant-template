const puppeteer=require("puppeteer");
(async()=>{for(const [path,name] of [["/en","done-en"],["/cn","done-cn"]]){
  const b=await puppeteer.launch({args:["--no-sandbox","--disable-setuid-sandbox","--host-resolver-rules=MAP shop.huayuesc.local:80 192.168.40.3:18080"]});
  const p=await b.newPage(); await p.setViewport({width:1440,height:1700});
  await p.goto(`http://shop.huayuesc.local${path}`,{waitUntil:"domcontentloaded",timeout:90000});
  await new Promise(r=>setTimeout(r,3500));
  await p.screenshot({path:`/work/scripts/gen-out/${name}.png`}); console.log(name,"OK"); await b.close();
}})();
