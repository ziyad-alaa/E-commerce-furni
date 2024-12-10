"use strict";

// const orders = [
//   {
//     id: 1,
//     userId: 1,
//     address: "123 Street, City",
//     products: [
//       {
//         id: 101,
//         category: "Furniture",
//         image: "images/product-1.png",
//         title: "Chair 1",
//         price: 50,
//         quantity: 1,
//         discount: 0,
//       },
//       {
//         id: 102,
//         category: "Furniture",
//         image: "images/product-2.png",
//         title: "Chair 2",
//         price: 150,
//         quantity: 1,
//         discount: 10,
//       },
//     ],
//     price: 200,
//     quantity: 2,
//     time: "2024-12-01T12:00:00Z",
//     status: "Delivered",
//     deliveryDate: "2024-12-10T12:00:00Z",
//   },
//   {
//     id: 2,
//     userId: 1,
//     address: "456 Avenue, City",
//     products: [
//       {
//         id: 103,
//         category: "Home Decor",
//         image: "images/product-3.png",
//         title: "Chair 3",
//         price: 30,
//         quantity: 2,
//         discount: 5,
//       },
//     ],
//     price: 60,
//     quantity: 2,
//     time: "2024-12-02",
//     status: "Delivered",
//     deliveryDate: "2024-12-11T12:00:00Z",
//   },
// ];

// localStorage.setItem("orders", JSON.stringify(orders));
$(function () {
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (!user || user.role !== "Customer") {
    window.location.href = "login.html";
    $("#login-item, #signup-item").removeClass("d-none");
    $("#profile-item, #logout-item").addClass("d-none");
    return;
  }

  $("#login-item, #signup-item").addClass("d-none");
  $("#profile-item, #logout-item").removeClass("d-none");

  $("#logout-button").click(function () {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });

  $("#username").val(user.username);
  $("#email").val(user.email);
  $(".user-img").attr("src", `images/${user.photo}`);
  $("#gender").val(user.gender);
  $("#phoneNumber").val(user.phoneNumber);
  $("#address").val(user.address);

  $("#updateBtn").prop("disabled", true);

  const validateInputs = () => {
    const userName = $("#username").val().trim();
    const userEmail = $("#email").val().trim();
    const phoneNumber = $("#phoneNumber").val().trim();

    $(".error-message").text("");
    let isValid = true;

    if (!userName) {
      $("#userNameError").text("Username can NOT be empty");
      isValid = false;
    }

    if (!userEmail) {
      $("#emailError").text("Email can NOT be empty");
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z-.]+$/;
    if (!emailPattern.test(userEmail)) {
      $("#emailError").text("Please enter a valid email");
      isValid = false;
    }

    if (phoneNumber) {
      const phonePattern = /^(010|011|012|015)[0-9]{8}$/;
      if (!phonePattern.test(phoneNumber)) {
        $("#phoneNumberError").text("Please enter a valid phone number");
        isValid = false;
      }
    }

    $("#updateBtn").prop("disabled", !isValid);
  };

  $("#username, #email, #phoneNumber, #gender, #address").on(
    "input",
    validateInputs
  );

  $("#updateBtn").on("click", function (e) {
    e.preventDefault();

    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const userIndex = customers.findIndex(
      (customer) => customer.id === user.id
    );

    if (userIndex !== -1) {
      customers[userIndex].username = $("#username").val().trim();
      customers[userIndex].email = $("#email").val().trim();
      customers[userIndex].phoneNumber = $("#phoneNumber").val().trim();
      customers[userIndex].gender = $("#gender").val();
      customers[userIndex].address = $("#address").val().trim();

      localStorage.setItem("customers", JSON.stringify(customers));

      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify(customers[userIndex])
      );

      $("#successMessage")
        .text("Profile updated successfully!")
        .removeClass("d-none")
        .fadeIn(500)
        .fadeOut(3000);
    }
  });

  // orders
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const userOrders = orders.filter((order) => order.user_id === user.id);

  const renderOrders = () => {
    const $ordersList = $("#orders-list");
    $ordersList.empty();

    userOrders.forEach((order) => {
      const orderHTML = `
        <div class="card mb-4 shadow-sm rounded-lg">
          <div class="card-header text-white ${
            order.status === "Delivered" ? "bg-success" : "bg-warning"
          }">
            <strong>${order.status}</strong> ${
        order.status === "Delivered"
          ? `on ${order.deliveryDate.split("T")[0]}`
          : ""
      }
          </div>
          <div class="card-body">
            ${order.products
              .map(
                (product) => `
              <div class="d-flex align-items-start mb-3">
                <img
                  src="${product.image}"
                  alt="${product.title}"
                  class="img-fluid rounded"
                  style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px;"
                />
                <div>
                  <h5 class="mb-1">${product.title}</h5>
                  <p class="mb-1 text-muted">Price: $${product.price}</p>
                  <p class="mb-0">Quantity: ${product.quantity}</p>
                </div>
              </div>
            `
              )
              .join("")}
            <div class="d-flex justify-content-between mt-3">
              <h5 class="mb-0"><strong>Total Price:</strong> $${
                order.price
              }</h5>
              <span class="badge bg-primary pt-2">Order ID: ${order.id}</span>
            </div>
          </div>
          <div class="card-footer text-muted text-end">
            <small>Order placed at: ${order.time.split("T")[0]}</small>
          </div>
        </div>
      `;
      $ordersList.append(orderHTML);
    });
  };

  renderOrders();
});
