# TripForge ✈️

AI-powered travel planner that generates personalized day-by-day itineraries.

🌐 **Live Demo**: https://trip-forge-one.vercel.app

## Features

- 🤖 AI-generated itineraries powered by Groq (LLaMA 3.3)
- 🔐 Authentication with Clerk (Email + Google + Facebook)
- 💾 PostgreSQL database with Prisma ORM
- 📱 Fully responsive design
- ⚡ Built with Next.js 15 + TypeScript

## Tech Stack

| Frontend | Backend | Database | Auth | AI |
|----------|---------|----------|------|----|
| Next.js 15 | Next.js API Routes | PostgreSQL | Clerk | Groq |
| TypeScript | Prisma ORM | Supabase | | LLaMA 3.3 |
| Tailwind CSS | | | | |

## Getting Started

1. Clone the repo
\`\`\`bash
git clone https://github.com/amarbegolli/TripForge.git
cd tripforge
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

## Environment Variables

\`\`\`env
DATABASE_URL=
DIRECT_URL=
GROQ_API_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
\`\`\`

## Author

**Amar Begolli** — [GitHub](https://github.com/amarbegolli)