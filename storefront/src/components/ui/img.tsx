import type { ImgHTMLAttributes } from "react";

/** Drop-in <img> replacement. Serves a sibling .webp via <picture> when src is a
 *  local optimized asset (/img or /logo, .jpg/.jpeg/.png), original as fallback.
 *  display:contents keeps parent layout + CSS selectors identical to a bare <img>.
 *  Non-local / non-jpg-png / dynamic srcs render a plain <img>. */
export function Img({ src, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== "string" || !/^\/(img|logo)\//.test(src) || !/\.(jpe?g|png)(\?|$)/i.test(src)) {
    return <img src={src} {...rest} />;
  }
  const webp = src.replace(/\.(jpe?g|png)(\?.*)?$/i, ".webp$2");
  return (
    <picture style={{ display: "contents" }}>
      <source srcSet={webp} type="image/webp" />
      <img src={src} {...rest} />
    </picture>
  );
}
