
const mockUsers = [
    {
        id: 1,
        name: "Admin Nội Thất",
        email: "admin@noithat.com",
        password: "admin123",
        role: "admin",
        avatar: "https://i.pravatar.cc/150?img=1",
        seller: true 
    },
    {
        id: 2,
        name: "Khách hàng VIP",
        email: "vip@noithat.com",
        password: "vip123",
        role: "user",
        avatar: "https://i.pravatar.cc/150?img=2",
        seller: false
    }
];


const mockCategories = [
    { id: 1, name: "Ghế sofa", slug: "ghe-sofa" },
    { id: 2, name: "Bàn ăn", slug: "ban-an" },
    { id: 3, name: "Giường ngủ", slug: "giuong-ngu" },
    { id: 4, name: "Tủ quần áo", slug: "tu-quan-ao" },
    { id: 5, name: "Kệ TV", slug: "ke-tv" }
];


const mockProducts = [
    {
        id: 1,
        name: "Ghế sofa da cao cấp",
        price: 25000000,
        categoryId: 1,
        images: [
            "https://noithat.com/images/sofa1.jpg", 
            "https://noithat.com/images/sofa2.jpg"
        ],
        description: "Ghế sofa làm từ da bò nhập khẩu Ý, êm ái và sang trọng",
        stock: 15,
        rating: 4.8,
        featured: true,
        email: "admin@noithat.com", 
        shortDes: "Ghế sofa da cao cấp, thiết kế hiện đại, chất liệu da bò nhập khẩu Ý.",
        detail: "Ghế sofa da cao cấp, thiết kế hiện đại, chất liệu da bò nhập khẩu Ý. Mang lại sự sang trọng và thoải mái cho không gian phòng khách của bạn. Kích thước: 220x100x80cm.",
        tags: ["sofa", "da", "cao cấp", "phòng khách"]
    },
    {
        id: 2,
        name: "Bàn ăn gỗ sồi 6 ghế",
        price: 12000000,
        categoryId: 2,
        images: [
            "https://noithat.com/images/banan1.jpg"
        ],
        description: "Bàn ăn làm từ gỗ sồi tự nhiên, kèm 6 ghế đệm êm",
        stock: 8,
        rating: 4.5,
        featured: true,
        email: "admin@noithat.com",
        shortDes: "Bàn ăn gỗ sồi tự nhiên, thiết kế đơn giản nhưng tinh tế, kèm 6 ghế đệm êm ái.",
        detail: "Bàn ăn gỗ sồi tự nhiên, thiết kế đơn giản nhưng tinh tế, kèm 6 ghế đệm êm ái. Phù hợp cho không gian bếp hiện đại. Kích thước bàn: 160x80x75cm.",
        tags: ["bàn ăn", "gỗ sồi", "6 ghế", "phòng bếp"]
    },
    {
        id: 3,
        name: "Giường ngủ gỗ óc chó",
        price: 18000000,
        categoryId: 3,
        images: [
            "https://noithat.com/images/giuong1.jpg", 
            "https://noithat.com/images/giuong2.jpg"
        ],
        description: "Giường ngủ thiết kế hiện đại, chất liệu gỗ óc chó tự nhiên",
        stock: 5,
        rating: 4.9,
        featured: false,
        email: "admin@noithat.com",
        shortDes: "Giường ngủ gỗ óc chó tự nhiên, thiết kế sang trọng, mang lại giấc ngủ ngon.",
        detail: "Giường ngủ gỗ óc chó tự nhiên, thiết kế sang trọng, mang lại giấc ngủ ngon. Khung giường chắc chắn, bền đẹp theo thời gian. Kích thước: 180x200cm.",
        tags: ["giường", "gỗ óc chó", "phòng ngủ"]
    }
];


const mockPosts = [
    {
        id: 1,
        title: "Xu hướng nội thất 2023",
        content: "Năm 2023 chứng kiến sự lên ngôi của phong cách tối giản...",
        authorId: 1,
        date: "2023-05-15",
        thumbnail: "https://noithat.com/images/blog1.jpg"
    }
];


function initializeData() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(mockUsers));
    }
    if (!localStorage.getItem('categories')) {
        localStorage.setItem('categories', JSON.stringify(mockCategories));
    }
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(mockProducts));
    }
    if (!localStorage.getItem('posts')) {
        localStorage.setItem('posts', JSON.stringify(mockPosts));
    }
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}


