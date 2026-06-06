import fs from "node:fs";
const p = "/work/src/app/info/ddp-calculator/page.tsx";
let s = fs.readFileSync(p, "utf8");
function rep(old, neu, label) {
  if (!s.includes(old)) { console.log("NO MATCH:", label); return; }
  const before = s.length;
  s = s.split(old).join(neu);
  console.log("OK:", label, "(delta", s.length - before, ")");
}

// ---- Block 1: DDP paragraph (text node after the first </b>) ----
const old1 = `<b className="text-ink">DDP (Delivered Duty Paid)</b> là incoterm cao cấp nhất — NCC chịu mọi chi phí và rủi ro
              tới khi hàng đặt tại kho buyer ở Việt Nam, đã thanh toán mọi loại thuế.`;
const new1 = `<b className="text-ink">DDP (Delivered Duty Paid)</b>{" "}
              {td("là incoterm cao cấp nhất — NCC chịu mọi chi phí và rủi ro tới khi hàng đặt tại kho buyer ở Việt Nam, đã thanh toán mọi loại thuế.")}`;
rep(old1, new1, "block1 DDP paragraph");

// ---- Block 2: Huayuesc / 3 ports paragraph ----
const old2 = `Huayuesc quản lý DDP qua 3 cảng chính: <b className="text-ink">Hải Phòng</b> (đối với khách miền Bắc),{" "}
              <b className="text-ink">Cát Lái HCM</b> (miền Nam) và <b className="text-ink">Đà Nẵng</b> (miền Trung).
              Đường bộ qua Lạng Sơn nhanh hơn (5-8 ngày) cho hàng nhỏ &lt; 3 CBM.`;
const new2 = `Huayuesc {td("quản lý DDP qua 3 cảng chính:")} <b className="text-ink">{td("Hải Phòng")}</b> {td("(đối với khách miền Bắc),")}{" "}
              <b className="text-ink">{td("Cát Lái HCM")}</b> {td("(miền Nam) và")} <b className="text-ink">{td("Đà Nẵng")}</b> {td("(miền Trung).")}{" "}
              {td("Đường bộ qua Lạng Sơn nhanh hơn (5-8 ngày) cho hàng nhỏ")} &lt; 3 CBM.`;
rep(old2, new2, "block2 ports paragraph");

// ---- Block 3: Nhập khối lượng paragraph ----
const old3 = `Nhập <b>khối lượng</b> (CBM hoặc tương đương kg/167) và <b>giá trị FOB</b> ở form trên để xem ngay tổng chi phí ước tính.`;
const new3 = `{td("Nhập")} <b>{td("khối lượng")}</b> {td("(CBM hoặc tương đương kg/167) và")} <b>{td("giá trị FOB")}</b> {td("ở form trên để xem ngay tổng chi phí ước tính.")}`;
rep(old3, new3, "block3 Nhap paragraph");

fs.writeFileSync(p, s);
console.log("WROTE", p);
