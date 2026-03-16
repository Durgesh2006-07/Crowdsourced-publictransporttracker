/* =========================
   ADMIN BUS STATUS CONTROL
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const busName = card.dataset.bus;
    const select = card.querySelector(".status-select");
    const statusText = card.querySelector(".status-text");

    // Load saved status
    const savedStatus = localStorage.getItem(busName);
    if (savedStatus) {
      updateStatusUI(statusText, savedStatus);
      select.value = savedStatus;
    }

    // Change handler
    select.addEventListener("change", () => {
      const status = select.value;

      localStorage.setItem(busName, status);
      updateStatusUI(statusText, status);
    });
  });
});

/* =========================
   STATUS UI HELPER
========================= */
function updateStatusUI(el, status) {
  el.textContent = status;

  el.classList.remove("status-ok", "status-warn", "status-bad");

  if (status === "On Time") {
    el.classList.add("status-ok");
  } else if (status === "Slight Delay") {
    el.classList.add("status-warn");
  } else {
    el.classList.add("status-bad");
  }
}
