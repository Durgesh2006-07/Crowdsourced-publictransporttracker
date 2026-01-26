/* =========================
   LOGIN WITH VALIDATION
========================= */
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // Clear previous errors
  emailError.textContent = "";
  passwordError.textContent = "";

  let isValid = true;

  // Email validation
  if (email === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = "Enter a valid email address";
    isValid = false;
  }

  // Password validation
  if (password === "") {
    passwordError.textContent = "Password is required";
    isValid = false;
  } else if (password.length < 4) {
    passwordError.textContent = "Password must be at least 4 characters";
    isValid = false;
  }

  // Stop if validation fails
  if (!isValid) return;

  // Demo credentials check
  if (email === "test@gmail.com" && password === "1234") {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", email);

    window.location.replace("index.html");
  } else {
    passwordError.textContent = "Invalid email or password";
  }
}

/* =========================
   LOGOUT
========================= */
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userEmail");

  window.location.replace("login.html");
}
