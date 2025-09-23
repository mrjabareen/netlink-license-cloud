# NetLink License Cloud

A modern license management system built with Next.js and Supabase.

## Features

- User authentication and authorization
- License generation and management
- Product catalog
- Real-time dashboard
- Self-hosted Supabase backend

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (Self-hosted)
- **Database**: PostgreSQL (via Supabase)
- **Deployment**: Docker, Docker Compose

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Self-hosted Supabase instance

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mrjabareen/netlink-license-cloud.git
cd netlink-license-cloud
```

2. Configure environment variables:
```bash
cp web/.env.example web/.env.local
```

Edit `web/.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=http://your-supabase-url:8000
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Start the application:
```bash
docker-compose up -d
```

4. Visit `http://localhost:3001` for the web interface

## Database Setup

The application uses the following Supabase tables:
- `users` - User management
- `products` - Product catalog
- `licenses` - License management

## Development

- Web frontend runs on port 3001
- Supabase should be accessible on your configured URL

## Example Usage

Visit `/supabase-example` to see how to interact with the Supabase backend.

## Deployment

The application is designed to work with self-hosted Supabase for maximum control and privacy.
