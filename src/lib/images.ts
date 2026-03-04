// ── Centralized image URLs from metalpergolas.ca (Squarespace CDN) ──

export const IMAGES = {
  // Use cases
  useCaseWallMount:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/b6daa0a3-6c82-4e3a-8dd6-f85b63df15ae/tempImageZHqyed.jpg",
  useCaseHotTub:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/9c7aa65e-2da3-4bad-97aa-52d20fe5eea6/9c7aa65e-f1ab-4082-97e2-c10f9e4b8a98.JPG",
  useCaseDining:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/1747317181839-0SPJZMBI0RFXSNCQBQGK/IMG_1058.jpg",

  // Past projects
  projectWaterloo:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/1747322091610-U89JYN53TR3FE3JHHX8B/waterloo+with+pit.jpg",
  projectToronto:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/a630cedb-cce1-45bb-ba49-e4ae3a31dcfe/a630cedb-afad-4a3e-b979-17f1ac9f4e88.JPG",
  projectOakville:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/1747316999498-NTWCR1UG2SEZR12P1I9E/oakville.jpg",
  projectCaledon:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/1747317095143-LCPG4JN01P4Q8GS3MOXB/thornhill1.jpg",
  projectVaughan:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/1747317033429-LNJ2FC4PE0ADUVKVKM7X/Sauga.jpg",
  projectMuskoka:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/1747317247291-IXH9I1PFA8G10R9PWUWI/image-asset.jpeg",

  // Products
  productWhite:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/1747317247291-IXH9I1PFA8G10R9PWUWI/image-asset.jpeg",
  productGrey:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/1747316999498-NTWCR1UG2SEZR12P1I9E/oakville.jpg",

  // Detail shots
  detailAluminum:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/1747317132456-9N6RMGXNHCVTI9KQ3A37/IMG_2235+2.jpg",
  detailLED:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/1747317159376-TB2BXWG2BD22TRV0OHXK/IMG_2237.jpg",

  // Sizes diagram
  sizesDiagram:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/1747322161893-G1LIU0WPC4P9C2L4V5B2/Standard+sizes.jpg",

  // Hero alternative
  heroAlt:
    "https://images.squarespace-cdn.com/content/v1/6819dcc6d0beda27cadb134c/20250519_1359_Metal+Pergola+Ad.png",
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
