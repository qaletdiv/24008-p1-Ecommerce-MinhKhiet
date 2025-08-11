const collageImages = [...document.querySelectorAll(".collage-img")];

collageImages.map((item, i) => {
  item.addEventListener("mouseover", () => {
    collageImages.map((image, index) => {
      if (index !== i) {
        image.style.filter = `blur(10px)`;
        item.style.zIndex = 2;
      }
    });
  });

  item.addEventListener("mouseleave", () => {
    collageImages.map((image, index) => {
      image.style = null;
    });
  });
});

export const getProducts = (tag) => {
  return new Promise((resolve) => {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    let filteredProducts = [];

    if (tag) {
      filteredProducts = allProducts.filter(
        (product) => product.tags && product.tags.includes(tag.toLowerCase())
      );
    } else {
      filteredProducts = allProducts;
    }
    resolve(filteredProducts);
  });
};

export const createProductCards = (data, title, ele) => {
  if (data.length) {
    let container = document.querySelector(ele);
    if (container) {
      if (!container.querySelector(`.section-title[data-title="${title}"]`)) {
        container.innerHTML += `<h1 class="section-title" data-title="${title}">${title}</h1>`;
      }
      let productContainerDiv = container.querySelector(".product-container");
      if (!productContainerDiv) {
        productContainerDiv = document.createElement("div");
        productContainerDiv.classList.add("product-container");
        container.appendChild(productContainerDiv);
      }
      productContainerDiv.innerHTML = createCards(data);
    }
  }
};

export const createCards = (data) => {
  let cards = "";
  const urlParams = new URLSearchParams(window.location.search);
  const currentProductId = urlParams.get("id");
  data.forEach((item) => {
    if (item.id != currentProductId) {
      cards += `
                <div class="product-card">
                    <img src="${item.images[0]}" onclick="location.href = '../pages/product-detail.html?id=${item.id}'" class="product-img" alt="${item.name}">
                    <p class="product-name">${item.name} →</p>
                </div>
                `;
    }
  });
  return cards;
};

document.addEventListener("DOMContentLoaded", () => {
  getProducts().then((data) => {
    const featuredProducts = data.filter(product => product.featured === true);
    if (featuredProducts.length > 0) {
      createProductCards(
        featuredProducts,
        "Featured Products",
        ".best-selling-product-section"
      );
    } else {
      const sofaProducts = data.filter(product => 
        product.tags && product.tags.includes('sofa')
      );
      createProductCards(
        sofaProducts,
        "Best Selling Products",
        ".best-selling-product-section"
      );
    }
  });
});
