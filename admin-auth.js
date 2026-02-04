/* =========================
   ADMIN AUTH CHECK
========================= */
function checkAdminAuth() {
  if (
    localStorage.getItem("loggedIn") !== "true" ||
    localStorage.getItem("userRole") !== "admin"
  ) {
    window.location.replace("login.html");
  }
}

/* =========================
   LOGOUT (SHARED)
========================= */
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userEmail");

  window.location.replace("login.html");
}
