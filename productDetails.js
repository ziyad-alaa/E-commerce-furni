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
                <p class="product-details-price">${'$' + productDetails.price}</p>
                <p class="product-details-description">
                    ${productDetails.description}
                </p>
                <p>Available Stock: ${productDetails.count}</p>
                <p>Color: ${productDetails.color}</p>
                <p>Seller name: ${productDetails.sellername}</p>
                <button id="addtoCart" class="btn btn-add-to-cart "data-id="${productDetails.id}">Add to Cart</button>
            </div>
        `;
    } else {
        document.getElementById('product-details').innerHTML = `
            <p>Product details not found.</p>
        `;
    }
    const button = document.getElementById('addtoCart');
    button.addEventListener('click', function (e) {
        e.stopPropagation();
        const productId = parseInt(this.getAttribute('data-id'));
        selectedProductId = productId;
        addToCart(selectedProductId, 'user12');

    });
    function addToCart(productId, userId) {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const cartData = JSON.parse(localStorage.getItem("cart")) || {};
        const cartKey = `cart_${userId}`;
        const product = products.find((product) => product.id === productId);

        if (!cartData[cartKey]) {
            cartData[cartKey] = [{ ...product, quantity: 1 }];
            localStorage.setItem("cart", JSON.stringify(cartData));
            return;
        }

        let existingProduct = cartData[cartKey].find(
            (item) => item.id === productId
        );
        if (existingProduct) {
            if (existingProduct.quantity < product.count)
            existingProduct.quantity += 1;
            else{
                const NoMoreProducts = document.getElementById('NoMoreProducts');
                NoMoreProducts.style.display = 'flex';
                document.getElementById('ok').addEventListener('click', function () {
                    NoMoreProducts.style.display = 'none';
                });
                return;
            }
        } else {
            cartData[cartKey].push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cartData));
        showNotification();
    }
    function showNotification() {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        
        notificationText.textContent = 'Product added to cart!';
    
        notification.style.display = 'flex';
    
        notification.classList.remove('fade-out');
    
        setTimeout(() => {
            notification.classList.add('fade-out');
        }, 3000);
    }
});
