# Pricer3 — Logistics Dashboard

A single-file, zero-build-step logistics route-pricing dashboard built with
**Tailwind CSS · Shoelace · Alpine.js · Leaflet.js · PyScript (MicroPython)**.

---

## Quick Start

### Option A — Node.js (recommended)

```bash
node server.js
# then open http://localhost:3000
```

Or with npm:

```bash
npm start
# then open http://localhost:3000
```

> **Requirements:** Node.js ≥ 16. No `npm install` needed — the server uses only
> Node's built-in `http` and `fs` modules.

You can also choose a different port:

```bash
PORT=8080 node server.js
```

### Option B — Python

```bash
python3 -m http.server 3000
# then open http://localhost:3000/logistics-dashboard.html
```

---

## Features

| Feature | Details |
|---|---|
| **Zero scroll layout** | 100 vh split-view: slim header + left sidebar + full-height Leaflet map |
| **Route inputs** | Origin / destination `sl-input` fields |
| **Logistics config** | Vehicle type, cargo weight, urgency, hazmat level via `sl-select` |
| **Settings modal** | `sl-dialog` stores your PTV API key securely in `localStorage` |
| **Live results** | Sticky card at the bottom of the sidebar shows distance (km) and estimated price (AUD) |
| **Interactive map** | Leaflet.js with OpenStreetMap tiles; route polyline drawn after calculation |
| **MicroPython logic** | PyScript `<script type="mpy">` calls the PTV xServer2 REST API, geocodes addresses, calculates route and price |
| **Offline fallback** | Haversine JS fallback activates automatically for major Australian cities if the API key is missing or the network is unavailable |

---

## First Use

1. Open the app in your browser.
2. Click the **⚙ gear icon** in the header to open Settings.
3. Paste your **PTV xServer2 API key** and click **Save & Close**.
   *(The key is stored only in your browser's `localStorage`.)*
4. Enter an **Origin** and **Destination** (e.g. *Sydney, NSW* → *Melbourne, VIC*).
5. Choose your vehicle type, cargo weight, urgency, and hazmat classification.
6. Click **Calculate Route** — the map will draw the route and the results card will show the distance and estimated freight price.

---

## Tech Stack

- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- [Shoelace](https://shoelace.style/) v2.12.0 (CDN)
- [Alpine.js](https://alpinejs.dev/) v3.x (CDN)
- [Leaflet.js](https://leafletjs.com/) v1.9.4 (CDN)
- [PyScript](https://pyscript.net/) 2023.11.1 (CDN)