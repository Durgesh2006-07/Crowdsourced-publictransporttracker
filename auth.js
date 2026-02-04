/* =========================
   LOGIN WITH VALIDATION
========================= */
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.querySelector('input[name="role"]:checked').value;

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  emailError.textContent = "";
  passwordError.textContent = "";

  let isValid = true;

  if (!email) {
    emailError.textContent = "Email is required";
    isValid = false;
  }

  if (!password) {
    passwordError.textContent = "Password is required";
    isValid = false;
  }

  if (!isValid) return;

  /* DEMO CREDENTIALS */
  const users = {
    consumer: { email: "test@gmail.com", password: "1234" },
    admin: { email: "admin@gmail.com", password: "admin" }
  };

  if (
    users[role] &&
    email === users[role].email &&
    password === users[role].password
  ) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", email);

    // Role-based redirect
    if (role === "admin") {
      window.location.replace("admin.html");
    } else {
      window.location.replace("index.html");
    }
  } else {
    passwordError.textContent = "Invalid credentials";
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
