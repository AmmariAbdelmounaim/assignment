# Assignment - AI Chat Application

A Next.js application with AI-powered chat functionality, PostgreSQL database, and PII detection features.

## Tech Stack

- **Framework**: Next.js 16
- **Runtime**: Bun
- **Database**: PostgreSQL 16 (via Docker)
- **ORM**: Drizzle ORM
- **AI**: OpenAI SDK
- **Styling**: Tailwind CSS 4

## Prerequisites

Before running this project, make sure you have the following installed:

- [Bun](https://bun.sh/) (v1.0 or later)
- [Docker](https://www.docker.com/) and Docker Compose
- An OpenAI API key

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd assignment
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then update the `.env` file with your credentials:

```env
DATABASE_URL=postgresql://assignment_user:assignment_password@localhost:5432/assignment_db
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Start the database

Start the PostgreSQL database using Docker Compose:

```bash
docker compose up -d
```

This will start a PostgreSQL 16 container with the following default credentials:

- **Database**: `assignment_db`
- **User**: `assignment_user`
- **Password**: `assignment_password`
- **Port**: `5432`

### 5. Run database migrations

Generate and apply the database migrations:

```bash
bun run db:migrate
```

### 6. Start the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

| Command               | Description                                |
| --------------------- | ------------------------------------------ |
| `bun dev`             | Start the development server               |
| `bun build`           | Build the application for production       |
| `bun start`           | Start the production server                |
| `bun lint`            | Run ESLint                                 |
| `bun run db:generate` | Generate new database migrations           |
| `bun run db:migrate`  | Apply database migrations                  |
| `bun run db:studio`   | Open Drizzle Studio to browse the database |

## Database Management

### View database with Drizzle Studio

```bash
bun run db:studio
```

This opens a web interface to browse and manage your database.

### Generate new migrations

After modifying the schema in `db/schema.ts`:

```bash
bun run db:generate
```

### Stop the database

```bash
docker compose down
```

To also remove the data volume:

```bash
docker compose down -v
```

## Project Structure

```
├── app/                  # Next.js App Router pages and API routes
│   ├── [id]/            # Dynamic chat page
│   ├── api/chat/        # Chat API endpoint
│   ├── actions.ts       # Server actions
│   └── ...
├── components/          # React components
│   ├── ui/              # UI components (buttons, inputs, etc.)
│   ├── chat.tsx         # Chat component
│   ├── pii-blur.tsx     # PII detection/blur component
│   └── sidebar.tsx      # Sidebar navigation
├── db/                  # Database configuration
│   ├── migrations/      # SQL migrations
│   ├── schema.ts        # Drizzle schema definitions
│   ├── queries.ts       # Database queries
│   └── mutations.ts     # Database mutations
├── lib/                 # Utility functions
│   ├── pii.ts           # PII detection utilities
│   └── utils.ts         # General utilities
└── ...
```

## Troubleshooting

### Database connection issues

1. Ensure Docker is running
2. Check if the PostgreSQL container is up: `docker compose ps`
3. Verify the `DATABASE_URL` in your `.env` file matches the Docker Compose configuration

### Port conflicts

If port 5432 is already in use, you can change it in `docker-compose.yml`:

```yaml
ports:
  - "5433:5432" # Change 5432 to another port
```

Then update your `DATABASE_URL` accordingly.

## License

This project is private.
