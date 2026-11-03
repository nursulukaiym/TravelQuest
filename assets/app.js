"use strict";

const destinations = [
  {city:"Париж",country:"Франция",emoji:"🗼"},
  {city:"Стамбул",country:"Түркия",emoji:"🕌"},
  {city:"Токио",country:"Жапония",emoji:"🌸"},
  {city:"Дубай",country:"БАӘ",emoji:"🏙️"},
  {city:"Рим",country:"Италия",emoji:"🏛️"},
  {city:"Сеул",country:"Оңтүстік Корея",emoji:"🌆"},
  {city:"Бали",country:"Индонезия",emoji:"🌴"},
  {city:"Алматы",country:"Қазақстан",emoji:"🏔️"}
];

const $ = id => document.getElementById(id);

function read(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    alert("Браузер деректерді сақтауға рұқсат бермеді.");
    return false;
  }
}

let trips = read("tq_trips", []);
let favorites = read("tq_favorites", []);
let authMode = "login";

function openPage(page) {
  document.querySelectorAll(".screen").forEach(el => {
    el.classList.toggle("active", el.id === page);
  });

  document.querySelectorAll(".bottom-nav button").forEach(btn => {
    btn.classList.toggle("current", btn.dataset.page === page);
  });

  if (page === "trips") renderTrips();
  if (page === "explore") renderDestinations();
  if (page === "calendar") renderCalendar();

  window.scrollTo({top:0, behavior:"smooth"});
}

function makeText(tag, value, className) {
  const el = document.createElement(tag);
  el.textContent = value;
  if (className) el.className = className;
  return el;
}

function renderTrips() {
  const list = $("tripList");
  list.replaceChildren();

  $("tripCount").textContent = trips.length;
  $("favCount").textContent = favorites.length;

  if (!trips.length) {
    list.append(makeText("p", "🌴 Әзірге саяхат жоспары жоқ. Біріншісін қос!"));
    return;
  }

  trips.forEach(trip => {
    const card = document.createElement("div");
    card.className = "trip-item";

    card.append(makeText("h3", "✈️ " + trip.city));
    card.append(makeText("p", "📅 " + trip.date));

    if (trip.note) {
      card.append(makeText("p", "📝 " + trip.note));
    }

    const btn = makeText("button", "Өшіру", "small-btn danger");
    btn.addEventListener("click", () => {
      trips = trips.filter(item => item.id !== trip.id);
      if (save("tq_trips", trips)) renderTrips();
    });

    card.append(btn);
    list.append(card);
  });
}

function renderDestinations() {
  const list = $("destinations");
  const search = $("search").value.trim().toLocaleLowerCase();
  list.replaceChildren();

  const filtered = destinations.filter(item =>
    (item.city + " " + item.country)
      .toLocaleLowerCase()
      .includes(search)
  );

  if (!filtered.length) {
    list.append(makeText("p", "Бағыт табылмады."));
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "destination-card";

    card.append(makeText("div", item.emoji, "destination-emoji"));

    const detail = document.createElement("div");
    detail.className = "destination-detail";
    detail.append(makeText("h3", item.city));
    detail.append(makeText("p", item.country));

    const selected = favorites.includes(item.city);
    const btn = makeText(
      "button",
      selected ? "❤️ Сақталған" : "🤍 Таңдаулыға"
    );

    btn.addEventListener("click", () => {
      favorites = favorites.includes(item.city)
        ? favorites.filter(city => city !== item.city)
        : [...favorites, item.city];

      if (save("tq_favorites", favorites)) renderDestinations();
    });

    detail.append(btn);
    card.append(detail);
    list.append(card);
  });
}

function renderCalendar() {
  const monthInput = $("calendarMonth");
  const grid = $("calendarGrid");
  const list = $("calendarTrips");

  const now = new Date();
  if (!monthInput.value) {
    monthInput.value =
      now.getFullYear() + "-" +
      String(now.getMonth() + 1).padStart(2, "0");
  }

  const [year, month] = monthInput.value.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const days = new Date(year, month, 0).getDate();
  const offset = (firstDay.getDay() + 6) % 7;

  grid.replaceChildren();
  list.replaceChildren();

  ["Дс","Сс","Ср","Бс","Жм","Сб","Жс"].forEach(day => {
    grid.append(makeText("div", day, "weekday"));
  });

  for (let i = 0; i < offset; i++) {
    grid.append(document.createElement("div"));
  }

  for (let day = 1; day <= days; day++) {
    const date = monthInput.value + "-" + String(day).padStart(2, "0");
    const hasTrip = trips.some(trip => trip.date === date);
    grid.append(makeText("div", day, hasTrip ? "has-trip" : ""));
  }

  const monthly = trips.filter(trip =>
    trip.date.startsWith(monthInput.value)
  );

  if (!monthly.length) {
    list.append(makeText("p", "Бұл айда жоспарланған саяхат жоқ."));
  } else {
    monthly.forEach(trip => {
      const card = document.createElement("div");
      card.className = "trip-item";
      card.append(makeText("h3", "✈️ " + trip.city));
      card.append(makeText("p", "📅 " + trip.date));
      list.append(card);
    });
  }
}

function saveProfile() {
  const name = $("userName").value.trim();

  if (!name) {
    alert("Есіміңді енгіз!");
    return;
  }

  if (save("tq_name", name)) {
    $("profileName").textContent = name;
    alert("Профиль сақталды!");
  }
}

function toggleTheme() {
  const dark = document.body.classList.toggle("dark");
  save("tq_dark", dark);
}

function setAuthMode(mode) {
  authMode = mode;
  $("nameField").classList.toggle("hidden", mode === "login");
  $("authName").required = mode === "register";
  $("authSubmit").textContent = mode === "login" ? "Кіру" : "Тіркелу";
  $("loginTab").classList.toggle("selected", mode === "login");
  $("registerTab").classList.toggle("selected", mode === "register");
  $("authMessage").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const savedName = read("tq_name", "Саяхатшы");
  $("profileName").textContent = savedName;
  $("userName").value = savedName === "Саяхатшы" ? "" : savedName;

  if (read("tq_dark", false)) {
    document.body.classList.add("dark");
  }

  $("tripDate").min = new Date().toLocaleDateString("en-CA");

  $("tripForm").addEventListener("submit", event => {
    event.preventDefault();

    const city = $("tripCity").value;
    const date = $("tripDate").value;
    const note = $("tripNote").value.trim();

    if (!city || !date) return;

    if (date < $("tripDate").min) {
      $("tripMessage").textContent = "Болашақ күнді таңда.";
      return;
    }

    const updated = [...trips, {
      id: Date.now() + Math.random(),
      city, date, note
    }];

    if (save("tq_trips", updated)) {
      trips = updated;
      event.target.reset();
      $("tripMessage").textContent = "✅ Саяхат сақталды!";
      openPage("trips");
    }
  });

  $("search").addEventListener("input", renderDestinations);
  $("calendarMonth").addEventListener("change", renderCalendar);

  $("authForm").addEventListener("submit", event => {
    event.preventDefault();

    if (authMode === "register") {
      const name = $("authName").value.trim();
      if (!name) {
        $("authMessage").textContent = "Есіміңді енгіз.";
        return;
      }
      save("tq_name", name);
      $("profileName").textContent = name;
      $("userName").value = name;
    }

    // Құпиясөз сақталмайды: бұл тек frontend үлгісі.
    $("authMessage").textContent =
      "✅ Демонстрациялық форма тексерілді!";
  });

  renderTrips();
  renderDestinations();
  renderCalendar();
  setAuthMode("login");
});
