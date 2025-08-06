# Quick Start Guide

## Getting Started

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Start development servers:**
   
   **Option A: Start both applications at once**
   ```bash
   yarn install concurrently  # Install concurrently if not already installed
   yarn dev:all
   ```
   
   **Option B: Start individually**
   ```bash
   # Terminal 1 - Next.js (Website1)
   yarn dev:website1
   # Runs on http://localhost:3007
   
   # Terminal 2 - Vite (Website2)
   yarn dev:website2
   # Runs on http://localhost:3005
   ```

## URLs

- **Website1 (Next.js)**: http://localhost:3007
- **Website2 (Vite)**: http://localhost:3005

## What's Included

- Shared components: `Button`, `UserCard`
- Shared utilities: `formatName`, `generateId`, `debounce`, `formatDate`
- TypeScript support across all packages
- ESLint and Prettier configuration

## Shared Component Examples

Both websites use the same components but display them differently to show the flexibility of the monorepo approach.

### Import Pattern

All shared components and utilities are imported using the `@common` path:

```tsx
import { Button, UserCard, formatName, generateId } from '@common';
```
