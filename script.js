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

const loginPanel = document.getElementById("loginPanel");
const signupPanel = document.getElementById("signupPanel");

const loginCard = document.getElementById("loginCard");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
const brandSymbol = document.getElementById("brandSymbol");
const brandText = document.getElementById("brandText");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");




function clearForm(form) {

  form.reset();
  form.querySelectorAll(".input-box").forEach((box) => {
    box.classList.remove("valid");
  });
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


showSignup.addEventListener("click", () => {

  clearForm(loginForm);
  clearForm(signupForm);

  loginPanel.hidden = true;
  signupPanel.hidden = false;

  loginCard.classList.add("signup-mode");

  
  brandSymbol.textContent = "C";
  brandText.textContent = "Create Account";

});


showLogin.addEventListener("click", () => {

  clearForm(signupForm);
  clearForm(loginForm);

  signupPanel.hidden = true;
  loginPanel.hidden = false;

  loginCard.classList.remove("signup-mode");

  brandSymbol.textContent = "S";
  brandText.textContent = "Sign In";

});


function validateEmail(email) {

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);

}


function setError(inputId, errorId, message) {

  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);

  error.textContent = message;

  input.classList.toggle("input-invalid", Boolean(message));

}


function showMessage(id, message, type) {

  const element = document.getElementById(id);

  element.textContent = message;
  element.className = "form-message " + type;

}



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

loginForm.addEventListener("submit", (event) => {

  event.preventDefault();

  if (!validateLogin()) return;

  runDemo(
    "loginButton",
    "loginMessage",
    "Demo login successful! Welcome back."
  );

});

signupForm.addEventListener("submit", (event) => {

  event.preventDefault();

  if (!validateSignup()) return;

  runDemo(
    "signupButton",
    "signupMessage",
    "Demo complete! Account creation is not connected yet."
  );

});
document.getElementById("forgotLink").addEventListener("click", (event) => {

  event.preventDefault();

  showMessage(
    "loginMessage",
    "Password reset is not connected yet.",
    "info"
  );

});

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
const signupFields = [
  {
    id: "fullName",
    condition: (value) => value.trim().length >= 2
  },
  {
    id: "signupEmail",
    condition: (value) => validateEmail(value.trim())
  },
  {
    id: "signupPassword",
    condition: (value) => value.length >= 6
  }
];

signupFields.forEach((field) => {

  const input = document.getElementById(field.id);

  input.addEventListener("input", () => {

    const box = input.closest(".input-box");

    if (field.condition(input.value)) {
      box.classList.add("valid");
    } else {
      box.classList.remove("valid");
    }

  });

});