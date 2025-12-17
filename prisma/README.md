# Prisma

This folder contains Prisma configuration files.

## Setup

```bash
npm install @prisma/client
npm install --save-dev prisma
```

## Initialize Database

```bash
# Create .env.local with DATABASE_URL
echo "DATABASE_URL=postgresql://user:password@localhost:5432/medoc" > .env.local

# Generate Prisma client
npx prisma generate

# Create database schema
npx prisma migrate dev --name init

# (Optional) Seed database
npx prisma db seed
```

## Development

```bash
# Open Prisma Studio (GUI)
npx prisma studio

# Generate client after schema changes
npx prisma generate

# Create migrations
npx prisma migrate dev --name <migration_name>

# Reset database (dev only)
npx prisma migrate reset
```
