# One Price (Buy Import Now)

A self-fulfilling import shipment tracking platform for first-time importers, small resellers, D2C brands, and personal imports.

![One Price Dashboard](https://via.placeholder.com/800x400?text=One+Price+Dashboard)

## Features

- 🔐 **Authentication** - Email/password authentication with Supabase
- 📦 **Order Tracking** - Create and track import shipments with real-time status updates
- 🏢 **Warehouse Management** - Access warehouse addresses across different countries
- 👤 **Admin Panel** - Manage warehouses, orders, and users
- 📱 **Responsive Design** - Mobile-first, fully responsive UI
- ⚡ **Realtime Updates** - Live status updates via Supabase Realtime
- 🎨 **Modern UI** - Clean, minimalist design with purple accents

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Realtime**: Supabase Realtime
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works)

### 1. Clone and Install Dependencies

```bash
cd oneprice
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and keys
3. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

4. Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Set Up Database

1. Go to your Supabase Dashboard > SQL Editor
2. Copy and run the entire contents of `supabase-schema.sql`
3. This will create:
   - `profiles` table (user profiles with roles)
   - `warehouses` table (warehouse locations)
   - `orders` table (shipment orders)
   - Row Level Security policies
   - Auto-admin promotion for first user
   - Realtime subscription on orders table

### 4. Enable Realtime

1. Go to Database > Replication in your Supabase Dashboard
2. Enable Realtime for the `orders` table

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. First User Setup

The first user to sign up will automatically be promoted to admin. This user can:
- Manage warehouses (add, edit, delete)
- Update order statuses for all users
- View all registered users

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/           # Protected dashboard routes
│   │   ├── admin/             # Admin panel
│   │   ├── addresses/         # Warehouse addresses
│   │   ├── dashboard/         # Main dashboard
│   │   ├── disclaimer/        # Legal page
│   │   ├── orders/            # Order management
│   │   ├── privacy-policy/    # Legal page
│   │   ├── security/          # Security settings
│   │   ├── settings/          # User settings
│   │   ├── terms-of-service/  # Legal page
│   │   └── track-package/     # Package tracking
│   ├── auth/                  # Auth callback routes
│   ├── login/                 # Login page
│   ├── signup/                # Signup page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Root redirect
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── header.tsx             # App header
│   ├── logo.tsx               # Brand logo
│   ├── order-form.tsx         # Order creation form
│   ├── sidebar.tsx            # Navigation sidebar
│   └── status-card.tsx        # Status display components
├── lib/
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-orders.ts      # Orders with realtime
│   │   ├── use-user.ts        # User and profile
│   │   └── use-warehouses.ts  # Warehouses
│   ├── supabase/
│   │   ├── client.ts          # Browser client
│   │   └── server.ts          # Server client
│   └── utils.ts               # Utility functions
├── types/
│   └── database.ts            # TypeScript types
└── middleware.ts              # Auth middleware
```

## Database Schema

### profiles
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | User ID (from auth.users) |
| email | text | User email |
| full_name | text | Display name |
| phone | text | Phone number |
| role | text | 'user' or 'admin' |
| created_at | timestamp | Created timestamp |
| updated_at | timestamp | Last updated |

### warehouses
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| country | text | Country name |
| state | text | State/Province |
| address | text | Full address |
| notes | text | Additional info |
| created_at | timestamp | Created timestamp |

### orders
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Owner (auth.users) |
| tracking_number | text | Tracking number |
| warehouse_id | uuid | Warehouse reference |
| box_content | text | Contents description |
| num_boxes | int | Number of boxes |
| shipment_value | numeric | Declared value (USD) |
| status | text | Order status |
| created_at | timestamp | Created timestamp |
| updated_at | timestamp | Last updated |

### Order Statuses
- **Waiting** (Red) - Order created, awaiting shipment
- **In-Transit** (Yellow) - Package in transit to warehouse
- **In-Warehouse** (Blue) - Package received at warehouse
- **Delivered** (Green) - Package delivered to customer

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

The app is optimized for Vercel's free tier.

## Configuration

### WhatsApp Contact
Update the WhatsApp link throughout the app by searching for `wa.me/1234567890` and replacing with your actual number.

### Branding
The logo and brand name can be customized in `src/components/logo.tsx`.

### Theme Colors
Modify the purple accent colors in `src/app/globals.css` by adjusting the CSS variables.

## Row Level Security

The database uses Row Level Security (RLS) to ensure:
- Users can only see/edit their own orders
- Admins can see/edit all orders and warehouses
- All authenticated users can view warehouses

## License

MIT License - feel free to use this for your own projects!

## Support

For questions or support, contact via WhatsApp: [wa.me/1234567890](https://wa.me/1234567890)

---

Built with ❤️ by One Price Team
