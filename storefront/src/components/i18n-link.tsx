"use client";

import NextLink, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useLocale } from "@/components/i18n-provider";
import { withLocalePrefix } from "@/lib/i18n";

type Props = Omit<LinkProps, "href"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: LinkProps["href"];
    children?: ReactNode;
  };

/** Drop-in replacement for next/link that prefixes internal ("/...") hrefs
 *  with the active locale (/en, /cn). vi = no prefix. External / anchor /
 *  already-prefixed hrefs pass through untouched. */
export default function Link({ href, ...props }: Props) {
  const locale = useLocale();
  const h =
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//")
      ? withLocalePrefix(locale, href)
      : href;
  return <NextLink href={h} {...props} />;
}
