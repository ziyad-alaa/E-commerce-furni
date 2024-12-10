$(window).on("load", function () {
    const $tabs = $(".tabs .item");
    const $products = $(".product-item");

    $tabs.on("click", function () { 
        $tabs.removeClass("active");
        $(this).addClass("active");
        const category = $(this).attr("rel");
        $products.each(function () {
            if ($(this).data("category") === category || category === "all") {
                $(this).show();
            } else {
                $(this).hide();
            }
        });//end of each
    });//end of click
});//end of load


document.addEventListener('DOMContentLoaded', function () {
    const products = [
        {
            id: 1,
            category: 'chairs',
            image: 'images/chair1.png',
            title: 'Elegant Office Chair',
            price: '$120.00  ',
            counter: 15
        },
        {
            id: 2,
            category: 'chairs',
            image: 'images/chair2.png',
            title: 'Classic Dining Chair',
            price: '$90.00',
            counter: 20
        },
        {
            id: 3,
            category: 'chairs',
            image: 'images/chair3.png',
            title: 'Vintage Wooden Chair',
            price: '$75.00',
            counter: 8
        },
        {
            id: 4,
            category: 'chairs',
            image: 'images/chair4.png',
            title: 'Modern Swivel Chair',
            price: '$150.00',
            counter: 10
        },
        {
            id: 5,
            category: 'chairs',
            image: 'images/chair5.png',
            title: 'Luxury Lounge Chair',
            price: '$300.00',
            counter: 5
        },
        {
            id: 6,
            category: 'chairs',
            image: 'images/chair6.png',
            title: 'Outdoor Patio Chair',
            price: '$60.00',
            counter: 25
        },
        {
            id: 7,
            category: 'chairs',
            image: 'images/chair7.png',
            title: 'Minimalist Armchair',
            price: '$200.00',
            counter: 7
        },
        {
            id: 8,
            category: 'tables',
            image: 'images/table1.png',
            title: 'Glass Coffee Table',
            price: '$250.00',
            counter: 12
        },
        {
            id: 9,
            category: 'tables',
            image: 'images/table2.png',
            title: 'Wooden Dining Table',
            price: '$400.00',
            counter: 5
        },
        {
            id: 10,
            category: 'tables',
            image: 'images/table3.png',
            title: 'Expandable Dining Table',
            price: '$600.00',
            counter: 3
        },
        {
            id: 11,
            category: 'tables',
            image: 'images/table4.png',
            title: 'Industrial Work Desk',
            price: '$350.00',
            counter: 8
        },
        {
            id: 12,
            category: 'tables',
            image: 'images/table5.png',
            title: 'Compact Side Table',
            price: '$80.00',
            counter: 18
        },
        {
            id: 13,
            category: 'tables',
            image: 'images/table6.png',
            title: 'Rustic Console Table',
            price: '$220.00',
            counter: 6
        },
        {
            id: 14,
            category: 'sofas',
            image: 'images/sofa1.png',
            title: 'L-Shaped Sofa',
            price: '$1200.00',
            counter: 4
        },
        {
            id: 15,
            category: 'sofas',
            image: 'images/sofa2.png',
            title: 'Modern Recliner Sofa',
            price: '$800.00',
            counter: 5
        },
        {
            id: 16,
            category: 'sofas',
            image: 'images/sofa3.png',
            title: 'Velvet Sectional Sofa',
            price: '$1000.00',
            counter: 3
        },
        {
            id: 17,
            category: 'sofas',
            image: 'images/sofa4.png',
            title: 'Compact Loveseat',
            price: '$500.00',
            counter: 10
        },
        {
            id: 18,
            category: 'sofas',
            image: 'images/sofa5.png',
            title: 'Leather Chesterfield Sofa',
            price: '$1500.00',
            counter: 2
        },
        {
            id: 19,
            category: 'sofas',
            image: 'images/sofa6.png',
            title: 'Fabric Sofa Bed',
            price: '$700.00',
            counter: 7
        },
        {
            id: 20,
            category: 'sofas',
            image: 'images/sofa7.png',
            title: 'Scandinavian Sofa',
            price: '$950.00',
            counter: 4
        },
        {
            id: 21,
            category: 'sofas',
            image: 'images/sofa8.png',
            title: 'Large Family Sofa',
            price: '$1800.00',
            counter: 3
        },
        {
            id: 22,
            category: 'sofas',
            image: 'images/sofa9.png',
            title: 'Corner Sofa Set',
            price: '$2000.00',
            counter: 2
        },
        {
            id: 23,
            category: 'accessories',
            image: 'images/acc1.png',
            title: 'Designer Wall Clock',
            price: '$45.00',
            counter: 30
        },
        {
            id: 24,
            category: 'accessories',
            image: 'images/acc2.png',
            title: 'Luxury Throw Pillow',
            price: '$25.00',
            counter: 50
        },
        {
            id: 25,
            category: 'accessories',
            image: 'images/acc3.png',
            title: 'Decorative Vase',
            price: '$60.00',
            counter: 20
        },
        {
            id: 26,
            category: 'accessories',
            image: 'images/acc4.png',
            title: 'Modern Rug',
            price: '$150.00',
            counter: 12
        },
        {
            id: 27,
            category: 'lights',
            image: 'images/lights1.png',
            title: 'LED Pendant Light',
            price: '$120.00',
            counter: 10
        },
        {
            id: 28,
            category: 'lights',
            image: 'images/lights2.png',
            title: 'Table Lamp',
            price: '$60.00',
            counter: 15
        },
        {
            id: 29,
            category: 'lights',
            image: 'images/lights3.png',
            title: 'Ceiling Chandelier',
            price: '$500.00',
            counter: 5
        },
        {
            id: 30,
            category: 'lights',
            image: 'images/lights4.png',
            title: 'Outdoor Solar Light',
            price: '$40.00',
            counter: 25
        }
    ];
    
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    const productSection = document.querySelector('.row');
    productSection.innerHTML = ''; 

    storedProducts.forEach(product => {
        const productHTML = `
            <div class="col-12 col-md-4 col-lg-3 mb-5 product-item" data-category="${product.category}">
                <img src="${product.image}" class="img-fluid product-thumbnail">
                <h3 class="product-title">${product.title}</h3>
                <strong class="product-price">${product.price}</strong>
                <span class="icon-cross">
                    <img src="images/cross.svg" class="img-fluid">
                </span>
            </div>
        `;
        productSection.insertAdjacentHTML('beforeend', productHTML);
    });



    document.querySelectorAll('.product-item').forEach(item => {
        item.addEventListener('click', function () {
            const productId = this.querySelector('.product-title').textContent;
            localStorage.setItem('selectedProduct', productId);
            window.location.href = 'productDetails.html';
        });
    });
    
});

