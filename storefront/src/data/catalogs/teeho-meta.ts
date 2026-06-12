/**
 * TEEHO smart lock series metadata — rich content for product detail pages.
 * Indexed by seriesOriginal (catKey): keypad-deadbolt / lever-lock / handle-set /
 * wifi-lock / wifi-handle / smart-handle / gateway / other.
 * Sources: teeho.com (official Shopify storefront, export-grade electronic / smart
 * door locks, primarily serving the US market), verified product specifications
 * plus general smart-door-lock industry process notes.
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
  "TEEHO is a brand focused on consumer-grade electronic and smart door locks, distributed through both D2C and B2B channels, with every product — from the mechanical lock body to the electronic main board — engineered and quality-controlled to residential electronic door lock standards",
  "The full lineup spans keypad deadbolts, keypad lever locks, handle sets, WiFi smart locks, smart handles and a companion gateway, with unified unlocking logic and interchangeable accessories that make complete-set delivery and long-term maintenance simple",
  "Lock bodies typically pair die-cast zinc-alloy / aluminum-alloy faceplates with stainless-steel bolts, offered in three finishes — Matte Black, Satin Nickel and Antique Bronze — balancing durability with a modern look",
  "The electronics run on a low-power main controller powered by 4 AA batteries, with a low-battery red-light alert plus a mechanical backup key / emergency power port, so you are never locked out when the power runs down",
  "Available for bulk / container-load minimum orders, with mixed-model shipments supported, and finishes and retail packaging that can be coordinated to project requirements",
];

const BRAND_CARE = [
  { title: "Battery Care", desc: "Use brand-name alkaline AA batteries for roughly a year of runtime; replace the whole set as soon as the panel shows a red light or low-battery prompt, and avoid mixing old and new cells, which leads to unstable power." },
  { title: "Sensor & Keypad Cleaning", desc: "Wipe the fingerprint sensor and keypad with a dry soft cloth; removing grease and fingerprint residue improves recognition. Never rinse with water or spray cleaners containing alcohol or harsh solvents." },
  { title: "Code & Access Security", desc: "Change the master code regularly and delete one-time guest codes promptly after use; make full use of the anti-peeping decoy-code feature by adding random digits before or after your real code to thwart onlookers." },
  { title: "Outdoor Protection", desc: "For exterior-facing doors, confirm the protection rating (IP54 / IP55); during the rainy season, check the condition of the weatherproof gasket and avoid letting standing water pool against the keypad and keyhole for long periods." },
];

const BRAND_INSTALL = [
  "Before ordering, verify the door specs: a common fit range of 35-50mm door thickness (about 1-3/8 to 2 inches) and the bolt backset, and confirm the door handing (works for both left- and right-hand doors)",
  "Remove the existing hardware and locate the mounting holes per the manual; most models reuse the standard bore, so no new drilling is needed to replace the old lock",
  "Mechanical installation takes just a screwdriver — no wiring and no specialty tools — and a single person can finish in about 15-30 minutes (DIY-friendly)",
  "After powering up, enroll the administrator fingerprint / code; for connected models, follow the prompts to link WiFi / Bluetooth and the mobile app, then bind the household account",
  "Run a full test before handover: locking / unlocking, auto-lock timing, always-open mode, the mechanical backup key and the battery indicator all need to be confirmed one by one",
];

const BRAND_CERTS = [
  "Electronic door lock electrical safety certification — the main controller and power circuit are designed to international electronic safety standards, with safe and reliable low-voltage DC power",
  "Residential door lock mechanical standard — lock body strength references ANSI/BHMA grades (some models reach Grade 3), with a durable bolt",
  "RoHS hazardous substance restriction — built with eco-friendly, safe materials that meet export-market environmental requirements",
  "Fingerprint / code data encryption — biometric and code information is encrypted and stored locally, with repeated wrong entries triggering keypad-lockout protection",
  "Wireless module compliance — the RF section of the WiFi / Bluetooth series meets general radio-electrical standards (such as CCC / FCC-class rules)",
];

const BRAND_PACK = [
  { label: "Retail Packaging", value: "Color-box retail pack containing the lock body, faceplate, mounting hardware and manual, with molded-foam protection" },
  { label: "Included Accessories", value: "Mounting screws, mechanical backup keys, installation template and manual; batteries included depending on model" },
  { label: "Minimum Order", value: "Priced by bulk / container load, with mixed-model and mixed-finish shipments supported" },
  { label: "Lead Time", value: "Stock models ship quickly; custom finishes / packaging are confirmed by negotiation with the order" },
  { label: "Samples", value: "Sample locks can be supplied for fit verification and hands-on feel before placing a bulk order" },
];

export const TEEHO_SERIES_META: Record<string, SeriesMeta> = {
  "keypad-deadbolt": {
    story:
      "The TEEHO keypad deadbolt is the plainest and most dependable category in the whole lineup — it does not connect to the internet, does not rely on a phone and needs no gateway. The door opens with a code in your head or a fingerprint at your fingertip. The backlit keypad stays clearly legible at night; the TE001 is code-only while the TE002 adds fingerprint recognition, reading a print in about 0.3 seconds and opening in about 1 second for a crisp, decisive entry. It is built for harsh northern winters and humid southern rainy seasons alike: IP54 protection, reliable operation from minus thirty to seventy degrees Celsius, and 4 AA batteries that last a full year. For anyone who does not want to fuss with a smart ecosystem and just wants a worry-free, easy-to-use front door lock, this is the answer.",
    heritage:
      "The keypad deadbolt is TEEHO's most popular, steadiest-selling foundational model for entry and passage doors, and the starting point of the brand's reputation. It makes the keyless experience supremely simple — no learning curve, no setup, just install and go.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "Fingerprint (TE002), keypad PIN code, one-time code, 2 mechanical backup keys" },
      { label: "Material", value: "Die-cast zinc / aluminum-alloy faceplate + stainless-steel bolt; Matte Black / Satin Nickel / Antique Bronze" },
      { label: "Power", value: "Powered by 4 AA batteries, with a red-light alert below 15% charge (non-lithium design)" },
      { label: "Runtime", value: "About 12 months in normal use; low-battery alert means you are never locked out" },
      { label: "Connectivity", value: "None — fully offline operation, no reliance on app / WiFi / Bluetooth" },
      { label: "Compatible Doors", value: "Standard entry / passage doors, about 35-50mm thick, works for left- and right-hand doors" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🔐", title: "Fingerprint + Code", desc: "The TE002 supports up to 20 fingerprints and 20 code sets, giving each family member their own way in, in about one second." },
      { icon: "📴", title: "Completely Offline", desc: "No internet, no app binding — no privacy worries and no outage hassles. It works right out of the box and never charges a fee." },
      { icon: "🔄", title: "Auto-Lock", desc: "Re-locks automatically 10-99 seconds after the door closes, or lock instantly with a long press of any key — never worry about a forgotten lock again." },
      { icon: "❄️", title: "All-Weather Durability", desc: "IP54 protection with stable operation from minus thirty to seventy degrees Celsius, handling bitter cold, scorching heat and rain with ease." },
      { icon: "🔑", title: "Mechanical Backup Key", desc: "Comes with 2 backup keys so you can still get in calmly even if the batteries die unexpectedly — one more layer of peace of mind." },
    ],
    projectShowcase: [
      "Owner-occupied entry doors — a worry-free, offline keyless upgrade",
      "Households with elderly residents living alone — fingerprint + backup key double assurance, no problem even if codes are forgotten",
      "Front doors of villas / rural homes with no network coverage",
    ],
    faq: [
      { q: "Does the keypad deadbolt need internet or an app?", a: "No. It is a fully offline standalone lock — all fingerprints and codes are stored locally, with no WiFi, Bluetooth or monthly fee, and it works normally even when the network is down." },
      { q: "What if I forget the code or the batteries die?", a: "The 2 included mechanical backup keys open the door directly; when the charge drops below 15%, the panel red light alerts you early, so just replace the full set of 4 AA batteries in time." },
      { q: "How do I choose between the TE001 and TE002?", a: "If you only need a code + key, choose the TE001; if you want one-touch fingerprint entry and per-family-member fingerprint management, choose the TE002 with fingerprint recognition." },
      { q: "Will it fit my existing door?", a: "It fits standard doors about 35-50mm thick, reuses the common bore, and works for left- and right-hand doors; just verify door thickness and bolt backset by model before ordering." },
    ],
  },

  "lever-lock": {
    story:
      "Not every door suits a round, chunky deadbolt knob — bedroom doors, office doors and exterior-facing passage doors are more at home with a lever you press to open. The TEEHO keypad lever lock tucks electronic unlocking into a handy lever: enter a PIN on the backlit keypad for keyless entry, while the TE003 / TE004 also add anti-peeping decoy codes and an away mode. When guests arrive, send a one-time code that expires automatically after use. The lever is one-piece with a solid grip, and IP54 weather resistance lets it hold its own even on exterior-facing doors. It hides the convenience of a smart lock inside the door-opening motion you know best.",
    heritage:
      "The lever lock series serves doors that need a handle rather than a plain deadbolt — across Western residential and office settings, the lever is the most natural way to open a door. With it, TEEHO completes coverage from the front door to interior doors.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "Keypad PIN code, one-time guest code, mechanical backup key; anti-peeping decoy code" },
      { label: "Material", value: "One-piece alloy lever + stainless-steel bolt construction; Matte Black / Satin Nickel" },
      { label: "Power", value: "Powered by 4 AA batteries, with a low-battery red-light alert (non-lithium design)" },
      { label: "Runtime", value: "About a year or more in normal use, with a low-battery alert" },
      { label: "Connectivity", value: "None — standalone keypad lock, no reliance on app / WiFi / Bluetooth" },
      { label: "Compatible Doors", value: "Bedroom / entry / office doors; IP54 weather resistance for exterior-facing doors, about -31°F to 150°F" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🚪", title: "Lever Entry", desc: "Press the lever and it opens, matching how most people open doors — ideal for bedroom, office and passage doors." },
      { icon: "🔢", title: "Keyless Codes", desc: "Enter a PIN on the backlit keypad to get in, leaving behind the hassle of carrying, finding and copying keys." },
      { icon: "👁️", title: "Anti-Peeping Codes", desc: "Add random distractor digits before or after your real code so onlookers cannot guess it, making public doors more secure." },
      { icon: "🏃", title: "Away Mode", desc: "Enter energy-saving away mode with one touch when leaving home, disabling temporary codes for both security and power savings." },
      { icon: "🔑", title: "Backup Key", desc: "Comes with a spare mechanical key so you can still open the door manually if the electronics misbehave — reassuring in daily use." },
    ],
    projectShowcase: [
      "Residential bedroom / interior doors — handle entry is more comfortable",
      "Small offices and studio entrances — code management for multi-person access",
      "Exterior-facing courtyard / side doors — IP54 weather resistance stands up to wind and rain",
    ],
    faq: [
      { q: "What is the difference between a lever lock and a deadbolt?", a: "A deadbolt relies on a knob + bolt, while a lever lock integrates electronic unlocking into the lever for press-to-open entry, making it better suited to bedroom and office doors where people are used to a handle." },
      { q: "Can I give guests temporary access?", a: "Yes. It supports generating one-time guest PIN codes that delete automatically after a single use, so cleaners, repair crews and visitors can come and go temporarily without exposing your master code." },
      { q: "What is an anti-peeping decoy code?", a: "Enter any string of unrelated digits before or after your real code; as long as the correct code is contained within it, the lock opens — so even if onlookers see it, they cannot memorize your real code." },
      { q: "Can it go on a door exposed to rain?", a: "Yes. The lever lock reaches IP54 weather resistance with an operating range of about -31°F to 150°F, suitable for exterior-facing passage doors, though prolonged standing-water soaking should be avoided." },
    ],
  },

  "handle-set": {
    story:
      "The entry door is the face of a home and the first line of security. The TEEHO handle set combines a keypad / fingerprint deadbolt with a matching handle set — one lock guarding the safety inside, one coordinated handle carrying the dignity outside. The TE001L / TE002K / TE002L / TE004 / TK001H span code-only to fingerprint recognition: a fingerprint opens the door in about a second, 20 code sets can be assigned to the whole family, auto-lock secures the door on its own, and one-time guest codes self-destruct after use. An ANSI Grade 3 cylinder and alloy lock body stand up to daily use, and a screwdriver swaps in the new set in about fifteen minutes. What it gives the entry door is visible beauty and invisible reassurance.",
    heritage:
      "The handle set is the complete solution for the entry door — in North American homes, a deadbolt plus a matching handle is the standard pairing for a front door. TEEHO turns this combination into a one-piece set with synchronized unlocking and a coordinated look, making the upgrade complete in a single step.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "Fingerprint (select models), keypad PIN code, one-time code, mechanical backup key" },
      { label: "Material", value: "Deadbolt body + matching handle set; durable alloy cylinder, multiple finishes" },
      { label: "Power", value: "Powered by 4 AA batteries, with a low-battery red-light alert (non-lithium design)" },
      { label: "Runtime", value: "About a year or more in normal use, with an early low-battery prompt" },
      { label: "Connectivity", value: "None — offline set, no reliance on app / WiFi / Bluetooth" },
      { label: "Compatible Doors", value: "Entry / exterior-facade doors, about 35-50mm thick; IP54 weather resistance, about -22°F to 158°F" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🏠", title: "Double Protection", desc: "A keypad / fingerprint deadbolt + a matching handle guard both sides of the door, making the entry door more secure." },
      { icon: "✨", title: "Coordinated Look", desc: "The lock body and handle share a unified finish for a coordinated, dignified whole-door appearance that elevates the entry's first impression." },
      { icon: "👆", title: "One-Second Fingerprint", desc: "Fingerprint models recognize quickly and open in about a second, so you can get in easily even with your hands full." },
      { icon: "🛡️", title: "ANSI Grade 3", desc: "The cylinder reaches residential Grade 3 with an alloy lock body — sturdy, durable and reassuring against pry attempts." },
      { icon: "⏱️", title: "Fast Installation", desc: "Done in about 15 minutes with a single screwdriver, works for left- and right-hand doors, and replaces the old lock directly." },
    ],
    projectShowcase: [
      "Whole-package upgrade for owner-occupied entry doors — security and curb appeal in one step",
      "Townhouse / single-family front doors — a matching handle set elevates the facade's quality feel",
      "Larger households needing to assign multiple codes / fingerprints to family members",
    ],
    faq: [
      { q: "What is included in the set?", a: "It includes a keypad / fingerprint deadbolt and a matching handle set (such as two interior levers or an exterior handle set), with linked unlocking and a unified finish — one installation completes the whole door." },
      { q: "How fast is the fingerprint model, and how many can it store?", a: "Fingerprint models read in about 0.3 seconds and unlock in about 1 second, storing up to about 20 fingerprints and 20 code sets — enough to manage the whole family and frequent guests separately." },
      { q: "Is installation complicated, and do I need a pro?", a: "No. It reuses the standard bore and takes about 15 minutes with just a screwdriver, works for left- and right-hand doors, and is DIY-friendly." },
      { q: "What is the lock's security rating?", a: "The deadbolt cylinder meets the ANSI Grade 3 residential standard, paired with a durable alloy lock body and IP54 weather resistance, making it suitable for long-term use on entry doors." },
    ],
  },

  "wifi-lock": {
    story:
      "Keeping the key in your head is not enough — the TEEHO WiFi smart lock lets you put the whole door inside your phone. The TE011W / TE012W have built-in WiFi, so you can unlock remotely, issue codes remotely and check who entered and when, all without an extra gateway. Give a cleaner a one-time code while you are out, get a phone alert when your child gets home from school, confirm late at night that you did not forget to lock — all with one tap. It is compatible with Alexa and Google Assistant for voice locking, and the TE012W adds fingerprint recognition and IP55 water resistance, weaving convenience, security and intelligence into one. This is a door lock that reports back on its own and takes commands from afar.",
    heritage:
      "The WiFi series formally connects TEEHO locks to the smart-home ecosystem — upgrading from a standalone door lock to a smart entry point that can be managed remotely, linked by voice and logged with records. It is a pivotal step in the brand's move toward the whole-home smart home.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "Fingerprint (TE012W), keypad code, app remote unlock, mechanical backup key" },
      { label: "Material", value: "Alloy faceplate + stainless-steel bolt; Matte Black / Satin Nickel, IP55 water resistance (TE012W)" },
      { label: "Power", value: "Powered by 4 AA batteries, with dual low-battery alerts via app / red light (non-lithium design)" },
      { label: "Runtime", value: "About a year in normal use; connectivity slightly increases drain, with a timely low-battery alert" },
      { label: "Connectivity", value: "Built-in WiFi for remote control without a separate gateway; compatible with Alexa / Google" },
      { label: "Compatible Doors", value: "Standard entry doors, about 35-50mm thick, works for left- and right-hand doors" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "📱", title: "Remote Control", desc: "Built-in WiFi needs no gateway — unlock, push codes and check lock status from your phone anytime, anywhere." },
      { icon: "📋", title: "Access Logs", desc: "The app automatically records who opened the door and when, making a child's arrival or a guest's visit clear at a glance for total peace of mind." },
      { icon: "🗣️", title: "Voice Control", desc: "Compatible with Alexa and Google Assistant for one-phrase locking, plugging into whole-home smart scenes." },
      { icon: "👆", title: "Fingerprint + Code", desc: "The TE012W adds fingerprint recognition and a keypad code, offering multiple local unlock methods so you can still get in even when the network is down." },
      { icon: "💧", title: "IP55 Water Resistance", desc: "The TE012W reaches IP55 protection, standing up to wind and rain on exterior-facing entry doors for more reliable outdoor use." },
    ],
    projectShowcase: [
      "Whole-home smart-home delivery projects — entry doors integrated into voice and automation scenes",
      "Remote owners / frequently traveling households — authorize entry remotely for family, friends and cleaners",
      "Residences and small offices that need an access-record trail",
    ],
    faq: [
      { q: "Do I need to buy a separate gateway for remote control?", a: "No. The WiFi series has a built-in WiFi module — connect it to your home router and you can directly unlock remotely, push codes and view logs, with no extra gateway or hub needed." },
      { q: "Can I still open the door during a network or power outage?", a: "Yes. Local keypad codes, fingerprint (TE012W) and the mechanical backup key do not rely on the network, so the door opens normally when offline; if the battery dies, just use the backup key." },
      { q: "Can it connect to Alexa or Google?", a: "Yes. The WiFi series is compatible with Amazon Alexa and Google Assistant; once linked, you can lock by voice and fold it into smart-home automation scenes." },
      { q: "Does connectivity use a lot of power?", a: "Connected models draw slightly more power than fully offline ones, but a single set of 4 AA batteries still lasts about a year in normal use, and both the app and panel give an early low-battery reminder to replace them." },
    ],
  },

  "wifi-handle": {
    story:
      "Take the remote power of a WiFi smart lock and put it inside the most dignified handle set on the entry door — that is the TEEHO WiFi handle lock. The TE012W-H comes with a one-piece lever, the TE012W-K with a dual-knob handle set, both with built-in WiFi for remote locking, code pushing and access viewing without a gateway, and the TE012W-K also supports one-second fingerprint entry. It has the complete look and entry-door quality of a handle set together with the remote control and access logs of a connected lock, in Matte Black and Satin Nickel finishes to match your facade. When you want a front door that is good-looking, smart and remotely manageable, it handles all three at once.",
    heritage:
      "The WiFi handle lock is the merger of the handle set and the WiFi smart lock — connecting to the smart home while preserving the complete look of the entry door, so remote management no longer comes at the cost of curb appeal. It is TEEHO's flagship combination for premium entry doors.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "Fingerprint (TE012W-K), keypad code, app remote unlock, mechanical backup key" },
      { label: "Material", value: "Deadbolt + matching handle set, alloy faceplate; Matte Black / Satin Nickel" },
      { label: "Power", value: "Powered by 4 AA batteries, with low-battery alerts via app / red light (non-lithium design)" },
      { label: "Runtime", value: "About a year in normal use; connectivity slightly increases drain, with a timely low-battery prompt" },
      { label: "Connectivity", value: "Built-in WiFi for app remote control and code pushing without a separate gateway" },
      { label: "Compatible Doors", value: "Standard entry / exterior-facade doors, about 35-50mm thick, works for left- and right-hand doors" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "📲", title: "Handle + Connectivity", desc: "The complete facade of a handle set plus built-in WiFi remote locking — you get both curb appeal and intelligence." },
      { icon: "🏠", title: "Complete Entry Set", desc: "A deadbolt + matching handle set with a coordinated, dignified look, purpose-built for entry-door quality." },
      { icon: "👆", title: "One-Second Fingerprint", desc: "The TE012W-K supports keyless fingerprint unlocking for fast entry, easy even when your hands are full." },
      { icon: "📡", title: "Gateway-Free Remote", desc: "Built-in WiFi connects directly to your router, so you can unlock remotely, authorize and view logs with no extra gateway." },
      { icon: "🎨", title: "Two Finishes", desc: "Matte Black and Satin Nickel finishes flexibly match different door colors and facade styles." },
    ],
    projectShowcase: [
      "Premium residential entry doors — when you want both curb appeal and remote management",
      "Smart-home show homes / turnkey fit-outs — a connected handle lock as the entry highlight",
      "Villa front doors that need remote authorization for family and visitors",
    ],
    faq: [
      { q: "How is a WiFi handle lock different from an ordinary WiFi smart lock?", a: "Beyond WiFi remote capability, it adds a matching handle / handle set for a more complete look and a stronger entry-door quality feel, making it ideal for front doors where appearance matters." },
      { q: "Does it also need a separate gateway?", a: "No. It likewise has built-in WiFi — connect it to your router to unlock remotely, push codes and view logs, sparing you an extra gateway and wiring." },
      { q: "How do I choose between the TE012W-H and TE012W-K?", a: "The TE012W-H is a one-piece lever with a clean look; the TE012W-K comes with a dual-knob handle set and supports fingerprint, with fuller features and a more complete set — choose by door type and budget." },
      { q: "What colors are available?", a: "It offers Matte Black and Satin Nickel finishes, which you can pair with your door color and overall facade style." },
    ],
  },

  "smart-handle": {
    story:
      "The TEEHO smart handle condenses a whole smart lock into a compact door handle. The TE018 integrates a keypad and lever with app control, while the TE019 takes a Bluetooth-app route with a digital keypad and always-open mode — keypad code entry, remote one-time code sharing from your phone and auto-lock on close, all packed into a handy handle. It is light and compact, easy to install, and neither hogs space nor steals the show, making it especially good for bedroom doors, rental units and small doors that need flexible authorization. Send a temporary code to a short-stay tenant, hand a friend remote access — it is all done at your fingertips. Small in size, big in smarts.",
    heritage:
      "The smart handle is TEEHO's lightest category of smart lock, made for doors that do not need a heavy deadbolt yet still want a smart experience — bedrooms, studies and rental rooms, where a single handle handles keyless entry and remote authorization.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "Keypad PIN code, app control, one-time / temporary code, mechanical key (model-dependent)" },
      { label: "Material", value: "One-piece lever / knob handle with integrated keypad; Matte Black / Satin Nickel" },
      { label: "Power", value: "Powered by AA batteries, with a low-battery alert (non-lithium design)" },
      { label: "Runtime", value: "About a year in normal use, with a timely low-battery replacement reminder" },
      { label: "Connectivity", value: "App control (TE019 via Bluetooth; can add a gateway to extend to remote WiFi control)" },
      { label: "Compatible Doors", value: "Interior doors such as bedroom / room / rental doors, with compact installation" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🤚", title: "Light & Compact", desc: "The whole lock is built into the handle, taking no door space and installing simply — especially good for bedrooms and room doors." },
      { icon: "🔢", title: "Keyless Keypad", desc: "Enter a code on the integrated keypad to open, ending the hassle of carrying a key for room doors and making coming and going more carefree." },
      { icon: "📤", title: "Remote Code Sharing", desc: "Send a one-time code to a visitor or tenant remotely through the app — temporary authorization with no need to be present." },
      { icon: "🔄", title: "Auto-Lock", desc: "Re-locks automatically after the door closes, securing room and rental doors on its own — safety that does not rely on memory." },
      { icon: "🛏️", title: "Rental-Friendly", desc: "Always-open mode and temporary codes suit short-stay / room-rental scenarios — change the code with each new guest." },
    ],
    projectShowcase: [
      "Bedroom / study doors — a lightweight keyless upgrade",
      "Single-room rentals / shared-housing rooms — temporary codes changed with each guest",
      "Guesthouse short-stay guest doors — remote one-time code sharing avoids key handoffs",
    ],
    faq: [
      { q: "What kind of door is a smart handle good for?", a: "It suits interior doors such as bedroom, study and rental-room doors — compact and easy to install; for entry doors, the deadbolt or handle set series is recommended for a higher security rating." },
      { q: "Can I open the door for a visitor or tenant remotely?", a: "Yes. Share a one-time / temporary code remotely through the app, and the visitor or tenant enters it to get in with no need to hand over a key in person; it can be set to expire automatically after use." },
      { q: "What is the difference between the TE018 and TE019?", a: "The TE018 integrates a keypad and supports app control; the TE019 uses a Bluetooth app with a digital keypad and always-open mode. Choose based on whether you need always-open mode and your preferred control method." },
      { q: "Can the Bluetooth model do remote control?", a: "The TE019 is controlled by app over Bluetooth at close range; for off-site remote control, pair it with a TEEHO gateway to bridge Bluetooth to WiFi for true remote locking." },
    ],
  },

  gateway: {
    story:
      "The TEEHO G1 gateway is the understated hub working behind the scenes in a smart-lock system — it bridges Bluetooth-only locks that cannot reach the router to your home WiFi, giving locks that could once only be controlled up close a remote reach. With the G1 installed, a Bluetooth lock can be locked, unlocked and status-checked in the app anytime, and folded into the smart home alongside the KK Home App and Alexa voice. Better still, the G1 also integrates an app-controllable smart outlet, so one small box serves as both a lock bridge and a handy way to bring a lamp or fan under control. It does not steal the spotlight, yet it brings the whole lock system to life.",
    heritage:
      "The gateway is the connectivity-expansion accessory for TEEHO's lock system — it completes the last mile of remote reach for Bluetooth locks, the key bridge that upgrades a standalone smart lock into a remotely manageable smart-home node.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "Does not unlock itself; provides a remote lock / unlock channel for compatible Bluetooth locks" },
      { label: "Material", value: "Plug-in plastic housing with an integrated smart outlet, plug-and-play" },
      { label: "Power", value: "Direct mains plug-in power (non-battery / non-lithium design)" },
      { label: "Runtime", value: "Continuous mains power, always online with no battery to replace" },
      { label: "Connectivity", value: "WiFi bridging: Bluetooth-to-WiFi, bringing near-field Bluetooth locks into remote control" },
      { label: "Compatible Doors", value: "Works with gateway-compatible TEEHO Bluetooth locks; used with the KK Home App" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "📡", title: "Bluetooth to Remote", desc: "Bridges Bluetooth-only locks to WiFi, turning a once near-field lock into anytime, anywhere remote control." },
      { icon: "🔌", title: "Integrated Outlet", desc: "One gateway also carries an app-controllable smart outlet, handling both the lock bridge and appliance control in a single box." },
      { icon: "🗣️", title: "Alexa Voice", desc: "Supports Alexa voice control, bringing both the lock and the outlet into your voice assistant and smart home." },
      { icon: "🏠", title: "Smart Hub", desc: "Works with the KK Home App as the lock's control hub, unifying status management and remote operation." },
      { icon: "⚡", title: "Plug-and-Play", desc: "Direct mains plug-in with simple network setup, adding remote capability to an existing Bluetooth lock without wiring." },
    ],
    projectShowcase: [
      "Households with a Bluetooth lock already installed who want to upgrade to remote control",
      "Smart-home renovation projects — unifying lock and outlet nodes",
      "Rental apartments / guesthouses — remotely managing multiple Bluetooth-lock doors",
    ],
    faq: [
      { q: "Can the gateway open the door itself?", a: "The gateway does not open the door directly; its role is to bridge a Bluetooth lock to WiFi so you can lock, unlock and check status remotely via the app, while the unlocking is still performed by the lock itself." },
      { q: "Which locks need a gateway?", a: "TEEHO locks that support Bluetooth but do not have built-in WiFi (such as some smart handles) are the ones that need a gateway; models with built-in WiFi can be controlled remotely directly, with no gateway required." },
      { q: "How is the gateway powered, and do I need to change batteries?", a: "The G1 uses direct mains plug-in power and stays online long-term with no batteries to replace; it also integrates an app-controllable smart outlet." },
      { q: "Does it support voice control?", a: "Yes. Used with the KK Home App and compatible with Alexa voice control, it can bring both the lock and the integrated outlet into smart-home voice scenes." },
    ],
  },

  other: {
    story:
      "The full TEEHO smart-lock lineup spans code-only keypad deadbolts, keypad lever locks and entry handle sets, through WiFi-enabled remote smart locks, lightweight smart handles and a companion gateway — built around four unlocking methods (fingerprint, code, app and mechanical key) into a lock system with unified logic and interchangeable accessories. Whether you want a completely offline, install-and-go worry-free front door lock, or a smart entry point that authorizes remotely, logs access and links by voice, you will find the right model here. With a consistent unlocking experience and equally simple installation, upgrading every door in the home as a complete set becomes effortless.",
    heritage:
      "As the overview of the TEEHO product system, this category brings together the brand's complete layout in electronic / smart door locks — from basic offline locks to connected flagships, covering the door-type needs of homes, apartments and short-stay rentals.",
    technicalSpecs: [
      { label: "Unlocking Methods", value: "Fingerprint, keypad PIN code, app / remote, mechanical backup key (combined by model)" },
      { label: "Material", value: "Zinc / aluminum-alloy faceplate + stainless-steel bolt; Matte Black / Satin Nickel / Antique Bronze" },
      { label: "Power", value: "Powered by 4 AA batteries, with a low-battery alert (gateway models use mains power)" },
      { label: "Runtime", value: "About a year in normal use for the locks, with a low-battery prompt" },
      { label: "Connectivity", value: "Offline / built-in WiFi / Bluetooth + gateway, depending on the series" },
      { label: "Compatible Doors", value: "Entry / bedroom / interior doors, about 35-50mm thick, works for left- and right-hand doors" },
    ],
    manufacturing: BRAND_MFG,
    careGuide: BRAND_CARE,
    installation: BRAND_INSTALL,
    certifications: BRAND_CERTS,
    packaging: BRAND_PACK,
    whyChoose: [
      { icon: "🔐", title: "Multiple Unlock Methods", desc: "Fingerprint, code, app / card and mechanical backup key, combined as needed for convenience and security." },
      { icon: "🧩", title: "Complete System", desc: "Deadbolts, lever locks, handle sets, WiFi locks, smart handles and the gateway accessory all interoperate for a whole-home set upgrade." },
      { icon: "🛠️", title: "Easy Installation", desc: "Most models install DIY with a single screwdriver in about 15-30 minutes, with no wiring needed." },
      { icon: "📱", title: "Connected or Offline", desc: "There are completely offline worry-free models as well as connected models with remote locking and access logs — choose by need." },
      { icon: "🔑", title: "Worry-Free Backup", desc: "Mechanical backup keys and low-battery alerts provide double assurance, so a power or network outage never locks you out." },
    ],
    projectShowcase: [
      "Whole-home complete-set door lock upgrades — a unified system from the entry door to interior doors",
      "Apartments / long-term rentals — bulk delivery and management across many doors and units",
      "Guesthouses and short-stay rentals — remote authorization and one-time codes avoid key handoffs",
    ],
    faq: [
      { q: "What are the main TEEHO series?", a: "They include keypad deadbolts, keypad lever locks, lever-lock handle sets, WiFi smart locks, WiFi handle locks, smart handles and the gateway accessory, covering everything from the entry door to interior doors." },
      { q: "How do I choose between an offline and a connected lock?", a: "For simplicity without binding an app, choose an offline deadbolt / lever lock; for remote authorization, access logs and voice linking, choose a smart lock with built-in WiFi or a Bluetooth model paired with a gateway." },
      { q: "Can these locks fit my door?", a: "Most models suit standard doors about 35-50mm thick, reuse the common bore and work for left- and right-hand doors; just verify door thickness and bolt backset by specific model before ordering." },
      { q: "Will a power or network outage lock me out?", a: "No. The locks come with a mechanical backup key and low-battery alert, offline models do not rely on the network in the first place, and connected models can still unlock locally by code / fingerprint when offline." },
    ],
  },
};

/** Helper: get metadata by seriesOriginal, falling back to keypad-deadbolt by default. */
export function getSeriesMeta(seriesOriginal?: string): SeriesMeta | undefined {
  if (!seriesOriginal) return undefined;
  return TEEHO_SERIES_META[seriesOriginal.trim()] || TEEHO_SERIES_META["keypad-deadbolt"];
}
