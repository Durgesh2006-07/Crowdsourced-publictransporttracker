// Map Initialization
const map = L.map("map").setView([11.0168, 76.9558], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Bus icons
function busIcon(color) {
  return L.divIcon({
    className: "bus-icon",
    html: `<div style="
      width: 18px; height: 18px;
      background:${color};
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 0 4px rgba(0,0,0,0.3);
    "></div>`,
  });
}

// Bus data
const buses = [
  {
    name: "Bus 21 - Gandhipuram ↔ RS Puram",
    color: "#ff4f5a",
    route: [
      [11.0168, 76.9558],
      [11.021, 76.97],
      [11.028, 76.982],
      [11.035, 76.99],
    ],
  },
  {
    name: "Bus 32 - Peelamedu ↔ Ukkadam",
    color: "#00c46a",
    route: [
      [11.02, 76.96],
      [11.014, 76.97],
      [11.008, 76.982],
      [11.002, 76.995],
    ],
  },
];

// Draw routes and add markers
buses.forEach((bus) => {
  L.polyline(bus.route, { color: bus.color, weight: 4, opacity: 0.7 }).addTo(map);
  bus.marker = L.marker(bus.route[0], { icon: busIcon(bus.color) })
    .addTo(map)
    .bindPopup(bus.name);
  bus.index = 0;
});

// Animate bus movement
function moveBuses() {
  buses.forEach((bus) => {
    const curr = bus.route[bus.index];
    const next = bus.route[bus.index + 1];
    if (!next) bus.index = 0;
    else {
      const lat = curr[0] + (next[0] - curr[0]) * 0.01;
      const lon = curr[1] + (next[1] - curr[1]) * 0.01;
      bus.marker.setLatLng([lat, lon]);
      if (Math.abs(lat - next[0]) < 0.0002) bus.index++;
    }
  });
  requestAnimationFrame(moveBuses);
}
moveBuses();

// Demo Button
document.getElementById("startDemo").onclick = () => {
  alert("Demo started! Watch buses move live on the map 🚍");
  map.flyTo([11.02, 76.97], 13);
};
