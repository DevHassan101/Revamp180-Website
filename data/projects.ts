// ─── Shared project data ──────────────────────────────────────────────────────
// Single source of truth for the projects listing (/projects) and each
// project detail page (/projects/[slug]).

export const services = [
  "All",
  "Website Revamping",
  "Website Design & Development",
  "App Design & Development",
  "Branding & UI/UX Design",
  "Social Media Management",
  "Video Editing",
] as const;

export type Service = (typeof services)[number];

export type Tech = { name: string; icon: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  service: Exclude<Service, "All">;
  overlay: string;
  tags: string[];
  /** First image is used as the card cover; all images feed the detail slider. */
  images: string[];
  client: string;
  year: string;
  /** One-line summary shown under the hero. */
  overview: string;
  /** What the client asked for. */
  requirements: string[];
  /** How we delivered it. */
  solution: string[];
  techStack: Tech[];
  liveUrl?: string;
};

export const projects: Project[] = [
  // ── Website Revamping ──
  {
    slug: "bunzilla",
    title: "Bunzilla",
    category: "Website Revamping",
    service: "Website Revamping",
    overlay: "rgba(12,0,64,0.55)",
    tags: ["Revamp", "SEO"],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    ],
    client: "Bunzilla Inc.",
    year: "2025",
    overview:
      "A full revamp of an outdated corporate site into a fast, modern, SEO-first platform.",
    requirements: [
      "Create a modern and visually appealing food ordering experience.",
      "Establish a strong brand identity that stands out in a competitive market.",
      "Showcase menu items with high-quality visuals to increase engagement.",
      "Ensure smooth navigation and a user-friendly ordering journey.",
      "Design a mobile-first interface optimized for customer convenience."
    ],
    solution: [
      "Developed a bold and memorable brand identity with a vibrant visual system.",
      "Designed an intuitive mobile UI focused on usability and seamless user flows.",
      "Integrated appetizing product imagery to enhance customer engagement.",
      "Created a scalable design system for consistent user experiences across screens.",
      "Delivered high-fidelity mockups and interactive prototypes for presentation and development handoff."
    ],
    techStack: [
      { name: "Abode illustrator", icon: "logos:adobe-illustrator" },
      { name: "Figma", icon: "logos:figma" },
      { name: "Canva", icon: "logos:canva" },
    ],
  },
  {
    slug: "heritage-co",
    title: "Heritage Co.",
    category: "Website Revamping",
    service: "Website Revamping",
    overlay: "rgba(20,0,100,0.54)",
    tags: ["Redesign", "Performance"],
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80",
      "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=1200&q=80",
    ],
    client: "Heritage & Co.",
    year: "2024",
    overview:
      "A heritage brand reborn online with a refined visual language and lightning-fast performance.",
    requirements: [
      "Preserve a classic brand feel while modernizing the experience.",
      "Cut down heavy page weight and slow load times.",
      "Add an easy-to-update content structure for the team.",
    ],
    solution: [
      "Crafted a refined, editorial layout that honours the brand heritage.",
      "Optimised images and code-splitting to slash load times.",
      "Set up a clean, maintainable component architecture.",
    ],
    techStack: [
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "React", icon: "logos:react" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    ],
  },
  {
    slug: "metrobank",
    title: "MetroBank",
    category: "Website Revamping",
    service: "Website Revamping",
    overlay: "rgba(12,0,64,0.55)",
    tags: ["Migration", "UX Audit"],
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=1200&q=80",
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&q=80",
    ],
    client: "MetroBank",
    year: "2025",
    overview:
      "A trust-first banking website migration backed by a thorough UX audit.",
    requirements: [
      "Migrate a large legacy site without losing SEO equity.",
      "Improve clarity and trust across key banking journeys.",
      "Meet strict accessibility and security expectations.",
    ],
    solution: [
      "Ran a full UX audit and reworked the information architecture.",
      "Executed a careful migration with redirects preserving rankings.",
      "Delivered an accessible, WCAG-aligned interface.",
    ],
    techStack: [
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
    ],
  },

  // ── Website Design & Development ──
  {
    slug: "foodiehub",
    title: "FoodieHub",
    category: "Web Development",
    service: "Website Design & Development",
    overlay: "rgba(24,0,200,0.52)",
    tags: ["Next.js", "Node.js"],
    images: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80",
    ],
    client: "FoodieHub",
    year: "2025",
    overview:
      "A food-delivery platform connecting local restaurants with hungry customers.",
    requirements: [
      "Build a real-time order and tracking experience.",
      "Surface personalized restaurant recommendations.",
      "Handle high traffic during peak meal times.",
    ],
    solution: [
      "Developed a fast Next.js storefront with a Node.js API backend.",
      "Added live order tracking with real-time status updates.",
      "Built a recommendation feed tuned to each user's taste.",
    ],
    techStack: [
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "React", icon: "logos:react" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    ],
  },
  {
    slug: "stylekart",
    title: "StyleKart",
    category: "E-commerce",
    service: "Website Design & Development",
    overlay: "rgba(53,32,220,0.48)",
    tags: ["Shopify", "Storefront"],
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
    ],
    client: "StyleKart",
    year: "2024",
    overview:
      "A conversion-focused fashion storefront with a polished shopping experience.",
    requirements: [
      "Launch a scalable e-commerce store quickly.",
      "Maximize conversion with a frictionless checkout.",
      "Keep the brand looking premium across devices.",
    ],
    solution: [
      "Set up a custom Shopify storefront with tailored theming.",
      "Streamlined the cart and checkout to reduce drop-off.",
      "Designed a clean, premium product browsing experience.",
    ],
    techStack: [
      { name: "Shopify", icon: "logos:shopify" },
      { name: "React", icon: "logos:react" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    ],
  },
  {
    slug: "medicare",
    title: "MediCare",
    category: "Web Design",
    service: "Website Design & Development",
    overlay: "rgba(0,80,160,0.52)",
    tags: ["Next.js", "UI/UX"],
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80",
    ],
    client: "MediCare Health",
    year: "2025",
    overview:
      "A calm, trustworthy healthcare site that makes booking care effortless.",
    requirements: [
      "Communicate trust and care through the design.",
      "Make appointment booking simple and clear.",
      "Stay fully responsive for patients on any device.",
    ],
    solution: [
      "Designed a soothing, accessible UI focused on clarity.",
      "Built an intuitive appointment booking flow.",
      "Implemented a responsive Next.js front-end.",
    ],
    techStack: [
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Figma", icon: "logos:figma" },
    ],
  },
  {
    slug: "fintrack",
    title: "FinTrack",
    category: "Web App",
    service: "Website Design & Development",
    overlay: "rgba(20,0,100,0.54)",
    tags: ["Dashboard", "Node.js"],
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&q=80",
    ],
    client: "FinTrack",
    year: "2025",
    overview:
      "A finance dashboard that turns complex data into clear, actionable insight.",
    requirements: [
      "Visualize financial data in real time.",
      "Keep dense dashboards readable and fast.",
      "Secure sensitive user financial information.",
    ],
    solution: [
      "Built an interactive dashboard with live charts and metrics.",
      "Optimised rendering for large datasets without lag.",
      "Secured the API layer with robust auth on Node.js.",
    ],
    techStack: [
      { name: "React", icon: "logos:react" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
    ],
  },

  // ── App Design & Development ──
  {
    slug: "fitapp",
    title: "FitApp",
    category: "App Design",
    service: "App Design & Development",
    overlay: "rgba(107,33,168,0.50)",
    tags: ["React Native", "Flutter"],
    images: [
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    ],
    client: "FitApp",
    year: "2025",
    overview:
      "A fitness companion app that keeps users motivated with smart tracking.",
    requirements: [
      "Track workouts, goals and progress in one place.",
      "Deliver a smooth, native-feeling experience.",
      "Keep users engaged with reminders and streaks.",
    ],
    solution: [
      "Built a cross-platform app for iOS and Android.",
      "Designed an energetic, motivating mobile UI.",
      "Added goal tracking, streaks and smart reminders.",
    ],
    techStack: [
      { name: "React Native", icon: "logos:react" },
      { name: "Flutter", icon: "logos:flutter" },
      { name: "Firebase", icon: "logos:firebase" },
    ],
  },
  {
    slug: "edulearn",
    title: "EduLearn",
    category: "App Development",
    service: "App Design & Development",
    overlay: "rgba(30,0,180,0.50)",
    tags: ["React", "Firebase"],
    images: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    ],
    client: "EduLearn",
    year: "2024",
    overview:
      "An e-learning app that makes lessons feel interactive and rewarding.",
    requirements: [
      "Deliver courses, quizzes and progress tracking.",
      "Work reliably for learners on low-end devices.",
      "Sync progress across devices in real time.",
    ],
    solution: [
      "Built an interactive learning experience with quizzes.",
      "Used Firebase for real-time progress sync.",
      "Optimised the app to run smoothly on any device.",
    ],
    techStack: [
      { name: "React", icon: "logos:react" },
      { name: "Firebase", icon: "logos:firebase" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
    ],
  },
  {
    slug: "ridenow",
    title: "RideNow",
    category: "Mobile App",
    service: "App Design & Development",
    overlay: "rgba(45,27,105,0.52)",
    tags: ["iOS", "Android"],
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
    ],
    client: "RideNow",
    year: "2025",
    overview:
      "A ride-hailing app with live maps and seamless trip booking.",
    requirements: [
      "Match riders and drivers with live location.",
      "Make booking a ride fast and reliable.",
      "Handle payments securely in-app.",
    ],
    solution: [
      "Built native-quality iOS and Android apps.",
      "Integrated live maps and real-time driver matching.",
      "Added secure in-app payments and trip history.",
    ],
    techStack: [
      { name: "Flutter", icon: "logos:flutter" },
      { name: "Firebase", icon: "logos:firebase" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
    ],
  },

  // ── Branding & UI/UX Design ──
  {
    slug: "nova-brand",
    title: "Nova Brand",
    category: "Branding & UI/UX",
    service: "Branding & UI/UX Design",
    overlay: "rgba(45,27,105,0.52)",
    tags: ["Branding", "Figma"],
    images: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1200&q=80",
    ],
    client: "Nova",
    year: "2025",
    overview:
      "A bold visual identity and design system for a rising tech brand.",
    requirements: [
      "Create a distinct, memorable brand identity.",
      "Provide a scalable design system for the product.",
      "Keep everything consistent across touchpoints.",
    ],
    solution: [
      "Designed a fresh logo, palette and typography system.",
      "Built a reusable Figma design system and components.",
      "Documented clear brand guidelines for the team.",
    ],
    techStack: [
      { name: "Figma", icon: "logos:figma" },
      { name: "Illustrator", icon: "logos:adobe-illustrator" },
      { name: "Photoshop", icon: "logos:adobe-photoshop" },
    ],
  },
  {
    slug: "aether-studio",
    title: "Aether Studio",
    category: "Visual Identity",
    service: "Branding & UI/UX Design",
    overlay: "rgba(107,33,168,0.50)",
    tags: ["Logo", "Design System"],
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&q=80",
      "https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?w=1200&q=80",
    ],
    client: "Aether Studio",
    year: "2024",
    overview:
      "A minimal, timeless identity for a boutique creative studio.",
    requirements: [
      "Express a minimal, premium creative aesthetic.",
      "Build a flexible identity that ages well.",
      "Cover both digital and print applications.",
    ],
    solution: [
      "Crafted a refined logo and monochrome palette.",
      "Established a flexible, modular design system.",
      "Delivered assets ready for web and print.",
    ],
    techStack: [
      { name: "Figma", icon: "logos:figma" },
      { name: "Illustrator", icon: "logos:adobe-illustrator" },
    ],
  },
  {
    slug: "bloom-cosmetics",
    title: "Bloom Cosmetics",
    category: "Brand Identity",
    service: "Branding & UI/UX Design",
    overlay: "rgba(124,58,237,0.50)",
    tags: ["Packaging", "Guidelines"],
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80",
    ],
    client: "Bloom Cosmetics",
    year: "2025",
    overview:
      "A soft, elegant brand and packaging system for a clean-beauty line.",
    requirements: [
      "Reflect a clean, natural beauty positioning.",
      "Design packaging that stands out on shelf.",
      "Keep the identity consistent across the range.",
    ],
    solution: [
      "Developed a delicate palette and elegant typography.",
      "Designed cohesive packaging across the product line.",
      "Delivered detailed brand and usage guidelines.",
    ],
    techStack: [
      { name: "Illustrator", icon: "logos:adobe-illustrator" },
      { name: "Photoshop", icon: "logos:adobe-photoshop" },
      { name: "Figma", icon: "logos:figma" },
    ],
  },

  // ── Social Media Management ──
  {
    slug: "socialpulse",
    title: "SocialPulse",
    category: "Social Media",
    service: "Social Media Management",
    overlay: "rgba(124,58,237,0.50)",
    tags: ["Instagram", "Strategy"],
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80",
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
    ],
    client: "SocialPulse",
    year: "2025",
    overview:
      "An end-to-end social strategy that grew reach and engagement fast.",
    requirements: [
      "Grow followers and engagement organically.",
      "Maintain a consistent, on-brand content feed.",
      "Track what's working with clear analytics.",
    ],
    solution: [
      "Built a content calendar and posting strategy.",
      "Designed a cohesive, scroll-stopping grid.",
      "Reported on growth with actionable analytics.",
    ],
    techStack: [
      { name: "Instagram", icon: "logos:instagram-icon" },
      { name: "Figma", icon: "logos:figma" },
      { name: "Photoshop", icon: "logos:adobe-photoshop" },
    ],
  },
  {
    slug: "urban-eats",
    title: "Urban Eats",
    category: "Content & Growth",
    service: "Social Media Management",
    overlay: "rgba(53,32,220,0.48)",
    tags: ["Campaigns", "Analytics"],
    images: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1200&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    ],
    client: "Urban Eats",
    year: "2024",
    overview:
      "A food brand's social presence reimagined around campaigns and growth.",
    requirements: [
      "Drive footfall through social campaigns.",
      "Produce a steady stream of appetising content.",
      "Measure campaign ROI clearly.",
    ],
    solution: [
      "Ran themed campaigns tied to promotions.",
      "Shot and edited mouth-watering food content.",
      "Tracked performance and optimised each cycle.",
    ],
    techStack: [
      { name: "Instagram", icon: "logos:instagram-icon" },
      { name: "Premiere Pro", icon: "logos:adobe-premiere" },
      { name: "Photoshop", icon: "logos:adobe-photoshop" },
    ],
  },

  // ── Video Editing ──
  {
    slug: "pulse-reels",
    title: "Pulse Reels",
    category: "Video Editing",
    service: "Video Editing",
    overlay: "rgba(30,0,180,0.50)",
    tags: ["Reels", "Motion"],
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80",
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&q=80",
    ],
    client: "Pulse Media",
    year: "2025",
    overview:
      "Snappy short-form reels with motion graphics built to stop the scroll.",
    requirements: [
      "Produce high-energy short-form video content.",
      "Add motion graphics and captions that pop.",
      "Keep a fast turnaround for a steady feed.",
    ],
    solution: [
      "Edited punchy reels with rhythm-driven cuts.",
      "Designed animated captions and motion graphics.",
      "Set up a repeatable, fast editing pipeline.",
    ],
    techStack: [
      { name: "Premiere Pro", icon: "logos:adobe-premiere" },
      { name: "After Effects", icon: "logos:adobe-after-effects" },
    ],
  },
  {
    slug: "cinecraft",
    title: "CineCraft",
    category: "Post-Production",
    service: "Video Editing",
    overlay: "rgba(20,0,100,0.54)",
    tags: ["Color Grade", "VFX"],
    images: [
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&q=80",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200&q=80",
    ],
    client: "CineCraft",
    year: "2024",
    overview:
      "Cinematic post-production with rich color grading and clean VFX.",
    requirements: [
      "Give footage a polished, cinematic look.",
      "Add subtle, believable visual effects.",
      "Deliver broadcast-ready final cuts.",
    ],
    solution: [
      "Applied a refined cinematic color grade.",
      "Composited clean, seamless visual effects.",
      "Delivered final masters ready for broadcast.",
    ],
    techStack: [
      { name: "Premiere Pro", icon: "logos:adobe-premiere" },
      { name: "After Effects", icon: "logos:adobe-after-effects" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
