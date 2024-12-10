


let products;
products=JSON.parse(localStorage.getItem("product"));
console.log(products);
    function showitem(item,typename){
        let divItem=document.createElement("div");
        let linkItem=document.createElement("a");
        let imgItem=document.createElement("img");
        let titleItem=document.createElement("h3");
        let priceItem=document.createElement("strong");
        let spanItem=document.createElement("span");
        let iconcart=document.createElement("img");

        divItem.appendChild(linkItem);
        linkItem.appendChild(imgItem);
        linkItem.appendChild(titleItem);
        linkItem.appendChild(priceItem);
        spanItem.appendChild(iconcart);
        linkItem.appendChild(spanItem);

        divItem.className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0";
        linkItem.className="product-item";
        linkItem.setAttribute("href","cart.html");
        imgItem.className="img-fluid product-thumbnail";
        imgItem.setAttribute("src",item.image);
        titleItem.className="product-title";
        titleItem.innerText=item.title;
        priceItem.className="product-price";
        priceItem.innerText=item.price;
        spanItem.className="icon-cross";
        iconcart.className="img-fluid";
        iconcart.setAttribute("src","images/cross.svg");

        document.getElementById(typename).appendChild(divItem);

    }
    
    window.addEventListener("load",function(){

    for(let i=0;i<3;i++){
        showitem(products[i],"rowProduct");
    }

    let productsbestseller= [...products].sort((a, b) => b.solded - a.solded);
    for(let i=0;i<4;i++){
        showitem(productsbestseller[i],"rowbestseller");
    }

    let chair=products.map(function(a){if(a.category=="chair"){ return a;}});
    for(let i=0;i<4;i++){
        showitem(chair[i],"rowchairs");
    }
    let tables=products.filter(a => a.category === "chair");
    for(let i=0;i<tables.length;i++){
        showitem(tables[i],"rowtables");
    }

    })