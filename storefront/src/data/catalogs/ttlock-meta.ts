/**
 * TTLock smart lock metadata — detail page. Keyed by seriesOriginal (catKey).
 * Sourcing: ttlock.eu (European distributor). TTLock/Sciener (赛脑智能, Shenzhen) — global smart lock platform.
 */
export type SeriesMeta = {
  story: string; heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[]; careGuide: { title: string; desc: string }[];
  installation: string[]; certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[]; faq: { q: string; a: string }[];
};
const CERTS = ["International electronic safety certification (CE)", "Encrypted data security (AES)", "RoHS — safe materials", "Compatible with the TTLock app & Sciener platform"];
const MFG = [
  "TTLock / Sciener 赛脑智能 (Shenzhen) — global smart lock platform (App + Cloud API + SDK)",
  "Ecosystem: door locks, lever locks, cylinders, padlocks, motor locks, WiFi gateways",
  "Multi-method unlocking: fingerprint, passcode, card, app/Bluetooth, mechanical key; remote code provisioning via gateway",
  "Built-in centralized lock management for rental apartments, hotels and offices",
];
const PACK = [
  { label: "Packaging", value: "Retail box with installation accessories & batteries" },
  { label: "Included accessories", value: "Screws, mechanical key, manual (product-dependent)" },
  { label: "MOQ", value: "By batch; mixed models OK" },
];
const INSTALL = [
  "Check the door thickness & compatible lock type (mortise/euro cylinder) before ordering",
  "Install per the manual; connect the TTLock app via Bluetooth",
  "Set up fingerprint/passcode/card; add a WiFi gateway for remote control & code provisioning",
  "Test unlock/lock & battery before handover",
];
const CARE = [
  { title: "Battery", desc: "Use quality batteries; replace when the app reports low. Some models have an emergency power option." },
  { title: "App & security", desc: "Keep the TTLock app updated; issue/revoke eKey codes remotely; delete temporary codes after use." },
  { title: "Cleaning", desc: "Wipe the fingerprint sensor & keypad with a soft, dry cloth; avoid water and harsh chemicals." },
];
const FAQ = [
  { q: "Can TTLock be controlled remotely?", a: "Yes, once a WiFi gateway is added — issue codes, unlock & view access history remotely through the TTLock app." },
  { q: "Is it suitable for managing rental apartments/hotels?", a: "Highly suitable — issue one-time or time-limited codes for guests and manage multiple locks centrally." },
  { q: "MOQ & lead time?", a: "Priced by batch; delivery schedule quoted per order." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "📲", title: "TTLock ecosystem", desc: "App + gateway: remote code provisioning & management, with multi-lock integration." };
const SHOW = ["Rental apartments / Airbnb", "Hotels, offices", "Smart homes"];
const LOCK = mk({
  story: "TTLock smart door locks (ENTR, RIO...) — unlock by fingerprint, passcode, card, app/Bluetooth & mechanical key; remote code provisioning with a gateway, plus access history.",
  heritage: "The door lock line is the core of the TTLock ecosystem.",
  technicalSpecs: [{ label: "Type", value: "Smart electronic door lock" }, { label: "Unlocking", value: "Fingerprint, passcode, card, app/Bluetooth, mechanical key" }, { label: "Remote control", value: "Via WiFi gateway (TTLock app)" }, { label: "Power", value: "Battery + emergency port (model-dependent)" }],
  whyChoose: [WHY, { icon: "🔐", title: "Multi-method", desc: "Multiple convenient & secure ways to unlock." }, { icon: "🏨", title: "For rentals", desc: "Issue time-limited codes for guests and manage centrally." }],
  projectShowcase: SHOW,
});
export const TTLOCK_SERIES_META: Record<string, SeriesMeta> = {
  "smart-lock": LOCK, deadbolt: LOCK, other: LOCK,
  lever: mk({
    story: "TTLock smart lever locks (Handle) — integrated lever unlocked by fingerprint/passcode/card/app, suitable for room & entry doors.",
    heritage: "The smart lever offers a compact, convenient lock solution.",
    technicalSpecs: [{ label: "Type", value: "Smart lever lock" }, { label: "Unlocking", value: "Fingerprint, passcode, card, app, mechanical key" }, { label: "Applications", value: "Room doors, entry doors" }],
    whyChoose: [WHY, { icon: "🚪", title: "Convenient lever", desc: "Open and close with a lever; suits many doors." }],
    projectShowcase: SHOW,
  }),
  cylinder: mk({
    story: "TTLock smart cylinders (Euro Cylinder) — replace a standard door cylinder with a smart one, unlocking by app/passcode/key without swapping the whole lockset.",
    heritage: "Smart cylinders make upgrading an existing lock easy.",
    technicalSpecs: [{ label: "Type", value: "Smart cylinder (Euro cylinder)" }, { label: "Unlocking", value: "App/Bluetooth, passcode (keypad models), mechanical key" }, { label: "Applications", value: "Replaces a standard euro cylinder" }],
    whyChoose: [WHY, { icon: "♻️", title: "Easy upgrade", desc: "Swap only the cylinder, not the whole lockset." }],
    projectShowcase: SHOW,
  }),
  padlock: mk({
    story: "TTLock smart padlocks — unlocked by fingerprint/app, waterproof, for gates, cabinets, storage and vehicles.",
    heritage: "Smart padlocks suit mobile & outdoor applications.",
    technicalSpecs: [{ label: "Type", value: "Smart padlock" }, { label: "Unlocking", value: "Fingerprint / Bluetooth app" }, { label: "Features", value: "Waterproof, rechargeable battery" }],
    whyChoose: [WHY, { icon: "🔒", title: "Versatile", desc: "For gates, cabinets, storage and vehicles — keyless unlocking." }],
    projectShowcase: SHOW,
  }),
  outdoor: mk({
    story: "TTLock outdoor / gate locks — weatherproof, unlocked by app/passcode for gates, yards and outdoor areas.",
    heritage: "The outdoor line withstands harsh environments.",
    technicalSpecs: [{ label: "Type", value: "Outdoor / gate lock" }, { label: "Features", value: "Waterproof, weatherproof" }, { label: "Unlocking", value: "App, passcode" }],
    whyChoose: [WHY, { icon: "🌧️", title: "Weatherproof", desc: "Withstands sun and rain for gates & outdoor areas." }],
    projectShowcase: SHOW,
  }),
  motorlock: mk({
    story: "TTLock motor locks — electronic locks for glass/aluminum doors, with an integrated motor for automatic locking/unlocking controlled via the app.",
    heritage: "Motor locks suit commercial doors & modern glass doors.",
    technicalSpecs: [{ label: "Type", value: "Motor lock (glass/aluminum doors)" }, { label: "Features", value: "Automatic motorized locking/unlocking" }, { label: "Unlocking", value: "App, passcode, card" }],
    whyChoose: [WHY, { icon: "⚙️", title: "Automatic motor", desc: "Smooth locking/unlocking, ideal for commercial glass doors." }],
    projectShowcase: SHOW,
  }),
  gateway: mk({
    story: "TTLock gateways / accessories — a WiFi bridge for Bluetooth locks that enables remote control & code provisioning, extending the smart system.",
    heritage: "The gateway is the remote-connectivity hub of the TTLock system.",
    technicalSpecs: [{ label: "Type", value: "WiFi gateway / accessory" }, { label: "Function", value: "Bluetooth ↔ WiFi bridge for remote control" }, { label: "Compatibility", value: "TTLock locks" }],
    whyChoose: [{ icon: "📡", title: "Remote control", desc: "Turns Bluetooth locks into remotely controllable locks via the app." }, WHY],
    projectShowcase: SHOW,
  }),
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TTLOCK_SERIES_META[seriesOriginal.trim()] || TTLOCK_SERIES_META["smart-lock"];
}
