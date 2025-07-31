# 🧭 Tourist Trip Recommender

An interactive trip planning tool that visualizes tourist attractions in the Kathmandu Valley with customizable filters such as rating, category, open hours, and limit — built with **React + MapLibre + Tailwind** on the frontend and **FastAPI + PostgreSQL + PostGIS** on the backend.

<img width="470" height="553" alt="image" src="https://github.com/user-attachments/assets/1a9c2827-a64f-4bc8-b738-8e21c3bb34f7" />


---

## 🔧 Tech Stack

| Layer        | Tech                                 |
| ------------ | ------------------------------------ |
| Frontend     | React + TypeScript + Vite + Tailwind |
| Map Renderer | MapLibre                             |
| Backend      | FastAPI + SQLAlchemy                 |
| DB           | PostgreSQL + PostGIS                 |
| Container    | Docker + Docker Compose              |

---

## 🏗️ Architecture Overview

The application follows a modern microservices architecture:

- **User Interface**: React-based frontend with tourist filters, interactive map, and place details
- **API Gateway**: FastAPI backend handling HTTP requests and business logic
- **External Services**: Integration with Overpass API for OpenStreetMap data
- **Database Layer**: PostgreSQL with PostGIS extension for spatial data storage
- **Containerization**: All services run in Docker containers within a shared network

---

## 🚀 Features

- 📍 Filter places by category, rating, and open hours
- 🗺️ Render locations as interactive markers on MapLibre
- ✨ Smooth zoom + focus on marker click with popup and detail panel
- 🔄 Loading state prevents duplicate fetch and handles input edge cases
- 🐳 Fully Dockerized setup

---

## 🗂 Folder Structure

```
Tourist-Trip_Recommender/
│
├── frontend/                   # Vite + React app
│   ├── src/
│   │   ├── api/                # Axios API calls
│   │   ├── components/         # MapView, FilterForm, SidebarInfo
│   │   ├── types/              # Shared types
│   │   └── main.tsx
│   ├── Dockerfile              # Frontend Docker build
│   └── ...
│
├── backend/                    # FastAPI backend
│   ├── routes/                 # API routes
│   ├── models.py               # SQLAlchemy models
│   ├── osm_fetcher.py          # OSM query logic
│   ├── config.py               # ENV config
│   ├── Dockerfile              # Backend Dockerfile
│   └── docker-compose.yml      # Includes backend + DB
│
├── docker-compose.yml          # Main file for both frontend & backend
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔁 Prerequisites

- Docker & Docker Compose
- Git

### 🔄 1. Clone the Repository

```bash
git clone https://github.com/suraj7743/Tourist-Trip_Recommender.git
cd Tourist-Trip_Recommender
```

### 🐳 2. Build and Start All Services

This command:
- Spins up the **PostGIS DB**
- Starts **FastAPI backend** (waiting for DB)
- Builds **React frontend** using Vite
- All inside a single Docker network

```bash
docker compose up --build
```

### 🌐 3. Access the App

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend (API): [http://localhost:8000](http://localhost:8000/docs)

---

## 🧪 Sample API

Example filter API request:

```
GET /places?category=hotel&rating=3&open_24_7=true&limit=20
```

## 📸 Working Screenshots

<img width="1875" height="964" alt="image" src="https://github.com/user-attachments/assets/4a311836-1e47-4a61-b962-6f7841cf188a" />

<img width="1875" height="964" alt="image" src="https://github.com/user-attachments/assets/05dc660f-e8e7-478c-9f47-2e23cddf869f" />

## Working Demo


*Interactive map interface showing filtered tourist attractions in Kathmandu Valley with detailed information panels*

---


---

## 🤝 Contributors

- [Suraj Chapagain](https://github.com/suraj7743)

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
