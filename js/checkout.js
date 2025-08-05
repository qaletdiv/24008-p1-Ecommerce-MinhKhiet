document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Checkout page initializing...');
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            showLoginRequired();
            return;
        }
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            showEmptyCart();
            return;
        }
        
        if (!localStorage.getItem("products")) {
            console.log("No products data, initializing...");
            if (typeof initializeData === 'function') {
                initializeData();
            }
        }
        
        loadCheckoutInfo();
        renderOrderSummary();
        
    } catch (error) {
        console.error('Error initializing checkout page:', error);
    }
});

const showLoginRequired = () => {
    const checkoutContainer = document.querySelector('.checkout-container');
    if (checkoutContainer) {
        checkoutContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Login Required</h2>
                <p>You need to login to checkout</p>
                <a href="/pages/login.html" class="continue-shopping">Login</a>
            </div>
        `;
    }
};

const showEmptyCart = () => {
    const checkoutContainer = document.querySelector('.checkout-container');
    if (checkoutContainer) {
        checkoutContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Empty Cart</h2>
                <p>You don't have any products in your cart</p>
                <a href="/pages/product.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
    }
};

const loadCheckoutInfo = () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser) {
            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            
            if (fullNameInput) {
                fullNameInput.value = currentUser.name || '';
            }
            
            if (emailInput) {
                emailInput.value = currentUser.email || '';
            }
        }
        
    } catch (error) {
        console.error('Error loading checkout info:', error);
    }
};

const renderOrderSummary = () => {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const orderSummary = document.getElementById('orderSummary');
        
        if (!orderSummary) return;
        
        if (cart.length === 0) {
            orderSummary.innerHTML = '<p>No products found</p>';
            return;
        }
        
        const orderItemsHTML = cart.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="order-item-image" onerror="this.src='/img/no-image.png'">
                <div class="order-item-details">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-price">$${item.price.toLocaleString()}</div>
                    <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                </div>
            </div>
        `).join('');
        
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 50 : 0;
        const total = subtotal + shipping;
        
        const summaryHTML = `
            <div class="order-items">
                ${orderItemsHTML}
            </div>
            <div class="order-summary-total">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toLocaleString()}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span>$${shipping.toLocaleString()}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>$${total.toLocaleString()}</span>
                </div>
            </div>
        `;
        
        orderSummary.innerHTML = summaryHTML;
        
    } catch (error) {
        console.error('Error rendering order summary:', error);
    }
};

window.placeOrder = () => {
    try {
        const form = document.getElementById('checkoutForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const formData = new FormData(form);
        const orderData = {
            fullName: formData.get('fullName'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            address: formData.get('address'),
            note: formData.get('note'),
            paymentMethod: formData.get('paymentMethod'),
            orderDate: new Date().toISOString(),
            orderId: generateOrderId(),
            status: 'pending'
        };
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 50 : 0;
        const total = subtotal + shipping;
        
        const order = {
            ...orderData,
            items: cart,
            subtotal: subtotal,
            shipping: shipping,
            total: total
        };
        
        saveOrder(order);
        
        localStorage.setItem('cart', JSON.stringify([]));
        
        location.href = `/pages/order-confirmation.html?orderId=${order.orderId}`;
        
    } catch (error) {
        console.error('Error placing order:', error);
        showNotification('An error occurred while placing the order!', 'error');
    }
};

const saveOrder = (order) => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        
        order.userId = currentUser.id;
        order.userEmail = currentUser.email;
        
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        console.log('Order saved:', order);
        
    } catch (error) {
        console.error('Error saving order:', error);
        throw error;
    }
};

const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD${timestamp}${random}`;
};

window.showPaymentDetails = () => {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const paymentDetails = document.getElementById('paymentDetails');
    
    let detailsHTML = '';
    
    switch (paymentMethod) {
        case 'bank':
            detailsHTML = `
                <div class="payment-info">
                    <h4>Bank Transfer Details</h4>
                    <p><strong>Bank:</strong> Online Store Bank</p>
                    <p><strong>Account Number:</strong> 1234567890</p>
                    <p><strong>Account Name:</strong> Online Store Ltd</p>
                    <p><strong>Swift Code:</strong> OSBLUS33</p>
                    <p><strong>Reference:</strong> Please include your order number</p>
                </div>
            `;
            break;
        case 'card':
            detailsHTML = `
                <div class="payment-info">
                    <h4>Credit/Debit Card</h4>
                    <div class="form-group">
                        <label for="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiryDate">Expiry Date</label>
                            <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" placeholder="123" maxlength="3">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="cardName">Name on Card</label>
                        <input type="text" id="cardName" placeholder="John Doe">
                    </div>
                </div>
            `;
            break;
        case 'qr':
            detailsHTML = `
                <div class="payment-info">
                    <h4>QR Code Payment</h4>
                    <div class="qr-code-container">
                        <img src="/img/qr-code.png" alt="QR Code" style="width: 200px; height: 200px; border: 1px solid #ddd;">
                        <p>Scan this QR code with your mobile banking app</p>
                        <p><strong>Amount:</strong> <span id="qrAmount">$0</span></p>
                    </div>
                </div>
            `;
            break;
        case 'paypal':
            detailsHTML = `
                <div class="payment-info">
                    <h4>PayPal Payment</h4>
                    <p>You will be redirected to PayPal to complete your payment.</p>
                    <p>Please ensure you have a PayPal account or create one during checkout.</p>
                </div>
            `;
            break;
        default:
            detailsHTML = '';
    }
    
    paymentDetails.innerHTML = detailsHTML;
    paymentDetails.style.display = detailsHTML ? 'block' : 'none';
    
    if (paymentMethod === 'qr') {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 50 : 0;
        const total = subtotal + shipping;
        const qrAmount = document.getElementById('qrAmount');
        if (qrAmount) {
            qrAmount.textContent = `$${total.toLocaleString()}`;
        }
    }
};

const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    const bgColor = type === 'error' ? '#dc3545' : type === 'warning' ? '#ff9800' : '#4CAF50';
    
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