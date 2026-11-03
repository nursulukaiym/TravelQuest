:root {
    --primary: #1675e5;
    --primary-dark: #1058b5;
    --accent: #19c5bd;
    --background: #f5f8fc;
    --surface: #ffffff;
    --text: #20334d;
    --muted: #718198;
    --border: #e4ebf3;
    --shadow: 0 8px 30px rgba(30, 69, 115, .08);
}

* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    font-family: "Segoe UI", Arial, sans-serif;
    background: var(--background);
    color: var(--text);
    min-width: 320px;
}

button, input, textarea, select {
    font: inherit;
}

button {
    cursor: pointer;
}

.container {
    width: min(92%, 1320px);
    margin: 0 auto;
}

.header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 20;
    box-shadow: 0 3px 15px rgba(0,0,0,.03);
}

.header-inner {
    min-height: 82px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
}

.logo {
    color: var(--primary);
    font-size: 27px;
    font-weight: 800;
    text-decoration: none;
    white-space: nowrap;
}

.navigation {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
}

.navigation button {
    border: 0;
    background: transparent;
    color: var(--text);
    padding: 12px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
}

.navigation button:hover,
.navigation button.active {
    color: var(--primary);
    background: rgba(22,117,229,.08);
}

.login-button {
    border: none;
    background: var(--primary);
    color: white;
    border-radius: 12px;
    padding: 13px 25px;
    font-weight: 700;
    white-space: nowrap;
}

main.container {
    min-height: 70vh;
    padding-top: 35px;
    padding-bottom: 75px;
}

.screen {
    display: none;
    animation: fadeIn .3s ease;
}

.screen.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}

h1, h2, h3 {
    line-height: 1.25;
}

h1 {
    font-size: clamp(32px, 4vw, 52px);
}

h2 {
    font-size: 27px;
}

p {
    color: var(--muted);
    line-height: 1.7;
}

.btn {
    border: none;
    border-radius: 12px;
    padding: 15px 23px;
    font-weight: 700;
    transition: .2s;
    display: inline-block;
}

.btn:hover,
.login-button:hover {
    transform: translateY(-2px);
    filter: brightness(.96);
}

.btn-primary {
    background: var(--primary);
    color: white;
}

.btn-white {
    background: white;
    color: var(--primary-dark);
}

.btn-glass {
    color: white;
    background: rgba(255,255,255,.15);
    border: 1px solid rgba(255,255,255,.5);
}

.btn-outline {
    background: transparent;
    color: var(--primary);
    border: 1px solid var(--primary);
}

.full {
    width: 100%;
    margin-top: 15px;
}

.hero {
    min-height: 510px;
    border-radius: 28px;
    background:
        linear-gradient(90deg,rgba(8,43,83,.88),rgba(8,43,83,.12)),
        url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600")
        center/cover;
    display: flex;
    align-items: center;
    padding: 70px;
    overflow: hidden;
}

.hero-content {
    max-width: 670px;
}

.hero h1 {
    color: white;
    font-size: clamp(40px, 5vw, 67px);
    margin: 20px 0;
}

.hero p {
    color: #e4edf9;
    font-size: 19px;
    margin-bottom: 30px;
}

.hero .btn {
    margin: 5px 8px 5px 0;
}

.tag {
    background: rgba(255,255,255,.17);
    border: 1px solid rgba(255,255,255,.35);
    color: white;
    padding: 10px 16px;
    border-radius: 30px;
    font-size: 13px;
    font-weight: 700;
}

.section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
    margin: 65px 0 25px;
}

.section-heading h2 {
    margin: 10px 0;
    font-size: 33px;
}

.section-heading p {
    margin: 0;
}

.section-label {
    color: var(--primary);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
}

.text-button {
    border: 0;
    background: transparent;
    color: var(--primary);
    font-weight: 700;
    padding: 12px;
}

.featured-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    gap: 24px;
}

.featured-card {
    position: relative;
    height: 370px;
    border-radius: 22px;
    overflow: hidden;
    background: #cbddec;
}

.featured-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: .4s;
}

.featured-card:hover img {
    transform: scale(1.06);
}

.featured-card::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(transparent 25%,rgba(0,0,0,.8));
    pointer-events: none;
}

.featured-content {
    position: absolute;
    bottom: 22px;
    left: 25px;
    right: 20px;
    z-index: 1;
    color: white;
}

.featured-content span {
    font-size: 12px;
    font-weight: 800;
}

.featured-content h3 {
    font-size: 31px;
    margin: 7px 0;
}

.featured-content p {
    color: #f1f5fa;
    margin: 5px 0;
}

.featured-content button {
    background: transparent;
    color: white;
    border: 0;
    padding: 12px 0;
    font-weight: 700;
}

.benefits {
    display: grid;
    grid-template-columns: repeat(3, minmax(0,1fr));
    gap: 22px;
    margin-top: 55px;
}

.benefits > div {
    background: var(--surface);
    border-radius: 20px;
    padding: 30px;
    box-shadow: var(--shadow);
}

.benefits span {
    font-size: 38px;
}

.benefits h3 {
    font-size: 20px;
    margin: 18px 0 8px;
}

.page-title {
    text-align: center;
    padding: 35px 10px 45px;
}

.page-title h1 {
    margin: 12px 0;
}

.page-title p {
    font-size: 17px;
}

.search-panel {
    background: var(--surface);
    border-radius: 18px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: var(--shadow);
}

.search-panel input {
    flex: 1;
}

.search-panel span {
    color: var(--muted);
    white-space: nowrap;
}

input, select, textarea {
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);
    color: var(--text);
    padding: 15px 17px;
    outline: none;
}

input:focus, select:focus, textarea:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(22,117,229,.1);
}

label {
    display: block;
    font-weight: 700;
    margin: 18px 0 9px;
}

.destination-grid {
    display: grid;
    grid-template-columns: repeat(4,minmax(0,1fr));
    gap: 23px;
    margin-top: 28px;
}

.destination-card {
    background: var(--surface);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--shadow);
}

.destination-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

.destination-body {
    padding: 20px;
}

.destination-body h3 {
    font-size: 22px;
    margin: 0 0 6px;
}

.destination-body p {
    margin: 0 0 17px;
}

.destination-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.destination-actions button {
    border: none;
    background: var(--primary);
    color: white;
    padding: 10px 12px;
    border-radius: 9px;
    font-size: 12px;
    font-weight: 700;
}

.destination-actions .favorite {
    background: #fff0f3;
    color: #e64a70;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(2,minmax(0,1fr));
    gap: 24px;
    margin-bottom: 35px;
}

.stat-card {
    background: var(--surface);
    padding: 30px;
    border-radius: 20px;
    box-shadow: var(--shadow);
}

.stat-card span {
    display: block;
    color: var(--muted);
}

.stat-card strong {
    display: block;
    font-size: 44px;
    color: var(--primary);
    margin-top: 12px;
}

.list-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    margin-bottom: 20px;
}

.trip-grid {
    display: grid;
    grid-template-columns: repeat(3,minmax(0,1fr));
    gap: 20px;
}

.trip-card {
    background: var(--surface);
    border-radius: 18px;
    padding: 25px;
    box-shadow: var(--shadow);
    border-top: 4px solid var(--accent);
}

.trip-card h3 {
    font-size: 22px;
}

.trip-card button {
    border: none;
    border-radius: 9px;
    background: #ef5b74;
    color: white;
    padding: 10px 15px;
}

.empty-state {
    background: var(--surface);
    border-radius: 18px;
    padding: 40px;
    text-align: center;
    grid-column: 1/-1;
}

.form-layout {
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 30px;
    align-items: start;
}

.form-card, .side-info, .profile-card {
    background: var(--surface);
    padding: 35px;
    border-radius: 22px;
    box-shadow: var(--shadow);
}

.form-card h2 {
    margin-top: 0;
}

.side-info {
    background: linear-gradient(145deg,#1768cf,#20bdbb);
    color: white;
}

.side-info p {
    color: #e9faff;
}

.info-emoji {
    font-size: 75px;
}

.info-line {
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,.25);
}

.calendar-layout {
    display: grid;
    grid-template-columns: 1.2fr .8fr;
    gap: 25px;
    align-items: start;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7,minmax(0,1fr));
    gap: 7px;
    margin-top: 25px;
}

.calendar-grid > div {
    text-align: center;
    padding: 16px 3px;
    border-radius: 10px;
    background: var(--background);
    font-size: 14px;
}

.calendar-grid .weekday {
    font-weight: 800;
    color: var(--muted);
    background: transparent;
}

.calendar-grid .has-trip {
    background: var(--accent);
    color: #073d46;
    font-weight: 800;
}

.calendar-trip {
    padding: 15px;
    border-radius: 12px;
    background: var(--background);
    margin-bottom: 10px;
}

.settings-layout {
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 25px;
    max-width: 1050px;
    margin: auto;
}

.profile-card {
    text-align: center;
}

.profile-icon {
    font-size: 75px;
}

.auth-wrapper {
    display: flex;
    justify-content: center;
    padding: 45px 0;
}

.auth-card {
    width: 100%;
    max-width: 480px;
    background: var(--surface);
    border-radius: 25px;
    padding: 40px;
    box-shadow: var(--shadow);
    text-align: center;
}

.auth-icon {
    font-size: 60px;
}

.auth-card h1 {
    color: var(--primary);
    font-size: 32px;
}

.auth-card form {
    text-align: left;
}

.auth-tabs {
    display: flex;
    gap: 10px;
    margin-top: 25px;
}

.auth-tabs button {
    flex: 1;
    border: 0;
    border-radius: 10px;
    background: var(--background);
    color: var(--text);
    padding: 13px;
    font-weight: 700;
}

.auth-tabs button.selected {
    background: var(--primary);
    color: white;
}

.hidden {
    display: none;
}

.message {
    font-size: 14px;
    color: var(--primary);
}

.footer {
    background: var(--surface);
    border-top: 1px solid var(--border);
    padding: 30px 0;
}

.footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.footer h3 {
    color: var(--primary);
    font-size: 23px;
    margin: 0;
}

.footer p {
    font-size: 13px;
}

body.dark {
    --background: #102036;
    --surface: #1c314b;
    --text: #edf5ff;
    --muted: #b3c4d6;
    --border: #36506b;
}

body.dark .destination-actions .favorite {
    background: #523449;
    color: #ffc0d0;
}

@media (max-width: 1100px) {
    .header-inner {
        flex-wrap: wrap;
        padding: 15px 0;
    }

    .navigation {
        order: 3;
        width: 100%;
        justify-content: center;
    }

    .destination-grid {
        grid-template-columns: repeat(3,minmax(0,1fr));
    }
}

@media (max-width: 850px) {
    .featured-grid, .benefits, .trip-grid {
        grid-template-columns: repeat(2,minmax(0,1fr));
    }

    .destination-grid {
        grid-template-columns: repeat(2,minmax(0,1fr));
    }

    .form-layout, .calendar-layout, .settings-layout {
        grid-template-columns: 1fr;
    }

    .hero {
        padding: 45px;
        min-height: 420px;
    }
}

@media (max-width: 600px) {
    .container {
        width: 94%;
    }

    .header-inner {
        gap: 12px;
    }

    .logo {
        font-size: 22px;
    }

    .navigation {
        justify-content: flex-start;
        flex-wrap: nowrap;
        overflow-x: auto;
        padding-bottom: 5px;
    }

    .navigation button {
        white-space: nowrap;
        font-size: 12px;
        padding: 9px;
    }

    .login-button {
        padding: 10px 14px;
    }

    .hero {
        padding: 38px 23px;
        min-height: 420px;
    }

    .hero h1 {
        font-size: 37px;
    }

    .hero p {
        font-size: 16px;
    }

    .featured-grid, .benefits, .destination-grid,
    .trip-grid, .stats-grid {
        grid-template-columns: 1fr;
    }

    .section-heading, .list-heading,
    .footer-inner, .search-panel {
        flex-direction: column;
        align-items: flex-start;
    }

    .search-panel input {
        width: 100%;
    }

    .form-card, .side-info, .profile-card, .auth-card {
        padding: 22px;
    }

    .calendar-grid {
        gap: 3px;
    }

    .calendar-grid > div {
        padding: 11px 2px;
        font-size: 12px;
    }

    .page-title {
        padding: 20px 0 30px;
    }
}
