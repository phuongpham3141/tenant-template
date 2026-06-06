import fs from "node:fs"; import path from "node:path"; import sharp from "sharp";
const ROOTS = ["/app/public/img", "/app/public/logo"];
const MAXW = 1600;
const files = [];
for (const root of ROOTS) (function walk(d){ if(!fs.existsSync(d)) return; for(const e of fs.readdirSync(d,{withFileTypes:true})){ const p=path.join(d,e.name); if(e.isDirectory()) walk(p); else if(/\.(jpe?g|png)$/i.test(e.name)) files.push(p); } })(root);
console.log("source images:", files.length);
let made=0, skip=0, errs=0, bytes=0, src=0;
async function one(p){
  const webp = p.replace(/\.(jpe?g|png)$/i, ".webp");
  if (fs.existsSync(webp)) { skip++; return; }
  try {
    const meta = await sharp(p,{failOn:"none"}).metadata();
    let pipe = sharp(p,{failOn:"none"}).rotate();
    if ((meta.width||0) > MAXW) pipe = pipe.resize({width:MAXW, withoutEnlargement:true});
    const buf = await pipe.webp({quality:78, effort:4}).toBuffer();
    fs.writeFileSync(webp, buf); made++; bytes += buf.length; src += fs.statSync(p).size;
  } catch(e){ errs++; if(errs<8) console.error("ERR",p,e.message); }
}
const CON=8; let idx=0;
async function w(){ while(idx<files.length){ await one(files[idx++]); } }
await Promise.all(Array.from({length:CON}, w));
console.log(`WEBP made ${made}, skipped ${skip}, errs ${errs}; source ${(src/1e6).toFixed(1)}MB -> webp ${(bytes/1e6).toFixed(1)}MB`);
