import { vi } from "./vi";
import { en } from "./en";
import { cn } from "./cn";
import type { LocaleCode } from "@/lib/i18n";
import type { Messages } from "./vi";

const CATALOGS = { vi, en, cn } as const;
export function getMessages(locale: LocaleCode): Messages { return CATALOGS[locale] ?? vi; }
export type { Messages, MsgKey } from "./vi";
