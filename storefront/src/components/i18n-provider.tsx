"use client";

import { createContext, useContext } from "react";
import { vi } from "@/messages/vi";
import type { Messages } from "@/messages";
import type { LocaleCode } from "@/lib/i18n";

const Ctx = createContext<{ messages: Messages; locale: LocaleCode }>({ messages: vi, locale: "vi" });

export function I18nProvider({
  messages,
  locale,
  children,
}: {
  messages: Messages;
  locale: LocaleCode;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={{ messages, locale }}>{children}</Ctx.Provider>;
}

export function useT() {
  const m = useContext(Ctx).messages;
  return (key: string): string => (m as Record<string, string>)[key] ?? key;
}

export function useLocale(): LocaleCode {
  return useContext(Ctx).locale;
}
