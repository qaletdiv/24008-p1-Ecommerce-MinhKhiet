
let user = JSON.parse(sessionStorage.getItem('user') || null);

window.onload = () => {
    if (user == null) {
        location.replace('../pages/login.html'); 
    } else if (!user.seller) {
        location.replace('../pages/dashboard.html');
    }
    
    if (productId) {
        fetchProductData();
    }
};

let editables = [...document.querySelectorAll('*[contenteditable="true"]')];

editables.map((element) => {
    let placeholder = element.getAttribute('data-placeholder');
    element.innerHTML = placeholder;
    element.addEventListener('focus', () => {
        if (element.innerHTML === placeholder) {
            element.innerHTML = '';
        }
    });
    element.addEventListener('focusout', () => {
        if (!element.innerHTML.length) {
            element.innerHTML = placeholder;
        }
    });
});

let uploadInput = document.querySelector('#upload-image');
let imagePath = '/img/no-image.png';

uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    if (file && file.type.includes('image')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePath = e.target.result; 
            let productImage = document.querySelector('.product-img');
            if (productImage) {
                productImage.src = imagePath;
            }
        };
        reader.readAsDataURL(file);
    } else {
        showFormError('Please select a valid image file.');
    }
});

let addProductBtn = document.querySelector('.add-product-btn');
let loader = document.querySelector('.loader');

let productName = document.querySelector('.product-title');
let shortDes = document.querySelector('.product-des');
let price = document.querySelector('.price');
let detail = document.querySelector('.des');
let tags = document.querySelector('.tags');

addProductBtn.addEventListener('click', () => {
    if (productName.innerHTML === productName.getAttribute('data-placeholder') || !productName.innerHTML.trim().length) {
        showFormError('Please enter product name.');
    } else if (shortDes.innerHTML === shortDes.getAttribute('data-placeholder') || !shortDes.innerHTML.trim().length) {
        showFormError('Short description must be at least 80 characters.');
    } else if (price.innerHTML === price.getAttribute('data-placeholder') || !Number(price.innerHTML)) {
        showFormError('Please enter a valid price.');
    } else if (detail.innerHTML === detail.getAttribute('data-placeholder') || !detail.innerHTML.trim().length) {
        showFormError('Please enter product details.');
    } else if (tags.innerHTML === tags.getAttribute('data-placeholder') || !tags.innerHTML.trim().length) {
        showFormError('Please enter tags.');
    } else {
        if (loader) {
            loader.style.display = 'block';
        }
        let data = productData();
        if (productId) {
            data.id = productId; 
        }
        saveProduct(data);
    }
});

const productData = () => {
    let tagsArr = tags.innerText.split(",").map(item => item.trim().toLowerCase()).filter(tag => tag.length > 0);

    return {
        name: productName.innerText.trim(),
        shortDes: shortDes.innerText.trim(),
        price: parseFloat(price.innerText.trim()), 
        detail: detail.innerText.trim(),
        tags: tagsArr,
        images: [imagePath],
        email: JSON.parse(sessionStorage.getItem('user')).email,
        draft: false,
        stock: 10,
        rating: 4.5,
        featured: false,
        categoryId: 1
    };
};

const saveProduct = (data) => {
    try {
        let allProducts = JSON.parse(localStorage.getItem('products')) || [];
        
        if (productId) {
            const index = allProducts.findIndex(p => p.id === productId);
            if (index !== -1) {
                allProducts[index] = { ...allProducts[index], ...data };
            }
        } else {
            data.id = generateProductId();
            allProducts.push(data);
        }
        
        localStorage.setItem('products', JSON.stringify(allProducts));
        
        if (loader) {
            loader.style.display = 'none';
        }
        
        showNotification('Product saved successfully!');
        setTimeout(() => {
            location.href = '../pages/dashboard.html';
        }, 1500);
        
    } catch (error) {
        console.error('Error saving product:', error);
        showFormError('Error saving product. Please try again.');
        if (loader) {
            loader.style.display = 'none';
        }
    }
};

const generateProductId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `prod_${timestamp}_${random}`;
};

let draftBtn = document.querySelector('.draft-btn');

draftBtn.addEventListener('click', () => {
    if (!productName.innerHTML.trim().length || productName.innerHTML === productName.getAttribute('data-placeholder')) {
        showFormError('Please enter product name (at least).');
    } else { 
        let data = productData();
        if (loader) {
            loader.style.display = 'block';
        }
        data.draft = true;
        if (productId) {
            data.id = productId;
        }
        saveProduct(data);
    }
});

let productId = null;
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('edit')) {
    productId = urlParams.get('edit');
}

const fetchProductData = () => {
    if (addProductBtn) {
        addProductBtn.innerHTML = 'Update Product';
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);

    if (product) {
        setFormData(product);
    } else {
        console.log('Product not found with ID:', productId);
        showFormError('Product not found for editing.');
    }
};

const setFormData = (data) => {
    if (productName) productName.innerHTML = data.name;
    if (shortDes) shortDes.innerHTML = data.shortDes;
    if (price) price.innerHTML = data.price;
    if (detail) detail.innerHTML = data.detail;
    if (tags) tags.innerHTML = data.tags.join(', '); 

    let productImg = document.querySelector('.product-img');
    if (productImg && data.images && data.images[0]) {
        productImg.src = imagePath = data.images[0]; 
    }
};

const showFormError = (message) => {
    const errorDiv = document.querySelector('.error');
    if (errorDiv) {
        errorDiv.innerHTML = `<p>${message}</p>`;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
};

const showNotification = (message) => {
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
};
