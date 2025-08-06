document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Account page initializing...');
        
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
        
        loadUserInfo();
        loadOrderHistory();
        
    } catch (error) {
        console.error('Error initializing account page:', error);
    }
});

const showLoginRequired = () => {
    const accountContainer = document.querySelector('.account-container');
    if (accountContainer) {
        accountContainer.innerHTML = `
            <div class="login-required">
                <h2>Login Required</h2>
                <p>You need to login to view your account information</p>
                <a href="../pages/login.html" class="login-btn">Login</a>
            </div>
        `;
    }
};

const loadUserInfo = () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userInfo = document.getElementById('userInfo');
        
        if (!userInfo || !currentUser) return;
        
        const userInfoHTML = `
            <div class="user-info-item">
                <div class="user-info-label">Full Name</div>
                <div class="user-info-value">${currentUser.name || 'Not provided'}</div>
            </div>
            <div class="user-info-item">
                <div class="user-info-label">Email</div>
                <div class="user-info-value">${currentUser.email || 'Not provided'}</div>
            </div>
        `;
        
        userInfo.innerHTML = userInfoHTML;
        
    } catch (error) {
        console.error('Error loading user info:', error);
    }
};

const loadOrderHistory = () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const orderHistory = document.getElementById('orderHistory');
        
        if (!orderHistory) return;
        
        const userOrders = orders.filter(order => order.userId === currentUser.id);
        
        if (userOrders.length === 0) {
            showNoOrders();
            return;
        }
        
        const orderHistoryHTML = userOrders.map(order => {
            const orderDate = new Date(order.orderDate);
            const formattedDate = orderDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            return `
                <div class="order-item">
                    <div class="order-header">
                        <div class="order-id">${order.orderId}</div>
                        <div class="order-date">${formattedDate}</div>
                        <div class="order-status ${order.status}">${getStatusText(order.status)}</div>
                    </div>
                    <div class="order-summary">
                        <div class="order-total">$${order.total.toLocaleString()}</div>
                        <button class="view-order-btn" onclick="viewOrderDetails('${order.orderId}')">
                            View Details
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        orderHistory.innerHTML = orderHistoryHTML;
        
    } catch (error) {
        console.error('Error loading order history:', error);
        showError('Unable to load order history');
    }
};

const showNoOrders = () => {
    const orderHistory = document.getElementById('orderHistory');
    if (orderHistory) {
        orderHistory.innerHTML = `
            <div class="no-orders">
                <h3>No Orders Yet</h3>
                <p>You haven't placed any orders yet. Start shopping to see your order history here.</p>
                <a href="../pages/product.html" class="shop-now-btn">Start Shopping</a>
            </div>
        `;
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

window.viewOrderDetails = (orderId) => {
    try {
        location.href = `../pages/order-confirmation.html?orderId=${orderId}`;
    } catch (error) {
        console.error('Error viewing order details:', error);
        showNotification('Error viewing order details', 'error');
    }
};

const showError = (message) => {
    const orderHistory = document.getElementById('orderHistory');
    if (orderHistory) {
        orderHistory.innerHTML = `
            <div class="no-orders">
                <h3>Error</h3>
                <p>${message}</p>
                <button onclick="location.reload()" style="padding: 10px 20px; background: #d5be8b; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Try Again
                </button>
            </div>
        `;
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