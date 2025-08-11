document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Order confirmation page initializing...');
        
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
        
        loadOrderDetails();
        
    } catch (error) {
        console.error('Error initializing order confirmation page:', error);
    }
});

const showLoginRequired = () => {
    const confirmationContainer = document.querySelector('.confirmation-container');
    if (confirmationContainer) {
        confirmationContainer.innerHTML = `
            <div class="error-message">
                <h2>Login Required</h2>
                <p>You need to login to view order information</p>
                <a href="../pages/login.html" class="btn-primary">Login</a>
            </div>
        `;
    }
};

const loadOrderDetails = () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('orderId');
        
        if (!orderId) {
            showError('Order information not found');
            return;
        }
        
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const order = orders.find(o => o.orderId === orderId);
        
        if (!order) {
            showError('Order not found');
            return;
        }
        
        renderOrderDetails(order);
        
    } catch (error) {
        console.error('Error loading order details:', error);
        showError('Unable to load order information');
    }
};

const renderOrderDetails = (order) => {
    try {
        const orderDetails = document.getElementById('orderDetails');
        if (!orderDetails) return;
        
        const orderDate = new Date(order.orderDate);
        const formattedDate = orderDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const orderInfoHTML = `
            <div class="order-info">
                <div class="order-info-item">
                    <div class="order-info-label">Order ID</div>
                    <div class="order-info-value">${order.orderId}</div>
                </div>
                <div class="order-info-item">
                    <div class="order-info-label">Order Date</div>
                    <div class="order-info-value">${formattedDate}</div>
                </div>
                <div class="order-info-item">
                    <div class="order-info-label">Status</div>
                    <div class="order-info-value">${getStatusText(order.status)}</div>
                </div>
                <div class="order-info-item">
                    <div class="order-info-label">Payment Method</div>
                    <div class="order-info-value">${getPaymentMethodText(order.paymentMethod)}</div>
                </div>
            </div>
        `;
        
        const shippingInfoHTML = `
            <div class="order-info">
                <div class="order-info-item">
                    <div class="order-info-label">Recipient</div>
                    <div class="order-info-value">${order.fullName}</div>
                </div>
                <div class="order-info-item">
                    <div class="order-info-label">Phone Number</div>
                    <div class="order-info-value">${order.phone}</div>
                </div>
                <div class="order-info-item">
                    <div class="order-info-label">Email</div>
                    <div class="order-info-value">${order.email}</div>
                </div>
                <div class="order-info-item">
                    <div class="order-info-label">Shipping Address</div>
                    <div class="order-info-value">${order.address}</div>
                </div>
            </div>
        `;
        
        const orderItemsHTML = order.items.map(item => `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="order-item-image" onerror="this.src='/img/no-image.png'">
                <div class="order-item-details">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-price">$${item.price.toLocaleString()}</div>
                    <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                </div>
            </div>
        `).join('');
        
        const orderSummaryHTML = `
            <div class="order-summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>$${order.subtotal.toLocaleString()}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span>$${order.shipping.toLocaleString()}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>$${order.total.toLocaleString()}</span>
                </div>
            </div>
        `;
        
        const noteHTML = order.note ? `
            <div class="order-info-item">
                <div class="order-info-label">Notes</div>
                <div class="order-info-value">${order.note}</div>
            </div>
        ` : '';
        
        orderDetails.innerHTML = `
            ${orderInfoHTML}
            ${shippingInfoHTML}
            ${noteHTML}
            <div class="order-items">
                ${orderItemsHTML}
            </div>
            ${orderSummaryHTML}
        `;
        
    } catch (error) {
        console.error('Error rendering order details:', error);
        showError('Unable to display order information');
    }
};

const getStatusText = (status) => {
    const statusMap = {
        'pending': 'Pending',
        'processing': 'Processing',
        'shipped': 'Shipped',
        'delivered': 'Delivered',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
};

const getPaymentMethodText = (method) => {
    const methodMap = {
        'cod': 'Cash on Delivery (COD)',
        'bank': 'Bank Transfer',
        'card': 'Credit/Debit Card',
        'qr': 'QR Code Payment',
        'paypal': 'PayPal'
    };
    return methodMap[method] || method;
};

const showError = (message) => {
    const orderDetails = document.getElementById('orderDetails');
    if (orderDetails) {
        orderDetails.innerHTML = `
            <div class="error-message">
                <h2>Error</h2>
                <p>${message}</p>
                <button onclick="location.href='../pages/index.html'" class="btn-primary">
                    Back to Home
                </button>
            </div>
        `;
    }
}; 
