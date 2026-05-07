export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Audio" | "Wearables" | "Computers" | "Phones" | "Cameras" | "Gaming" | "Home";
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  gallery?: string[];
  description: string;
  features: string[];
  trending?: boolean;
  bestseller?: boolean;
  new?: boolean;
  colors?: string[];
};

// Using Unsplash for high-quality product imagery (CDN, fast)
const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Aurora Pro Wireless Headphones",
    brand: "Nexora Audio",
    category: "Audio",
    price: 299,
    oldPrice: 399,
    rating: 4.8,
    reviews: 2348,
    stock: 24,
    image: img("photo-1518444065439-e933c06ce9cd"),
    gallery: [
      img("photo-1518444065439-e933c06ce9cd", 1200),
      img("photo-1505740420928-5e560c06d30e", 1200),
      img("photo-1583394838336-acd977736f90", 1200),
    ],
    description:
      "Studio-grade noise cancellation, 40h battery life and spatial audio. Crafted with vegan leather and aerospace-grade aluminum.",
    features: ["Active Noise Cancellation", "40h Battery", "Spatial Audio", "USB-C Fast Charge"],
    trending: true,
    bestseller: true,
    colors: ["#0f172a", "#e5e7eb", "#1f42f5"],
  },
  {
    id: "p2",
    name: "Pulse Smart Watch Series 9",
    brand: "Nexora Wear",
    category: "Wearables",
    price: 449,
    oldPrice: 549,
    rating: 4.7,
    reviews: 1820,
    stock: 41,
    image: img("photo-1546868871-7041f2a55e12"),
    gallery: [
      img("photo-1546868871-7041f2a55e12", 1200),
      img("photo-1523275335684-37898b6baf30", 1200),
      img("photo-1579586337278-3befd40fd17a", 1200),
    ],
    description:
      "Always-on Retina display, ECG sensors, GPS and 7-day battery. Health, fitness, and connection on your wrist.",
    features: ["ECG + Blood Oxygen", "GPS Built-in", "7-day Battery", "Water Resistant 50m"],
    trending: true,
    new: true,
    colors: ["#1f2937", "#d4af37", "#94a3b8"],
  },
  {
    id: "p3",
    name: "Lumen 14 Ultrabook",
    brand: "Nexora Compute",
    category: "Computers",
    price: 1499,
    rating: 4.9,
    reviews: 612,
    stock: 12,
    image: img("photo-1496181133206-80ce9b88a853"),
    gallery: [
      img("photo-1496181133206-80ce9b88a853", 1200),
      img("photo-1517336714731-489689fd1ca8", 1200),
      img("photo-1593642632559-0c6d3fc62b89", 1200),
    ],
    description:
      "14-inch Liquid Retina display, M-class chip, 18-hour battery in a 1.2kg chassis. The ultimate portable workstation.",
    features: ["M-Class Chip", "16GB Unified RAM", "18h Battery", "Liquid Retina XDR"],
    bestseller: true,
    colors: ["#cbd5e1", "#0f172a"],
  },
  {
    id: "p4",
    name: "Echo Buds Pro",
    brand: "Nexora Audio",
    category: "Audio",
    price: 179,
    oldPrice: 219,
    rating: 4.6,
    reviews: 5012,
    stock: 88,
    image: img("photo-1606220945770-b5b6c2c55bf1"),
    gallery: [img("photo-1606220945770-b5b6c2c55bf1", 1200), img("photo-1590658268037-6bf12165a8df", 1200)],
    description:
      "Tiny, mighty earbuds with adaptive ANC and 30 hours total playtime with the wireless charging case.",
    features: ["Adaptive ANC", "30h with Case", "Wireless Charging", "IPX4"],
    trending: true,
    colors: ["#ffffff", "#0f172a", "#ff5a8a"],
  },
  {
    id: "p5",
    name: "Nexora Phone 15 Pro",
    brand: "Nexora Mobile",
    category: "Phones",
    price: 1099,
    rating: 4.8,
    reviews: 3320,
    stock: 30,
    image: img("photo-1592750475338-74b7b21085ab"),
    gallery: [
      img("photo-1592750475338-74b7b21085ab", 1200),
      img("photo-1511707171634-5f897ff02aa9", 1200),
      img("photo-1510557880182-3d4d3cba35a5", 1200),
    ],
    description:
      "Titanium frame, 6.7-inch ProMotion display, 48MP triple-camera and the most powerful mobile chip ever made.",
    features: ["Titanium Build", "ProMotion 120Hz", "48MP Triple Cam", "USB-C 3.0"],
    new: true,
    bestseller: true,
    colors: ["#1c1917", "#cbd5e1", "#1f42f5"],
  },
  {
    id: "p6",
    name: "Vista Mirrorless Camera",
    brand: "Nexora Optics",
    category: "Cameras",
    price: 1899,
    oldPrice: 2099,
    rating: 4.9,
    reviews: 412,
    stock: 9,
    image: img("photo-1502920917128-1aa500764cbd"),
    gallery: [
      img("photo-1502920917128-1aa500764cbd", 1200),
      img("photo-1519183071298-a2962be96f83", 1200),
    ],
    description:
      "Full-frame 45MP sensor, 8K video, in-body stabilization. The definitive tool for creators.",
    features: ["45MP Full Frame", "8K Video", "IBIS 7-stops", "Dual Card Slot"],
    trending: true,
    colors: ["#0f172a"],
  },
  {
    id: "p7",
    name: "Pixel Console X",
    brand: "Nexora Play",
    category: "Gaming",
    price: 599,
    rating: 4.7,
    reviews: 2700,
    stock: 18,
    image: img("photo-1606144042614-b2417e99c4e3"),
    gallery: [img("photo-1606144042614-b2417e99c4e3", 1200), img("photo-1593305841991-05c297ba4575", 1200)],
    description:
      "Next-gen 4K gaming console with ray-tracing, 1TB SSD and ultra-low latency controller.",
    features: ["4K 120fps", "Ray Tracing", "1TB NVMe SSD", "Haptic Controller"],
    new: true,
    colors: ["#0f172a", "#ffffff"],
  },
  {
    id: "p8",
    name: "Halo Smart Speaker",
    brand: "Nexora Home",
    category: "Home",
    price: 249,
    rating: 4.5,
    reviews: 980,
    stock: 60,
    image: img("photo-1589003077984-894e133dabab"),
    gallery: [img("photo-1589003077984-894e133dabab", 1200), img("photo-1545454675-3531b543be5d", 1200)],
    description:
      "360° room-filling sound, voice assistant, and smart home hub. The heart of your living room.",
    features: ["360° Sound", "Voice Assistant", "Smart Home Hub", "Wi-Fi 6"],
    bestseller: true,
    colors: ["#475569", "#ffffff", "#1f2937"],
  },
  {
    id: "p9",
    name: "Glide Mechanical Keyboard",
    brand: "Nexora Compute",
    category: "Computers",
    price: 189,
    oldPrice: 229,
    rating: 4.8,
    reviews: 1432,
    stock: 53,
    image: img("photo-1587829741301-dc798b83add3"),
    description:
      "Hot-swappable mechanical keyboard with PBT keycaps and per-key RGB. Built for creators and gamers.",
    features: ["Hot-swappable", "PBT Keycaps", "Per-key RGB", "USB-C"],
    colors: ["#0f172a", "#ffffff"],
  },
  {
    id: "p10",
    name: "Orbit Drone 4K",
    brand: "Nexora Optics",
    category: "Cameras",
    price: 799,
    rating: 4.6,
    reviews: 320,
    stock: 14,
    image: img("photo-1473968512647-3e447244af8f"),
    description:
      "Foldable 4K drone with obstacle avoidance, 35-min flight time and follow-me mode.",
    features: ["4K HDR", "35min Flight", "Obstacle Avoid", "Follow Me"],
    new: true,
    colors: ["#0f172a"],
  },
  {
    id: "p11",
    name: "Flux VR Headset",
    brand: "Nexora Play",
    category: "Gaming",
    price: 499,
    rating: 4.4,
    reviews: 540,
    stock: 22,
    image: img("photo-1593508512255-86ab42a8e620"),
    description:
      "Immersive standalone VR with 4K per eye, hand tracking and 100+ titles included.",
    features: ["4K per Eye", "Hand Tracking", "Wireless", "100+ Games"],
    colors: ["#ffffff", "#0f172a"],
  },
  {
    id: "p12",
    name: "Nimbus Air Purifier",
    brand: "Nexora Home",
    category: "Home",
    price: 329,
    rating: 4.7,
    reviews: 712,
    stock: 33,
    image: img("photo-1585771724684-38269d6639fd"),
    description:
      "HEPA + carbon filtration covering 1000 sq ft. Whisper-quiet with smart auto mode.",
    features: ["HEPA H13", "1000 sq ft", "Whisper Quiet", "App Control"],
    colors: ["#ffffff", "#94a3b8"],
  },
];

export const CATEGORIES = [
  { id: "Audio", name: "Audio", icon: "🎧", count: PRODUCTS.filter(p => p.category === "Audio").length },
  { id: "Wearables", name: "Wearables", icon: "⌚", count: PRODUCTS.filter(p => p.category === "Wearables").length },
  { id: "Computers", name: "Computers", icon: "💻", count: PRODUCTS.filter(p => p.category === "Computers").length },
  { id: "Phones", name: "Phones", icon: "📱", count: PRODUCTS.filter(p => p.category === "Phones").length },
  { id: "Cameras", name: "Cameras", icon: "📷", count: PRODUCTS.filter(p => p.category === "Cameras").length },
  { id: "Gaming", name: "Gaming", icon: "🎮", count: PRODUCTS.filter(p => p.category === "Gaming").length },
  { id: "Home", name: "Smart Home", icon: "🏠", count: PRODUCTS.filter(p => p.category === "Home").length },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    avatar: "https://i.pravatar.cc/120?img=47",
    text: "Nexora's checkout is the smoothest I've ever used. My headphones arrived in 2 days, perfectly packaged.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/120?img=12",
    text: "The product photography sold me, but the build quality of the Lumen 14 made me a customer for life.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Photographer",
    avatar: "https://i.pravatar.cc/120?img=45",
    text: "Vista camera is a game-changer. Paired with stellar customer service, Nexora is now my go-to.",
    rating: 5,
  },
  {
    name: "Diego Martinez",
    role: "Content Creator",
    avatar: "https://i.pravatar.cc/120?img=33",
    text: "From browse to delivery, every step feels premium. The unboxing alone is worth it.",
    rating: 4,
  },
];

export const HERO_SLIDES = [
  {
    eyebrow: "New Arrival",
    title: "Aurora Pro",
    subtitle: "Sound, redefined.",
    description: "Studio-grade noise cancellation. 40 hours of pure audio bliss.",
    image: img("photo-1505740420928-5e560c06d30e", 1400),
    cta: "Shop Aurora",
    productId: "p1",
    gradient: "from-indigo-600 via-blue-600 to-cyan-500",
  },
  {
    eyebrow: "Best Seller",
    title: "Phone 15 Pro",
    subtitle: "Titanium. Unstoppable.",
    description: "The lightest, most powerful phone we've ever built.",
    image: img("photo-1511707171634-5f897ff02aa9", 1400),
    cta: "Discover Phone",
    productId: "p5",
    gradient: "from-fuchsia-600 via-pink-600 to-rose-500",
  },
  {
    eyebrow: "Limited Edition",
    title: "Pulse Series 9",
    subtitle: "Time. Reimagined.",
    description: "Health, fitness and your day, all on your wrist.",
    image: img("photo-1523275335684-37898b6baf30", 1400),
    cta: "Explore Pulse",
    productId: "p2",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
  },
];
