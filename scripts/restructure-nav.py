#!/usr/bin/env python3
"""
Restructure NAV_MENU in storefront/src/data/home.ts:
- Restore the 12 original main categories (matching NAV_CATEGORIES).
- Redistribute the sub-items I had grouped under my 7 short-lived
  categories into the correct original parents.

Reads /tmp/home.ts.bak, writes /tmp/home.ts.new.
"""
import re
from pathlib import Path

SRC = Path("/tmp/home.ts.bak")
DST = Path("/tmp/home.ts.new")
text = SRC.read_text(encoding="utf-8")

# 1) Locate NAV_MENU array literal
nav_open = text.index("export const NAV_MENU")
# Skip past the type declaration `: { ... }[] = ` to the actual array start.
eq_pos = text.index("= [", nav_open)
arr_open = text.index("[", eq_pos)
# Find matching closing bracket of NAV_MENU (top-level `];` that ends it)
# We know the next `];` after STATS doesn't exist before NAV_MENU close, so
# scan with depth tracking.
depth = 0
i = arr_open
while i < len(text):
    c = text[i]
    if c == "[":
        depth += 1
    elif c == "]":
        depth -= 1
        if depth == 0:
            arr_close = i
            break
    i += 1
else:
    raise SystemExit("unbalanced brackets")

nav_body = text[arr_open + 1 : arr_close]

# 2) Split into the 9 top-level group blocks by locating each `{ main: ...`.
group_starts = [m.start() for m in re.finditer(r"\n  \{\n    main: ", nav_body)]
group_starts = [s + 1 for s in group_starts]  # skip leading \n
group_starts.append(len(nav_body))
groups = []
for a, b in zip(group_starts, group_starts[1:]):
    block = nav_body[a:b].rstrip().rstrip(",") + ",\n"
    groups.append(block)
assert len(groups) == 9, f"expected 9 groups got {len(groups)}"

# 3) Within each group block, capture `main` header and individual item blocks.
def parse_group(block):
    # block looks like: "  {\n    main: { ... },\n    items: [\n      {...}, {...}, ...\n    ],\n  },\n"
    main_match = re.search(r"main: (\{[^}]*\}),", block)
    main_str = main_match.group(1)
    # Items list extraction — find `items: [` then split children by matching `{...},` at depth 1
    items_open = block.index("items: [")
    bracket_pos = block.index("[", items_open)
    depth = 0
    items_end = None
    i = bracket_pos
    while i < len(block):
        c = block[i]
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                items_end = i
                break
        i += 1
    items_raw = block[bracket_pos + 1 : items_end]
    # Each item is `      {\n        name: "...", ...\n      },`
    # Find item boundaries by tracking braces at indent level.
    item_starts = [m.start() for m in re.finditer(r"^      \{\n", items_raw, re.M)]
    item_starts.append(len(items_raw))
    items = []
    for a, b in zip(item_starts, item_starts[1:]):
        chunk = items_raw[a:b].rstrip().rstrip(",") + ","
        items.append(chunk)
    # Extract name for matching later
    def name_of(chunk):
        m = re.search(r'name: "([^"]+)"', chunk)
        return m.group(1) if m else ""
    return main_str, [(name_of(c), c) for c in items]

parsed = [parse_group(g) for g in groups]
groups_by_main = {}
for main_str, items in parsed:
    name_m = re.search(r'name: "([^"]+)"', main_str)
    groups_by_main[name_m.group(1)] = (main_str, items)

# 4) Reassign items into the 12 target groups.

# Pool items by name from the 9 source groups.
all_items = {}
for main_name, (main_str, items) in groups_by_main.items():
    for n, chunk in items:
        all_items[n] = chunk

# Helper to take items by name (raises if missing).
def take(*names):
    out = []
    for n in names:
        if n not in all_items:
            raise SystemExit(f"missing item: {n}")
        out.append(all_items[n])
    return out

# Build the 12 new groups.
target = [
    (
        '{ icon: "🏠", name: "Nhà & Sân vườn", slug: "home-garden" }',
        take("Thang máy chở khách", "Thang cuốn", "Thang chống cháy"),
    ),
    (
        '{ icon: "🧱", name: "Vật liệu xây dựng", slug: "construction-materials" }',
        [c for _, c in groups_by_main["Vật liệu xây dựng"][1]],
    ),
    (
        '{ icon: "🚿", name: "Phòng tắm & Vệ sinh", slug: "bathroom-sanitary" }',
        take("Bồn cầu sứ", "Bồn cầu thông minh", "Lavabo sứ", "Tủ phòng tắm", "Vòi nước kim khí"),
    ),
    (
        '{ icon: "🛋", name: "Nội thất", slug: "noi-that" }',
        [c for _, c in groups_by_main["Nội thất"][1]],
    ),
    (
        '{ icon: "🍳", name: "Thiết bị nhà bếp", slug: "kitchen-equipment" }',
        take(
            "Bếp từ", "Máy hút mùi", "Lò vi sóng", "Nồi áp suất",
            "Nồi cơm điện", "Máy rửa bát",
            "Chậu rửa inox", "Sản phẩm kim khí",
        ),
    ),
    (
        '{ icon: "💡", name: "Đèn & Chiếu sáng", slug: "lighting" }',
        take("Đèn LED nguồn", "Đèn LED gia dụng", "Đèn LED thương mại", "Vật tư điện"),
    ),
    (
        '{ icon: "🪟", name: "Cửa & Cửa sổ", slug: "doors-windows" }',
        take(
            "Khoá nhận diện khuôn mặt 3D",
            "Khoá thông minh Wi-Fi",
            "Khoá đòn cổng Wi-Fi",
            "Khoá vân tay",
        ),
    ),
    (
        '{ icon: "🛏", name: "Đồ dùng khách sạn", slug: "hotel-supplies" }',
        [],
    ),
    (
        '{ icon: "🔨", name: "Phụ kiện & Dụng cụ", slug: "hardware-tools" }',
        [],
    ),
    (
        '{ icon: "🎨", name: "Trang trí", slug: "decoration" }',
        [],
    ),
    (
        '{ icon: "🌿", name: "Ngoài trời & Sân vườn", slug: "outdoor-garden" }',
        [],
    ),
    (
        '{ icon: "⚡", name: "Điện & Thiết bị điện", slug: "electrical" }',
        take(
            "Điều hoà", "Tủ lạnh", "Máy giặt", "Máy sưởi", "Bình nóng lạnh",
            "Dây điện & Cáp", "Ống dẫn", "Máng dây điện",
        ),
    ),
]

# 5) Re-render NAV_MENU body.
def render_group(main_str, items):
    if not items:
        return f"  {{\n    main: {main_str},\n    items: [],\n  }},\n"
    items_body = "\n".join(it for it in items)
    return (
        "  {\n"
        f"    main: {main_str},\n"
        "    items: [\n"
        f"{items_body}\n"
        "    ],\n"
        "  },\n"
    )

new_body = "\n" + "".join(render_group(m, its) for m, its in target)
new_text = text[: arr_open + 1] + new_body + text[arr_close:]
DST.write_text(new_text, encoding="utf-8")
print("OK lines:", new_text.count("\n"))
