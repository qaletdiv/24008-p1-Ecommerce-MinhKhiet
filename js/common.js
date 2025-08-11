console.log('Common.js loaded successfully');

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
        if (data.alert.includes('thành công')) {
            return;
        }
    } else if (data.user) { 
        sessionStorage.setItem('user', JSON.stringify(data.user));  
        localStorage.setItem('currentUser', JSON.stringify(data.user)); 
        location.replace('../pages/index.html'); 
    } else if (data.sellerUpdate) { 
        let user = JSON.parse(sessionStorage.getItem('user'));
        user.seller = true;
        sessionStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('currentUser', JSON.stringify(user)); 
        location.replace('../pages/dashboard.html');
    } else if (data.productAdded || data.productUpdated) { 
        location.replace('../pages/dashboard.html');
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
    console.log('processSignup called with:', data);
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (!data.name || !data.email || !data.password) {
        console.log('Missing required fields');
        processData({ alert: 'Vui lòng điền đầy đủ thông tin!' });
        return;
    }

    const existingUser = users.find(user => user.email === data.email);
    if (existingUser) {
        console.log('Email already exists');
        processData({ alert: 'Email đã được sử dụng!' });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        console.log('Invalid email format');
        processData({ alert: 'Email không hợp lệ!' });
        return;
    }

    const newUser = {
        id: generateUniqueId(),
        name: data.name.trim(),  
        email: data.email.toLowerCase(),
        password: data.password,
        role: 'user',
        avatar: `https://i.pravatar.cc/150?u=${data.email}`, 
        seller: false
    };

    console.log('Creating new user:', newUser);
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    showFormError('Đăng ký thành công! Vui lòng đăng nhập.');
    setTimeout(() => {
        location.replace('../pages/login.html');
    }, 1500);
    
    console.log('User created successfully, redirecting to login...'); 
};


const processLogin = (data) => {
    console.log('processLogin called with:', data);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email.toLowerCase() === data.email.toLowerCase() && u.password === data.password);

    if (user) {
        console.log('User found, logging in:', user);
        const userSession = { ...user };
        delete userSession.password;
        
        localStorage.setItem('currentUser', JSON.stringify(userSession));
        sessionStorage.setItem('user', JSON.stringify(userSession));
        console.log('Login successful, redirecting...');
        processData({ user: userSession }); 
    } else {
        console.log('Invalid credentials');
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
            products[productIndex] = { ...products[productIndex], ...data };
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
