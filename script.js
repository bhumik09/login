
// =====================================
// PASSWORD SHOW / HIDE
// =====================================

document.querySelectorAll(".password-toggle").forEach((button) => {

  button.addEventListener("click", () => {

    const passwordId = button.dataset.toggle;
    const passwordInput = document.getElementById(passwordId);

    if (!passwordInput) return;

    const isPasswordHidden = passwordInput.type === "password";

    passwordInput.type = isPasswordHidden ? "text" : "password";

    button.classList.toggle("password-visible", isPasswordHidden);

    button.setAttribute(
      "aria-label",
      isPasswordHidden ? "Hide password" : "Show password"
    );

    button.setAttribute(
      "aria-pressed",
      String(isPasswordHidden)
    );

  });

});


// =====================================
// ELEMENTS
// =====================================

const loginPanel = document.getElementById("loginPanel");
const signupPanel = document.getElementById("signupPanel");

const loginCard = document.getElementById("loginCard");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
const brandSymbol = document.getElementById("brandSymbol");
const brandText = document.getElementById("brandText");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");


// =====================================
// CLEAR FORM
// =====================================

function clearForm(form) {

  form.reset();

  form.querySelectorAll(".error").forEach((error) => {
    error.textContent = "";
  });

  form.querySelectorAll(".form-message").forEach((message) => {
    message.textContent = "";
    message.className = "form-message";
  });

  form.querySelectorAll(".password-toggle").forEach((button) => {

    const input = document.getElementById(button.dataset.toggle);

    if (input) {
      input.type = "password";
    }

    button.classList.remove("password-visible");

    button.setAttribute("aria-label", "Show password");
    button.setAttribute("aria-pressed", "false");

  });

}


// =====================================
// SWITCH TO SIGNUP
// =====================================

showSignup.addEventListener("click", () => {

  clearForm(loginForm);
  clearForm(signupForm);

  loginPanel.hidden = true;
  signupPanel.hidden = false;

  loginCard.classList.add("signup-mode");

  // Change logo
  brandSymbol.textContent = "C";
  brandText.textContent = "Create Account";

});


// =====================================
// SWITCH TO LOGIN
// =====================================

showLogin.addEventListener("click", () => {

  clearForm(signupForm);
  clearForm(loginForm);

  signupPanel.hidden = true;
  loginPanel.hidden = false;

  loginCard.classList.remove("signup-mode");

  // Change logo
  brandSymbol.textContent = "S";
  brandText.textContent = "Sign In";

});

// =====================================
// EMAIL VALIDATION
// =====================================

function validateEmail(email) {

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);

}


// =====================================
// SHOW ERROR
// =====================================

function setError(inputId, errorId, message) {

  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);

  error.textContent = message;

  input.classList.toggle("input-invalid", Boolean(message));

}


// =====================================
// SHOW MESSAGE
// =====================================

function showMessage(id, message, type) {

  const element = document.getElementById(id);

  element.textContent = message;
  element.className = "form-message " + type;

}


// =====================================
// LOGIN VALIDATION
// =====================================

function validateLogin() {

  let valid = true;

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  setError("loginEmail", "loginEmailError", "");
  setError("loginPassword", "loginPasswordError", "");

  if (!email) {

    setError(
      "loginEmail",
      "loginEmailError",
      "Email address is required."
    );

    valid = false;

  } else if (!validateEmail(email)) {

    setError(
      "loginEmail",
      "loginEmailError",
      "Please enter a valid email address."
    );

    valid = false;

  }

  if (!password) {

    setError(
      "loginPassword",
      "loginPasswordError",
      "Password is required."
    );

    valid = false;

  } else if (password.length < 7) {

    setError(
      "loginPassword",
      "loginPasswordError",
      "Password must contain at least 7 characters."
    );

    valid = false;

  }

  return valid;

}


// =====================================
// SIGNUP VALIDATION
// =====================================

function validateSignup() {

  let valid = true;

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  setError("fullName", "fullNameError", "");
  setError("signupEmail", "signupEmailError", "");
  setError("signupPassword", "signupPasswordError", "");

  if (name.length < 2) {

    setError(
      "fullName",
      "fullNameError",
      "Please enter your full name."
    );

    valid = false;

  }

  if (!email) {

    setError(
      "signupEmail",
      "signupEmailError",
      "Email address is required."
    );

    valid = false;

  } else if (!validateEmail(email)) {

    setError(
      "signupEmail",
      "signupEmailError",
      "Please enter a valid email address."
    );

    valid = false;

  }

  if (password.length < 6) {

    setError(
      "signupPassword",
      "signupPasswordError",
      "Password must contain at least 6 characters."
    );

    valid = false;

  }

  return valid;

}


// =====================================
// DEMO LOADING
// =====================================

function runDemo(buttonId, messageId, message) {

  const button = document.getElementById(buttonId);

  button.disabled = true;
  button.classList.add("loading");

  window.setTimeout(() => {

    button.disabled = false;
    button.classList.remove("loading");

    showMessage(messageId, message, "success");

  }, 900);

}


// =====================================
// LOGIN SUBMIT
// =====================================

loginForm.addEventListener("submit", (event) => {

  event.preventDefault();

  if (!validateLogin()) return;

  runDemo(
    "loginButton",
    "loginMessage",
    "Demo login successful! Welcome back."
  );

});


// =====================================
// SIGNUP SUBMIT
// =====================================

signupForm.addEventListener("submit", (event) => {

  event.preventDefault();

  if (!validateSignup()) return;

  runDemo(
    "signupButton",
    "signupMessage",
    "Demo complete! Account creation is not connected yet."
  );

});


// =====================================
// FORGOT PASSWORD
// =====================================

document.getElementById("forgotLink").addEventListener("click", (event) => {

  event.preventDefault();

  showMessage(
    "loginMessage",
    "Password reset is not connected yet.",
    "info"
  );

});


// =====================================
// CLEAR ERRORS WHILE TYPING
// =====================================

document.querySelectorAll("input").forEach((input) => {

  input.addEventListener("input", () => {

    input.classList.remove("input-invalid");

    if (input.id) {

      const errorElement = document.getElementById(input.id + "Error");

      if (errorElement) {
        errorElement.textContent = "";
      }

    }

  });

});
