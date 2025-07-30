const sendData = (path, data) => {
    loader.style.display = 'block';

    if (path === '/signup') {
        processSignup(data);
    } else if (path === '/login') {
        processLogin(data);
    } else if (path === '/seller') {
        processSellerApplication(data);
    } else if (path === '/add-product') {
        processAddProduct(data);
    } else if (path === '/delete-product') {
        processDeleteProduct(data);
    } else if (path === '/get-products') {
        loader.style.display = null;
        return; 
    }
};

const processData = (data) => {
    loader.style.display = null; 
    if (data.alert) {
        showFormError(data.alert);
    } else if (data.user) { 
        sessionStorage.setItem('user', JSON.stringify(data.user)); // Lưu vào sessionStorage
        localStorage.setItem('currentUser', JSON.stringify(data.user)); // Lưu vào localStorage để duy trì trạng thái
        location.replace('/pages/index.html'); 
    } else if (data.sellerUpdate) { 
        let user = JSON.parse(sessionStorage.getItem('user'));
        user.seller = true;
        sessionStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('currentUser', JSON.stringify(user)); // Cập nhật cả localStorage
        location.replace('/pages/dashboard.html');
    } else if (data.productAdded || data.productUpdated) { // Thêm/sửa sản phẩm thành công
        location.replace('/pages/dashboard.html');
    } else if (data.productDeleted) { 
        location.reload();
    }
};

const showFormError = (err) => {
    let errorEle = document.querySelector('.error');
    if (errorEle) { 
        errorEle.innerHTML = err;
        errorEle.classList.add('show');

        setTimeout(() => {
            errorEle.classList.remove('show');
        }, 2000);
    } else {
        alert(err); 
    }
};

const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};



const processSignup = (data) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (!data.name || !data.email || !data.password) {
        processData({ alert: 'Vui lòng điền đầy đủ thông tin!' });
        return;
    }

    const newUser = {
        id: generateUniqueId(),
        name: data.name.trim(),  
        email: data.email,
        password: data.password,
        role: 'user',
        avatar: `https://i.pravatar.cc/150?u=${data.email}`, 
        seller: false
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    sessionStorage.setItem('user', JSON.stringify(newUser));

    processData({ user: newUser }); 
};


const processLogin = (data) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === data.email && u.password === data.password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('user', JSON.stringify(user));
        processData({ user: user }); 
    } else {
        processData({ alert: 'Email hoặc mật khẩu không đúng!' });
    }
};


const processSellerApplication = (data) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userIndex = users.findIndex(u => u.email === data.email);

    if (userIndex !== -1) {
        users[userIndex].seller = true; 
        users[userIndex].businessName = data.name;
        users[userIndex].address = data.address;
        users[userIndex].about = data.about;
        users[userIndex].contactNumber = data.number;
        localStorage.setItem('users', JSON.stringify(users));
        processData({ sellerUpdate: true });
    } else {
        processData({ alert: 'Không tìm thấy người dùng để cập nhật trạng thái người bán.' });
    }
};

const processAddProduct = (data) => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let isUpdate = false;

    if (data.id) { 
        let productIndex = products.findIndex(p => p.id === data.id);
        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...data }; // Cập nhật dữ liệu sản phẩm
            isUpdate = true;
        }
    } else { 
        const newProduct = {
            id: generateUniqueId(), 
            ...data,
            images: [data.image], 
            stock: 10, 
            rating: 0, 
            featured: false 
        };
        products.push(newProduct);
    }

    localStorage.setItem('products', JSON.stringify(products));
    processData(isUpdate ? { productUpdated: true } : { productAdded: true });
};

const processDeleteProduct = (data) => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const initialLength = products.length;
    products = products.filter(p => p.id !== data.id);

    if (products.length < initialLength) {
        localStorage.setItem('products', JSON.stringify(products));
        processData({ productDeleted: true });
    } else {
        processData({ alert: 'Không tìm thấy sản phẩm để xóa.' });
    }
};
