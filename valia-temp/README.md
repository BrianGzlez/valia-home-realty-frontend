# Valía Home Realty

A modern real estate website built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. Features a complete frontend-only implementation with a decoupled data client architecture ready for backend integration.

## Features

- 🏠 **Property Listings** - Advanced filtering, search, and detailed property views
- 🖼️ **Enhanced Property Details** - Image carousel, amenities with icons, agent observations
- ❤️ **Favorites System** - Save and manage favorite properties with persistent storage
- 🔄 **Property Comparison** - Compare up to 3 properties side by side
- 💰 **Mortgage Calculator** - Integrated financial calculator with real-time calculations
- 👥 **Agent Profiles** - Professional agent showcases with contact integration
- 📞 **Contact System** - Inquiry forms, booking modals, and WhatsApp integration
- 🔧 **Admin Dashboard** - Complete management interface with advanced analytics
- 📊 **Advanced Analytics** - Real-time metrics, charts, and business intelligence
- 📈 **Reports & Analytics** - Business performance tracking and report generation
- ⚙️ **Settings Management** - Configurable application settings
- 🎨 **Valía Branding** - Custom color system with accessibility compliance

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Charts**: Recharts for analytics visualization
- **Data Layer**: Decoupled client architecture (mock/REST)
- **Storage**: localStorage (mock mode)
- **Icons**: Lucide React

## 🚀 Advanced Features - Latest Updates

### ❤️ Favorites/Wishlist System
Complete favorites management system with persistent storage:

#### Features:
- **Add/Remove Favorites**: Heart icon on property cards and detail pages
- **Favorites Page**: Dedicated page to view all saved properties
- **Persistent Storage**: Favorites saved in localStorage
- **Context Provider**: Global state management for favorites
- **Real-time Updates**: Instant UI updates when adding/removing favorites

#### Implementation:
\`\`\`typescript
// Wrap your app with FavoritesProvider
<FavoritesProvider>
  <YourApp />
</FavoritesProvider>

// Use in components
const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()
\`\`\`

### 🔄 Property Comparison Tool
Advanced property comparison system:

#### Features:
- **Compare Up to 3 Properties**: Side-by-side comparison
- **Detailed Comparison**: Price, specs, amenities, and features
- **Visual Indicators**: Clear differences highlighting
- **Responsive Design**: Works on all device sizes
- **Easy Management**: Add/remove properties from comparison

#### Usage:
- Click "Compare" button on property cards
- Access comparison via floating comparison bar
- View detailed comparison on dedicated page

### 💰 Integrated Mortgage Calculator
Professional mortgage calculation tool:

#### Features:
- **Real-time Calculations**: Instant monthly payment updates
- **Comprehensive Inputs**: Price, down payment, interest rate, term
- **Detailed Breakdown**: Principal, interest, taxes, insurance
- **Multiple Scenarios**: Compare different loan options
- **Professional Styling**: Matches site branding

#### Calculations Include:
- Monthly mortgage payment
- Total interest paid
- Total cost of loan
- Payment breakdown charts

### 📊 Advanced Analytics Dashboard
Professional business intelligence for admin:

#### Features:
- **Real-time KPIs**: Properties, agents, inquiries, bookings metrics
- **Interactive Charts**: Revenue trends, property type distribution
- **Performance Metrics**: Conversion rates, lead quality scores
- **Time-based Analysis**: Monthly, quarterly, yearly comparisons
- **Export Capabilities**: PDF and Excel report generation

#### Chart Types:
- Line charts for trends
- Bar charts for comparisons
- Pie charts for distributions
- Area charts for cumulative data

### 🎯 Enhanced User Experience
- **Smooth Animations**: Framer Motion integration
- **Loading States**: Professional loading indicators
- **Error Handling**: Graceful error states
- **Responsive Design**: Perfect on all devices
- **Accessibility**: WCAG AA compliant

## Implementation Guide

### 1. Favorites System Setup

Add the FavoritesProvider to your app:

\`\`\`typescript
// app/layout.tsx
import { FavoritesProvider } from '../components/favorites/favorites-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </body>
    </html>
  )
}
\`\`\`

### 2. Property Comparison Setup

Add the ComparisonProvider:

\`\`\`typescript
// app/layout.tsx
import { ComparisonProvider } from '../components/property-comparison/comparison-provider'

export default function RootLayout({ children }) {
  return (
    <FavoritesProvider>
      <ComparisonProvider>
        {children}
      </ComparisonProvider>
    </FavoritesProvider>
  )
}
\`\`\`

### 3. Required Dependencies

Install additional packages for advanced features:

\`\`\`bash
npm install recharts framer-motion
\`\`\`

### 4. New Pages Added

- `/favorites` - User favorites page
- `/comparison` - Property comparison page
- Enhanced admin analytics in `/admin`

### 5. Data Structure Updates

Properties now support additional fields:

\`\`\`typescript
interface Property {
  // ... existing fields
  media: Array<{
    url: string;
    alt: string;
    type: 'image' | 'video';
  }>;
  amenities: string[];
  agentObservations?: string;
  yearBuilt?: number;
  lotSize?: number;
  propertyTax?: number;
  hoaFees?: number;
  // ... other fields
}
\`\`\`

### 6. Analytics Data Structure

\`\`\`typescript
interface AnalyticsData {
  totalProperties: number;
  totalAgents: number;
  totalInquiries: number;
  totalBookings: number;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    properties: number;
  }>;
  propertyTypeDistribution: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  // ... more metrics
}
\`\`\`

## Recent Updates - Enhanced Property Detail Pages

### New Features Added

#### 🖼️ Image Carousel/Gallery
- Interactive image slider with navigation arrows
- Thumbnail navigation below main image
- Responsive design for mobile and desktop
- Smooth transitions and hover effects

#### 🏠 Enhanced Property Information
- Comprehensive property details layout
- Price formatting with currency
- Location with map integration ready
- Property specifications (bedrooms, bathrooms, area)

#### ✨ Amenities with Icons
- Visual amenities display with relevant icons
- Organized in a responsive grid layout
- Icons from Lucide React library
- Easy to extend with new amenities

#### 📝 Agent Observations Section
- Dedicated section for agent comments
- Professional styling with agent information
- Contact integration with agent profile

#### 📞 Enhanced Contact Buttons
- Prominent call-to-action buttons
- WhatsApp integration with pre-filled messages
- Email and phone contact options
- Responsive button layout

### Implementation in Your Local Code

To add these enhancements to your local project, you need to update the following files:

#### 1. Update App Layout
Add the new providers to `app/layout.tsx`:

\`\`\`typescript
import { FavoritesProvider } from '../components/favorites/favorites-provider'
import { ComparisonProvider } from '../components/property-comparison/comparison-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <FavoritesProvider>
          <ComparisonProvider>
            {children}
          </ComparisonProvider>
        </FavoritesProvider>
      </body>
    </html>
  )
}
\`\`\`

#### 2. Install Additional Dependencies
\`\`\`bash
npm install recharts framer-motion
\`\`\`

#### 3. Required Icons
Make sure you have these Lucide React icons imported:
\`\`\`typescript
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square, Phone, MessageCircle, Mail, Wifi, Car, Waves, Dumbbell, Shield, Zap, TreePine, Users, Utensils, Wind, Heart, BarChart3, TrendingUp, Calculator, ContrastIcon as Compare } from 'lucide-react'
\`\`\`

#### 4. New Components Structure
\`\`\`
components/
├── favorites/
│   ├── favorites-provider.tsx
│   └── favorites-button.tsx
├── property-comparison/
│   ├── comparison-provider.tsx
│   ├── comparison-bar.tsx
│   └── comparison-table.tsx
├── mortgage-calculator/
│   └── index.tsx
└── admin/
    └── analytics-dashboard/
        └── index.tsx
\`\`\`

### Testing the New Features

1. **Favorites System**:
   - Click heart icons on property cards
   - Visit `/favorites` to see saved properties
   - Test persistence by refreshing the page

2. **Property Comparison**:
   - Click "Compare" on multiple properties
   - Use the floating comparison bar
   - Visit comparison page for detailed view

3. **Mortgage Calculator**:
   - Access from property detail pages
   - Test different loan scenarios
   - Verify calculations are accurate

4. **Analytics Dashboard**:
   - Visit `/admin` to see enhanced dashboard
   - Test chart interactions
   - Verify real-time data updates

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   npm install recharts framer-motion
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

#### Analytics API (New)
- `GET /api/analytics/kpis` - Get key performance indicators
- `GET /api/analytics/revenue?period=...` - Get revenue data
- `GET /api/analytics/properties/distribution` - Get property type distribution
- `GET /api/analytics/leads/conversion` - Get lead conversion rates

## Project Structure

\`\`\`
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard pages
│   ├── agents/            # Agent listing and profiles
│   ├── contact/           # Contact page
│   ├── favorites/         # User favorites page
│   ├── comparison/        # Property comparison page
│   └── properties/        # Property listings and details
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── favorites/        # Favorites system components
│   ├── property-comparison/ # Comparison system components
│   ├── mortgage-calculator/ # Financial calculator
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
- `AnalyticsData` - Business intelligence metrics
- `MortgageCalculation` - Financial calculation results

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
- **Property Details** - Individual property pages with booking and calculator
- **Favorites** - User's saved properties with management tools
- **Comparison** - Side-by-side property comparison tool
- **Agents** - Agent directory and individual profiles
- **Contact** - Contact forms and company information

### Admin Dashboard
- **Dashboard** - Advanced KPI overview with interactive charts
- **Analytics** - Real-time business intelligence and metrics
- **Property Management** - CRUD operations for properties
- **Agent Management** - Manage real estate agents
- **Inquiry Management** - Track customer inquiries with lead scoring
- **Booking Management** - Manage property viewings with calendar
- **Reports** - Advanced business analytics and reporting
- **Settings** - Application configuration and preferences

## Performance & Optimization

- Lighthouse score target: ≥90 for Performance, Best Practices, and SEO
- Optimized images with Next.js Image component
- Code splitting and lazy loading
- Efficient data fetching with proper caching
- Chart rendering optimization with Recharts
- Context providers optimized for minimal re-renders

## Deployment

The application is ready for deployment on Vercel or any Next.js-compatible platform:

1. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

2. Deploy to your preferred platform
3. Configure environment variables in your deployment platform
4. Update API endpoints when backend is ready

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code
3. Ensure all Select components have proper values
4. Test both mock and REST modes when available
5. Maintain accessibility standards
6. Test new features across all device sizes

## License

Private project for Valía Home Realty.
