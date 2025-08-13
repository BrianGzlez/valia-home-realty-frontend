# Valía Home Realty

A modern real estate website built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. Features a complete frontend-only implementation with a decoupled data client architecture ready for backend integration.

## Features

- 🏠 **Property Listings** - Advanced filtering, search, and detailed property views
- 👥 **Agent Profiles** - Professional agent showcases with contact integration
- 📞 **Contact System** - Inquiry forms, booking modals, and WhatsApp integration
- 🔧 **Admin Dashboard** - Complete management interface for properties, agents, and inquiries
- 📊 **Reports & Analytics** - Business performance tracking and report generation
- ⚙️ **Settings Management** - Configurable application settings
- 🎨 **Valía Branding** - Custom color system with accessibility compliance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Data Layer**: Decoupled client architecture (mock/REST)
- **Storage**: localStorage (mock mode)
- **Icons**: Lucide React

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Copy environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

- `NEXT_PUBLIC_WA_PHONE`: WhatsApp phone number for contact integration
- `NEXT_PUBLIC_CALENDLY_URL`: Optional Calendly integration URL
- `NEXT_PUBLIC_DATA_CLIENT_MODE`: Set to 'mock' or 'rest'
- `NEXT_PUBLIC_API_BASE_URL`: API base URL for REST mode

## Data Client Architecture

The application uses a decoupled data client architecture that supports both mock and REST API modes:

### Switching from Mock to REST Mode

1. **Update the data client mode**:
   \`\`\`typescript
   // In your components, change:
   const dataClient = createDataClient('mock')
   // To:
   const dataClient = createDataClient('rest')
   \`\`\`

2. **Set environment variable**:
   \`\`\`env
   NEXT_PUBLIC_DATA_CLIENT_MODE=rest
   NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
   \`\`\`

3. **Implement backend endpoints** (see TODO list below)

### Backend Integration TODO List

The REST adapters are ready with the following endpoints to implement:

#### Properties API
- `GET /api/properties?filters=...` - List properties with filtering
- `GET /api/properties/:slug` - Get single property by slug
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

#### Agents API
- `GET /api/agents` - List all agents
- `GET /api/agents/:slug` - Get single agent by slug
- `POST /api/agents` - Create new agent
- `PUT /api/agents/:id` - Update agent
- `DELETE /api/agents/:id` - Delete agent

#### Inquiries API
- `GET /api/inquiries` - List all inquiries
- `POST /api/inquiries` - Create new inquiry
- `PUT /api/inquiries/:id` - Update inquiry status
- `DELETE /api/inquiries/:id` - Delete inquiry

#### Bookings API
- `GET /api/bookings` - List all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

#### Reports API
- `GET /api/reports?period=...&metric=...` - Generate reports
- `POST /api/reports/export` - Export report data

#### Settings API
- `GET /api/settings` - Get application settings
- `PUT /api/settings` - Update application settings

## Project Structure

\`\`\`
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard pages
│   ├── agents/            # Agent listing and profiles
│   ├── contact/           # Contact page
│   └── properties/        # Property listings and details
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and configurations
│   ├── data-client/      # Data client architecture
│   │   └── adapters/     # Mock and REST adapters
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Utility functions
└── public/               # Static assets
\`\`\`

## Data Types

The application uses TypeScript interfaces for type safety:

- `Property` - Real estate property data
- `Agent` - Real estate agent information
- `Inquiry` - Customer inquiries
- `Booking` - Property viewing appointments
- `PropertyFilters` - Search and filter criteria

## Branding & Design

### Valía Color System

The application uses a custom color system defined in `globals.css`:

- **Primary**: `#C58A3A` (Golden brand color)
- **Surface**: `#FFFFFF` (Cards and modals)
- **Background**: `#F2EFEA` (Warm background)
- **Text**: `#1F1E1C` (Main text)
- **Muted**: `#6B6760` (Secondary text)

### Component Guidelines

- All Select components have proper default values
- Consistent use of Valía color tokens
- Responsive design with mobile-first approach
- Accessibility compliance (WCAG AA)

## Features Overview

### Public Pages
- **Homepage** - Hero section with featured properties
- **Properties** - Searchable property listings with advanced filters
- **Property Details** - Individual property pages with booking
- **Agents** - Agent directory and individual profiles
- **Contact** - Contact forms and company information

### Admin Dashboard
- **Dashboard** - KPI overview and quick actions
- **Property Management** - CRUD operations for properties
- **Agent Management** - Manage real estate agents
- **Inquiry Management** - Track customer inquiries
- **Booking Management** - Manage property viewings
- **Reports** - Business analytics and reporting
- **Settings** - Application configuration

## Deployment

The application is ready for deployment on Vercel or any Next.js-compatible platform:

1. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

2. Deploy to your preferred platform
3. Configure environment variables in your deployment platform
4. Update API endpoints when backend is ready

## Performance

- Lighthouse score target: ≥90 for Performance, Best Practices, and SEO
- Optimized images with Next.js Image component
- Code splitting and lazy loading
- Efficient data fetching with proper caching

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code
3. Ensure all Select components have proper values
4. Test both mock and REST modes when available
5. Maintain accessibility standards

## License

Private project for Valía Home Realty.
