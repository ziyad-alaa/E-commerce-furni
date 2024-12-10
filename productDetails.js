document.addEventListener('DOMContentLoaded', function () {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const selectedProductTitle = localStorage.getItem('selectedProduct');
    const productDetails = products.find(product => product.title === selectedProductTitle);

    if (productDetails) {
        document.getElementById('product-details').innerHTML = `
            <div class="col-md-6">
                <img src="${productDetails.image}" alt="${productDetails.title}" class="product-details-image">
            </div>
            <div class="col-md-6">
                <h1 class="product-details-title">${productDetails.title}</h1>
                <p class="product-details-price">${productDetails.price}</p>
                <p class="product-details-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae augue sit amet elit luctus ultrices.
                </p>
                <p>Available Stock: ${productDetails.counter}</p>
                <button class="btn btn-add-to-cart">Add to Cart</button>
            </div>
        `;
    } else {
        document.getElementById('product-details').innerHTML = `
            <p>Product details not found.</p>
        `;
    }
});
