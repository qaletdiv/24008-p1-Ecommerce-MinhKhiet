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
        userProducts.forEach(product => createProduct(product));
    }
};

setupProducts();
