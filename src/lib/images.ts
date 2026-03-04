// ── Local image paths (downloaded from metalpergolas.ca) ──

export const IMAGES = {
  // Hero
  hero: "/images/hero-pergola-ad.png",

  // Use cases
  useCaseWallMount: "/images/wall-mount.jpg",
  useCaseHotTub: "/images/hot-tub.jpg",
  useCaseDining: "/images/dining-bbq.jpg",

  // Past projects
  projectWaterloo: "/images/waterloo-firepit.jpg",
  projectToronto: "/images/patio-pergola.jpg",
  projectOakville: "/images/oakville.jpg",
  projectCaledon: "/images/thornhill.jpg",
  projectVaughan: "/images/sauga.jpg",
  projectMuskoka: "/images/backyard-project.jpeg",

  // Products
  productWhite: "/images/preorders-spring.jpeg",
  productGrey: "/images/oakville.jpg",

  // Detail shots
  detailAluminum: "/images/detail-aluminum.jpg",
  detailLED: "/images/detail-led.jpg",

  // Sizes diagram
  sizesDiagram: "/images/standard-sizes.jpg",

  // Extra gallery
  forestHillHealth: "/images/forest-hill-health.jpeg",
  bbqLounge: "/images/bbq-lounge.jpeg",
  waterlooClose: "/images/waterloo-pergola.jpeg",
  preorders2025: "/images/preorders-2025.jpeg",

  // Logo
  logo: "/images/logo.png",
} as const;

// Ordered arrays for mapping in components
export const USE_CASE_IMAGES = [
  IMAGES.useCaseWallMount,
  IMAGES.useCaseHotTub,
  IMAGES.useCaseDining,
];

export const PROJECT_IMAGES = [
  IMAGES.projectWaterloo,
  IMAGES.projectToronto,
  IMAGES.projectOakville,
  IMAGES.projectCaledon,
  IMAGES.projectVaughan,
  IMAGES.projectMuskoka,
];
