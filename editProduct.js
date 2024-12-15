function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', function () {
    const productId = getProductIdFromURL();
    if (!productId) return;

    let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const productToEdit = storedProducts.find(product => product.id === parseInt(productId));
    if (!productToEdit) return;

    document.getElementById('productTitle').value = productToEdit.title;
    document.getElementById('productCategory').value = productToEdit.category;
    document.getElementById('productImage').value = productToEdit.image;
    document.getElementById('productPrice').value = productToEdit.price;
    document.getElementById('productQuantity').value = productToEdit.count;
    document.getElementById('productDescription').value = productToEdit.description;

    
    document.getElementById('editProductForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('productTitle').value;
        const category = document.getElementById('productCategory').value;
        const image = document.getElementById('productImage').value;
        const price = document.getElementById('productPrice').value;
        const quantity = document.getElementById('productQuantity').value;
        const description = document.getElementById('productDescription').value;


        storedProducts = storedProducts.map(product => {
            if (product.id === parseInt(productId)) {
                return {
                    ...product,
                    title: title,
                    category: category,
                    image: image,
                    price: `${price}`,
                    count: quantity,
                    description:description,
                };
            }
            return product;
        });

        localStorage.setItem('products', JSON.stringify(storedProducts));
        window.location.href = 'seller.html';
    });
});