document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     MAP INITIALIZATION
  ======================== */
  const map = L.map("map").setView([11.0168, 76.9558], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  /* =======================
     BUS ICON
  ======================== */
  function busIcon(color) {
    return L.divIcon({
      html: `<div class="bus-glow" style="
        width:24px;
        height:24px;
        background:${color};
        border:3px solid white;
        border-radius:50%;
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  }

  /* =======================
     BUS DATA (5 ROUTES)
  ======================== */
  const buses = [
    {
      name: "Bus 21 – RS Puram",
      color: "#ff4f5a",
      speed: 0.002,
      route: [[11.0168,76.9558],[11.03,76.97],[11.04,76.99]]
    },
    {
      name: "Bus 32 – Ukkadam",
      color: "#00c46a",
      speed: 0.0017,
      route: [[11.0168,76.9558],[11.01,76.98],[11.00,77.02]]
    },
    {
      name: "Bus 55 – Mettupalayam",
      color: "#ff9800",
      speed: 0.0018,
      route: [[11.0168,76.9558],[11.07,76.93],[11.30,76.94]]
    },
    {
      name: "Bus 73 – KGiSL",
      color: "#9c27b0",
      speed: 0.0016,
      route: [[11.0168,76.9558],[11.06,76.99],[11.08,77.01]]
    },
    {
      name: "Bus 88 – Singanallur",
      color: "#2196f3",
      speed: 0.0019,
      route: [[11.0168,76.9558],[11.00,77.02],[10.99,77.04]]
    }
  ];

  /* =======================
     DRAW ROUTES & MARKERS
  ======================== */
  buses.forEach(bus => {
    bus.polyline = L.polyline(bus.route, {
      color: bus.color,
      weight: 4,
      opacity: 0.7
    }).addTo(map);

    bus.marker = L.marker(bus.route[0], {
      icon: busIcon(bus.color)
    }).addTo(map);

    bus.index = 0;
  });

  map.fitBounds(buses.flatMap(b => b.route));

  /* =======================
     HELPER FUNCTIONS
  ======================== */
  function calculateETA(bus) {
    const dest = bus.route[bus.route.length - 1];
    const pos = bus.marker.getLatLng();
    const dist = Math.sqrt(
      Math.pow(dest[0] - pos.lat, 2) +
      Math.pow(dest[1] - pos.lng, 2)
    );
    return Math.max(1, Math.floor(dist / bus.speed)) + " mins";
  }

  function getBusStatus(bus) {
    if (bus.speed > 0.0018) return "On Time";
    if (bus.speed > 0.0015) return "Slight Delay";
    return "Slow";
  }

  /* =======================
     LIVE BUS STATUS (DESKTOP)
  ======================== */
  function updateLiveStatus(bus) {
    const statusPanel = document.getElementById("busStatus");
    statusPanel.innerHTML = `
      <li>
        🚌 <b>${bus.name}</b><br>
        ⏱ ETA: <b>${calculateETA(bus)}</b><br>
        🚦 Status: <b>${getBusStatus(bus)}</b>
      </li>
    `;
  }

  /* =======================
     FILTER ROUTES
  ======================== */
 /* =======================
   FILTER ROUTES (FIXED)
======================= */
const routeControl = document.querySelector(".route-control");

// Create "All" button
const allBtn = document.createElement("button");
allBtn.textContent = "All";
allBtn.className = "route-btn active";
allBtn.dataset.route = "all";
routeControl.appendChild(allBtn);

// Create buttons for each bus
buses.forEach((bus, index) => {
  const btn = document.createElement("button");
  btn.textContent = bus.name.split(" ")[1]; // Bus number
  btn.className = "route-btn";
  btn.dataset.route = index;
  routeControl.appendChild(btn);
});

// Click logic
const routeButtons = document.querySelectorAll(".route-btn");

routeButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    // Active state UI
    routeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const selected = btn.dataset.route;

    if (selected === "all") {
      // ✅ SHOW ALL ROUTES AGAIN
      buses.forEach(bus => {
        if (!map.hasLayer(bus.polyline)) bus.polyline.addTo(map);
        if (!map.hasLayer(bus.marker)) bus.marker.addTo(map);
      });

      // Optional: clear live status
      updateLiveStatus(buses[0]);

    } else {
      // ✅ SHOW ONLY SELECTED ROUTE
      buses.forEach((bus, index) => {
        if (index == selected) {
          if (!map.hasLayer(bus.polyline)) bus.polyline.addTo(map);
          if (!map.hasLayer(bus.marker)) bus.marker.addTo(map);
          updateLiveStatus(bus);
        } else {
          if (map.hasLayer(bus.polyline)) map.removeLayer(bus.polyline);
          if (map.hasLayer(bus.marker)) map.removeLayer(bus.marker);
        }
      });
    }
  });
});

  /* =======================
     BUS ANIMATION
  ======================== */
  function moveBuses() {
    buses.forEach(bus => {
      const next = bus.route[bus.index + 1];
      if (!next) {
        bus.index = 0;
        bus.marker.setLatLng(bus.route[0]);
        return;
      }

      const pos = bus.marker.getLatLng();
      bus.marker.setLatLng([
        pos.lat + (next[0] - pos.lat) * bus.speed,
        pos.lng + (next[1] - pos.lng) * bus.speed
      ]);
    });
    requestAnimationFrame(moveBuses);
  }
  moveBuses();

  /* =======================
     DEMO BUTTON
  ======================== */
  document.getElementById("startDemo").onclick = () => {
    updateLiveStatus(buses[0]);
    buses[0].marker.openPopup();
  };

  // Default status on load
  updateLiveStatus(buses[0]);

});
