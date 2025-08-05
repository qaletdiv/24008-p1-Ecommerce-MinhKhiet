const mockUsers = [
  {
    id: 1,
    name: "Admin Nội Thất",
    email: "admin@noithat.com",
    password: "admin123",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=1",
    seller: true,
    createdAt: "2024-01-02T00:00:00.000Z"
  },
  {
    id: 2,
    name: "Khách hàng VIP",
    email: "vip@noithat.com",
    password: "vip123",
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=2",
    seller: false,
  },
];

const mockCategories = [
  { id: 1, name: "Ghế sofa", slug: "ghe-sofa" },
  { id: 2, name: "Bàn ăn", slug: "ban-an" },
  { id: 3, name: "Giường ngủ", slug: "giuong-ngu" },
  { id: 4, name: "Tủ quần áo", slug: "tu-quan-ao" },
  { id: 5, name: "Kệ TV", slug: "ke-tv" },
  { id: 6, name: "Đèn trang trí", slug: "den-trang-tri" },
];

 const mockProducts = [
  {
    id: "prod_sofa_001",
    name: "Ghế Sofa Da Cao Cấp",
    price: 25000000,
    categoryId: 1,
    images: [
      "/img/sofa-1.png",
      "/img/sofa-2.png",
      "/img/sofa-3.png",
      "/img/sofa-4.png",
    ],
    description:
      "Ghế sofa làm từ da bò nhập khẩu Ý, êm ái và sang trọng, mang lại vẻ đẹp hiện đại cho không gian phòng khách.",
    stock: 15,
    rating: 4.8,
    featured: true,
    email: "admin@noithat.com",
    shortDes:
      "Ghế sofa da cao cấp, thiết kế hiện đại, chất liệu da bò nhập khẩu Ý.",
    detail:
      "Ghế sofa da cao cấp, thiết kế hiện đại, chất liệu da bò nhập khẩu Ý. Mang lại sự sang trọng và thoải mái cho không gian phòng khách của bạn. Kích thước: 220x100x80cm. Khung gỗ sồi tự nhiên, đệm mút cao cấp chống xẹp lún.",
    tags: ["sofa", "da", "cao cấp", "phòng khách", "hiện đại"],
  },
  {
    id: "prod_sofa_002",
    name: "Bàn Ăn Gỗ Sồi 6 Ghế",
    price: 12000000,
    categoryId: 2,
    images: ["/img/sofa-5.png"],
    description:
      "Bàn ăn làm từ gỗ sồi tự nhiên, kèm 6 ghế đệm êm ái, phù hợp cho gia đình đông người.",
    stock: 8,
    rating: 4.5,
    featured: true,
    email: "admin@noithat.com",
    shortDes:
      "Bàn ăn gỗ sồi tự nhiên, thiết kế đơn giản nhưng tinh tế, kèm 6 ghế đệm êm ái.",
    detail:
      "Bàn ăn gỗ sồi tự nhiên, thiết kế đơn giản nhưng tinh tế, kèm 6 ghế đệm êm ái. Phù hợp cho không gian bếp hiện đại. Kích thước bàn: 160x80x75cm. Bề mặt được xử lý chống thấm, chống trầy xước.",
    tags: ["bàn ăn", "gỗ sồi", "6 ghế", "phòng bếp", "tự nhiên"],
  },
  {
    id: "prod_sofa_003",
    name: "Giường Ngủ Gỗ Óc Chó",
    price: 18000000,
    categoryId: 3,
    images: ["/img/sofa-6.png", "/img/sofa-7.png"],
    description:
      "Giường ngủ thiết kế hiện đại, chất liệu gỗ óc chó tự nhiên, mang lại giấc ngủ sâu và thoải mái.",
    stock: 5,
    rating: 4.9,
    featured: false,
    email: "admin@noithat.com",
    shortDes:
      "Giường ngủ gỗ óc chó tự nhiên, thiết kế sang trọng, mang lại giấc ngủ ngon.",
    detail:
      "Giường ngủ gỗ óc chó tự nhiên, thiết kế sang trọng, mang lại giấc ngủ ngon. Khung giường chắc chắn, bền đẹp theo thời gian. Kích thước: 180x200cm. Đầu giường bọc nệm êm ái, dễ dàng vệ sinh.",
    tags: ["giường", "gỗ óc chó", "phòng ngủ", "sang trọng"],
  },
  {
    id: "prod_light_001",
    name: "Đèn Treo Trần Hiện Đại",
    price: 3500000,
    categoryId: 6,
    images: [
      "/img/black-copper-hanging-light-by-foziq-black-copper-hanging-light-by-foziq-hpwkll.webp",
      "/img/antique-gold-pvc-3-light-cluster-hanging-lights-by-foziq-antique-gold-pvc-3-light-cluster-hanging-li-ow33tw.jpeg",
    ],
    description:
      "Đèn treo trần thiết kế tối giản, phù hợp với nhiều không gian nội thất khác nhau.",
    stock: 20,
    rating: 4.7,
    featured: true,
    email: "admin@noithat.com",
    shortDes: "Đèn treo trần hiện đại, chất liệu đồng cao cấp, ánh sáng ấm áp.",
    detail:
      "Đèn treo trần hiện đại với chất liệu đồng cao cấp, mang lại ánh sáng ấm áp và tạo điểm nhấn cho không gian sống. Dễ dàng lắp đặt và tiết kiệm điện năng. Kích thước: Đường kính 30cm, chiều cao 45cm.",
    tags: ["đèn", "treo trần", "hiện đại", "trang trí", "ánh sáng"],
  },
  {
    id: "prod_light_002",
    name: "Đèn Tường Pha Lê",
    price: 1800000,
    categoryId: 6,
    images: [
      "/img/gold-steel-mini-torchiere-wall-sconce-with-fluted-cylinderical-by-fos-lighting-gold-steel-mini-torch-nwsk9y.jpeg",
      "/img/brown-metal-wall-light-by-foziq-brown-metal-wall-light-by-foziq-neewpg.jpeg",
    ],
    description:
      "Đèn tường pha lê sang trọng, tạo hiệu ứng ánh sáng lấp lánh cho không gian.",
    stock: 10,
    rating: 4.6,
    featured: false,
    email: "admin@noithat.com",
    shortDes:
      "Đèn tường pha lê cao cấp, thiết kế tinh xảo, ánh sáng lung linh.",
    detail:
      "Đèn tường pha lê cao cấp, thiết kế tinh xảo với các hạt pha lê cắt gọt tỉ mỉ, tạo hiệu ứng ánh sáng lung linh và sang trọng. Phù hợp cho phòng khách, phòng ngủ hoặc hành lang. Kích thước: 20x30cm.",
    tags: ["đèn", "tường", "pha lê", "sang trọng", "trang trí"],
  },
  {
    id: "prod_sofa_004",
    name: "Ghế Sofa Vải Nỉ Màu Vàng",
    price: 8500000,
    categoryId: 1,
    images: [
      "/img/niki-3-seater-sofa-in-yellow-colour-by-febonic-niki-3-seater-sofa-in-yellow-colour-by-febonic-rypxzi.png",
    ],
    description:
      "Ghế sofa bọc vải nỉ mềm mại, màu vàng tươi sáng, mang lại không gian ấm cúng và trẻ trung.",
    stock: 12,
    rating: 4.4,
    featured: false,
    email: "admin@noithat.com",
    shortDes: "Ghế sofa vải nỉ màu vàng, thiết kế hiện đại, êm ái và bền đẹp.",
    detail:
      "Ghế sofa vải nỉ màu vàng, thiết kế hiện đại, êm ái và bền đẹp. Chất liệu vải nỉ cao cấp, dễ dàng vệ sinh. Phù hợp cho căn hộ nhỏ hoặc phòng khách có phong cách trẻ trung. Kích thước: 180x90x75cm.",
    tags: ["sofa", "vải nỉ", "màu vàng", "phòng khách", "trẻ trung"],
  },
  {
    id: "prod_sofa_005",
    name: "Ghế Sofa Vải Nhung Hồng",
    price: 9200000,
    categoryId: 1,
    images: [
      "/img/kaylee-3-seater-sofa-in-velvet-blush-colour---casacraft-by-pepperfry-kaylee-3-seater-sofa-in-velvet--pzcgck.png",
    ],
    description:
      "Ghế sofa bọc vải nhung màu hồng phấn, tạo điểm nhấn mềm mại và lãng mạn cho không gian.",
    stock: 9,
    rating: 4.6,
    featured: false,
    email: "admin@noithat.com",
    shortDes:
      "Ghế sofa vải nhung hồng, thiết kế sang trọng, mang lại cảm giác mềm mại và ấm áp.",
    detail:
      "Ghế sofa vải nhung hồng, thiết kế sang trọng, mang lại cảm giác mềm mại và ấm áp. Chất liệu vải nhung cao cấp, khung gỗ chắc chắn. Phù hợp cho phòng khách hoặc phòng ngủ. Kích thước: 200x95x80cm.",
    tags: ["sofa", "vải nhung", "màu hồng", "lãng mạn", "sang trọng"],
  },
];

const mockPosts = [
  {
    id: 1,
    title: "Xu hướng nội thất 2023",
    content: "Năm 2023 chứng kiến sự lên ngôi của phong cách tối giản...",
    authorId: 1,
    date: "2023-05-15",
    thumbnail: "https://noithat.com/images/blog1.jpg",
  },
];

function initializeData() {
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
};

initializeData(); 