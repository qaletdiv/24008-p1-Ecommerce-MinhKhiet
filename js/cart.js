window.testCheckoutButton = () => {
    console.log('=== Testing Checkout Button ===');
    console.log('1. Checking if proceedToCheckout function exists:', typeof window.proceedToCheckout);
    console.log('2. Checking cart data:', localStorage.getItem('cart'));
    console.log('3. Testing function call...');
    
    try {
        window.proceedToCheckout();
    } catch (error) {
        console.error('Error testing checkout button:', error);
    }
    
    console.log('=== Test Complete ===');
};

document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Cart page initializing...');
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            showLoginRequired();
            return;
        }
        
        if (!localStorage.getItem("products")) {
            console.log("No products data, initializing...");
            if (typeof initializeData === 'function') {
                initializeData();
            }
        }
        
        loadCart();
        
        setTimeout(() => {
            const testButton = document.createElement('button');
            testButton.textContent = 'Test Checkout';
            testButton.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: #ff6b6b;
                color: white;
                padding: 10px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                z-index: 1000;
            `;
            testButton.onclick = window.testCheckoutButton;
            document.body.appendChild(testButton);
        }, 200000);
        
    } catch (error) {
        console.error('Error initializing cart page:', error);
    }
});

const showLoginRequired = () => {
    const cartContent = document.getElementById('cartContent');
    if (cartContent) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <h2>Login Required</h2>
                <p>You need to login to view your cart</p>
                <a href="../pages/login.html" class="continue-shopping">Login</a>
            </div>
        `;
    }
};

const loadCart = () => {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            showEmptyCart();
            return;
        }
        
        renderCart(cart);
        updateCartCountInCart();
        
    } catch (error) {
        console.error('Error loading cart:', error);
        showError('Unable to load cart');
    }
};

const showEmptyCart = () => {
    const cartContent = document.getElementById('cartContent');
    const cartItemCount = document.getElementById('cartItemCount');
    
    if (cartContent) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <h2>Empty Cart</h2>
                <p>You don't have any products in your cart</p>
                <a href="/pages/product.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
    }
    
    if (cartItemCount) {
        cartItemCount.textContent = '0 items';
    }
};

const renderCart = (cart) => {
    const cartContent = document.getElementById('cartContent');
    const cartItemCount = document.getElementById('cartItemCount');
    
    if (!cartContent) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartItemCount) {
        cartItemCount.textContent = `${totalItems} items`;
    }
    
    const cartItemsHTML = cart.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='../img/no-image.png'">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                           onchange="updateQuantityFromInput('${item.id}', this.value)">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
            </div>
            <div class="cart-item-total">$${(item.price * item.quantity).toLocaleString()}</div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 50 : 0;
    const total = subtotal + shipping;
    
    const cartSummaryHTML = `
        <div class="cart-summary">
            <div class="cart-summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toLocaleString()}</span>
            </div>
            <div class="cart-summary-row">
                <span>Shipping:</span>
                <span>$${shipping.toLocaleString()}</span>
            </div>
            <div class="cart-summary-row cart-summary-total">
                <span>Total:</span>
                <span>$${total.toLocaleString()}</span>
            </div>
            <div class="cart-actions">
                <button class="cart-btn cart-btn-secondary" onclick="location.href='../pages/product.html'">
                    Continue Shopping
                </button>
                <button class="cart-btn cart-btn-primary" onclick="proceedToCheckout()">
                    Checkout
                </button>
            </div>
        </div>
    `;
    
    cartContent.innerHTML = `
        <div class="cart-items">
            ${cartItemsHTML}
        </div>
        ${cartSummaryHTML}
    `;
};

window.updateQuantity = (productId, change) => {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            const newQuantity = item.quantity + change;
            if (newQuantity > 0) {
                item.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCart();
            } else {
                removeFromCart(productId);
            }
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
};

window.updateQuantityFromInput = (productId, newQuantity) => {
    try {
        const quantity = parseInt(newQuantity);
        if (quantity > 0) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cart.find(item => item.id === productId);
            
            if (item) {
                item.quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                loadCart();
            }
        } else {
            removeFromCart(productId);
        }
    } catch (error) {
        console.error('Error updating quantity from input:', error);
    }
};

window.removeFromCart = (productId) => {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        showNotification('Product removed from cart');
        loadCart();
        updateCartCountInCart();
    } catch (error) {
        console.error('Error removing product:', error);
    }
};

window.proceedToCheckout = () => {
    try {
        console.log('Checkout button clicked!');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('Cart items:', cart);
        
        if (cart.length === 0) {
            console.log('Cart is empty, showing warning');
            showNotification('Cart is empty!', 'warning');
            return;
        }
        
        console.log('Proceeding to checkout...');
        console.log('Current location:', window.location.href);
        console.log('Navigating to:', '../pages/checkout.html');
        
        location.href = '../pages/checkout.html';
        
    } catch (error) {
        console.error('Error proceeding to checkout:', error);
        showNotification('Error proceeding to checkout', 'error');
    }
};

const updateCartCountInCart = () => {
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

const showError = (message) => {
    const cartContent = document.getElementById('cartContent');
    if (cartContent) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <h3>Error</h3>
                <p>${message}</p>
                <button onclick="location.reload()" style="padding: 10px 20px; background: #d5be8b; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Try Again
                </button>
            </div>
        `;
    }
}; 