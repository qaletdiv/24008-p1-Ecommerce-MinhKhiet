function renderFeaturedProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const featuredProducts = products.filter(p => p.featured);
    const featuredContainer = document.getElementById('featuredProducts');
    
    if (featuredContainer) {
        featuredContainer.innerHTML = featuredProducts.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price.toLocaleString()} VND</p>
                    <p class="rating">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</p>
                    <button class="btn add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
                </div>
            </div>
        `).join('');
    }
}


function renderCategories() {
   
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const categoriesContainer = document.getElementById('categories');
    
    if (categoriesContainer) {
        categoriesContainer.innerHTML = categories.map(category => `
            <div class="category-card">
                <h3>${category.name}</h3>
                <a href="product.html?category=${category.slug}" class="btn">Xem sản phẩm</a>
            </div>
        `).join('');
    }
}


function handleAddToCart() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const products = JSON.parse(localStorage.getItem('products')) || [];
            
            const product = products.find(p => p.id === productId);
            if (!product) {
                console.error('Không tìm thấy sản phẩm:', productId);
                return;
            }
            
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images && product.images[0] ? product.images[0] : "../img/no-image.png",
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            showNotification('Đã thêm sản phẩm vào giỏ hàng!');
            updateCartCount(); 
        }
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');
    
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}


function renderHeader() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headerAuth = document.getElementById('headerAuth');
    
    if (headerAuth) {
        if (currentUser) {
            headerAuth.innerHTML = `
                <div class="user-profile">
                    <img src="${currentUser.avatar}" alt="${currentUser.name}" class="avatar">
                    <span>${currentUser.name}</span>
                    <a href="#" id="logoutBtn">Đăng xuất</a>
                </div>
                <div class="cart-icon">
                    <a href="cart.html">🛒</a>
                    <span id="cartCount"></span>
                </div>
            `;
            document.getElementById('logoutBtn').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                renderHeader(); 
                location.reload(); 
            });
        } else {
            headerAuth.innerHTML = `
                <a href="login.html" class="btn">Đăng nhập</a>
                <a href="signup.html" class="btn">Đăng ký</a>
                <div class="cart-icon">
                    <a href="cart.html">🛒</a>
                    <span id="cartCount"></span>
                </div>
            `;
        }
    }
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeData(); 
    renderHeader();
    renderFeaturedProducts();
    renderCategories();
    handleAddToCart();
});
