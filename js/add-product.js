
let user = JSON.parse(sessionStorage.getItem('user') || null);

window.onload = () => {
    if (user == null) {
        location.replace('/pages/login.html'); 
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
let imagePath = '../img/noImage.png';

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
        showFormError('Vui lòng chọn một file ảnh hợp lệ.');
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
        showFormError('Vui lòng nhập tên sản phẩm.');
    } else if (shortDes.innerHTML === shortDes.getAttribute('data-placeholder') || !shortDes.innerHTML.trim().length) {
        showFormError('Mô tả ngắn phải có ít nhất 80 ký tự.'); // Cần kiểm tra độ dài thực tế
    } else if (price.innerHTML === price.getAttribute('data-placeholder') || !Number(price.innerHTML)) {
        showFormError('Vui lòng nhập giá hợp lệ.');
    } else if (detail.innerHTML === detail.getAttribute('data-placeholder') || !detail.innerHTML.trim().length) {
        showFormError('Vui lòng nhập chi tiết sản phẩm.');
    } else if (tags.innerHTML === tags.getAttribute('data-placeholder') || !tags.innerHTML.trim().length) {
        showFormError('Vui lòng nhập các thẻ (tags).');
    } else {
      
        if (loader) {
            loader.style.display = 'block';
        }
        let data = productData();
        if (productId) {
            data.id = productId; 
        }
        sendData('/add-product', data);
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
        image: imagePath,
        email: JSON.parse(sessionStorage.getItem('user')).email,
        draft: false
    };
};


let draftBtn = document.querySelector('.draft-btn');

draftBtn.addEventListener('click', () => {
    if (!productName.innerHTML.trim().length || productName.innerHTML === productName.getAttribute('data-placeholder')) {
        showFormError('Vui lòng nhập tên sản phẩm (ít nhất).');
    } else { 
        let data = productData();
        if (loader) {
            loader.style.display = 'block';
        }
        data.draft = true;
        if (productId) {
            data.id = productId;
        }
        sendData('/add-product', data);
    }
});


let productId = null;
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('id')) {
    productId = urlParams.get('id');
}

const fetchProductData = () => {
    if (addProductBtn) {
        addProductBtn.innerHTML = 'Lưu sản phẩm';
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);

    if (product) {
        setFormData(product);
    } else {
        console.log('Không tìm thấy sản phẩm với ID:', productId);
        showFormError('Không tìm thấy sản phẩm để chỉnh sửa.');
    }
};

const setFormData = (data) => {
    if (productName) productName.innerHTML = data.name;
    if (shortDes) shortDes.innerHTML = data.shortDes;
    if (price) price.innerHTML = data.price;
    if (detail) detail.innerHTML = data.detail;
    if (tags) tags.innerHTML = data.tags.join(', '); 

    let productImg = document.querySelector('.product-img');
    if (productImg) {
        productImg.src = imagePath = data.images[0]; 
    }
};
