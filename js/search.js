document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Search page initializing...');
        
        if (!localStorage.getItem("products")) {
            console.log("No products data, initializing...");
            if (typeof initializeData === 'function') {
                initializeData();
            }
        }
        
        loadSearchResults();
        setupSearchPageNavigation();
        
    } catch (error) {
        console.error('Error initializing search page:', error);
    }
});

const loadSearchResults = () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q');
        
        if (!searchQuery) {
            showNoResults('No search query provided');
            return;
        }
        
        const allProducts = JSON.parse(localStorage.getItem('products')) || [];
        const searchResults = allProducts.filter(product => {
            const searchLower = searchQuery.toLowerCase();
            return product.name.toLowerCase().includes(searchLower) ||
                   product.shortDes.toLowerCase().includes(searchLower) ||
                   (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchLower)));
        });
        
        renderSearchResults(searchResults, searchQuery);
        
    } catch (error) {
        console.error('Error loading search results:', error);
        showError('Error loading search results');
    }
};

const renderSearchResults = (results, query) => {
    const searchTitle = document.getElementById('searchTitle');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchTitle || !searchResults) return;
    
    searchTitle.textContent = `Search Results for "${query}" (${results.length} products)`;
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <h3>No products found</h3>
                <p>Try searching with different keywords</p>
                <a href="../pages/product.html" class="continue-shopping">Browse All Products</a>
            </div>
        `;
        return;
    }
    
    const resultsHTML = results.map(product => `
        <div class="product-card">
            <img src="${product.images && product.images[0] ? product.images[0] : '../img/no-image.png'}" 
                 onclick="location.href='../pages/product-detail.html?id=${product.id}'" 
                 class="product-img" 
                 alt="${product.name}" 
                 onerror="this.src='../img/no-image.png'">
            <p class="product-name">${product.name}</p>
            <p class="product-price">$${product.price.toLocaleString()}</p>
            <button onclick="addToCartFromSearch('${product.id}')" class="add-to-cart-btn">
                Add to Cart
            </button>
        </div>
    `).join('');
    
    searchResults.innerHTML = resultsHTML;
};

const setupSearchPageNavigation = () => {
    const searchBtn = document.querySelector('.search-btn');
    const searchBox = document.querySelector('.search');
    
    if (searchBtn && searchBox) {
        searchBtn.addEventListener('click', () => {
            if (searchBox.value.trim().length > 0) {
                location.href = `../pages/search.html?q=${encodeURIComponent(searchBox.value.trim())}`;
            }
        });
        
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (searchBox.value.trim().length > 0) {
                    location.href = `../pages/search.html?q=${encodeURIComponent(searchBox.value.trim())}`;
                }
            }
        });
    }
};

window.addToCartFromSearch = (productId) => {
    try {
        const user = JSON.parse(sessionStorage.getItem('user') || 'null');
        if (!user) {
            showNotification('Please login to add products to cart', 'warning');
            return;
        }
        
        const allProducts = JSON.parse(localStorage.getItem('products')) || [];
        const product = allProducts.find(p => p.id === productId);
        
        if (product) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
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
            updateSearchCartCount();
            showNotification('Product added to cart!');
        }
    } catch (error) {
        console.error('Error adding to cart from search:', error);
    }
};

const updateSearchCartCount = () => {
    const cartCount = document.querySelector('.cart-item-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems > 0 ? totalItems : '00';
    }
};

const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    const bgColor = type === 'warning' ? '#ff9800' : '#4CAF50';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
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
};

const showNoResults = (message) => {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.innerHTML = `
            <div class="no-results">
                <h3>${message}</h3>
                <a href="../pages/product.html" class="continue-shopping">Browse All Products</a>
            </div>
        `;
    }
};

const showError = (message) => {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.innerHTML = `
            <div class="no-results">
                <h3>Error</h3>
                <p>${message}</p>
                <button onclick="location.reload()" style="padding: 10px 20px; background: #d5be8b; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Try Again
                </button>
            </div>
        `;
    }
};
