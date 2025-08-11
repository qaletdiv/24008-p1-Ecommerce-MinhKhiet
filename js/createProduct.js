const createProduct = (data) => {
    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="product-card">
        <button class="btn edit-btn" onclick="location.href = '../pages/add-product.html?id=${data.id}'"><img src="../img/edit.png" alt=""></button>
<button class="btn open-btn" onclick="location.href = '../pages/product.html?id=${data.id}'"><img src="../img/open.png" alt=""></button>
<button class="btn delete-btn" onclick="deleteItem('${data.id}')"><img src="../img/delete.png" alt=""></button>
        <img src="${data.image[0]}" class="product-img" alt="">
        <p class="product-name">${data.tags[0]} →</p>
    </div>
    `;
}

const deleteItem = (id) => {
    sendData('/delete-product', { id: id });
};

const showAlert = (msg) => {
    alert(msg); 
};

createProduct()