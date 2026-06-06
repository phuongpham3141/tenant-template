const path = process.env.SCAN_PATH || "/cn/suppliers";
const res = await fetch("http://storefront-prod:3001" + path, { headers: { "x-forwarded-host": "huayuesc.vn" } });
let html = await res.text();
html = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
const text = html.replace(/<[^>]+>/g, "\n")
  .replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&nbsp;/g, " ");
const VI = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;
const seen = new Set();
const out = [];
for (let line of text.split("\n")) {
  line = line.trim().replace(/\s+/g, " ");
  if (line.length < 2 || !VI.test(line)) continue;
  if (seen.has(line)) continue; seen.add(line);
  out.push(line);
}
console.log("HTTP", res.status, "| path", path, "| VI segments:", out.length);
out.forEach((l, i) => console.log(String(i + 1).padStart(3) + ". " + l));
