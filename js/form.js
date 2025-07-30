window.onload = () => {
    if(sessionStorage.user){
        user = JSON.parse(sessionStorage.user);
        if(user.email){
            location.replace('/pages/index.html');
        }
    }
}


let formBtn = document.querySelector('.submit-btn');
let loader = document.querySelector('.loader');

formBtn.addEventListener('click', () => {
    let fullname = document.querySelector('#name') || null;
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let number = document.querySelector('#number') || null;
    let tac = document.querySelector('#tc') || null;

    if(fullname != null){
        if(fullname.value.length < 5){
            showFormError('name must be 4 letters long');
        } else if(!email.value.length){
            showFormError('enter your email');
        } else if(password.value.length < 8){
            showFormError('password must be 8 letters long');
        } else if(Number(number) || number.value.length < 10){
            showFormError('invalid number, please enter valid one');
        } else if(!tac.checked){
            showFormError('you must agree to our terms and condition');
        } else{
           
            loader.style.display = 'block';
            sendData('/signup', {
                name: fullname.value,
                email: email.value,
                password: password.value,
                number: number.value,
                tac: tac.checked
            })
        }
    } else{
        if(!email.value.length || !password.value.length){
            showFormError('fill all the inputs')
        } else{
            loader.style.display = 'block';
            sendData('/login', {
                email: email.value,
                password: password.value
            })
        }
    }
})