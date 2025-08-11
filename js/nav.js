const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (scrollY >= 180) {
    navbar.classList.add("bg");
  } else {
    navbar.classList.remove("bg");
  }
});

const setupUserPopup = () => {
  const userIcon = document.querySelector(".user-icon");
  const userPopup = document.querySelector(".user-icon-popup");
  const userName = document.querySelector(".user-name");
  const loginBtn = document.querySelector(".login-btn");
  const accountBtn = document.querySelector(".account-btn");
  const dashboardBtn = document.querySelector(".dashboard-btn");
  const logoutBtn = document.querySelector(".logout-btn");

  if (!userIcon || !userPopup) return;
  userIcon.addEventListener("click", () => {
    userPopup.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!userIcon.contains(e.target) && !userPopup.contains(e.target)) {
      userPopup.classList.remove("show");
    }
  });

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (currentUser) {
    if (userName) userName.textContent = currentUser.name;
    if (loginBtn) loginBtn.style.display = "none";
    if (accountBtn) accountBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    
    if (currentUser.seller && dashboardBtn) {
      dashboardBtn.style.display = "inline-block";
    }
    
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem('currentUser');
        sessionStorage.clear();
        location.reload();
      });
    }
  } else {
    if (userName) userName.textContent = "Guest User";
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (accountBtn) accountBtn.style.display = "none";
    if (dashboardBtn) dashboardBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
};

const setupCartNavigation = () => {
  const cartIcon = document.querySelector(".cart");
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      location.href = "../pages/cart.html";
    });
  }
};

const setupSearchNavigation = () => {
  const searchBox = document.querySelector(".search-box");
  if (searchBox) {
    const searchInput = searchBox.querySelector(".search");
    const searchBtn = searchBox.querySelector(".search-btn");
    
    if (searchInput && searchBtn) {
      searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
          location.href = `../pages/search.html?q=${encodeURIComponent(query)}`;
        }
      });
      
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          const query = searchInput.value.trim();
          if (query) {
            location.href = `../pages/search.html?q=${encodeURIComponent(query)}`;
          }
        }
      });
    }
  }
};

const updateCartCount = () => {
  const cartCount = document.querySelector(".cart-item-count");
  if (cartCount) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems.toString().padStart(2, '0');
  }
};


const initializeNavigation = () => {
  setupUserPopup();
  setupCartNavigation();
  setupSearchNavigation();
  updateCartCount();
};

document.addEventListener('DOMContentLoaded', initializeNavigation);


