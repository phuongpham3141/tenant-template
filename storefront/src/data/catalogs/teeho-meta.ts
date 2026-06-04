/**
 * TEEHO smart lock metadata — detail page. Keyed by seriesOriginal (catKey).
 * Sourcing: teeho.com (Shopify). Electronic/smart door locks for export (primarily the US market).
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
const CERTS = ["International electronic safety certification", "Residential door lock standards (ANSI/BHMA referenced)", "RoHS — safe materials", "Encrypted protection of fingerprint/passcode data"];
const MFG = [
  "TEEHO — electronic/smart door lock brand, distributed through D2C/B2B channels (Shopify, US market)",
  "Product range: keypad deadbolts, lever locks, handle sets, WiFi/Bluetooth locks, gateways",
  "Multi-method unlocking: fingerprint, passcode, card/app, backup mechanical key",
  "Quality control & security in line with residential electronic lock standards",
];
const PACK = [
  { label: "Packaging", value: "Retail box with installation accessories & batteries" },
  { label: "Included accessories", value: "Screws, backup mechanical keys, manual, (batteries)" },
  { label: "MOQ", value: "By batch/container; mixed models OK" },
];
const INSTALL = [
  "Fits standard doors (common thickness & backset); verify before ordering",
  "DIY installation with a screwdriver per the manual; no wiring required",
  "Set up fingerprints/passcodes & connect the app (WiFi/Bluetooth models) after installation",
  "Test unlock/lock, auto-lock and battery before handover",
];
const CARE = [
  { title: "Battery", desc: "Use quality AA batteries; replace when the low-battery alert appears. Emergency power port available (model-dependent)." },
  { title: "Cleaning", desc: "Wipe the fingerprint sensor & keypad with a soft, dry cloth; avoid water and harsh chemicals." },
  { title: "Security", desc: "Change passcodes periodically, delete temporary codes after use; keep the app updated (WiFi models)." },
];
const FAQ = [
  { q: "Can TEEHO locks fit Vietnamese doors?", a: "They fit standard doors by thickness & backset; please confirm the door specifications for each model before ordering." },
  { q: "Are backup mechanical keys & emergency power available?", a: "Most models include a backup mechanical key and/or an emergency power port; details vary by product." },
  { q: "MOQ & lead time?", a: "Priced by batch; delivery schedule quoted per order." },
];
function mk(p: Pick<SeriesMeta,"story"|"heritage"|"technicalSpecs"|"whyChoose"|"projectShowcase">): SeriesMeta {
  return { ...p, manufacturing: MFG, careGuide: CARE, installation: INSTALL, certifications: CERTS, packaging: PACK, faq: FAQ };
}
const WHY = { icon: "🔐", title: "Multi-method unlocking", desc: "Fingerprint, passcode, card/app & backup mechanical key — convenient & secure." };
const SHOW = ["Homes, apartments, villas", "Offices, homestays/Airbnb", "Smart-home handover projects"];
const DEADBOLT = mk({
  story: "TEEHO keypad deadbolts (TE001/TE002) — electronic deadbolts unlocked by fingerprint & passcode, with a backup mechanical key, DIY wire-free installation and auto-lock.",
  heritage: "The deadbolt line is TEEHO's most popular product for entry doors.",
  technicalSpecs: [{ label: "Type", value: "Electronic deadbolt" }, { label: "Unlocking", value: "Fingerprint, passcode, mechanical key" }, { label: "Installation", value: "DIY, no wiring" }, { label: "Power", value: "AA batteries + emergency port (model-dependent)" }],
  whyChoose: [WHY, { icon: "🛠️", title: "Easy DIY install", desc: "Install yourself with a screwdriver; fits standard doors." }, { icon: "🔄", title: "Auto-lock", desc: "Locks automatically after the door closes — no more forgetting." }],
  projectShowcase: SHOW,
});
const WIFI = mk({
  story: "TEEHO smart WiFi locks (TE011W/TE012W) — remote control & code provisioning via the app, access history, voice-assistant integration, and unlocking by fingerprint/passcode/app/key.",
  heritage: "The WiFi line brings TEEHO locks into the smart-home ecosystem.",
  technicalSpecs: [{ label: "Type", value: "Smart WiFi lock" }, { label: "Connectivity", value: "WiFi (some include Bluetooth)" }, { label: "Control", value: "Remote app, issue/revoke codes, history" }, { label: "Unlocking", value: "Fingerprint, passcode, app, mechanical key" }],
  whyChoose: [WHY, { icon: "📱", title: "Remote control", desc: "Issue codes & unlock via the app anytime, anywhere." }, { icon: "🗣️", title: "Smart home", desc: "Voice-assistant integration (Alexa/Google, model-dependent)." }],
  projectShowcase: SHOW,
});
export const TEEHO_SERIES_META: Record<string, SeriesMeta> = {
  "keypad-deadbolt": DEADBOLT,
  "lever-lock": mk({
    story: "TEEHO keypad lever locks (TE001L/TE002L/TE003/TE004) — electronic lever locks for room/entry doors, unlocked by fingerprint & passcode, with a backup mechanical key.",
    heritage: "The lever line suits doors that need a handle rather than a single deadbolt.",
    technicalSpecs: [{ label: "Type", value: "Electronic lever lock" }, { label: "Unlocking", value: "Fingerprint, passcode, mechanical key" }, { label: "Applications", value: "Room doors, entry doors, offices" }],
    whyChoose: [WHY, { icon: "🚪", title: "Convenient lever", desc: "Open and close with a lever; suits many door types." }, { icon: "🔑", title: "Backup key", desc: "A mechanical key when needed, for peace of mind." }],
    projectShowcase: SHOW,
  }),
  "handle-set": mk({
    story: "TEEHO handle sets (TE001K/TE002K/TE001H) — deadbolt + matching handle set combos for entry doors, unlocked by fingerprint & passcode.",
    heritage: "The handle set delivers a complete look & dual security for entry doors.",
    technicalSpecs: [{ label: "Type", value: "Deadbolt + handle set" }, { label: "Unlocking", value: "Fingerprint, passcode, mechanical key" }, { label: "Applications", value: "Entry doors, facades" }],
    whyChoose: [WHY, { icon: "🏠", title: "Dual security", desc: "Matching deadbolt + handle set for entry doors." }, { icon: "✨", title: "Aesthetics", desc: "A complete set with an elegant exterior finish." }],
    projectShowcase: SHOW,
  }),
  "wifi-lock": WIFI, "wifi-handle": WIFI,
  "smart-handle": mk({
    story: "TEEHO smart handles (TE018) — door handles with integrated fingerprint/passcode, compact for room doors.",
    heritage: "The smart handle offers a compact lock solution.",
    technicalSpecs: [{ label: "Type", value: "Smart handle" }, { label: "Unlocking", value: "Fingerprint, passcode, mechanical key" }, { label: "Applications", value: "Room doors" }],
    whyChoose: [WHY, { icon: "🤚", title: "Compact", desc: "An all-in-one handle lock that installs neatly on room doors." }],
    projectShowcase: SHOW,
  }),
  gateway: mk({
    story: "TEEHO Gateway (G1) — a connectivity hub/bridge that lets Bluetooth locks be controlled remotely over WiFi, extending smart-home capabilities.",
    heritage: "The gateway is a connectivity accessory that extends the TEEHO lock system.",
    technicalSpecs: [{ label: "Type", value: "Gateway / connectivity hub" }, { label: "Function", value: "Bluetooth ↔ WiFi bridge for remote control" }, { label: "Compatibility", value: "Gateway-enabled TEEHO locks" }],
    whyChoose: [{ icon: "📡", title: "Remote control", desc: "Turns Bluetooth locks into remotely controllable locks via the app." }, WHY],
    projectShowcase: SHOW,
  }),
  other: DEADBOLT,
};
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TEEHO_SERIES_META[seriesOriginal.trim()] || TEEHO_SERIES_META["keypad-deadbolt"];
}
