import { getProducts, createProductCards } from "./home.js";

let ratingStarInput = [];
let productNameEle = null;
let shortDesEle = null;
let priceEle = null;
let detailEle = null;
let productImageEle = null;
let pageTitle = null;

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 8;

const initElements = () => {
  ratingStarInput = [...document.querySelectorAll(".rating-star")];
  productNameEle = document.querySelector(".product-title");
  shortDesEle = document.querySelector(".product-des");
  priceEle = document.querySelector(".price");
  detailEle = document.querySelector(".des");
  productImageEle = document.querySelector(".product-img");
  pageTitle = document.querySelector("title");
};

const initRatingStars = () => {
  ratingStarInput.forEach((star, index) => {
    if (star) {
  star.addEventListener("click", () => {
    for (let i = 0; i < 5; i++) {
          if (ratingStarInput[i]) {
      if (i <= index) {
        ratingStarInput[i].src = `../img/fill star.png`;
      } else {
        ratingStarInput[i].src = `../img/no fill star.png`;
      }
          }
        }
      });
    }
  });
};

const checkLoginStatus = () => {
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');
  return user !== null;
};

const showLoginRequired = () => {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ff6b6b;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;
  notification.textContent = 'Please login to purchase products!';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const setData = (data) => {
  if (!data) {
    console.error("Product data is invalid.");
    showError("Product not found");
    return;
  }
  
  try {
    if (productNameEle) productNameEle.innerHTML = data.name || "Product name not available";
    if (pageTitle) pageTitle.innerHTML = `Online Store - ${data.name || "Product"}`;
    if (productImageEle) {
      productImageEle.src = data.images && data.images[0] ? data.images[0] : "../img/no-image.png";
      productImageEle.onerror = () => {
        productImageEle.src = "../img/no-image.png";
      };
    }
    if (shortDesEle) shortDesEle.innerHTML = data.shortDes || "No short description available";
    if (detailEle) detailEle.innerHTML = data.detail || "No details available";
    if (priceEle) priceEle.innerHTML = data.price ? `$${data.price.toLocaleString()}` : "Contact for price";
    
    setupCartButtons(data);
  } catch (error) {
    console.error("Error displaying product data:", error);
    showError("Error displaying product");
  }
};

const setupCartButtons = (product) => {
  const buyBtn = document.querySelector('.buy-btn');
  const cartBtn = document.querySelector('.cart-btn');
  const quantityInput = document.querySelector('.quantity-input');
  
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      if (!checkLoginStatus()) {
        showLoginRequired();
        return;
      }
      const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
      addToCart(product, quantity);
      showNotification('Product added to cart!');
    });
  }
  
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      if (!checkLoginStatus()) {
        showLoginRequired();
        return;
      }
      const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
      addToCart(product, quantity);
      showNotification('Product added to cart!');
    });
  }
  
  if (quantityInput) {
    quantityInput.addEventListener('change', () => {
      const value = parseInt(quantityInput.value);
      if (value < 1) {
        quantityInput.value = 1;
      }
    });
  }
};

const addToCart = (product, quantity) => {
  try {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images && product.images[0] ? product.images[0] : "../img/no-image.png",
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

const updateCartCount = () => {
  const cartCount = document.querySelector('.cart-item-count');
  if (cartCount) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems > 0 ? totalItems : '00';
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

const showError = (message) => {
  console.error(message);
  const container = document.querySelector(".product-section");
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 50px;">
        <h2>${message}</h2>
        <p>Please try again later or return to homepage</p>
        <button onclick="location.href='../pages/index.html'" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Go to Homepage
        </button>
      </div>
    `;
  }
};

const fetchProductData = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
      console.error("Missing ID parameter in URL");
      showError("Missing product information");
      return;
    }

    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    console.log("All products:", allProducts);
    console.log("Looking for product with ID:", productId);
    
    const product = allProducts.find((p) => p.id === productId);
    console.log("Found product:", product);

    if (!product) {
      console.error("Product not found with ID:", productId);
      showError("Product not found");
      return;
    }

    setData(product);

    if (product.tags && product.tags.length > 0) {
    getProducts(product.tags[0]).then((res) => {
      const similarProducts = res.filter((p) => p.id !== productId);
      createProductCards(
        similarProducts,
          "Similar Products",
        ".best-selling-product-section"
      );
      }).catch(error => {
        console.error("Error loading similar products:", error);
      });
    }
  } catch (error) {
    console.error("Error loading product:", error);
    showError("Error loading product");
  }
};

const setupCartNavigation = () => {
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      location.href = '../pages/cart.html';
    });
  }
};

const loadProducts = () => {
  try {
    console.log("Loading products...");
    allProducts = JSON.parse(localStorage.getItem("products")) || [];
    console.log("All products loaded:", allProducts.length);
    filteredProducts = [...allProducts];
    renderProducts();
    loadCategories();
    setupEventListeners();
  } catch (error) {
    console.error("Error loading products:", error);
  }
};

const loadCategories = () => {
  try {
    console.log("Loading categories...");
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    console.log("Categories found:", categories);
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
      categorySelect.innerHTML = '<option value="">All Categories</option>';
      categories.forEach(category => {
        categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
      });
      console.log("Categories loaded into select");
    } else {
      console.error("Category select element not found");
    }
  } catch (error) {
    console.error("Error loading categories:", error);
  }
};

const setupEventListeners = () => {
  console.log("Setting up event listeners...");
  const categorySelect = document.getElementById('categorySelect');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const sortSelect = document.getElementById('sortSelect');

  console.log("Elements found:", {
    categorySelect: !!categorySelect,
    priceRange: !!priceRange,
    priceValue: !!priceValue,
    sortSelect: !!sortSelect
  });

  if (categorySelect) {
    categorySelect.addEventListener('change', () => {
      console.log("Category changed:", categorySelect.value);
      filterProducts();
    });
  }

  if (priceRange && priceValue) {
    priceRange.addEventListener('input', (e) => {
      const value = e.target.value;
      priceValue.textContent = `$0 - $${parseInt(value).toLocaleString()}`;
      console.log("Price range changed:", value);
      filterProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      console.log("Sort changed:", sortSelect.value);
      filterProducts();
    });
  }
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const filterProducts = () => {
  try {
    console.log("Filtering products...");
    const categoryId = document.getElementById('categorySelect')?.value || '';
    const maxPrice = document.getElementById('priceRange')?.value || 50000000;
    const sortBy = document.getElementById('sortSelect')?.value || 'name';

    console.log("Filter criteria:", {
      categoryId,
      maxPrice,
      sortBy,
      totalProducts: allProducts.length
    });

    filteredProducts = allProducts.filter(product => {
      const matchesCategory = !categoryId || product.categoryId == categoryId;
      const matchesPrice = product.price <= maxPrice;
      
      return matchesCategory && matchesPrice;
    });

    console.log("Filtered products:", filteredProducts.length);

    sortProducts(sortBy);
    currentPage = 1;
    renderProducts();
  } catch (error) {
    console.error("Error filtering products:", error);
  }
};

const sortProducts = (sortBy) => {
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name':
    default:
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
};

const renderProducts = () => {
  try {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    if (productsToShow.length === 0) {
      productsGrid.innerHTML = '<div class="no-products">No products found</div>';
      return;
    }

    let productsHTML = '';
    productsToShow.forEach(product => {
      productsHTML += `
        <div class="product-card">
          <img src="${product.images && product.images[0] ? product.images[0] : '/img/no-image.png'}" 
               onclick="location.href='../pages/product-detail.html?id=${product.id}'" 
               class="product-img" 
               alt="${product.name}" />
          <p class="product-name">${product.name}</p>
          <p class="product-price">$${product.price.toLocaleString()}</p>
          <button onclick="addToCartFromProducts('${product.id}')" class="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      `;
    });

    productsGrid.innerHTML = productsHTML;
    renderPagination();
  } catch (error) {
    console.error("Error rendering products:", error);
  }
};

const renderPagination = () => {
  try {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }

    let paginationHTML = '';
    
    if (currentPage > 1) {
      paginationHTML += `<button onclick="changePage(${currentPage - 1})" class="page-btn">Previous</button>`;
    }
    
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        paginationHTML += `<button class="page-btn active">${i}</button>`;
      } else {
        paginationHTML += `<button onclick="changePage(${i})" class="page-btn">${i}</button>`;
      }
    }
    
    if (currentPage < totalPages) {
      paginationHTML += `<button onclick="changePage(${currentPage + 1})" class="page-btn">Next</button>`;
    }
    
    pagination.innerHTML = paginationHTML;
  } catch (error) {
    console.error("Error rendering pagination:", error);
  }
};

window.changePage = (page) => {
  currentPage = page;
  renderProducts();
};

window.addToCartFromProducts = (productId) => {
  try {
    if (!checkLoginStatus()) {
      showLoginRequired();
      return;
    }
    
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      addToCart(product, 1);
      showNotification('Product added to cart!');
    }
  } catch (error) {
    console.error("Error adding to cart from products:", error);
  }
};

const determinePageMode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const searchTerm = urlParams.get("search");
  
  if (productId) {
    document.getElementById('product-detail').style.display = 'block';
    document.getElementById('product-listing').style.display = 'none';
    fetchProductData();
  } else {
    document.getElementById('product-detail').style.display = 'none';
    document.getElementById('product-listing').style.display = 'block';
    loadProducts();
    
    if (searchTerm) {
      filterProductsBySearch(searchTerm);
    }
  }
};

const filterProductsBySearch = (searchTerm) => {
  try {
    console.log("Filtering by search term:", searchTerm);
    const searchLower = searchTerm.toLowerCase();
    filteredProducts = allProducts.filter(product => {
      return product.name.toLowerCase().includes(searchLower) ||
             product.shortDes.toLowerCase().includes(searchLower);
    });
    
    console.log("Search results:", filteredProducts.length);
    currentPage = 1;
    renderProducts();
  } catch (error) {
    console.error("Error filtering products by search:", error);
  }
};

window.testProductPage = () => {
  console.log("=== Testing Product Page ===");
  console.log("1. Checking localStorage:");
  console.log("- Products:", localStorage.getItem("products"));
  console.log("- Categories:", localStorage.getItem("categories"));
  
  console.log("2. Checking DOM elements:");
  console.log("- Category select:", document.getElementById('categorySelect'));
  console.log("- Price range:", document.getElementById('priceRange'));
  console.log("- Sort select:", document.getElementById('sortSelect'));
  console.log("- Products grid:", document.getElementById('productsGrid'));
  
  console.log("3. Checking variables:");
  console.log("- allProducts:", allProducts);
  console.log("- filteredProducts:", filteredProducts);
  
  console.log("4. Testing filter function:");
  filterProducts();
  
  console.log("=== Test Complete ===");
};

document.addEventListener("DOMContentLoaded", () => {
  try {
    console.log("Product page initializing...");
    
    initElements();
    initRatingStars();
    setupCartNavigation();
    
    if (!localStorage.getItem("products")) {
      console.log("No products data, initializing...");
      if (typeof initializeData === 'function') {
        initializeData();
      } else {
        console.error("initializeData function not found");
      }
    }
    
    determinePageMode();
    updateCartCount();
    
    console.log("Product page initialization complete");
    
    setTimeout(() => {
      console.log("Running test after 1 second...");
      window.testProductPage();
    }, 1000);
  } catch (error) {
    console.error("Error initializing product page:", error);
  }
});

window.addEventListener('load', () => {
  console.log("Page fully loaded");
  console.log("localStorage products:", localStorage.getItem("products"));
  console.log("localStorage categories:", localStorage.getItem("categories"));
});