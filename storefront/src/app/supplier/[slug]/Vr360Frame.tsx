/**
 * Vr360Frame — server component, render thuần HTML + inline <script>.
 * KHÔNG dùng "use client" → KHÔNG phụ thuộc React hydration.
 *
 * 2 nút:
 *   ⛶ Toàn màn hình — native FS + CSS fallback. Reload iframe mỗi lần để 360 fresh.
 *   🪟 Mở cửa sổ mới — window.open full screen với iframe + 2 overlay branding.
 */
export function Vr360Frame({
  vrUrl,
  overlayName,
  factoryName,
}: {
  vrUrl: string;
  overlayName: string;
  factoryName: string;
}) {
  const parts = overlayName.split(/\s+/).filter(Boolean);
  let line1 = parts[0] ?? "";
  let line2 = parts.slice(1).join(" ");
  if (parts.length === 1) {
    if (line1.length > 8) {
      const mid = Math.ceil(line1.length / 2);
      line2 = line1.slice(mid);
      line1 = line1.slice(0, mid);
    } else {
      line2 = "";
    }
  }

  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const safeUrl = escapeHtml(vrUrl);
  const safeOverlay = escapeHtml(overlayName);
  const safeLine1 = escapeHtml(line1);
  const safeLine2 = escapeHtml(line2);
  const safeFactory = escapeHtml(factoryName);

  const jsVrUrl = JSON.stringify(vrUrl);
  const jsFactory = JSON.stringify(factoryName);
  const jsOverlay = JSON.stringify(overlayName);
  const jsLine1 = JSON.stringify(line1);
  const jsLine2 = JSON.stringify(line2);

  const html = `
<style>
  .csr-vr-btn{padding:9px 16px;background:var(--color-brand);color:#fff;border:0;border-radius:3px;font-weight:bold;cursor:pointer;font-size:13px;white-space:nowrap;font-family:inherit;transition:background .15s}
  .csr-vr-btn:hover{background:#066875}

  #csr-vr-wrap{position:relative;width:100%;height:700px;background:#000;border:1px solid #e5e7eb;border-radius:4px;overflow:hidden}
  #csr-vr-wrap.css-fs{position:fixed!important;inset:0;width:100vw;height:100vh;z-index:99999;border-radius:0;border:0}
  #csr-vr-wrap iframe{width:100%;height:100%;border:0;display:block}
  body.csr-vr-lock{overflow:hidden}

  .csr-vr-ov1{position:absolute;top:0;left:0;width:280px;height:70px;background:linear-gradient(90deg,var(--color-brand),#066875);color:#fff;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;border-radius:6px;z-index:10}
  .csr-vr-ov2{position:absolute;bottom:0;right:0;width:140px;height:100px;background:linear-gradient(135deg,var(--color-brand),#066875);color:#fff;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;text-align:center;line-height:1.3;border-radius:6px;z-index:10}

  .csr-vr-exit{position:absolute;top:16px;right:16px;background:#fff;color:var(--color-brand);padding:8px 14px;border-radius:3px;font-weight:bold;border:0;cursor:pointer;z-index:20;box-shadow:0 2px 8px rgba(0,0,0,.3);font-size:12px;display:none}
  #csr-vr-wrap.css-fs .csr-vr-exit{display:block}
</style>

<div style="margin-bottom:12px">
  <p style="font-size:12px;color:#6b7280;margin:0 0 8px;line-height:1.55">
    💡 <b>Mẹo</b>: kéo chuột để xoay 360°, cuộn để zoom, click các điểm sáng để di chuyển. Bấm <b>Toàn màn hình</b> để xem rộng hơn (mỗi lần ấn sẽ tải lại 360°) hoặc <b>Mở cửa sổ mới</b> để xem trong cửa sổ riêng. Nhấn <kbd style="padding:1px 6px;background:#f3f4f6;border:1px solid #d1d5db;border-radius:2px;font-size:11px;font-family:Consolas,monospace">Esc</kbd> để thoát.
  </p>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
    <button type="button" class="csr-vr-btn" onclick="csrVrCombined()">⛶ Toàn màn hình</button>
    <button type="button" class="csr-vr-btn" onclick="csrVrPopup()">🪟 Mở cửa sổ mới</button>
  </div>
</div>

<div id="csr-vr-wrap">
  <iframe id="csr-vr-iframe" src="${safeUrl}" title="Tour 360° ${safeFactory}" allow="accelerometer; gyroscope; magnetometer; xr-spatial-tracking; fullscreen"></iframe>
  <div class="csr-vr-ov1">🏭 ${safeOverlay}</div>
  <div class="csr-vr-ov2">${safeLine2 ? `<span>${safeLine1}<br/>${safeLine2}</span>` : `<span>${safeLine1}</span>`}</div>
  <button type="button" class="csr-vr-exit" onclick="csrVrCombined()">✕ Thoát (Esc)</button>
</div>

<script>
(function(){
  if (window.__csrVrInited) return;
  window.__csrVrInited = true;

  var VR_URL = ${jsVrUrl};
  var FACTORY = ${jsFactory};
  var OVERLAY = ${jsOverlay};
  var LINE1 = ${jsLine1};
  var LINE2 = ${jsLine2};

  function $(id){ return document.getElementById(id); }
  function reqFs(el){
    var fn = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if(!fn) return Promise.reject(new Error('not supported'));
    var r = fn.call(el);
    return (r && r.then) ? r : Promise.resolve();
  }
  function exitFs(){
    var fn = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
    if(!fn) return Promise.resolve();
    var r = fn.call(document);
    return (r && r.then) ? r : Promise.resolve();
  }
  function inNativeFs(){
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
  }
  function setCssFs(on){
    var w = $('csr-vr-wrap'); if(!w) return;
    if(on){ w.classList.add('css-fs'); document.body.classList.add('csr-vr-lock'); }
    else  { w.classList.remove('css-fs'); document.body.classList.remove('csr-vr-lock'); }
  }
  function reloadIframe(){
    var f = $('csr-vr-iframe'); if(!f) return;
    var sep = VR_URL.indexOf('?') >= 0 ? '&' : '?';
    f.src = VR_URL + sep + '_t=' + Date.now();
  }

  // Combined: nếu đang FS → exit. Nếu không → reload iframe + enter FS (native trước, CSS fallback)
  window.csrVrCombined = function(){
    if(inNativeFs()){ exitFs(); return; }
    var w = $('csr-vr-wrap');
    if(w && w.classList.contains('css-fs')){ setCssFs(false); return; }

    reloadIframe();

    if(!w) return;
    reqFs(w).catch(function(){ setCssFs(true); });
  };

  // Popup: mở cửa sổ riêng full size với iframe + 2 overlay branding
  window.csrVrPopup = function(){
    var sw = (window.screen && window.screen.availWidth) || 1920;
    var sh = (window.screen && window.screen.availHeight) || 1080;
    var feat = 'width=' + sw + ',height=' + sh + ',left=0,top=0,fullscreen=yes,menubar=no,toolbar=no,location=no';
    var p = window.open('', 'csr_vr_fullscreen', feat);
    if(!p){ alert('Cửa sổ bị chặn. Vui lòng cho phép popup cho trang này rồi thử lại.'); return; }
    var sep = VR_URL.indexOf('?') >= 0 ? '&' : '?';
    var url = VR_URL + sep + '_t=' + Date.now();
    var ov2 = LINE2 ? '<span>' + LINE1 + '<br>' + LINE2 + '</span>' : '<span>' + LINE1 + '</span>';
    var doc =
      '<!doctype html><html><head><meta charset="utf-8"><title>Tour 360° ' + FACTORY + '</title><style>' +
      'html,body{margin:0;padding:0;width:100%;height:100%;background:#000;overflow:hidden;font-family:Arial,sans-serif}' +
      'iframe{width:100%;height:100%;border:0;display:block}' +
      '.ov1{position:fixed;top:0;left:0;width:280px;height:70px;background:linear-gradient(90deg,var(--color-brand),#066875);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:16px;border-radius:6px;z-index:10}' +
      '.ov2{position:fixed;bottom:0;right:0;width:140px;height:100px;background:linear-gradient(135deg,var(--color-brand),#066875);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;text-align:center;line-height:1.3;border-radius:6px;z-index:10}' +
      '.cls{position:fixed;top:14px;right:14px;background:#fff;color:var(--color-brand);border:0;padding:8px 14px;border-radius:3px;font-weight:bold;cursor:pointer;z-index:20;box-shadow:0 2px 8px rgba(0,0,0,.4);font-size:13px}' +
      '</style></head><body>' +
      '<iframe src="' + url + '" allow="accelerometer; gyroscope; magnetometer; xr-spatial-tracking; fullscreen"></iframe>' +
      '<div class="ov1">🏭 ' + OVERLAY + '</div>' +
      '<div class="ov2">' + ov2 + '</div>' +
      '<button class="cls" onclick="window.close()">✕ Đóng</button>' +
      '</body></html>';
    p.document.open();
    p.document.write(doc);
    p.document.close();
    p.focus();
  };

  // Esc thoát CSS pseudo-FS (native FS có Esc của browser sẵn)
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      var w = $('csr-vr-wrap');
      if(w && w.classList.contains('css-fs')) setCssFs(false);
    }
  });
})();
</script>
`;

  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
