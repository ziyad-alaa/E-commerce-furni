const userId = "user12";
if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify({})); 
}




    
 
      
         function renderCart() {
          const tbody = $("#cart-items");
          tbody.empty();
          const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
          const cart = allCarts[`cart_${userId}`] || [];
        
          if (!cart || cart.length === 0) {
            $("h2.text-center.mb-4").hide();
            $("#cart-table").hide();
            $("#cart-actions").hide();
            $("#cart-totals").hide();
            $("#cart-empty").show();
            return;
          } else {
            $("h2.text-center.mb-4").show();
            $("#cart-table").show();
            $("#cart-actions").show();
            $("#cart-totals").show();
            $("#cart-empty").hide();
          }
          cart.forEach((item) => {
            const discountedPrice =
              item.price - (item.price * (item.discount || 0)) / 100;
        
            tbody.append(`
              <tr>
                <td><img src="${item.image}" class="img-responsive custom-img" alt="${item.title}" /></td>
                <td>${item.title}</td>
                <td>$${discountedPrice.toFixed(2)}</td>
                <td>
                  <div class="quantity-container">
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <input type="text" class="form-control" id="quantity-${item.id}" value="${item.quantity}" readonly />
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                  </div>
                </td>
                <td id="total-${item.id}">$${(discountedPrice * item.quantity).toFixed(2)}</td>
                <td><button class="remove-btn" onclick="removeItem(${item.id})">X</button></td>
              </tr>
            `);
          });
        
          calculateSubtotal();
        }
        
        function updateQuantity(id, change) {
          const allCarts = JSON.parse(localStorage.getItem("cart")) || {}; 
          const cartKey = `cart_${userId}`;
          const cart = allCarts[cartKey] || []; 
          const products = JSON.parse(localStorage.getItem("products")) || []; 
        
          const product = products.find((p) => p.id === id);
          if (product) {
            const item = cart.find((p) => p.id === id); 
            if (item) {
              const newQuantity = item.quantity + change;
        
              if (newQuantity >= 1 && newQuantity <= product.count) {
                item.quantity = newQuantity;
                const discountedPrice =
                  product.price - (product.price * (product.discount || 0)) / 100;
        
                // Update the UI for the quantity and total price
                $(`#quantity-${id}`).val(newQuantity);
                $(`#total-${id}`).text(`$${(discountedPrice * newQuantity).toFixed(2)}`);
                allCarts[cartKey] = cart;
                localStorage.setItem("cart", JSON.stringify(allCarts));
              }
            }
          }
          renderCart(); 
        }
        
        function calculateSubtotal() {
          const allCarts = JSON.parse(localStorage.getItem("cart")) || {}; 
          const cartKey = `cart_${userId}`;
          const cart = allCarts[cartKey] || []; 
          let subtotal = 0;
          cart.forEach((item) => {
            const discountedPrice =
              item.price - (item.price * (item.discount || 0)) / 100; 
            subtotal += discountedPrice * item.quantity; 
          });
          $("#subtotal").text(`$${subtotal.toFixed(2)}`);
          $("#total").text(`$${subtotal.toFixed(2)}`);
        }
        
        function removeItem(id) {
          const allCarts = JSON.parse(localStorage.getItem("cart")) || {}; 
          const cartKey = `cart_${userId}`;
          let cart = allCarts[cartKey] || []; 
          cart = cart.filter((p) => p.id !== id);
          allCarts[cartKey] = cart; 
          localStorage.setItem("cart", JSON.stringify(allCarts));
          renderCart();
        }
        
        
      function proceedToCheckout() {
        window.location.href = "checkout.html";
      }
      function toggleShippingDetails() {
        const checkbox = document.getElementById("shipToDifferentAddress");
        const billingSection = document.getElementById("billingDetailsSection");
        const orderNotes = document.getElementById("orderNotes");
        const orderNotesLabel = document.getElementById("orderNotesLabel");

        // Handle Ship to a Different Address toggle
        if (checkbox.checked) {
          // Clone the Billing Details section (excluding unwanted elements)
          const billingSectionClone = document
            .getElementById("billingDetailsSection")
            .cloneNode(true);

          // Add a unique class to the duplicated section
          billingSectionClone.classList.add("duplicated-section", "no-border");

          // Remove "Create Account" and "Ship to Different Address" checkboxes and their labels from the duplicated section
          const createAccount =
            billingSectionClone.querySelector("#createAccount");
          const shipToDifferentAddress = billingSectionClone.querySelector(
            "#shipToDifferentAddress"
          );
          const createAccountLabel = billingSectionClone.querySelector(
            "label[for='createAccount']"
          );
          const shipToDifferentAddressLabel = billingSectionClone.querySelector(
            "label[for='shipToDifferentAddress']"
          );

          // Remove the elements
          if (createAccount)
            createAccount.parentNode.removeChild(createAccount);
          if (shipToDifferentAddress)
            shipToDifferentAddress.parentNode.removeChild(
              shipToDifferentAddress
            );
          if (createAccountLabel) createAccountLabel.style.display = "none";
          if (shipToDifferentAddressLabel)
            shipToDifferentAddressLabel.style.display = "none";

          // Append the cloned section inside the same Billing Details container
          billingSection.appendChild(billingSectionClone);

          // Hide Order Notes textarea and label when shipping to a different address is selected
          orderNotes.style.display = "none";
          orderNotesLabel.style.display = "none";
        } else {
          // Clear the duplicate section
          const duplicateContent = billingSection.querySelectorAll(
            ".duplicated-section"
          );
          duplicateContent.forEach((section) => section.remove());
          orderNotes.style.display = "block";
          orderNotesLabel.style.display = "block"; 
        }
      }
      function toggleCreateAccount() {
        const createAccountSection = document.getElementById(
          "createAccountSection"
        );
        createAccountSection.classList.toggle("collapse");
      }
      function togglePaymentDescription(paymentMethodId) {
        const descriptions = document.querySelectorAll(".payment-description");
        descriptions.forEach((desc) => {
          desc.style.height = "0";
          desc.style.opacity = "0";
          desc.style.padding = "0";
          desc.style.transition =
            "height 0.3s ease, opacity 0.3s ease, padding 0.3s ease";
        });
        const selectedDescription = document.getElementById(paymentMethodId);
        selectedDescription.style.height = "auto";
        selectedDescription.style.opacity = "1";
        selectedDescription.style.padding = "10px 0";
        selectedDescription.style.transition =
          "height 0.3s ease, opacity 0.3s ease, padding 0.3s ease";
      }
      function placeOrder() {
        const allCarts = JSON.parse(localStorage.getItem("cart")) || {};
        const cartKey = `cart_${userId}`;
        const cartItems = allCarts[cartKey] || [];
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        const selectedPaymentMethod = document.querySelector('input[name="payment_method"]:checked').value;
        const order = {
          order_id: orders.length + 1,
          user_id: userId,
          address: "", 
          products: [],
          time: new Date().toISOString(),
          status: "Pending",
          payment_type: selectedPaymentMethod,
          notes: document.getElementById('orderNotes').value,
        };
        const outOfStockItems = [];
        const updatedCart = [];
        let allProductsInStock = true;
      
        cartItems.forEach((cartItem) => {
          const product = storedProducts.find((p) => p.id === cartItem.id);
      
          if (product) {
            if (cartItem.quantity > product.count) {
              outOfStockItems.push({
                product_name: product.title,
                available: product.count,
                requested: cartItem.quantity,
              });
              if (product.count > 0) {
                updatedCart.push({ ...cartItem, quantity: product.count });
              }
              allProductsInStock = false;
            } else {
              updatedCart.push(cartItem);
            }
          }
        });
      
        if (!allProductsInStock) {
          let errorMessage = "<ul>";
          outOfStockItems.forEach((item) => {
            errorMessage += `<li>Product Name: ${item.product_name}, Requested: ${item.requested}, Available: ${item.available}</li>`;
          });
          errorMessage += "</ul>";
      
          // Set the modal body content dynamically
          document.getElementById("outOfStockMessage").innerHTML = errorMessage;
      
          // Show the modal using Bootstrap's modal method
          const outOfStockModal = new bootstrap.Modal(document.getElementById("outOfStockModal"));
          outOfStockModal.show();
          allCarts[cartKey] = updatedCart;
          localStorage.setItem("cart", JSON.stringify(allCarts));
          return; // Exit the function without placing the order
        }
      
        cartItems.forEach((cartItem) => {
          const product = storedProducts.find((p) => p.id === cartItem.id);
            product.sold += cartItem.quantity; 
            product.count -= cartItem.quantity; 
            order.products.push({
              product_id: product.id,
              price: ((100 - product.discount) / 100) * product.price, 
              quantity: cartItem.quantity,
            });
        });
        localStorage.setItem("products", JSON.stringify(storedProducts));
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        allCarts[cartKey] = [];
        localStorage.setItem("cart", JSON.stringify(allCarts));
        window.location.href = "thankyou.html";
      }
      
      function togglePaymentDescription(paymentMethodId) {
        $(".payment-description").css({
          height: "0",
          opacity: "0",
          padding: "0",
        });
        $(`#${paymentMethodId}`).css({
          height: "auto",
          opacity: "1",
          padding: "10px 0",
        });
      }

