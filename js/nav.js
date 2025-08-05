const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (scrollY >= 180) {
    navbar.classList.add("bg");
  } else {
    navbar.classList.remove("bg");
  }
});

const createNavbar = () => {
  let navbar = document.querySelector(".navbar");
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');

  const navbarHTML = `
    <ul class="links-container">
        <li class="link-item"><a href="../pages/index.html" class="link active">Home</a></li>
        <li class="link-item"><a href="../pages/product.html" class="link">Products</a></li>
        <li class="link-item"><a href="#" class="link">About</a></li>
        <li class="link-item"><a href="#" class="link">Contact</a></li>
    </ul>
    <div class="user-interactions">
        <div class="search-box">
            <input type="text" class="search" placeholder="search item">
            <button class="search-btn"><img src="../img/search.png" alt=""></button>
        </div>
        <div class="cart" id="cart-icon">
            <img src="../img/cart.png" class="cart-icon" alt="Cart" />
            <span class="cart-item-count">00</span>
        </div>
        <div class="user">
            <img src="../img/user.png" class="user-icon" alt="User" />
            <div class="user-icon-popup">
                <p class="popup-text">login to your account</p>
                <a class="popup-action-btn">login</a>
            </div>
        </div>
    </div>`;

  navbar.innerHTML = navbarHTML;
};


let userIcon = document.querySelector(".user-icon");
let userPopupIcon = document.querySelector(".user-icon-popup");

if (userIcon && userPopupIcon) {
  userIcon.addEventListener("click", () =>
    userPopupIcon.classList.toggle("active")
  );
}

let text = document.querySelector(".user-icon-popup p");
let actionBtn = document.querySelector(".user-icon-popup a");
let user = JSON.parse(sessionStorage.user || 'null');

if (user != null) {
  if (text) text.innerHTML = `Hi, ${user.name}`;
  if (actionBtn) {
    actionBtn.innerHTML = "My Account";
    actionBtn.addEventListener("click", () => {
      location.href = "../pages/account.html";
    });
  }
  
  const logoutBtn = document.createElement("a");
  logoutBtn.innerHTML = "Logout";
  logoutBtn.className = "popup-action-btn";
  logoutBtn.style.marginTop = "10px";
  logoutBtn.addEventListener("click", () => logout());
  if (userPopupIcon) userPopupIcon.appendChild(logoutBtn);

  if (user.seller) {
    const dashboardBtn = document.createElement("a");
    dashboardBtn.innerHTML = "Dashboard";
    dashboardBtn.className = "popup-action-btn";
    dashboardBtn.style.marginTop = "10px";
    dashboardBtn.addEventListener("click", () => {
      location.href = "../pages/dashboard.html";
    });
    if (userPopupIcon) userPopupIcon.appendChild(dashboardBtn);
  }
} else {
  if (text) text.innerHTML = "Login to your account";
  if (actionBtn) {
    actionBtn.innerHTML = "Login";
    actionBtn.addEventListener("click", () => {
      const currentUrl = encodeURIComponent(window.location.href);
      location.href = `../pages/login.html?redirect=${currentUrl}`;
    });
  }
}

const logout = () => {
  sessionStorage.clear();
  localStorage.removeItem('currentUser');
  location.reload();
};

const setupCartNavigation = () => {
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      const user = JSON.parse(sessionStorage.getItem('user') || 'null');
      if (!user) {
        const currentUrl = encodeURIComponent(window.location.href);
        location.href = `../pages/login.html?redirect=${currentUrl}`;
      } else {
        location.href = '../pages/cart.html';
      }
    });
  }
};

const setupSearchNavigation = () => {
  let searchBtn = document.querySelector(".search-btn");
  let searchBox = document.querySelector(".search");

  if (searchBtn && searchBox) {
    searchBtn.addEventListener("click", () => {
      if (searchBox.value.trim().length > 0) {
        console.log("Search button clicked, navigating to:", `../pages/product.html?search=${encodeURIComponent(searchBox.value.trim())}`);
        location.href = `../pages/product.html?search=${encodeURIComponent(searchBox.value.trim())}`;
      }
    });
    
    searchBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        if (searchBox.value.trim().length > 0) {
          console.log("Search Enter pressed, navigating to:", `../pages/product.html?search=${encodeURIComponent(searchBox.value.trim())}`);
          location.href = `../pages/product.html?search=${encodeURIComponent(searchBox.value.trim())}`;
        }
      }
    });
  }
};

setupCartNavigation();
setupSearchNavigation();
