window.onload = () => {
    let user = JSON.parse(sessionStorage.getItem('user') || null);
    
    if (user == null) {
        location.replace('/pages/login.html'); 
    } else if (user.seller) {
        location.replace('/pages/dashboard.html');
    }
};

let loader = document.querySelector('.loader');
let applyBtn = document.querySelector('.apply-btn');

applyBtn.addEventListener('click', () => {
    let businessName = document.querySelector('#name').value;
    let address = document.querySelector('#address').value;
    let about = document.querySelector('#about').value;
    let number = document.querySelector('#number').value;

    if (!businessName.length || !address.length || !about.length || number.length < 10 || isNaN(Number(number))) {
        showFormError('Một số thông tin không chính xác. Vui lòng kiểm tra lại.');
    } else {
        
        loader.style.display = 'block';
        sendData('/seller', {
            name: businessName,
            address: address,
            about: about,
            number: number,
            email: JSON.parse(sessionStorage.getItem('user')).email 
        });
    }
});
