/**
 * Brand-color social icons used by both the top-strip login dropdown and
 * the standalone /login page. Keep this single source of truth so the
 * iconography stays consistent everywhere.
 */

import type { ReactNode } from "react";

export type SocialBrand = {
  name: string;
  brand: string; // hex used as hover background
  icon: ReactNode;
};

const cls = "w-[18px] h-[18px]";

export const SocialIcons = {
  google: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC04" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.94l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" fill="#000" aria-hidden="true" className={cls}>
      <path d="M17.05 12.54c-.03-2.93 2.39-4.34 2.5-4.41-1.36-1.99-3.48-2.27-4.24-2.3-1.81-.18-3.53 1.06-4.45 1.06-.92 0-2.34-1.04-3.85-1.01-1.98.03-3.81 1.15-4.83 2.92-2.06 3.57-.53 8.86 1.48 11.76.98 1.42 2.15 3.01 3.68 2.95 1.48-.06 2.04-.96 3.83-.96 1.79 0 2.29.96 3.85.93 1.59-.03 2.6-1.45 3.57-2.87 1.13-1.65 1.59-3.25 1.61-3.33-.04-.02-3.09-1.18-3.15-4.74Zm-2.91-8.71C14.96 2.85 15.55 1.5 15.4 0c-1.27.05-2.81.85-3.69 1.83-.79.86-1.49 2.25-1.31 3.55 1.42.11 2.87-.72 3.74-1.55Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true" className={cls}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z" />
    </svg>
  ),
  zalo: (
    <svg viewBox="0 0 24 24" fill="#0068FF" aria-hidden="true" className={cls}>
      <path d="M12 2C6.48 2 2 5.95 2 10.83c0 2.7 1.4 5.13 3.6 6.78L4.7 21l3.84-1.92c1.05.3 2.17.46 3.46.46 5.52 0 10-3.95 10-8.71C22 5.95 17.52 2 12 2Zm-3.85 11.2H6.62a.4.4 0 0 1-.4-.4V8.94a.4.4 0 0 1 .8 0v3.46h1.13a.4.4 0 1 1 0 .8Zm2.05-.4a.4.4 0 0 1-.8 0V8.94a.4.4 0 0 1 .8 0v3.86Zm5 0a.4.4 0 0 1-.8 0v-.27a1.62 1.62 0 0 1-1.18.51 1.65 1.65 0 0 1-1.65-1.65v-.06a1.65 1.65 0 0 1 1.65-1.65c.46 0 .88.19 1.18.5v-.26a.4.4 0 1 1 .8 0v2.88Zm3.78.4h-3.05a.4.4 0 0 1-.32-.64l2.42-3.22h-2.1a.4.4 0 1 1 0-.8h2.97a.4.4 0 0 1 .33.64L17 12.4h1.98a.4.4 0 1 1 0 .8Z" />
    </svg>
  ),
} as const;

export const LOGIN_PROVIDERS: SocialBrand[] = [
  { name: "Google", brand: "#4285F4", icon: SocialIcons.google },
  { name: "Apple", brand: "#000000", icon: SocialIcons.apple },
  { name: "Facebook", brand: "#1877F2", icon: SocialIcons.facebook },
];
