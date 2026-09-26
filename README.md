# Velocity Motors

Velocity Motors is a luxury car dealership application built with React and Express. It provides a searchable vehicle inventory, vehicle details, favorites, finance estimates, test-drive bookings, authentication, and an admin portal for managing listings and test drives.

## Features

- Browse, search, filter, and sort luxury vehicle listings
- View detailed vehicle specifications and images
- Save favorite vehicles in the browser
- Estimate monthly finance payments
- Register and log in as a buyer
- Book and manage test drives
- Create, update, and delete vehicle listings from the admin portal
- Responsive UI with light/dark theme support
- REST API with seeded in-memory data

## Tech Stack

- **Frontend:** React 18, Vite, Lucide React
- **Backend:** Node.js, Express, CORS
- **Authentication:** bcryptjs and mock JWT-style tokens
- **Data:** In-memory store initialized from `backend/seed/seedData.js`

## Project Structure

```text
velocity-motors-mern/
├── backend/
│   ├── config/              # In-memory data store setup
│   ├── controllers/         # API request handlers
│   ├── routes/              # Express route definitions
│   ├── seed/                # Initial vehicle data
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/      # React UI components
    │   ├── context/         # Auth, favorites, and theme state
    │   └── utils/           # Client utilities
    ├── package.json
    └── vite.config.js
```

## Prerequisites

- Node.js 18 or later
- npm

## Installation

Clone the repository, then install dependencies in both application directories:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running Locally

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

The API starts on `http://localhost:5000`. If that port is busy, the server automatically tries the next available port.

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open `http://localhost:3000` in a browser. Vite proxies frontend `/api` requests to the backend at `http://localhost:5000`.

## Demo Admin Login

The seeded admin account is:

```text
Email: admin@velocity.com
Password: admin123
```

## API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check API status |
| `GET` | `/api/cars` | List cars with search, filters, and sorting |
| `GET` | `/api/cars/meta` | Get available filter options |
| `GET` | `/api/cars/:id` | Get one vehicle |
| `POST` | `/api/cars` | Create a vehicle listing |
| `PUT` | `/api/cars/:id` | Update a vehicle listing |
| `DELETE` | `/api/cars/:id` | Delete a vehicle listing |
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Log in a user |
| `POST` | `/api/test-drives` | Book a test drive |
| `GET` | `/api/test-drives` | List test drives |
| `PATCH` | `/api/test-drives/:id/status` | Update a test-drive status |

### Vehicle Query Parameters

`GET /api/cars` supports `search`, `make`, `fuelType`, `bodyType`, `category`, `minPrice`, `maxPrice`, `featured`, and `sort`.

Supported sort values include `price-asc`, `price-desc`, `year-desc`, and `hp-desc`.

## Available Scripts

### Frontend

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
```

### Backend

```bash
npm start         # Start the Express server
npm run dev       # Start the Express server in development mode
```

## Data Persistence

The current backend uses an in-memory data store for local demos. Changes to users, vehicles, and test drives are lost whenever the backend restarts. The project does not currently require a MongoDB instance or a `.env` file.
