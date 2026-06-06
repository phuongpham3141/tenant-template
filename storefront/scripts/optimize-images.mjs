import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = "/app/public/img";
const MAXW = 1600;
const files = [];
(function walk(d){ for (const e of fs.readdirSync(d,{withFileTypes:true})){ const p=path.join(d,e.name); if (e.isDirectory()) walk(p); else { const x=path.extname(p).toLowerCase(); if ([".jpg",".jpeg",".png"].includes(x)) files.push(p); } } })(ROOT);
console.log("scanning", files.length, "images");

let count=0, before=0, after=0, skipped=0, errs=0;
async function one(p){
  const st = fs.statSync(p);
  const ext = path.extname(p).toLowerCase();
  try {
    const img = sharp(p,{failOn:"none"});
    const meta = await img.metadata();
    if (st.size < 100*1024 && (meta.width||0) <= MAXW) { skipped++; return; }
    let pipe = img.rotate();
    if ((meta.width||0) > MAXW) pipe = pipe.resize({width:MAXW, withoutEnlargement:true});
    let buf;
    if (ext === ".png") buf = await pipe.png({compressionLevel:9, effort:8}).toBuffer();
    else buf = await pipe.jpeg({quality:80, mozjpeg:true, progressive:true}).toBuffer();
    if (buf.length < st.size*0.92) { fs.writeFileSync(p,buf); before+=st.size; after+=buf.length; count++; }
    else skipped++;
  } catch(e){ errs++; if (errs<8) console.error("ERR", p, e.message); }
}
const CON=8; let idx=0;
async function worker(){ while(idx<files.length){ const i=idx++; await one(files[i]); } }
await Promise.all(Array.from({length:CON}, worker));
console.log(`\nOPTIMIZED ${count} files; ${(before/1e6).toFixed(1)}MB -> ${(after/1e6).toFixed(1)}MB (saved ${((before-after)/1e6).toFixed(1)}MB); skipped ${skipped}; errs ${errs}`);
