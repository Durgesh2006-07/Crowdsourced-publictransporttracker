/* =========================
   ADMIN DASHBOARD LOGIC
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const buses = [
    "Bus 21 – RS Puram",
    "Bus 32 – Ukkadam",
    "Bus 55 – Mettupalayam"
  ];

  let delayedCount = 0;
  const alerts = [];

  buses.forEach(bus => {
    const status = localStorage.getItem(bus);

    if (status === "Delayed") {
      delayedCount++;
      alerts.push(`🚦 ${bus} is delayed`);
    }

    if (status === "Slight Delay") {
      alerts.push(`⚠️ ${bus} has slight delay`);
    }
  });

  // Update KPI
  document.getElementById("delayCount").textContent = delayedCount;

  // System health logic
  const healthEl = document.getElementById("systemHealth");
  if (delayedCount === 0) {
    healthEl.textContent = "Normal";
    healthEl.className = "status-ok";
  } else if (delayedCount === 1) {
    healthEl.textContent = "Warning";
    healthEl.className = "status-warn";
  } else {
    healthEl.textContent = "Critical";
    healthEl.className = "status-bad";
  }

  // Alerts list
  const alertList = document.getElementById("alertList");
  alertList.innerHTML = "";

  if (alerts.length === 0) {
    alertList.innerHTML = "<li>No critical alerts</li>";
  } else {
    alerts.forEach(alert => {
  const li = document.createElement("li");
  li.textContent = alert;

  // Assign alert type class
  if (alert.includes("is delayed")) {
    li.classList.add("alert-danger");
  } else if (alert.includes("slight delay")) {
    li.classList.add("alert-warning");
  } else {
    li.classList.add("alert-ok");
  }

  alertList.appendChild(li);
});

  }
});
