const mockUsers = [
  {
    id: 1,
    name: "Admin Furniture",
    email: "admin@furniture.com",
    password: "admin123",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=1",
    seller: true,
    createdAt: "2024-01-02T00:00:00.000Z"
  },
  {
    id: 2,
    name: "VIP Customer",
    email: "vip@furniture.com",
    password: "vip123",
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=2",
    seller: false,
  },
];

const mockCategories = [
  { id: 1, name: "Sofas & Couches", slug: "sofas-couches" },
  { id: 2, name: "Dining Tables", slug: "dining-tables" },
  { id: 3, name: "Beds & Bedrooms", slug: "beds-bedrooms" },
  { id: 4, name: "Wardrobes & Storage", slug: "wardrobes-storage" },
  { id: 5, name: "TV Stands & Media", slug: "tv-stands-media" },
  { id: 6, name: "Lighting & Decor", slug: "lighting-decor" },
];

 const mockProducts = [
  {
    id: "prod_sofa_001",
    name: "Premium Leather Sofa",
    price: 25000000,
    categoryId: 1,
    images: [
      "../img/sofa-1.png",
      "../img/sofa-2.png",
      "../img/sofa-3.png",
      "../img/sofa-4.png",
    ],
    description: "Premium leather sofa imported from Italy, comfortable and luxurious, bringing modern beauty to your living space.",
    stock: 15,
    rating: 4.8,
    reviews: 127,
    featured: true,
    email: "admin@furniture.com",
    shortDes: "Premium leather sofa with modern design, made from imported Italian leather.",
    detail: "Premium leather sofa with modern design, made from imported Italian leather. Brings luxury and comfort to your living room. Dimensions: 220x100x80cm. Solid oak frame, premium anti-sag foam cushions. Perfect for modern living spaces, this sofa combines elegance with functionality. The leather is treated with special protective coating to maintain its beauty for years.",
    whatsIncluded: [
      "1 Premium Leather Sofa",
      "Assembly Instructions",
      "Care & Maintenance Guide",
      "1 Year Warranty Card",
      "Leather Care Kit"
    ],
    keyFeatures: [
      "100% Genuine Italian Leather",
      "Solid Oak Wood Frame",
      "Premium Anti-Sag Foam Cushions",
      "Modern Ergonomic Design",
      "Easy to Clean Surface",
      "5-Year Frame Warranty"
    ],
    tags: ["sofa", "leather", "premium", "living room", "modern"],
  },
  {
    id: "prod_sofa_002",
    name: "Oak Dining Table with 6 Chairs",
    price: 12000000,
    categoryId: 2,
    images: [
      "../img/sofa-5.png",
      "../img/sofa-6.png",
      "../img/sofa-7.png"
    ],
    description: "Dining table made from natural oak wood, comes with 6 comfortable padded chairs, perfect for large families.",
    stock: 8,
    rating: 4.5,
    reviews: 89,
    featured: true,
    email: "admin@furniture.com",
    shortDes: "Natural oak dining table with simple yet elegant design, comes with 6 comfortable padded chairs.",
    detail: "Natural oak dining table with simple yet elegant design, comes with 6 comfortable padded chairs. Perfect for modern kitchen spaces. Table dimensions: 160x80x75cm. Surface treated with water-resistant and scratch-resistant coating. Each chair is ergonomically designed for maximum comfort during long meals. The table can extend to accommodate up to 8 people when needed.",
    whatsIncluded: [
      "1 Oak Dining Table",
      "6 Padded Dining Chairs",
      "Assembly Hardware",
      "Care Instructions",
      "Table Extension Leaf"
    ],
    keyFeatures: [
      "100% Natural Oak Wood",
      "Water-Resistant Surface Coating",
      "Scratch-Resistant Finish",
      "Comfortable Padded Chairs",
      "Seats 6 People Comfortably",
      "Easy Assembly Design"
    ],
    tags: ["dining table", "oak wood", "6 chairs", "kitchen", "natural"],
  },
  {
    id: "prod_sofa_003",
    name: "Walnut Bed Frame",
    price: 18000000,
    categoryId: 3,
    images: [
      "../img/sofa-8.png",
      "../img/sofa-9.png"
    ],
    description: "Elegant walnut bed frame with upholstered headboard, perfect for creating a luxurious bedroom atmosphere.",
    stock: 12,
    rating: 4.7,
    reviews: 156,
    featured: true,
    email: "admin@furniture.com",
    shortDes: "Elegant walnut bed frame with upholstered headboard, perfect for creating a luxurious bedroom atmosphere.",
    detail: "Elegant walnut bed frame with upholstered headboard, perfect for creating a luxurious bedroom atmosphere. Bed dimensions: 160x200cm. The headboard is upholstered with premium fabric and features elegant tufting details. The frame is made from solid walnut wood with a natural finish that highlights the wood's beautiful grain pattern.",
    whatsIncluded: [
      "1 Walnut Bed Frame",
      "Upholstered Headboard",
      "Bed Slats",
      "Assembly Instructions",
      "Mattress Recommendations"
    ],
    keyFeatures: [
      "Solid Walnut Wood Frame",
      "Upholstered Headboard",
      "Elegant Tufting Details",
      "Natural Wood Finish",
      "Sturdy Construction",
      "Easy Assembly"
    ],
    tags: ["bed frame", "walnut", "headboard", "bedroom", "luxury"],
  },
  {
    id: "prod_light_001",
    name: "Antique Gold PVC 3-Light Cluster Hanging Lights",
    price: 8500000,
    categoryId: 6,
    images: [
      "../img/antique-gold-pvc-3-light-cluster-hanging-lights-by-foziq-antique-gold-pvc-3-light-cluster-hanging-li-ow33tw.jpeg"
    ],
    description: "Beautiful antique gold hanging lights with 3 bulbs, perfect for dining rooms and living spaces.",
    stock: 20,
    rating: 4.6,
    reviews: 73,
    featured: false,
    email: "admin@furniture.com",
    shortDes: "Beautiful antique gold hanging lights with 3 bulbs, perfect for dining rooms and living spaces.",
    detail: "Beautiful antique gold hanging lights with 3 bulbs, perfect for dining rooms and living spaces. The fixture features an elegant antique gold finish that adds warmth and sophistication to any room. Each bulb provides warm, ambient lighting. The adjustable chain allows for custom height installation.",
    whatsIncluded: [
      "1 Antique Gold Light Fixture",
      "3 LED Bulbs (included)",
      "Adjustable Chain",
      "Installation Instructions",
      "Mounting Hardware"
    ],
    keyFeatures: [
      "Antique Gold Finish",
      "3-Light Cluster Design",
      "Adjustable Chain Length",
      "Energy Efficient LED Bulbs",
      "Easy Installation",
      "Dimmable Compatible"
    ],
    tags: ["lighting", "hanging lights", "antique gold", "dining room", "elegant"],
  },
  {
    id: "prod_light_002",
    name: "Black Copper Hanging Light",
    price: 6500000,
    categoryId: 6,
    images: [
      "../img/black-copper-hanging-light-by-foziq-black-copper-hanging-light-by-foziq-hpwkll.webp"
    ],
    description: "Modern black copper hanging light with industrial design, perfect for contemporary spaces.",
    stock: 15,
    rating: 4.4,
    reviews: 45,
    featured: false,
    email: "admin@furniture.com",
    shortDes: "Modern black copper hanging light with industrial design, perfect for contemporary spaces.",
    detail: "Modern black copper hanging light with industrial design, perfect for contemporary spaces. The fixture combines black and copper finishes for a striking visual effect. The industrial design makes it perfect for modern kitchens, dining rooms, or entryways. The light provides focused illumination while adding a statement piece to your decor.",
    whatsIncluded: [
      "1 Black Copper Light Fixture",
      "1 LED Bulb (included)",
      "Adjustable Chain",
      "Installation Instructions",
      "Mounting Hardware"
    ],
    keyFeatures: [
      "Black & Copper Finish",
      "Industrial Design",
      "Adjustable Chain Length",
      "Energy Efficient LED Bulb",
      "Easy Installation",
      "Modern Aesthetic"
    ],
    tags: ["lighting", "hanging light", "black copper", "industrial", "modern"],
  },
  {
    id: "prod_light_003",
    name: "Black Mild Steel Outdoor Lighting",
    price: 9500000,
    categoryId: 6,
    images: [
      "../img/black-mild-steel-outdoor-lighting-by-superscape-outdoor-lighting-black-mild-steel-outdoor-lighting-b-czfguh.webp"
    ],
    description: "Durable black mild steel outdoor lighting, perfect for gardens, patios, and exterior spaces.",
    stock: 10,
    rating: 4.8,
    reviews: 67,
    featured: false,
    email: "admin@furniture.com",
    shortDes: "Durable black mild steel outdoor lighting, perfect for gardens, patios, and exterior spaces.",
    detail: "Durable black mild steel outdoor lighting, perfect for gardens, patios, and exterior spaces. The fixture is weather-resistant and designed to withstand outdoor conditions. The black finish provides a sleek, modern look that complements any outdoor setting. Perfect for illuminating pathways, gardens, or outdoor seating areas.",
    whatsIncluded: [
      "1 Outdoor Light Fixture",
      "1 LED Bulb (included)",
      "Mounting Bracket",
      "Installation Instructions",
      "Weather Seal Kit"
    ],
    keyFeatures: [
      "Weather-Resistant Design",
      "Black Mild Steel Construction",
      "Energy Efficient LED Bulb",
      "Easy Installation",
      "Durable Finish",
      "Outdoor Rated"
    ],
    tags: ["lighting", "outdoor", "black steel", "garden", "weather-resistant"],
  },
  {
    id: "prod_light_004",
    name: "Brown Metal Wall Light",
    price: 4500000,
    categoryId: 6,
    images: [
      "../img/brown-metal-wall-light-by-foziq-brown-metal-wall-light-by-foziq-neewpg.jpeg"
    ],
    description: "Elegant brown metal wall light with warm finish, perfect for accent lighting in any room.",
    stock: 25,
    rating: 4.3,
    reviews: 38,
    featured: false,
    email: "admin@furniture.com",
    shortDes: "Elegant brown metal wall light with warm finish, perfect for accent lighting in any room.",
    detail: "Elegant brown metal wall light with warm finish, perfect for accent lighting in any room. The fixture features a sophisticated design that adds warmth and character to walls. The brown finish complements various color schemes and decor styles. Perfect for hallways, bedrooms, or as accent lighting in living spaces.",
    whatsIncluded: [
      "1 Wall Light Fixture",
      "1 LED Bulb (included)",
      "Mounting Hardware",
      "Installation Instructions",
      "Wall Anchors"
    ],
    keyFeatures: [
      "Brown Metal Finish",
      "Elegant Design",
      "Energy Efficient LED Bulb",
      "Easy Wall Mounting",
      "Warm Lighting",
      "Versatile Placement"
    ],
    tags: ["lighting", "wall light", "brown metal", "accent lighting", "elegant"],
  },
  {
    id: "prod_light_005",
    name: "Gold Steel Mini Torchiere Wall Sconce",
    price: 7500000,
    categoryId: 6,
    images: [
      "../img/gold-steel-mini-torchiere-wall-sconce-with-fluted-cylinderical-by-fos-lighting-gold-steel-mini-torch-nwsk9y.jpeg"
    ],
    description: "Luxurious gold steel mini torchiere wall sconce with fluted cylindrical design.",
    stock: 18,
    rating: 4.7,
    reviews: 52,
    featured: false,
    email: "admin@furniture.com",
    shortDes: "Luxurious gold steel mini torchiere wall sconce with fluted cylindrical design.",
    detail: "Luxurious gold steel mini torchiere wall sconce with fluted cylindrical design. The fixture features a sophisticated gold finish with elegant fluted details. The upward-facing light creates a warm, ambient glow perfect for creating atmosphere in dining rooms, living spaces, or bedrooms. The compact design makes it ideal for smaller spaces.",
    whatsIncluded: [
      "1 Gold Steel Wall Sconce",
      "1 LED Bulb (included)",
      "Mounting Hardware",
      "Installation Instructions",
      "Wall Anchors"
    ],
    keyFeatures: [
      "Gold Steel Finish",
      "Fluted Cylindrical Design",
      "Upward-Facing Light",
      "Energy Efficient LED Bulb",
      "Easy Installation",
      "Luxurious Aesthetic"
    ],
    tags: ["lighting", "wall sconce", "gold steel", "torchiere", "luxury"],
  },
  {
    id: "prod_light_006",
    name: "Lat N Negro Gold Brass Wall Light",
    price: 8500000,
    categoryId: 6,
    images: [
      "../img/lat-n-negro-gold-brass-wall-light-by-eliante-by-jainsons-lights-lat-n-negro-gold-brass-wall-light-by-1qav10.jpeg"
    ],
    description: "Sophisticated lat n negro gold brass wall light with elegant design and premium finish.",
    stock: 12,
    rating: 4.9,
    reviews: 41,
    featured: false,
    email: "admin@furniture.com",
    shortDes: "Sophisticated lat n negro gold brass wall light with elegant design and premium finish.",
    detail: "Sophisticated lat n negro gold brass wall light with elegant design and premium finish. The fixture combines black and gold brass elements for a striking visual contrast. The design is inspired by classic European lighting styles, making it perfect for traditional or transitional decor. The light provides both functional illumination and decorative appeal.",
    whatsIncluded: [
      "1 Gold Brass Wall Light",
      "1 LED Bulb (included)",
      "Mounting Hardware",
      "Installation Instructions",
      "Wall Anchors"
    ],
    keyFeatures: [
      "Gold Brass Finish",
      "Classic European Design",
      "Black & Gold Contrast",
      "Energy Efficient LED Bulb",
      "Easy Installation",
      "Premium Quality"
    ],
    tags: ["lighting", "wall light", "gold brass", "classic", "elegant"],
  },
  {
    id: "prod_sofa_004",
    name: "Kaylee 3-Seater Sofa in Velvet Blush",
    price: 32000000,
    categoryId: 1,
    images: [
      "../img/kaylee-3-seater-sofa-in-velvet-blush-colour---casacraft-by-pepperfry-kaylee-3-seater-sofa-in-velvet--pzcgck.png"
    ],
    description: "Luxurious 3-seater sofa in soft velvet blush color, perfect for modern living rooms.",
    stock: 6,
    rating: 4.8,
    reviews: 93,
    featured: true,
    email: "admin@furniture.com",
    shortDes: "Luxurious 3-seater sofa in soft velvet blush color, perfect for modern living rooms.",
    detail: "Luxurious 3-seater sofa in soft velvet blush color, perfect for modern living rooms. The sofa features premium velvet upholstery in a beautiful blush tone that adds warmth and sophistication to any space. The deep seating and plush cushions provide exceptional comfort. The modern design with clean lines makes it a versatile piece for various decor styles.",
    whatsIncluded: [
      "1 3-Seater Velvet Sofa",
      "Assembly Instructions",
      "Care & Maintenance Guide",
      "2-Year Warranty Card",
      "Velvet Care Kit"
    ],
    keyFeatures: [
      "Premium Velvet Upholstery",
      "Blush Color Finish",
      "Deep Comfortable Seating",
      "Modern Clean Design",
      "Sturdy Wood Frame",
      "Easy to Maintain"
    ],
    tags: ["sofa", "velvet", "blush", "3-seater", "modern"],
  },
  {
    id: "prod_sofa_005",
    name: "Niki 3-Seater Sofa in Yellow",
    price: 28000000,
    categoryId: 1,
    images: [
      "../img/niki-3-seater-sofa-in-yellow-colour-by-febonic-niki-3-seater-sofa-in-yellow-colour-by-febonic-rypxzi.png"
    ],
    description: "Vibrant yellow 3-seater sofa with modern design, perfect for adding color to your living space.",
    stock: 8,
    rating: 4.6,
    reviews: 67,
    featured: false,
    email: "admin@furniture.com",
    shortDes: "Vibrant yellow 3-seater sofa with modern design, perfect for adding color to your living space.",
    detail: "Vibrant yellow 3-seater sofa with modern design, perfect for adding color to your living space. The bright yellow color makes a bold statement and adds energy to any room. The sofa features comfortable seating with supportive cushions and a sturdy frame. The modern design with clean lines makes it perfect for contemporary homes.",
    whatsIncluded: [
      "1 3-Seater Yellow Sofa",
      "Assembly Instructions",
      "Care & Maintenance Guide",
      "2-Year Warranty Card",
      "Fabric Care Kit"
    ],
    keyFeatures: [
      "Vibrant Yellow Color",
      "Modern Design",
      "Comfortable Seating",
      "Sturdy Construction",
      "Easy to Clean Fabric",
      "Bold Statement Piece"
    ],
    tags: ["sofa", "yellow", "3-seater", "modern", "vibrant"],
  }
];

const mockPosts = [
  {
    id: 1,
    title: "Furniture Trends 2023",
    content: "2023 witnessed the rise of minimalism in interior design...",
    authorId: 1,
    date: "2023-05-15",
    thumbnail: "https://noithat.com/images/blog1.jpg",
  },
];

window.initializeData = () => {
    console.log("Initializing mock data...");
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(mockUsers));
    }
    if (!localStorage.getItem("categories")) {
        localStorage.setItem("categories", JSON.stringify(mockCategories));
    }
    if (!localStorage.getItem("products")) {
        localStorage.setItem("products", JSON.stringify(mockProducts));
    }
    if (!localStorage.getItem("posts")) {
        localStorage.setItem("posts", JSON.stringify(mockPosts));
    }
    if (!localStorage.getItem("currentUser")) {
        localStorage.setItem("currentUser", JSON.stringify(null));
    }
    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
    
    console.log("Mock data initialized successfully");
    console.log("Products:", mockProducts.length);
    console.log("Categories:", mockCategories.length);
    console.log("Users:", mockUsers.length);
}; 