console.log("Product detail page loaded");

let currentProduct = null;
let allProducts = [];
let allCategories = [];

const initProductElements = () => {
  console.log("Initializing product elements...");
};

const checkProductLoginStatus = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  return currentUser !== null;
};

const showProductLoginRequired = () => {
  const notification = document.createElement("div");
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
  notification.textContent = "Please login to purchase products!";
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const setProductData = (product) => {
  if (!product) {
    console.error("Product data is invalid.");
    showProductError("Product not found");
    return;
  }

  try {
    console.log("Setting product data:", product);
    document.title = `Online Store - ${product.name}`;
    const productTitle = document.querySelector(".product-title");
    if (productTitle) productTitle.innerHTML = product.name;
    const productDes = document.querySelector(".product-des");
    if (productDes)
      productDes.innerHTML =
        product.shortDes || "No short description available";
    const productDetail = document.querySelector(".des");
    if (productDetail)
      productDetail.innerHTML = product.detail || "No details available";
    const priceEle = document.querySelector(".price");
    if (priceEle)
      priceEle.innerHTML = product.price
        ? `$${product.price.toLocaleString()}`
        : "Contact for price";
    const categoryEle = document.getElementById("product-category");
    if (categoryEle) {
      const category = allCategories.find(
        (cat) => cat.id === product.categoryId
      );
      categoryEle.textContent = category ? category.name : "Uncategorized";
    }
    const stockEle = document.getElementById("product-stock");
    if (stockEle) {
      stockEle.textContent =
        product.stock > 0 ? `${product.stock} items available` : "Out of stock";
    }

    const ratingEle = document.getElementById("product-rating");
    if (ratingEle) {
      ratingEle.textContent = `${product.rating || 0}/5 (${
        product.reviews || 0
      } reviews)`;
    }

    setProductImages(product);

    setProductRatingStars(product.rating || 0);

    setupProductButtons(product);

    loadProductIncludedItems(product);

    loadProductKeyFeatures(product);

    loadProductSimilarProducts(product);

    console.log("Product data set successfully");
  } catch (error) {
    console.error("Error displaying product data:", error);
    showProductError("Error displaying product");
  }
};

const loadProductIncludedItems = (product) => {
  const container = document.getElementById("included-items");
  if (container && product.whatsIncluded) {
    let itemsHTML = "";
    product.whatsIncluded.forEach((item) => {
      itemsHTML += `
                <div class="included-item">
                    <span class="check-icon">✓</span>
                    <span class="item-text">${item}</span>
                </div>
            `;
    });
    container.innerHTML = itemsHTML;
  }
};

const loadProductKeyFeatures = (product) => {
  const container = document.getElementById("features-list");
  if (container && product.keyFeatures) {
    let featuresHTML = "";
    product.keyFeatures.forEach((feature) => {
      featuresHTML += `
                <div class="feature-item">
                    <span class="feature-icon">★</span>
                    <span class="feature-text">${feature}</span>
                </div>
            `;
    });
    container.innerHTML = featuresHTML;
  }
};

const setProductImages = (product) => {
  const mainImg = document.querySelector(".main-img");
  const thumbnailsContainer = document.getElementById("product-thumbnails");

  if (!product.images || product.images.length === 0) {
    if (mainImg) mainImg.src = "../img/no-image.png";
    return;
  }


  if (mainImg) {
    mainImg.src = product.images[0];
    mainImg.onerror = () => {
      mainImg.src = "../img/no-image.png";
    };
  }

  if (thumbnailsContainer && product.images.length > 1) {
    let thumbnailsHTML = "";
    product.images.forEach((image, index) => {
      thumbnailsHTML += `
                <img src="${image}" 
                     class="thumbnail ${index === 0 ? "active" : ""}" 
                     onclick="changeProductMainImage('${image}', this)"
                     alt="Product image ${index + 1}" />
            `;
    });
    thumbnailsContainer.innerHTML = thumbnailsHTML;
  }
};

const changeProductMainImage = (imageSrc, thumbnailElement) => {
  const mainImg = document.querySelector(".main-img");
  if (mainImg) {
    mainImg.src = imageSrc;
  }

 
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumb) => thumb.classList.remove("active"));
  thumbnailElement.classList.add("active");
};

const setProductRatingStars = (rating) => {
  const stars = document.querySelectorAll(".star");
  const ratingCount = document.querySelector(".rating-count");

  stars.forEach((star, index) => {
    if (index < Math.floor(rating)) {
      star.src = "../img/fill star.png";
    } else {
      star.src = "../img/no fill star.png";
    }
  });

  if (ratingCount) {
    ratingCount.textContent = `${rating} reviews`;
  }
};

const setupProductButtons = (product) => {
  console.log("Setting up product buttons...");

  const buyBtn = document.querySelector(".buy-btn");
  const cartBtn = document.querySelector(".cart-btn");
  const quantityInput = document.querySelector(".quantity-input");

  console.log("Buy button:", buyBtn);
  console.log("Cart button:", cartBtn);

  if (buyBtn) {
    buyBtn.onclick = function () {
      console.log("Buy Now clicked");
      if (!checkProductLoginStatus()) {
        showProductLoginRequired();
        return;
      }
      const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
      addProductToCart(product, quantity);
      showProductNotification("Product added to cart!");
    };
  }

  if (cartBtn) {
    cartBtn.onclick = function () {
      console.log("Add to Cart clicked");
      if (!checkProductLoginStatus()) {
        showProductLoginRequired();
        return;
      }
      const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
      addProductToCart(product, quantity);
      showProductNotification("Product added to cart!");
    };
  }

  if (quantityInput) {
    quantityInput.addEventListener("change", () => {
      const value = parseInt(quantityInput.value);
      if (value < 1) {
        quantityInput.value = 1;
      }
    });
  }
};

const addProductToCart = (product, quantity) => {
  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image:
          product.images && product.images[0]
            ? product.images[0]
            : "../img/no-image.png",
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateProductCartCount();
  } catch (error) {
    console.error("Error adding to cart:", error);
    showProductError("Failed to add product to cart");
  }
};

const updateProductCartCount = () => {
  const cartCount = document.querySelector(".cart-item-count");
  if (cartCount) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems > 0 ? totalItems.toString().padStart(2, '0') : "00";
  }
};

const showProductNotification = (message) => {
  const notification = document.createElement("div");
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

const showProductError = (message) => {
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

const loadProductSimilarProducts = (product) => {
  try {
    const similarProducts = allProducts
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.categoryId === product.categoryId ||
            p.tags.some((tag) => product.tags.includes(tag)))
      )
      .slice(0, 4);

    const container = document.getElementById("similar-products");
    if (container && similarProducts.length > 0) {
      let productsHTML = "";
      similarProducts.forEach((product) => {
        productsHTML += `
                    <div class="product-card">
                        <img src="${
                          product.images && product.images[0]
                            ? product.images[0]
                            : "../img/no-image.png"
                        }" 
                             onclick="location.href='../pages/product-detail.html?id=${
                               product.id
                             }'" 
                             class="product-img" 
                             alt="${product.name}" />
                        <p class="product-name">${product.name}</p>
                        <p class="product-price">$${product.price.toLocaleString()}</p>
                    </div>
                `;
      });
      container.innerHTML = productsHTML;
    }
  } catch (error) {
    console.error("Error loading similar products:", error);
  }
};

const fetchProductData = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
      console.error("Missing ID parameter in URL");
      showProductError("Missing product information");
      return;
    }

    console.log("Looking for product with ID:", productId);

    const product = allProducts.find((p) => p.id === productId);
    console.log("Found product:", product);

    if (!product) {
      console.error("Product not found with ID:", productId);
      showProductError("Product not found");
      return;
    }

    currentProduct = product;
    setProductData(product);
  } catch (error) {
    console.error("Error loading product:", error);
    showProductError("Error loading product");
  }
};

const initializeProductData = () => {
  try {
    console.log("Initializing product data...");

    allProducts = JSON.parse(localStorage.getItem("products")) || [];
    console.log("Products loaded:", allProducts.length);

    allCategories = JSON.parse(localStorage.getItem("categories")) || [];
    console.log("Categories loaded:", allCategories.length);

    if (allProducts.length === 0) {
      console.log("No products found, initializing mock data...");
      if (typeof window.initializeData === "function") {
        window.initializeData();
      } else {
        console.log("Trying to load mock data directly...");
        if (typeof mockProducts !== "undefined") {
          localStorage.setItem("products", JSON.stringify(mockProducts));
          allProducts = mockProducts;
        }
        if (typeof mockCategories !== "undefined") {
          localStorage.setItem("categories", JSON.stringify(mockCategories));
          allCategories = mockCategories;
        }
      }

      allProducts = JSON.parse(localStorage.getItem("products")) || [];
      allCategories = JSON.parse(localStorage.getItem("categories")) || [];
      console.log(
        "After initialization - Products:",
        allProducts.length,
        "Categories:",
        allCategories.length
      );
    }
  } catch (error) {
    console.error("Error initializing product data:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  try {
    console.log("Product detail page initializing...");

    initProductElements();
    initializeProductData();
    fetchProductData();
    updateProductCartCount();

    console.log("Product detail page initialization complete");
  } catch (error) {
    console.error("Error initializing product detail page:", error);
  }
});

window.addEventListener("load", () => {
  console.log("Product detail page fully loaded");
});
