let user = JSON.parse(sessionStorage.getItem('user') || null);

if (user == null) {
    location.replace('/pages/login.html'); 
} else if (!user.seller) {
    location.replace('/pages/seller.html'); 
}

let greeting = document.querySelector('#seller-greeting');
if (greeting) {
    greeting.innerHTML += user.name;
}

let loader = document.querySelector('.loader');
let noProductImg = document.querySelector('.no-product');

if (loader) {
    loader.style.display = 'block';
}

const createProduct = (product) => {
    const productContainer = document.querySelector('.product-container');
    if (!productContainer) return;

    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <button class="btn edit-btn" onclick="editProduct('${product.id}')">
            <img src="../img/edit.png" alt="Edit">
        </button>
        <button class="btn open-btn" onclick="viewProduct('${product.id}')">
            <img src="../img/open.png" alt="View">
        </button>
        <button class="btn delete-btn" onclick="deleteProduct('${product.id}')">
            <img src="../img/delete.png" alt="Delete">
        </button>
        <img src="${product.images && product.images[0] ? product.images[0] : '../img/no-image.png'}" 
class="product-img" alt="${product.name}" onerror="this.src='../img/no-image.png'">
        <p class="product-name">${product.name} →</p>
        <p class="product-price">$${product.price.toLocaleString()}</p>
    `;

    productContainer.appendChild(productCard);
};

const setupProducts = () => {
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    const userProducts = allProducts.filter(product => product.email === user.email);

    if (loader) {
        loader.style.display = 'none';
    }

    if (userProducts.length === 0) {
        if (noProductImg) {
            noProductImg.style.display = 'block';
        }
    } else {
        if (noProductImg) {
            noProductImg.style.display = 'none';
        }
        userProducts.forEach(product => createProduct(product));
    }
};

window.editProduct = (productId) => {
    location.href = `../pages/add-product.html?edit=${productId}`;
};

window.viewProduct = (productId) => {
    location.href = `../pages/product.html?id=${productId}`;
};

window.deleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            let allProducts = JSON.parse(localStorage.getItem('products')) || [];
            allProducts = allProducts.filter(product => product.id !== productId);
            localStorage.setItem('products', JSON.stringify(allProducts));
            
            showNotification('Product deleted successfully');
            location.reload();
        } catch (error) {
            console.error('Error deleting product:', error);
            showNotification('Error deleting product', 'error');
        }
    }
};

const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    const bgColor = type === 'error' ? '#dc3545' : '#4CAF50';
    
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

setupProducts();
