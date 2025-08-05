window.onload = () => {
  console.log('Form.js loaded');
  if (sessionStorage.user) {
    user = JSON.parse(sessionStorage.user);
    if (user.email) {
      location.replace("../pages/index.html");
    }
  }
};

let formBtn = document.querySelector(".submit-btn");
let loader = document.querySelector(".loader");

console.log('Form button found:', formBtn);
console.log('Loader found:', loader);

if (formBtn) {
  formBtn.addEventListener("click", () => {
    console.log('Submit button clicked!');
    let fullname = document.querySelector("#name") || null;
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let confirmPassword = document.querySelector("#confirm-password") || null;
    let tac = document.querySelector("#tc") || null;

    console.log('Form elements:', { fullname, email, password, confirmPassword, tac });

    if (fullname != null) {
      console.log('Processing signup form');
      if (fullname.value.length < 5) {
        showFormError("name must be 4 letters long");
      } else if (!email.value.length) {
        showFormError("enter your email");
      } else if (password.value.length < 8) {
        showFormError("password must be at least 8 characters long");
      } else if (
        confirmPassword === null ||
        password.value !== confirmPassword.value
      ) {
        showFormError("passwords do not match");
      } else if (confirmPassword.value.length < 8) {
        showFormError("confirm password must be at least 8 characters long");
      } else if (!tac.checked) {
        showFormError("you must agree to our terms and condition");
      } else {
        loader.style.display = "block";
        console.log('Calling processSignup with:', {
          name: fullname.value,
          email: email.value,
          password: password.value,
          tac: tac.checked,
        });
        processSignup({
          name: fullname.value,
          email: email.value,
          password: password.value,
          tac: tac.checked,
        });
      }
    } else {
      console.log('Processing login form');
      if (!email.value.length || !password.value.length) {
        showFormError("fill all the inputs");
      } else {
        loader.style.display = "block";
        console.log('Calling processLogin with:', {
          email: email.value,
          password: password.value,
        });
        processLogin({
          email: email.value,
          password: password.value,
        });
      }
    }
  });
} else {
  console.error('Submit button not found!');
}


