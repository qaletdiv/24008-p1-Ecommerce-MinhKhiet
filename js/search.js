const urlParams = new URLSearchParams(window.location.search);
const searchKey = urlParams.get('q'); 

const searchProducts = (keyword) => {
    return new Promise((resolve) => {
        const allProducts = JSON.parse(localStorage.getItem('products')) || [];
        let results = [];

        if (keyword) { 
            results = allProducts.filter(product =>
                product.name.toLowerCase().includes(keyword.toLowerCase()) ||
                product.shortDes.toLowerCase().includes(keyword.toLowerCase()) ||
                product.detail.toLowerCase().includes(keyword.toLowerCase()) ||
                (product.tags && product.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase())))
            );
        }
        resolve(results);
    });
};

if (searchKey) {
    searchProducts(searchKey).then(data => {
        const searchListing = document.querySelector('.search-listing');
        if (searchListing) {
            if (data.length > 0) {
                searchListing.innerHTML = `
                    <h1 class="section-title">Kết quả tìm kiếm cho "${searchKey}"</h1>
                    <div class="product-container">
                        ${createCards(data)}
                    </div>
                `;
            } else {
                searchListing.innerHTML = `
                    <h1 class="section-title">Không tìm thấy kết quả cho "${searchKey}"</h1>
                    <p style="text-align: center; font-size: 1.2rem; opacity: 0.7;">Vui lòng thử từ khóa khác.</p>
                `;
            }
        }
    });
} else {
    const searchListing = document.querySelector('.search-listing');
    if (searchListing) {
        searchListing.innerHTML = `
            <h1 class="section-title">Vui lòng nhập từ khóa tìm kiếm</h1>
            <p style="text-align: center; font-size: 1.2rem; opacity: 0.7;">Sử dụng thanh tìm kiếm ở trên để tìm sản phẩm.</p>
        `;
    }
}

