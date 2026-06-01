#!/usr/bin/env python3
"""Parse downloaded brand HTML to extract product names + image URLs + about info.
Output: JSON per brand to stdout."""
import re
import json
import sys
from pathlib import Path
from urllib.parse import urljoin

BRANDS = {
    "fsl": ("https://www.chinafsl.com/", "佛山照明 FSL"),
    "care": ("http://www.care-china.cn/", "凯迪照明 CareLighting"),
    "daweier": ("http://www.daweier.com/", "达威尔 Daweier"),
    "pengxiang": ("http://www.pengxiang.cn/", "鹏翔 Pengxiang"),
    "zhongju": ("http://www.gdzjyb.com/", "中居亚百 Zhongju"),
    "dongyuan": ("http://www.sddongyuan.com/", "东源 Dongyuan"),
    "bravat": ("https://www.bravat.com.cn/", "贝朗 Bravat"),
    "kito": ("https://kito.cn/", "金意陶 KITO"),
    "linvol": ("https://linvol.midea.com.cn/home", "领沃 LINVOL"),
}

def strip_tags(html):
    """Remove HTML tags, keep text."""
    return re.sub(r"<[^>]+>", " ", html).strip()

def parse_brand(slug):
    base, name = BRANDS[slug]
    p = Path(f"/tmp/brand-html/{slug}.html")
    if not p.exists():
        return {"slug": slug, "error": "html missing"}
    html = p.read_text(encoding="utf-8", errors="ignore")

    # Title
    title_m = re.search(r"<title>([^<]+)</title>", html)
    title = title_m.group(1).strip() if title_m else ""

    # Meta description
    desc_m = re.search(
        r'<meta\s+name="description"\s+content="([^"]+)"', html, re.IGNORECASE
    )
    description = desc_m.group(1).strip() if desc_m else ""

    # All image URLs with alt text
    imgs = []
    seen = set()
    for m in re.finditer(
        r"<img[^>]*?src=[\"']([^\"']+\.(?:jpg|jpeg|png|webp))[\"'][^>]*?(?:alt=[\"']([^\"']*)[\"'])?",
        html,
        re.IGNORECASE,
    ):
        src, alt = m.group(1), m.group(2) or ""
        if src.startswith("//"):
            src = "https:" + src
        elif src.startswith("/"):
            src = urljoin(base, src)
        elif not src.startswith("http"):
            src = urljoin(base, src)
        # filter out tiny icons / logos
        if any(s in src.lower() for s in ["icon", "favicon", "qrcode", "logo_text"]):
            continue
        if src in seen:
            continue
        seen.add(src)
        imgs.append({"src": src, "alt": alt.strip()})

    # Product names — look for common patterns:
    # 1. Links with title containing product keywords
    products = []
    product_keywords = (
        "产品|Product|系列|灯|台灯|led|LED|筒灯|射灯|球泡|"
        "水槽|地漏|龙头|马桶|花洒|浴缸|"
        "石材|石英|大理石|花岗岩|岩板|"
        "板|地板|地坪|"
        "电梯|扶梯|"
        "锁|门锁|智能锁"
    )

    # Look for <a> with product title
    for m in re.finditer(
        r'<a[^>]*?(?:title|alt)=["\']([^"\']{3,80})["\']',
        html,
    ):
        text = m.group(1).strip()
        if re.search(product_keywords, text):
            products.append(text)

    # Also look for <h3>, <h4>, .name, .title elements
    for m in re.finditer(
        r'<(?:h[3-5]|p|span|div)[^>]*?class="[^"]*?(?:name|title|pname|pro-name)[^"]*?"[^>]*>([^<]{3,80})</',
        html,
    ):
        text = strip_tags(m.group(1)).strip()
        if text and re.search(product_keywords, text):
            products.append(text)

    # Dedupe
    products = list(dict.fromkeys(products))[:25]

    return {
        "slug": slug,
        "url": base,
        "name": name,
        "title": title,
        "description": description,
        "image_count": len(imgs),
        "products_count": len(products),
        "products": products,
        "images": imgs[:20],
    }


if __name__ == "__main__":
    slugs = sys.argv[1:] if len(sys.argv) > 1 else list(BRANDS.keys())
    out = [parse_brand(s) for s in slugs]
    print(json.dumps(out, ensure_ascii=False, indent=2))
