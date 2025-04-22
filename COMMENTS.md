# Backend (BE)

### Dependency Issues

There were problems with dependencies — I had to use the `--legacy-peer-deps` flag to install everything correctly in the backend.

I also manually installed the `reflect-metadata` package because I was getting a `module not found` error when starting the backend.

---

### Define the GpsPosition model in TypeORM (SQLite)

This was already provided and did not require any changes.

---

### Create the service that imports CSVs and saves data to the database via a cron job

The default service already included the basic logic to:

- Get all GPS positions
- Get positions by `sessionId`
- Save a GPS position

What I added:

- A method to automatically import all CSV files from the `gps-data/` folder, triggered by the cron job.
- A `createGpsPosition` method inside `gps-cron.service` to map parsed CSV data into the correct format before saving to the database.
- A custom DTO for that method.

---

### Create the `/api/gps-position` endpoint

The controller and service were already set up and working.

Both endpoints `/api/gps-position` and `/api/gps-position/:sessionId` now work as expected.

---

### Add session metadata for the frontend

I added a new method `getGpsSessionData()` that enriches the data returned for a given session by including:

- `sessionId`: the session identifier
- `startTime`: timestamp of the first recorded position
- `endTime`: timestamp of the last recorded position
- `durationMinutes`: total duration of the session
- `distanceKm`: total distance covered, calculated using the Haversine formula
- `points`: the full list of GPS positions

This data is returned in the `/api/gps-position/session/:sessionId` endpoint and used in the session detail view in the frontend.

---

### Testing
I installed `jest`, `ts-jest`, and the Jest types to begin writing unit tests.

Additionally, I had to update `@nestjs/testing` to version 10 to avoid compatibility issues, since the project is using NestJS v10.

---

# Frontend (FE)

### Project Structure

The frontend is built with **React + TypeScript**, and follows a modular structure:

- `components/`: Reusable UI components like `Map`, `MapGrid`, `Button`, and layout panels
- `screen/`: Top-level views (`Dashboard` for the map grid, `SessionDetail` for the session view)
- `services/`: Data fetching logic for GPS sessions and a custom hook (`use-fetch`)
- `util/`: Utility functions like `convertToGeoJSON` and `groupBySession`
- `styles/`: SCSS modules for global styles and layout-specific styling

---

### Features Implemented

#### Fetch and group GPS data

- Used the `/api/gps-position` endpoint to fetch all GPS positions.
- Grouped the data by `sessionId` using a utility function.
- Stored and rendered session data using typed interfaces.

#### Responsive grid of maps

- Created `MapGrid.tsx` to render all sessions in a responsive grid layout.
- Each grid cell uses the reusable `Map` component powered by `react-map-gl`.

#### Interactive maps with route rendering

- Used Mapbox to display each session route on a map.
- Parsed coordinates into GeoJSON format.
- Added a layered route with a red line.

#### Auto-fit map to session route

- Calculated the bounding box of each route.
- Applied `fitBounds` using `onLoad` to automatically center and zoom the map on the route.

#### Session detail view

- Created a separate `SessionDetail` screen available via `/session/:sessionId`.
- Used the endpoint `/api/gps-position/session/:sessionId` to fetch enriched metadata including:
    - start time
    - end time
    - duration in minutes
    - total distance in kilometers
    - full list of GPS points

- Displayed the session summary data with proper formatting.
- Rendered the route on a zoomed-in map.
- Added a breadcrumb button back to the grid.

#### Reusable components

- Created a `Button` component that accepts `children` and supports styling and click handling.
- Added SCSS-based responsive layout utilities to provide dynamic padding and max-width depending on screen size.
