/**
 * TTLock smart lock series metadata — rich content for product detail pages.
 * Indexed by seriesOriginal (catKey): smart-lock / lever / cylinder / outdoor / gateway, etc.
 * Sources: ttlock.eu (European distributor) + public materials from TTLock / Sciener (Shenzhen) platform + common industry parameters.
 */

export type SeriesMeta = {
  story: string;
  heritage: string;
  technicalSpecs: { label: string; value: string }[];
  manufacturing: string[];
  careGuide: { title: string; desc: string }[];
  installation: string[];
  certifications: string[];
  packaging: { label: string; value: string }[];
  whyChoose: { icon: string; title: string; desc: string }[];
  projectShowcase: string[];
  faq: { q: string; a: string }[];
};

const BRAND_MFG = [
  "TTLock is built by Sciener (Shenzhen) — a global smart access platform spanning a mobile App, cloud APIs and an open SDK, with hardware and software developed from a single source for a consistent, seamless experience",
  "Lock panels are die-cast in zinc alloy and aviation-grade aluminum, finished with tempered glass or brushed metal, balancing structural strength with a premium feel and staying solid through frequent daily use",
  "The core electronic module integrates a Bluetooth 5.0 low-energy chip, a semiconductor fingerprint sensor and an anti-tamper alarm circuit, with every component cleared by aging and high/low-temperature testing before assembly",
  "The factory supports OEM / ODM: panel colors, handle styles, unlocking combinations and App brand skins can all be customized per project, with flexible minimum order quantities suited to both project and distribution channels",
  "Leveraging the open TTLock ecosystem, a single lock can connect to gateways, doorbells, door sensors, smart cameras and other accessories to form an integrated smart access solution",
];

const BRAND_CARE = [
  { title: "Battery Care", desc: "Use brand-name alkaline or lithium batteries and replace them promptly when the App flags low battery; select models include a Type-C or 9V emergency power port on the underside, so you can draw temporary power to open the door even when fully drained." },
  { title: "App & Key Security", desc: "Keep the TTLock App updated to the latest version and issue or revoke eKeys remotely as needed; delete temporary and one-time passwords right after use, and periodically clear out expired authorizations." },
  { title: "Sensor Cleaning", desc: "Wipe the fingerprint reader window and touch keypad with a dry, soft cloth to keep them clean and boost recognition accuracy; never rinse with water or expose them to alcohol, strong solvents or other chemicals." },
  { title: "Moving-Part Maintenance", desc: "If the handle, knob or latch bolt starts to bind, apply a small amount of dedicated lubricant to the metal guide rails; avoid striking the panel with force, and during the rainy season keep an eye on the seal rings of outdoor lock bodies." },
];

const BRAND_INSTALL = [
  "Before ordering, use calipers to verify door thickness, bore spacing and lock type (mortise lock body / Euro cylinder / US standard), and confirm left/right handing and compatibility with the door frame dimensions",
  "Install the lock body and panels step by step per the included manual, keeping wiring tidy to avoid pinching; power on for self-test after inserting the batteries to ensure the front and rear panels communicate correctly",
  "Turn on Bluetooth and pair from up close, then add the lock in the TTLock App, complete initialization and enroll administrator fingerprints, passwords and cards",
  "For remote features, add a nearby WiFi gateway and connect it to the network; once bound, you can remotely issue passwords, view access logs and check battery level",
  "Before handover, repeatedly test fingerprint, password, card swipe, App and mechanical key unlocking, calibrate the latch bolt travel and full lock-up, and confirm the alarm and battery level work properly",
];

const BRAND_CERTS = [
  "China Compulsory Certification CCC — the baseline requirement for compliant market entry of electronic door lock products",
  "Electrical safety meets CE / RoHS requirements, components are free of hazardous substances, and low-voltage operation is safe and reliable",
  "Data transmission uses AES encryption, cloud and App communications are protected, and temporary passwords and eKeys can be revoked remotely to safeguard access data",
  "Compatible with the TTLock App and Sciener cloud platform, with open APIs / SDK that integrate with hotel PMS, apartment management and third-party smart home systems",
  "The complete unit and core electronic module are warranted, with after-sales and spare-part support per the sales agreement",
];

const BRAND_PACK = [
  { label: "Packaging", value: "Retail color box with EPE foam and partition slots, with front and rear panels secured in separate compartments to prevent impact damage" },
  { label: "Included Accessories", value: "Mounting screw pack, mechanical emergency key, batteries, proximity cards and a bilingual (Chinese/English) manual (varies by model)" },
  { label: "Minimum Order", value: "Priced by volume; mixed orders across models and colors supported, with project orders negotiable" },
  { label: "Lead Time", value: "Standard models ship fast from stock; custom panels and OEM orders are negotiated per order (reference 15–30 days)" },
  { label: "Samples", value: "Complete sample locks and a demo account are available, so you can try the unlocking and App management workflow before placing a bulk order" },
];

const LOCK: SeriesMeta = {
  story:
      "The TTLock smart lock turns an ordinary door into a gateway that understands your phone — choose any of five methods: fingerprint, password, card swipe, App Bluetooth or mechanical key, and a light touch sends the latch sliding back. From BOSS and MYSTIC to RIO and SPIN, TTLock ties the entire lock family together through one unified App, so whether you pick black, white or silver, everything is managed from the same interface. Add a WiFi gateway and, from a thousand miles away, you can remotely issue a time-limited password to a guest who has just arrived downstairs and see in real time exactly when that door is opened. It is not just more secure — it turns the small act of opening a door into an experience of effortless control.",
    heritage:
      "The smart lock is the heart and face of the TTLock ecosystem — the platform extends outward from it to gateways, doorbells, door sensors and cameras, forming a complete smart access landscape. Over the years TTLock has been adopted by tens of thousands of apartments, vacation rentals and offices worldwide, building a track record of stable, reliable unlocking and a mature management back end.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "Fingerprint / password / card swipe / App Bluetooth / mechanical key (varies by model)" },
      { label: "Communication Bluetooth", value: "Bluetooth 5.0 low energy, pair from up close with your phone, with local unlocking and configuration even without a network" },
      { label: "Gateway WiFi", value: "Adding a WiFi gateway enables remote password issuance, remote unlocking and access log uploads" },
      { label: "Power", value: "Dry-cell battery powered with App low-battery alerts; select models include a Type-C / 9V emergency power port" },
      { label: "Materials & Craft", value: "Zinc alloy / aluminum alloy panels, tempered glass or brushed metal finish, semiconductor fingerprint reader" },
      { label: "Applications", value: "Rental apartments, vacation rentals, hotels, offices and smart home entry doors" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "📲", title: "Remote App Management", desc: "Paired with a WiFi gateway, issue passwords remotely, unlock remotely and view entry logs — your lock is right in the palm of your hand." },
      { icon: "🔑", title: "Five-in-One Unlocking", desc: "Fingerprint / password / card / App / key — family and guests each use what suits them, convenient and secure." },
      { icon: "🏨", title: "One Room, One Code", desc: "Issue guests a one-time or time-limited password that expires automatically at checkout, simplifying rental and short-stay management." },
      { icon: "🔋", title: "Long-Lasting Power", desc: "Low-power design with low-battery alerts, plus an emergency power port so you are never locked out." },
      { icon: "🛡️", title: "Anti-Tamper Alarm", desc: "Forced prying or repeated errors trigger a local alarm and App push notification, adding an extra line of defense." },
    ],
    projectShowcase: [
      "Whole-building re-keying for long-term rentals and Airbnb short stays, with centralized one-code-per-room management",
      "Self check-in for boutique vacation rentals and inns, with remote code issuance that eliminates front-desk waiting",
      "Permission assignment by person for offices and co-working spaces, with instant revocation on departure",
    ],
    faq: [
      { q: "Can the TTLock smart lock be controlled remotely?", a: "Yes. The lock itself is managed nearby via Bluetooth, and once you add a networked WiFi gateway, you can remotely issue passwords, unlock remotely and view entry logs from the App." },
      { q: "Is it suitable for rental apartment or hotel management?", a: "Very much so. You can issue each guest a one-time or time-limited password that expires automatically, and manage multiple locks and permissions centrally from a single back end." },
      { q: "Will I be locked out if the battery dies?", a: "No. The App alerts you in advance about low battery; most models have a Type-C or 9V emergency power port on the underside, so you can draw temporary power to open the door, and a mechanical key serves as a final backup." },
      { q: "What are the minimum order quantity and lead time?", a: "Priced by volume, with mixed orders across models and colors supported; standard models ship fast from stock, while custom panels have lead times negotiated per order." },
    ],
};

export const TTLOCK_SERIES_META: Record<string, SeriesMeta> = {
  "smart-lock": LOCK,
  deadbolt: LOCK,
  other: LOCK,
  lever: {
    story:
      "The TTLock smart lever lock (HANDLE) tucks the intelligence of an electronic lock into a comfortable, ready-to-grip handle — an all-in-one lever design where a simple push-down opens the door, matching the instinctive motion of everyday doors. It is built to be easy to install and easy to use, upgrading interior and entry doors to fingerprint, password, card and App multi-method unlocking without major modifications to the door. Its clean black and white finishes blend in anywhere, from apartment doors to office partitions. For any space that wants quick, low-cost smart upgrades, it is the most effortless place to start.",
    heritage:
      "The lever lock is the member of the TTLock family closest to everyday flow — it carries full smart unlocking capability through the most familiar push-down opening motion. It means going smart no longer requires planning from scratch; even an old door can be upgraded elegantly.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "Fingerprint / password / card swipe / App Bluetooth / mechanical key (varies by model)" },
      { label: "Communication Bluetooth", value: "Bluetooth 5.0 nearby pairing, enroll fingerprints, passwords and cards locally via the App" },
      { label: "Gateway WiFi", value: "Optional WiFi gateway for remote password issuance and access logs" },
      { label: "Power", value: "Dry-cell battery powered, App low-battery alerts, emergency power port as backup" },
      { label: "Form Factor", value: "All-in-one lever, push-down to open, easy to install without major door modifications" },
      { label: "Applications", value: "Room doors, entry doors, office partitions and other door types" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🚪", title: "Push to Open", desc: "Pushing the handle down to open is intuitive, so seniors and children alike pick it up easily." },
      { icon: "🔧", title: "Easy to Install & Retrofit", desc: "No major door modifications required, so even old doors quickly upgrade to a smart lock." },
      { icon: "📲", title: "App Management", desc: "With a gateway, issue passwords remotely and view logs, managing multiple doors centrally." },
      { icon: "🔑", title: "Multiple Unlock Methods", desc: "Choose fingerprint / password / card / App / key — convenient for family and guests alike." },
      { icon: "🎨", title: "Versatile Black & White", desc: "Clean finishes blend into any décor style, equally at home in apartments and offices." },
    ],
    projectShowcase: [
      "Bulk upgrades of rental apartment doors, with tenants self-managing passwords",
      "Permission-based fingerprint and card assignment for offices and meeting-room partitions",
      "Fast smart upgrades for vacation rental rooms, installed without major door modifications",
    ],
    faq: [
      { q: "Is the lever lock difficult to install?", a: "No. The all-in-one lever design requires no major door modifications — just install step by step per the manual, and it fits most standard room and entry doors." },
      { q: "Can I issue passwords remotely?", a: "The lock is managed locally via Bluetooth, and with an optional networked WiFi gateway you can issue passwords remotely and view access logs." },
      { q: "Which unlocking methods are supported?", a: "It supports fingerprint, password, card swipe, App Bluetooth and mechanical key, with the exact combination varying by model." },
      { q: "What about minimum order and customization?", a: "Priced by volume, with black and white finishes and mixed models supported; project orders allow negotiated custom configurations." },
    ],
  },
  cylinder: {
    story:
      "The TTLock smart cylinder (SMART CYLINDER) is a gentle upgrade for an old door — without replacing the whole lockset, it swaps that unremarkable Euro cylinder for a smart core that goes online and issues codes. With a single turn, the App, a password or a mechanical key all open the door, while the original door face and body stay untouched. It is especially suited to hotels and apartments where lock specifications are standardized: one cylinder swap and an entire building's doors join smart management. This is the most restrained — and smartest — path to going digital: the smallest change for the greatest control.",
    heritage:
      "The smart cylinder makes upgrading old locks effortless — it condenses the power of smart access into a standard cylinder, sparing the cost and labor of replacing the whole door. For existing buildings and hotel chains, it is the most pragmatic transitional solution.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "App Bluetooth / password (keypad models) / mechanical key (varies by model)" },
      { label: "Communication Bluetooth", value: "Bluetooth 5.0 nearby pairing, with authorization and password management done in the App" },
      { label: "Gateway WiFi", value: "With a WiFi gateway, supports remote password issuance and unlock logs" },
      { label: "Power", value: "Built-in button cell / rechargeable battery, App low-battery alerts" },
      { label: "Specifications", value: "Euro cylinder dimensions, multiple lengths available (e.g. 35+35), a direct replacement for standard cylinders" },
      { label: "Applications", value: "Upgrading existing hotel and apartment locks without replacing the entire lockset" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "♻️", title: "Swap Cylinder, Instant Upgrade", desc: "Replace only the cylinder, not the whole lockset, keeping the door face and body as they were." },
      { icon: "💰", title: "Cost-Saving Retrofit", desc: "Bulk upgrades for existing buildings and hotel chains sharply reduce labor and expense." },
      { icon: "📲", title: "Centralized App Control", desc: "With a gateway, issue codes and check logs remotely, managing a whole building's doors in one place." },
      { icon: "🔑", title: "Key Backup", desc: "Mechanical key unlocking is retained, providing a reliable fallback even with battery issues." },
      { icon: "📐", title: "Euro Standard Compatibility", desc: "Standard Euro dimensions in multiple lengths, with strong compatibility and easy replacement." },
    ],
    projectShowcase: [
      "Bulk cylinder swaps to standard specs across hotel chains, joining centralized access management",
      "Low-cost smart upgrades for existing apartments while keeping the original door face",
      "Standard cylinder upgrades for office buildings, with permissions issued by department",
    ],
    faq: [
      { q: "Does the smart cylinder require replacing the whole lock?", a: "No. It directly replaces a standard Euro cylinder, leaving the door body, face and handle as they are — the most hassle-free way to upgrade." },
      { q: "How do I confirm the right size?", a: "Measure the original cylinder length before ordering (e.g. 35+35) and choose the matching spec; if unsure, provide the door thickness and existing cylinder size and we will verify it for you." },
      { q: "Does it support remote management?", a: "The cylinder is managed locally via App Bluetooth, and with an added WiFi gateway you can issue passwords remotely and view unlock logs." },
      { q: "Is it suitable for bulk hotel use?", a: "Very suitable. Hotels with standardized lock specs can join smart management across an entire building with a single cylinder swap, issuing and revoking permissions centrally." },
    ],
  },
  padlock: {
    story:
      "The TTLock smart padlock (PADLOCK) frees unlocking from the key ring in your pocket — one press of a fingerprint or one tap in the App and the shackle springs open. It is born to face sun and rain, with a waterproof, weatherproof body that handles the outdoors with ease and a built-in rechargeable battery that spares you frequent replacements. From warehouses and electrical cabinets to lockers and vehicles, wherever you need flexible locking but fear losing keys, it fills the gap. This is a key you can carry anywhere, use anywhere and authorize remotely.",
    heritage:
      "The smart padlock is the most mobile member of the TTLock ecosystem — it brings the convenience of keyless unlocking to the mobile and outdoor scenarios that fixed door locks cannot reach, so your management radius is no longer bound to a single door.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "Fingerprint / App Bluetooth (varies by model)" },
      { label: "Communication Bluetooth", value: "Bluetooth 5.0 nearby pairing, with App authorization and shareable unlock permissions" },
      { label: "Gateway WiFi", value: "Optional gateway for remote authorization and unlock log uploads" },
      { label: "Power", value: "Built-in rechargeable lithium battery, USB charging, long battery life" },
      { label: "Protection", value: "Waterproof, weatherproof body with a hardened shackle, suited to outdoor environments" },
      { label: "Applications", value: "Access control, lockers, warehouses, electrical cabinets, vehicles and other mobile and outdoor scenarios" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🔒", title: "Keyless Unlocking", desc: "Open with a fingerprint or the App — say goodbye to lost keys and copying hassles." },
      { icon: "💧", title: "Waterproof & Weatherproof", desc: "Unfazed by outdoor wind, rain and sun, dependable for warehouses, vehicles and electrical cabinets." },
      { icon: "🔋", title: "Rechargeable Battery Life", desc: "Built-in rechargeable battery with USB power, long-lasting and free of frequent swaps." },
      { icon: "📲", title: "Remote Authorization", desc: "With a gateway, share or revoke unlock permissions remotely for flexible management." },
      { icon: "🧳", title: "Carry-Anywhere Flexibility", desc: "Carry it along and lock anywhere, suited to mobile and temporary scenarios." },
    ],
    projectShowcase: [
      "Keyless management of warehouses and electrical cabinets, with permissions distributed remotely",
      "Waterproof locking of outdoor cabinets and equipment boxes, with multi-user temporary authorization",
      "Flexible locking of vehicles and mobile assets, with traceable unlock logs",
    ],
    faq: [
      { q: "Can the smart padlock be used outdoors?", a: "Yes. The body is waterproof and weatherproof and the shackle is hardened, suited to wind, rain and sun, and commonly used on warehouses, electrical cabinets and equipment lockers." },
      { q: "How does it charge?", a: "It has a built-in rechargeable lithium battery and charges via USB, with long battery life that spares you frequent battery swaps." },
      { q: "Can multiple people share it?", a: "Yes. Authorize multiple users to unlock via the App, and with a gateway you can also share or revoke permissions remotely." },
      { q: "What about minimum order and lead time?", a: "Priced by volume, with mixed models supported; standard items ship fast from stock, and custom items are negotiated per order." },
    ],
  },
  outdoor: {
    story:
      "The TTLock outdoor lock and access series (G-series gateways and access control) is the key link that extends smart access into the wind and rain — a weatherproof body endures sun and rain while App and password unlocking bring courtyard gates and campus access into unified management. From the WiFi connectivity of the G2 to the wired LAN port of the G3, the GSM mobile network of the G4 and the dual-band WiFi of the G5, different connectivity options cover everything from homes to campuses. Even when a gate is far from the router, it finds a path to get online. This is a smart boundary that keeps out the weather while staying connected to the cloud.",
    heritage:
      "The outdoor series withstands harsh environments — it takes TTLock's smart access beyond indoor entry doors, extending it to courtyards, campuses and public entrances, and bringing connectivity and remote management to a wider boundary.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "App Bluetooth / password / card swipe (varies by model)" },
      { label: "Communication Bluetooth", value: "Managed via nearby Bluetooth pairing, with local unlocking even without a network" },
      { label: "Gateway WiFi", value: "G2 WiFi / G3 LAN port / G4 GSM / G5 dual-band WiFi, multiple connectivity options available" },
      { label: "Power", value: "Powered by an adapter, with select models supporting PoE power over Ethernet" },
      { label: "Protection", value: "Weatherproof body, water- and dust-resistant, suited to outdoor gates and campus entrances" },
      { label: "Applications", value: "Courtyard gates, campus access, outdoor entrances and other exterior areas" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🌧️", title: "Weatherproof & Waterproof", desc: "Withstands wind, sun and rain, suited to courtyard gates and outdoor access control." },
      { icon: "📡", title: "Multiple Connectivity", desc: "WiFi / LAN port / GSM / dual-band options — even gates far from the router can get online." },
      { icon: "📲", title: "Remote Door Opening", desc: "Unlock remotely and issue passwords via the App, so visitors need no on-site greeting." },
      { icon: "🔌", title: "Flexible Power", desc: "Powered by an adapter or PoE over Ethernet, easing a range of wiring scenarios." },
      { icon: "🏘️", title: "Campus-Ready", desc: "Covers a range of outdoor access scenarios from home courtyards to campus entrances." },
    ],
    projectShowcase: [
      "Remote unlocking of villa courtyards and yard gates, with no on-site greeting needed for visitors",
      "Campus and factory entrances connected via gateway for unified networked management",
      "Flexible networked deployment of outdoor public entrances via GSM or PoE",
    ],
    faq: [
      { q: "How do I get online when an outdoor gate is far from the router?", a: "Choose a connectivity method to suit the environment: pick G2 / G5 near WiFi, G3 where there is a LAN port, or the G4's GSM mobile network where there is no fixed-line coverage." },
      { q: "Is the outdoor lock waterproof?", a: "The waterproof, weatherproof body is purpose-built for outdoors, withstanding wind, sun and rain, and suited to courtyard gates and campus entrances." },
      { q: "Can I open the door remotely for visitors?", a: "Yes. Once online, unlock remotely or issue a temporary password via the App, and visitors can enter the moment they reach the gate." },
      { q: "How is power handled?", a: "Powered by an adapter, with select gateway models supporting PoE power over Ethernet for more flexible wiring." },
    ],
  },
  motorlock: {
    story:
      "The TTLock motor lock (MOTOR LOCK) is built for modern glass and aluminum doors — a built-in motor drives the latch bolt to extend and retract automatically, opening and closing smoothly and quietly, with none of the drag of manual operation. One App command or one password and the door unlocks or closes crisply, a perfect fit for the airy, transparent glass façades of shops and office buildings. It extends smart access from heavy entry doors to modern commercial spaces, making the act of opening and closing a door itself something graceful. When a space pursues lightness, transparency and automation, the motor lock is the quiet, decisive executor.",
    heritage:
      "The motor lock suits commercial doors and modern glass doors — by opening and closing automatically with a motor, it fills the smart-access gap for glass and aluminum doors, letting transparent commercial spaces enjoy keyless management too.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "App Bluetooth / password / card swipe (varies by model)" },
      { label: "Communication Bluetooth", value: "Managed via nearby Bluetooth pairing, with enrollment and authorization in the App" },
      { label: "Gateway WiFi", value: "With a WiFi gateway, unlock remotely, issue passwords and check logs" },
      { label: "Power", value: "Powered by an adapter, with the motor driving the latch bolt to extend and retract automatically" },
      { label: "Structure", value: "Motor-driven automatic open and close, quiet and smooth, suited to glass / aluminum doors" },
      { label: "Applications", value: "Glass and aluminum doors in shops, office buildings and showrooms" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "⚙️", title: "Motorized Automation", desc: "The motor drives the latch bolt to extend and retract automatically — smooth, quiet and effortless." },
      { icon: "🚪", title: "Glass Door Ready", desc: "Designed for glass and aluminum doors, blending into transparent commercial façades." },
      { icon: "📲", title: "Remote Unlocking", desc: "With a gateway, open the door, issue passwords and view logs remotely from the App." },
      { icon: "🏢", title: "Commercial First Choice", desc: "A fit for shops, office buildings and showrooms, elevating the smart experience of any façade." },
      { icon: "🔑", title: "Multiple Unlock Methods", desc: "Flexible combinations of App / password / card swipe, serving visitors and staff alike." },
    ],
    projectShowcase: [
      "Automatic open and close of glass doors at shops and brand stores, elevating the storefront experience",
      "Permission-based management of aluminum doors at office lobbies and meeting areas",
      "Remote control of glass door opening and closing in showrooms and display spaces",
    ],
    faq: [
      { q: "Can the motor lock be installed on a glass door?", a: "Yes. The motor lock is designed for glass and aluminum doors, with a motor driving the latch bolt automatically for smooth, quiet operation that fits transparent commercial façades." },
      { q: "How does it differ from an ordinary smart lock?", a: "The motor lock completes opening and closing automatically via a built-in motor, with no manual operation needed — better suited to the usage habits of modern commercial glass doors." },
      { q: "Does it support remote control?", a: "It is managed locally via App Bluetooth, and with an added WiFi gateway you can unlock remotely, issue passwords and view logs." },
      { q: "What is the power method?", a: "It uses an adapter to drive the motor; just wire it per the manual during installation, and it runs reliably." },
    ],
  },
  gateway: {
    story:
      "The TTLock gateway (GATEWAY) is the remote hub of the entire smart lock system — it bridges Bluetooth locks and your home WiFi, connecting locks that could once only be managed up close to the cloud. Plug it in, connect it to the network, and the lock can now be issued passwords and unlocked remotely, with access logs uploaded to the App in real time. From an entry-level gateway like the RENTY WiFi to the multi-form connectivity of the G-series, it extends a lock's reach from your doorstep to the far horizon. Without it, a lock is an island; with it, the whole access system truly comes alive.",
    heritage:
      "The gateway is the remote connectivity hub of the TTLock system — it upgrades a Bluetooth lock's local capability into cloud-reachable remote management, an indispensable link for apartments and hotels running centralized access operations.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "Does not unlock directly; provides remote unlocking and code-issuance channels for the lock" },
      { label: "Communication Bluetooth", value: "Connects to nearby TTLock locks via Bluetooth, bridging their local communication" },
      { label: "Gateway WiFi", value: "Uplinks to home / project WiFi, bridging Bluetooth and WiFi to reach the cloud" },
      { label: "Power", value: "Powered by a plug-in adapter, staying online continuously to maintain the connection" },
      { label: "Compatibility", value: "Compatible with TTLock locks, lever locks, cylinders, padlocks and other devices" },
      { label: "Applications", value: "Apartments, hotels, offices and other scenarios needing remote and centralized lock management" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "📡", title: "Remote Connectivity", desc: "Bluetooth locks join WiFi via the gateway, so unlocking and code issuance are no longer distance-limited." },
      { icon: "📲", title: "Log Uploads", desc: "Access logs upload to the App in real time, so who entered and when is clear at a glance." },
      { icon: "🏨", title: "Centralized Management", desc: "Apartments and hotels run multiple locks from one back end, issuing and revoking efficiently." },
      { icon: "🔌", title: "Plug and Play", desc: "Just plug in, connect to the network and bind — simple to install and always online." },
      { icon: "🧩", title: "Ecosystem Compatibility", desc: "Compatible with locks, lever locks, cylinders and padlocks, expanding the whole access system." },
    ],
    projectShowcase: [
      "Centralized gateway deployment for long-term rentals, with whole-building remote code issuance and management",
      "Remote check-in for vacation rentals and hotels, with access logs uploaded in real time",
      "Multi-door coordination for office spaces, with permissions issued and revoked centrally in the back end",
    ],
    faq: [
      { q: "What is the gateway for?", a: "It is the bridge between Bluetooth locks and WiFi; once a lock joins the cloud through the gateway, you can issue passwords remotely, unlock remotely and upload access logs." },
      { q: "How many locks can one gateway support?", a: "It can connect to multiple TTLock locks within range; the exact number depends on the model and on-site signal, and dense scenarios can add more gateways." },
      { q: "How is the gateway installed?", a: "Plug it in, connect to WiFi and bind nearby locks in the App — no complex wiring required, and it stays online continuously to maintain the connection." },
      { q: "Can the lock still be used if the network goes down?", a: "Yes. The lock's local fingerprint, password, card swipe and Bluetooth unlocking are unaffected; only remote functions are temporarily unavailable during an outage and sync automatically once the connection is restored." },
    ],
  },
};

/** Helper: retrieve metadata by seriesOriginal, falling back to smart-lock by default. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TTLOCK_SERIES_META[seriesOriginal.trim()] || TTLOCK_SERIES_META["smart-lock"];
}
