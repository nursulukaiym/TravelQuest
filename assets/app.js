"use strict";

const destinations = [
    {
        city: "Париж",
        country: "Франция",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800"
    },
    {
        city: "Стамбул",
        country: "Түркия",
        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800"
    },
    {
        city: "Токио",
        country: "Жапония",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800"
    },
    {
        city: "Дубай",
        country: "БАӘ",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800"
    },
    {
        city: "Рим",
        country: "Италия",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800"
    },
    {
        city: "Сеул",
        country: "Оңтүстік Корея",
        image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800"
    },
    {
        city: "Бали",
        country: "Индонезия",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800"
    },
    {
        city: "Алматы",
        country: "Қазақстан",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800"
    }
];

const $ = id => document.getElementById(id);

function readData(key, fallback) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value ?? fallback;
    } catch (error) {
        return fallback;
    }
}

function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        alert("Деректерді сақтау мүмкін болмады.");
        return false;
    }
}

let trips = readData("tq_trips", []);
let favorites = readData("tq_favorites", []);
let authMode = "login";

/* БЕТТЕР АРАСЫНДА АУЫСУ */

function openPage(page) {
    const target = document.getElementById(page);

    if (!target) {
        console.error("Бет табылмады:", page);
        return;
    }

    document.querySelectorAll(".screen").forEach(section => {
        section.classList.toggle(
            "active",
            section.id === page
        );
    });

    document.querySelectorAll(".navigation button").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page === page
        );
    });

    if (page === "trips") {
        renderTrips();
    }

    if (page === "explore") {
        renderDestinations();
    }

    if (page === "calendar") {
        renderCalendar();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* БАҒЫТТЫ ТАҢДАУ */

function planCity(city) {
    $("tripCity").value = city;
    openPage("add");
}

/* HTML ЭЛЕМЕНТІН ҚҰРУ */

function createText(tag, text, className = "") {
    const element = document.createElement(tag);

    element.textContent = text;

    if (className) {
        element.className = className;
    }

    return element;
}

/* БАҒЫТТАРДЫ КӨРСЕТУ */

function renderDestinations() {
    const container = $("destinations");
    const query = $("search").value
        .trim()
        .toLocaleLowerCase();

    container.replaceChildren();

    const filtered = destinations.filter(item => {
        const text = (
            item.city + " " + item.country
        ).toLocaleLowerCase();

        return text.includes(query);
    });

    if (filtered.length === 0) {
        container.append(
            createText("p", "Бағыт табылмады.")
        );
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement("article");
        card.className = "destination-card";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.city;
        image.loading = "lazy";

        const body = document.createElement("div");
        body.className = "destination-body";

        body.append(
            createText("h3", item.city)
        );

        body.append(
            createText("p", "📍 " + item.country)
        );

        const actions = document.createElement("div");
        actions.className = "destination-actions";

        const planButton = createText(
            "button",
            "✈️ Жоспарлау"
        );

        planButton.type = "button";

        planButton.addEventListener("click", () => {
            planCity(item.city);
        });

        const isFavorite = favorites.includes(item.city);

        const favoriteButton = createText(
            "button",
            isFavorite ? "❤️ Сақталған" : "🤍 Таңдаулы",
            "favorite"
        );

        favoriteButton.type = "button";

        favoriteButton.addEventListener("click", () => {
            const updated = favorites.includes(item.city)
                ? favorites.filter(city => city !== item.city)
                : [...favorites, item.city];

            if (saveData("tq_favorites", updated)) {
                favorites = updated;
                renderDestinations();
            }
        });

        actions.append(
            planButton,
            favoriteButton
        );

        body.append(actions);

        card.append(
            image,
            body
        );

        container.append(card);
    });
}

/* МЕНІҢ САЯХАТТАРЫМ */

function renderTrips() {
    const container = $("tripList");

    container.replaceChildren();

    $("tripCount").textContent = trips.length;
    $("favCount").textContent = favorites.length;

    if (trips.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-state";

        empty.append(
            createText("h3", "🌴 Әзірге саяхат жоқ")
        );

        empty.append(
            createText(
                "p",
                "Алғашқы саяхатыңды жоспарла!"
            )
        );

        container.append(empty);
        return;
    }

    trips.forEach(trip => {
        const card = document.createElement("article");
        card.className = "trip-card";

        card.append(
            createText("h3", "✈️ " + trip.city)
        );

        card.append(
            createText("p", "📅 " + trip.date)
        );

        if (trip.note) {
            card.append(
                createText("p", "📝 " + trip.note)
            );
        }

        const deleteButton = createText(
            "button",
            "Өшіру"
        );

        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            const confirmed = confirm(
                "Бұл саяхатты өшіресің бе?"
            );

            if (!confirmed) {
                return;
            }

            const updated = trips.filter(
                item => item.id !== trip.id
            );

            if (saveData("tq_trips", updated)) {
                trips = updated;
                renderTrips();
            }
        });

        card.append(deleteButton);
        container.append(card);
    });
}

/* КҮНТІЗБЕ */

function renderCalendar() {
    const monthInput = $("calendarMonth");
    const grid = $("calendarGrid");
    const list = $("calendarTrips");

    if (!monthInput.value) {
        const now = new Date();

        monthInput.value =
            now.getFullYear() + "-" +
            String(now.getMonth() + 1).padStart(2, "0");
    }

    const [year, month] = monthInput.value
        .split("-")
        .map(Number);

    const firstDay = new Date(
        year,
        month - 1,
        1
    );

    const dayCount = new Date(
        year,
        month,
        0
    ).getDate();

    const offset = (
        firstDay.getDay() + 6
    ) % 7;

    grid.replaceChildren();
    list.replaceChildren();

    const weekdays = [
        "Дс", "Сс", "Ср", "Бс",
        "Жм", "Сб", "Жс"
    ];

    weekdays.forEach(day => {
        grid.append(
            createText("div", day, "weekday")
        );
    });

    for (let i = 0; i < offset; i++) {
        grid.append(
            document.createElement("div")
        );
    }

    for (let day = 1; day <= dayCount; day++) {
        const date =
            monthInput.value + "-" +
            String(day).padStart(2, "0");

        const hasTrip = trips.some(
            trip => trip.date === date
        );

        grid.append(
            createText(
                "div",
                String(day),
                hasTrip ? "has-trip" : ""
            )
        );
    }

    const monthlyTrips = trips.filter(
        trip => trip.date.startsWith(monthInput.value)
    );

    if (monthlyTrips.length === 0) {
        list.append(
            createText(
                "p",
                "Бұл айда саяхат жоспарланбаған."
            )
        );
    } else {
        monthlyTrips.forEach(trip => {
            const card = document.createElement("div");
            card.className = "calendar-trip";

            card.append(
                createText("strong", "✈️ " + trip.city)
            );

            card.append(
                createText("p", "📅 " + trip.date)
            );

            list.append(card);
        });
    }
}

/* ПРОФИЛЬ */

function saveProfile() {
    const name = $("userName").value.trim();

    if (!name) {
        alert("Есіміңді енгіз!");
        return;
    }

    if (saveData("tq_name", name)) {
        $("profileName").textContent = name;
        alert("Профиль сақталды!");
    }
}

/* ТҮНГІ РЕЖИМ */

function toggleTheme() {
    const dark = document.body.classList.toggle("dark");

    saveData("tq_dark", dark);
}

/* КІРУ ЖӘНЕ ТІРКЕЛУ */

function setAuthMode(mode) {
    authMode = mode;

    $("nameField").classList.toggle(
        "hidden",
        mode === "login"
    );

    $("authName").required = mode === "register";

    $("authSubmit").textContent =
        mode === "login" ? "Кіру" : "Тіркелу";

    $("loginTab").classList.toggle(
        "selected",
        mode === "login"
    );

    $("registerTab").classList.toggle(
        "selected",
        mode === "register"
    );

    $("authMessage").textContent = "";
}

/* САЙТ ЖҮКТЕЛГЕН КЕЗДЕ */

document.addEventListener("DOMContentLoaded", () => {

    const savedName = readData(
        "tq_name",
        "Саяхатшы"
    );

    $("profileName").textContent = savedName;

    if (savedName !== "Саяхатшы") {
        $("userName").value = savedName;
    }

    if (readData("tq_dark", false)) {
        document.body.classList.add("dark");
    }

    const today = new Date();

    const localDate =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    $("tripDate").min = localDate;

    /* САЯХАТТЫ САҚТАУ */

    $("tripForm").addEventListener("submit", event => {
        event.preventDefault();

        const city = $("tripCity").value;
        const date = $("tripDate").value;
        const note = $("tripNote").value.trim();

        if (!city || !date) {
            return;
        }

        if (date < localDate) {
            $("tripMessage").textContent =
                "Болашақ күнді таңда.";
            return;
        }

        const updated = [
            ...trips,
            {
                id: Date.now() + Math.random(),
                city: city,
                date: date,
                note: note
            }
        ];

        if (saveData("tq_trips", updated)) {
            trips = updated;

            $("tripForm").reset();

            $("tripMessage").textContent =
                "✅ Саяхат сәтті сақталды!";

            openPage("trips");
        }
    });

    /* ІЗДЕУ */

    $("search").addEventListener(
        "input",
        renderDestinations
    );

    /* АЙДЫ АУЫСТЫРУ */

    $("calendarMonth").addEventListener(
        "change",
        renderCalendar
    );

    /* КІРУ ФОРМАСЫ */

    $("authForm").addEventListener("submit", event => {
        event.preventDefault();

        if (authMode === "register") {
            const name = $("authName").value.trim();

            if (!name) {
                $("authMessage").textContent =
                    "Есіміңді енгіз.";
                return;
            }

            if (saveData("tq_name", name)) {
                $("profileName").textContent = name;
                $("userName").value = name;
            }
        }

        // Бұл frontend үлгісі.
        // Нақты авторизация жасалмайды.
        // Құпиясөз сақталмайды.

        $("authMessage").textContent =
            "✅ Демонстрациялық форма сәтті толтырылды!";
    });

    /* БАСТАПҚЫ ДЕРЕКТЕР */

    renderDestinations();
    renderTrips();
    renderCalendar();
    setAuthMode("login");
    openPage("home");

    console.log("TravelQuest JavaScript іске қосылды!");
});
