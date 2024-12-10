"use strict";

const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME = 30 * 1000;
const SESSION_TIMEOUT = 30 * 60 * 1000;

const getFailedAttempts = (email) =>
  JSON.parse(localStorage.getItem(`failedAttempts_${email}`)) || {};

const setFailedAttempts = (email, attempts) =>
  localStorage.setItem(`failedAttempts_${email}`, JSON.stringify(attempts));

const showError = (message) => {
  $("#error-message").removeClass("d-none").text(message);
};

const hideError = () => {
  $("#error-message").addClass("d-none").text("");
};

const isValidEmail = (email) => {
  return /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z-.]+$/.test(email);
};

let lockoutActive = false;

const handleLockout = (email) => {
  if (lockoutActive) return; // Prevent multiple intervals
  lockoutActive = true;

  const failedAttempts = getFailedAttempts(email);
  const lockedUntil = failedAttempts.lockedUntil || Date.now() + LOCKOUT_TIME;

  failedAttempts.lockedUntil = lockedUntil;
  setFailedAttempts(email, failedAttempts);

  const interval = setInterval(() => {
    const now = Date.now();
    const remainingTime = Math.ceil((lockedUntil - now) / 1000);

    if (remainingTime > 0) {
      showError(
        `Too many failed attempts. Try again in ${remainingTime} seconds.`
      );
    } else {
      clearInterval(interval);
      failedAttempts.lockedUntil = null;
      failedAttempts.count = 0;
      setFailedAttempts(email, failedAttempts);
      hideError();
      localStorage.removeItem("failedAttempts");
      $(":submit").prop("disabled", false);
    }
  }, 1000);

  $(":submit").prop("disabled", true);
};

const incrementFailedAttempts = (email, failedAttempts) => {
  failedAttempts.count = (failedAttempts.count || 0) + 1;

  if (failedAttempts.count >= MAX_ATTEMPTS) {
    failedAttempts.lockedUntil = Date.now() + LOCKOUT_TIME;
    handleLockout(email);
  } else {
    showError(
      `Invalid login. ${MAX_ATTEMPTS - failedAttempts.count} attempts left.`
    );
    setFailedAttempts(email, failedAttempts);
  }
};

const loginHandler = (email, password) => {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const sellers = JSON.parse(localStorage.getItem("sellers")) || [];
  const allUsers = [...customers, ...sellers];

  const failedAttempts = getFailedAttempts(email);
  const now = Date.now();

  if (failedAttempts.lockedUntil && now < failedAttempts.lockedUntil) {
    handleLockout(email);
    return;
  }

  if (!email || !password) {
    showError("Please enter email and password to login");
    return;
  }

  if (!isValidEmail(email)) {
    showError("Invalid email.");
    return;
  }

  const user = allUsers.find((user) => user.email === email);

  if (!user) {
    showError("Invalid email or password");
    return;
  }
  const hashedInputPassword = CryptoJS.SHA256(password + user.salt).toString();
  if (user.password !== hashedInputPassword) {
    showError("Invalid email or password");
    incrementFailedAttempts(email, failedAttempts);

    return;
  }

  // successful login
  sessionStorage.setItem("loggedInUser", JSON.stringify(user));
  localStorage.removeItem("failedAttempts");

  // redirection
  const dashboard = {
    Customer: "customer-dashboard.html",
    Seller: "seller-dashboard.html",
    Admin: "admin-dashboard.html",
  };

  window.location.href = dashboard[user.role];
};

$(function () {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    $("#login-item, #signup-item").addClass("d-none");
    $("#profile-item, #logout-item").removeClass("d-none");
  } else {
    $("#login-item, #signup-item").removeClass("d-none");
    $("#profile-item, #logout-item").addClass("d-none");
  }

  $("#logout-button").click(function () {
    console.log(1);
    sessionStorage.removeItem("loggedInUser");
    console.log(2);
    alert("You have been logged out.");
    window.location.href = "login.html";
  });

  $("#loginForm").submit(function (e) {
    e.preventDefault();
    hideError();

    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    loginHandler(email, password);
  }); // end of submit
}); // end of load
