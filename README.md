# Realestate - منصة عقارية

A modern Arabic real estate platform built with Next.js 16, featuring an interactive map interface, property listings, and user authentication.

## Demo

Live demo: [v0-app-clone-gold.vercel.app](https://v0-app-clone-gold.vercel.app)

## Features

- **Interactive Map Hero** - MapLibre GL JS with CartoDB dark tiles displaying property locations
- **Property Listings** - Browse properties with advanced filtering (type, location, bedrooms, area, price)
- **Property Details** - Detailed property pages with image galleries, specifications, and agent contact forms
- **RTL Support** - Full right-to-left layout for Arabic language
- **Authentication** - Login, signup, and password recovery pages
- **Responsive Design** - Mobile-first design with glassmorphic UI elements

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Maps**: MapLibre GL JS with CartoDB tiles
- **Font**: Noto Sans Arabic
- **React**: React 19.2

## Project Structure

```
app/
├── auth/
│   ├── login/
│   ├── signup/
│   └── forgot-password/
├── realestate/
│   ├── [id]/          # Property details
│   └── page.tsx       # Property listings
├── layout.tsx
└── page.tsx           # Landing page

components/
├── auth/              # Authentication forms
├── ui/                # shadcn/ui components
├── header.tsx         # Navigation bar
├── hero-section.tsx   # Map hero with control panel
├── control-panel.tsx  # Property search filters
├── map-view.tsx       # MapLibre GL map component
├── featured-properties.tsx
├── features-section.tsx
├── how-it-works.tsx
├── property-filters.tsx
├── property-grid.tsx
├── property-details.tsx
├── contact-form.tsx
└── footer.tsx
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with map hero, features, and contact form |
| `/realestate` | Property listings with filters |
| `/realestate/[id]` | Individual property details |
| `/auth/login` | User login |
| `/auth/signup` | User registration |
| `/auth/forgot-password` | Password recovery |

## License

MIT
