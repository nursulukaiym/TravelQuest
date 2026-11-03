const destinations = [
  { city: "Париж", country: "Франция", emoji: "🗼" },
  { city: "Стамбул", country: "Түркия", emoji: "🕌" },
  { city: "Токио", country: "Жапония", emoji: "🌸" },
  { city: "Дубай", country: "БАӘ", emoji: "🏙️" },
  { city: "Рим", country: "Италия", emoji: "🏛️" },
  { city: "Сеул", country: "Оңтүстік Корея", emoji: "🌆" },
  { city: "Бали", country: "Индонезия", emoji: "🌴" },
  { city: "Алматы", country: "Қазақстан", emoji: "🏔️" }
];

const getData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

function showDestinations(search = "") {
  const container = document.getElementById("destinations");
  if (!container) return;

  const favorites = getData("travelFavorites");

  const filtered = destinations.filter(item =>
    (item.city + " " + item.country)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  container.innerHTML = filtered.map(item => `
    <div class="card">
      <div class="card-content">
        <h2>${item.emoji} ${item.city}</h2>
        <p>${item.country}</p>
        <button onclick="toggleFavorite('${item.city}')">
          ${favorites.includes(item.city) ? "❤️ Сақталған" : "🤍 Таңдаулыға"}
        </button>
      </div>
    </div>
  `).join("");
}

function toggleFavorite(city) {
  let favorites = getData("travelFavorites");

  favorites = favorites.includes(city)
    ? favorites.filter(item => item !== city)
    : [...favorites, city];

  localStorage.setItem("travelFavorites", JSON.stringify(favorites));
  showDestinations(document.getElementById("search")?.value || "");
}

function addTrip(event) {
  event.preventDefault();

  const city = document.getElementById("tripCity").value;
  const date = document.getElementById("tripDate").value;

  if (!city || !date) {
    alert("Қала мен күнді таңдаңыз!");
    return;
  }

  const trips = getData("travelTrips");
  trips.push({ city, date });

  localStorage.setItem("travelTrips", JSON.stringify(trips));
  event.target.reset();
  showTrips();
}

function showTrips() {
  const container = document.getElementById("tripList");
  if (!container) return;

  const trips = getData("travelTrips");

  container.innerHTML = trips.length
    ? trips.map((trip, index) => `
        <div class="destination">
          <strong>✈️ ${trip.city}</strong>
          <p>📅 ${trip.date}</p>
          <button onclick="deleteTrip(${index})">Өшіру</button>
        </div>
      `).join("")
    : "<p>Әзірге саяхат жоспары жоқ.</p>";
}

function deleteTrip(index) {
  const trips = getData("travelTrips");
  trips.splice(index, 1);
  localStorage.setItem("travelTrips", JSON.stringify(trips));
  showTrips();
}

document.addEventListener("DOMContentLoaded", () => {
  showDestinations();
  showTrips();

  document.getElementById("search")?.addEventListener("input", event => {
    showDestinations(event.target.value);
  });

  document.getElementById("tripForm")?.addEventListener("submit", addTrip);
});
