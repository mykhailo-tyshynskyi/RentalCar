# RentalCar

A modern car rental catalog built with Next.js. The app lets users browse available cars, apply filters by brand, price, and mileage, and load more vehicles in a paginated catalog.

## Features

- Responsive landing page and catalog layout
- Car filtering by brand, price range, and mileage
- Infinite scrolling / load more pagination
- React Query-powered data fetching
- Booking request flow for individual cars
- Toast notifications and empty-state handling

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- TanStack Query
- Axios
- CSS Modules

## Project Structure

- `app/` – routes and page components
- `components/` – reusable UI and filters
- `lib/api/` – API clients and request helpers
- `types/` – shared TypeScript interfaces
- `public/` – static assets

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the app in your browser:

   ```text
   http://localhost:3000
   ```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Environment

This project uses the public rental API configured in `.env`:

```env
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.study
```

If needed, update this value for a different backend.

## API Notes

The frontend communicates with the car rental backend through the configured `NEXT_PUBLIC_API_URL` and fetches catalog data, filter metadata, and booking requests from the `/cars` endpoints.

## License

This project is for educational and portfolio use.
