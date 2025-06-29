# Contacts List

## Tech Stack

### Frontend
- **Next.js 15.3.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind v4** - Styling with utility classes
- **Shadcn** - Component primitives

### State Management & Data Fetching
- **TanStack Query (React Query)** - Server state management and caching

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - File storage for contact avatars

### Development Tools
- **ESLint** - Code linting
- **Jest** - Testing framework
- **Testing Library** - Component testing utilities
- **Turbopack** - Fast bundler for development

## Prerequisites

- Node.js 18+ 
- npm, yarn or pnpm
- Supabase environment vars or setup project

## Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rsmelo92/contacts-list
   cd contacts-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
  Create a `.env` file in the root directory with the received env vars:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=received_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=received_supabase_anon_key
   ```

  3.1 **Use your environment variables**
   Additionally, you can create your own project in Supabase and use your env vars:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

  3.2 **Set up Supabase**
   - Create a new Supabase project
   - Create a `contacts` table with the following schema:
     ```sql
     CREATE TABLE contacts (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       name TEXT NOT NULL,
       avatar_url TEXT,
       last_contact_date DATE NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );
     ```
   - Create a storage bucket named `contact-images` with public access
   - Enable Row Level Security (RLS) policies as needed

## Running the Project

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
npm run build
npm start
```

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Project Structure

```
contacts-list/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── ContactCard.tsx   # Individual contact display
│   ├── ContactModal.tsx  # Add/edit contact form
│   ├── ContactView.tsx   # Main contacts list view
│   └── ...               # Other components
├── hooks/                # Custom React hooks
│   └── useContacts.ts    # Contact CRUD operations
├── lib/                  # Library configurations
│   └── supabase/         # Supabase client setup
├── utils/                # Utility functions
│   ├── supabase.ts       # Supabase helper functions
│   └── date.ts           # Date formatting utilities
├── types.ts              # TypeScript type definitions
└── jest.config.ts        # Jest configuration
```

## Key Features

- **Contact Management**: Create, read, update, and delete contacts
- **Avatar Upload**: Image upload and storage via Supabase
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Testing**: Jest and Testing Library setup

## Database Schema

### Contacts Table
- `id` (UUID, Primary Key) - Unique identifier
- `name` (TEXT, Required) - Contact name
- `avatar_url` (TEXT) - URL to contact avatar image stored in supabase bucket
- `last_contact_date` (DATE, Required) - Last contact date
- `created_at` (TIMESTAMP) - Record creation time
- `updated_at` (TIMESTAMP) - Record update time

## API Integration

The application uses Supabase's client library for all database operations:
- **Query**: Fetch contacts with automatic caching via React Query
- **Mutations**: Create, update, and delete contacts with optimistic updates
- **File Storage**: Avatar image upload and management

## Deployment
The application is deployed on Vercel
https://contacts-list-pi.vercel.app/

## License

This project is private and proprietary.
