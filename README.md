# TRIVO-TRAVEL — AI TRAVEL COMPANION & FULL-STACK PLATFORM

> **Explore More. Travel Smarter.**  
> Complete full-stack intelligent travel platform engineered for seamless destination discovery, multi-day itinerary planning, live interactive mapping, group budget management, and verified safety alerts across India.

---

## 1. PRODUCT IDENTITY & OVERVIEW

**Trivo-Travel** is an intelligent travel web application built to solve real-world travel challenges:
- **Unreliable & Hallucinated Travel Information:** Solved via 46+ authentic curated destinations across India with real coordinates, entry fees, suggested durations, and official state tourism links.
- **Complex Multi-Day Planning:** Solved with an interactive multi-step planning wizard that constructs balanced morning, afternoon, and evening schedules with designated meal breaks.
- **Group Budget Friction:** Solved with a decimal-safe budget calculator and an automated "Who Owes Whom" debt settlement engine.
- **Travel Emergencies & Road Disruptions:** Solved by mapping nearby hospitals, police stations, and fuel depots with one-click calling, alongside official weather and disaster management alerts.
- **Spatial Confusion:** Solved with interactive Leaflet maps with custom SVG markers, layer controls, and connecting route vectors.

---

## 2. MANDATORY STANDARD: ZERO EMPTY OR DEAD BUTTONS

Every visible interactive element in **Trivo-Travel** performs its advertised action:
- Navigation links and mobile hamburger menus route seamlessly.
- Search filters update results instantly with clear buttons.
- Destination cards feature working wishlist hearts, direct detail links, and map focus buttons.
- Itinerary activities support inline editing, deletion, and vertical reordering.
- Itinerary actions allow one-click regeneration, duplication, printing, copying text summaries, and structured JSON downloads.
- Emergency services modal provides direct telephone dialer links.
- See [`docs/INTERACTION_INVENTORY.md`](docs/INTERACTION_INVENTORY.md) for the verified interaction inventory.

---

## 3. DESIGN SYSTEM & COLOR PALETTE

Designed with a premium light-theme aesthetic inspired by modern travel technology startups:

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Canvas Background** | `#FAFAF7` | Warm, readable background |
| **Primary Forest Green**| `#1E6B50` | Primary brand color, CTA buttons, active accents |
| **Card Surface** | `#FFFFFF` | Elevated content cards and modals |
| **Soft Green Surface** | `#EAF3ED` | Active states, pills, alert highlights |
| **Sand-Gold Accent** | `#E6B96A` | Rating accents, attraction markers, badges |
| **Dark Primary Text** | `#202822` | High contrast headings and body text |
| **Muted Secondary Text**| `#737B75` | Captions, subtitles, secondary metadata |
| **Border Line** | `#E7EAE5` | Clean dividers and card outlines |

**Typography:** Plus Jakarta Sans & Inter for clean, legible interfaces.

---

## 4. ARCHITECTURE & TECHNOLOGY STACK

```
trivo-travel/
├── client/                      # React 18 + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── components/          # Reusable UI, Map, Planner, Budget, Alerts, AI
│   │   ├── context/             # AuthContext, TripContext, ToastContext
│   │   ├── data/                # 46+ Curated Destinations, IMD/KSDMA Alerts
│   │   ├── pages/               # Home, Explore, Details, Planner, Itinerary, etc.
│   │   ├── services/            # Weather (Open-Meteo), Storage, Auth, AI
│   │   └── types/               # Strict TypeScript domain interfaces
├── server/                      # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── controllers/         # Destinations, Alerts, Trips, AI controllers
│   │   ├── routes/              # RESTful API endpoints (/api/...)
│   │   ├── services/            # OpenAI SDK & Deterministic Knowledge Engine
│   │   └── validators/          # Strict Zod request schemas
├── database/                    # Database Architecture
│   ├── migrations/              # Supabase PostgreSQL schema with RLS policies
│   └── seed/                    # Repeatable idempotent seed data
└── docs/                        # Presentation & Interaction Verification
```

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, React Router v6, Lucide React, Leaflet, React Leaflet.
- **Backend:** Node.js, Express, TypeScript, Zod Schema Validation, CORS, Dotenv, OpenAI SDK.
- **Geospatial & Mapping:** Leaflet with OpenStreetMap tiles and custom SVG DivIcons.
- **Weather Service:** Open-Meteo API (free, live, no API key blocker).
- **AI Architecture:** OpenAI API (`gpt-4o-mini`) on server with an intelligent, deterministic offline knowledge fallback engine.
- **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS) policies, complemented by client-side session persistence.

---

## 5. LOCAL SETUP & INSTALLATION GUIDE

### Prerequisites
- Node.js (v18.0.0 or higher, tested on Node v24.18.0)
- npm (v9.0.0 or higher)

### 1. Clone & Install Dependencies
From the repository root:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Configuration

#### Backend Configuration (`server/.env`):
Create `server/.env` from `server/.env.example`:
```env
PORT=5000
NODE_ENV=development
OPENAI_MODEL=gpt-4o-mini

# Optional: Add your OpenAI API key for live GPT responses
# If omitted, Trivo AI runs its built-in deterministic knowledge engine!
OPENAI_API_KEY=your_openai_api_key_here
```

#### Frontend Configuration (`client/.env`):
Create `client/.env` from `client/.env.example`:
```env
# Optional: Supabase configuration (omit to run with built-in instant local session & demo authentication)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Run the Application Locally

#### Terminal 1 — Start the Backend Server:
```bash
cd server
npm run dev
# Server starts on http://localhost:5000
# Health check available at http://localhost:5000/api/health
```

#### Terminal 2 — Start the Frontend Client:
```bash
cd client
npm run dev
# Client starts on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

---

## 6. PRODUCTION BUILD COMMANDS

To verify that the application compiles with zero TypeScript or bundling errors:

```bash
# Compile backend TypeScript to /dist
cd server
npm run build

# Compile frontend React to /dist
cd ../client
npm run build
```

Both builds compile cleanly with exit code 0.

---

## 7. DEPLOYMENT INSTRUCTIONS

### Deploying Frontend to Vercel
1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and select the repository.
3. Set **Root Directory** to `client`.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Environment Variables:
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (if using Supabase).
8. Click **Deploy**.

### Deploying Backend to Render
1. In Render, select **New Web Service** and link the repository.
2. Set **Root Directory** to `server`.
3. Environment: **Node**.
4. Build Command: `npm install && npm run build`.
5. Start Command: `npm start` (or `node dist/index.js`).
6. Environment Variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `OPENAI_API_KEY`: *(your optional OpenAI API key)*
   - `OPENAI_MODEL`: `gpt-4o-mini`
7. Click **Create Web Service**.

---

## 8. SUPABASE POSTGRESQL & DATABASE MIGRATIONS

To set up a cloud database in Supabase:
1. Log in to [supabase.com](https://supabase.com) and create a new project.
2. Open the **SQL Editor** tab in the Supabase Dashboard.
3. Copy and run the contents of [`database/migrations/001_initial_schema.sql`](database/migrations/001_initial_schema.sql) to create tables (`profiles`, `destinations`, `attractions`, `trips`, `itinerary_items`, `expenses`, `saved_destinations`, `travel_alerts`) and configure Row Level Security (RLS).
4. Run the contents of [`database/seed/seed_data.sql`](database/seed/seed_data.sql) to seed initial destinations and alerts.
5. In project settings, copy your **Project URL** and **Anon Key** into `client/.env`.

---

## 9. COLLEGE PROJECT EXPO DEMONSTRATION GUIDE

For the 3-member presentation, follow this 5-minute showcase protocol:
1. **0:00 - 0:45 (Home Page):** Present brand identity, the 46+ verified destination counter, and the zero-dead-button standard.
2. **0:45 - 1:45 (Destination Explorer):** Search for "Munnar", toggle category chips and budget sliders, switch to **Interactive Map View**, and open Munnar Details to show live weather and the Emergency Services directory.
3. **1:45 - 2:45 (Trip Planner):** Step through the 4-step wizard (3 days, 2 travelers, ₹16,000 budget), generate the itinerary, and show the day-by-day morning, afternoon, evening cards and connecting map route.
4. **2:45 - 3:30 (Itinerary Editing & Export):** Reorder an activity, edit details, check off packing items, copy the formatted text summary, and download the structured JSON export.
5. **3:30 - 4:15 (Budget Calculator):** Log an expense, demonstrate the decimal-safe calculator, and explain the automated group debt settlement resolver (*"Arjun pays Priya ₹1,800"*).
6. **4:15 - 5:00 (Trivo AI & Safety):** Open Trivo AI, ask a travel question, demonstrate context awareness, review the official travel alerts citing IMD/KSDMA, and conclude.

*Full pitch script and defense guide available in [`docs/COLLEGE_EXPO_PITCH.md`](docs/COLLEGE_EXPO_PITCH.md).*

---

## 10. LICENSE & CREDITS
- Developed by the **Trivo-Travel Three-Member Project Team**.
- Mapping data courtesy of OpenStreetMap contributors under the ODbL license.
- Meteorological data provided by Open-Meteo API.
- Built for Academic & Technology Expo Showcase.
#   T r i v o - T r a v e l -  
 # Trivo-Travel-
