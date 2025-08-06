# Monorepo Project

A Yarn workspaces monorepo containing two web applications and a shared common package with styled-components.

## Project Structure

```
monorepo-test/
├── packages/
│   ├── common/              # Shared components and utilities (source-only)
│   │   ├── src/
│   │   │   ├── components/  # Shared React components using styled-components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── UserCard.tsx
│   │   │   │   └── Layout.tsx
│   │   │   ├── utils.ts     # Shared utility functions
│   │   │   └── index.ts     # Main exports
│   │   └── package.json
│   ├── website1/            # Next.js application with App Router
│   │   ├── src/
│   │   │   └── app/         # Next.js App Router directory
│   │   │       ├── layout.tsx
│   │   │       └── page.tsx
│   │   ├── next.config.js
│   │   └── package.json
│   └── website2/            # Vite application
│       ├── src/
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── vite.config.ts
│       └── package.json
├── package.json             # Root package with workspace configuration
├── tsconfig.json           # Root TypeScript configuration
├── .eslintrc.js            # ESLint configuration
├── .prettierrc             # Prettier configuration
└── yarn.lock
```

## Features

- **Yarn Workspaces**: Efficient dependency management and shared packages
- **TypeScript**: Full TypeScript support across all packages
- **ESLint & Prettier**: Consistent code formatting and linting
- **Styled Components**: Shared styling using styled-components for consistent design
- **Path Mapping**: Clean imports using `@common/*` alias
- **Shared Components**: Reusable React components across applications
- **Utility Functions**: Common helper functions for all applications
- **Next.js App Router**: Modern Next.js with App Router in `src/app` directory structure

## Packages

### Common Package
The `common` package contains shared React components and utility functions that are used by both web applications. This is a source-only package (no build step required).

**Shared Components:**
- `Button`: Customizable button with variants (primary, secondary, danger) and sizes (small, medium, large)
- `UserCard`: User profile card component with avatar, name, email, and role
- `Container`: Flexible container component with responsive design options
- `PageWrapper`: Full-height page wrapper with gradient background
- `Heading1, Heading2, Heading3`: Typography components
- `Text`: Paragraph text component
- `Grid`: CSS Grid layout component
- `Flex`: Flexbox layout component

**Utility Functions:**
- `formatName`: Capitalizes first and last name
- `generateId`: Generates random alphanumeric IDs
- `debounce`: Debounces function calls
- `formatDate`: Formats dates in readable format

### Website1 (Next.js)
A Next.js application using the App Router with `src/app` directory structure, demonstrating the usage of shared components and utilities.

**Port**: 5000
**Architecture**: Next.js App Router with `src/app` directory

### Website2 (Vite)
A Vite React application showcasing the same shared components with a different framework.

**Port**: 5001

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start all applications in development mode:
   ```bash
   yarn dev
   ```

   This will start:
   - Website1 (Next.js) on http://localhost:5000
   - Website2 (Vite) on http://localhost:5001

### Individual Commands

Start specific applications:
```bash
# Start only Website1
yarn workspace website1 dev

# Start only Website2  
yarn workspace website2 dev
```

Build applications:
```bash
# Build Website1
yarn workspace website1 build

# Build Website2
yarn workspace website2 build
```

Run linting:
```bash
# Lint all packages
yarn lint

# Lint specific package
yarn workspace website1 lint
```

## Styled Components Example

The common package uses styled-components for consistent styling across applications. Here's an example of a shared styled component:

```tsx
// packages/common/src/components/Button.tsx
import styled, { css } from 'styled-components';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = styled.button<ButtonProps>\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: 2px solid transparent;
  
  /* Size variants */
  \${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return css\`
          padding: 8px 16px;
          font-size: 14px;
        \`;
      case 'large':
        return css\`
          padding: 16px 32px;
          font-size: 18px;
        \`;
      default:
        return css\`
          padding: 12px 24px;
          font-size: 16px;
        \`;
    }
  }}
  
  /* Variant styles */
  \${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return css\`
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
        \`;
      case 'secondary':
        return css\`
          background-color: #f3f4f6;
          color: #374151;
          &:hover {
            background-color: #e5e7eb;
          }
        \`;
      case 'danger':
        return css\`
          background-color: #ef4444;
          color: white;
          &:hover {
            background-color: #dc2626;
          }
        \`;
    }
  }}
\`;
```

### Using Shared Components

In your applications, import and use the shared components:

```tsx
// In website1 src/app/page.tsx or website2 src/App.tsx
import { Button, UserCard, Container } from '@common';

function MyComponent() {
  return (
    <Container maxWidth="lg" background="white">
      <Button variant="primary" size="large" onClick={() => alert('Hello!')}>
        Click me!
      </Button>
      <UserCard 
        name="John Doe"
        email="john@example.com"
        role="Developer"
      />
    </Container>
  );
}
```

## Development

### Adding New Components

1. Create your component in `packages/common/src/components/`
2. Export it from `packages/common/src/index.ts`
3. Use it in any application by importing from `@common`

### Import Patterns

- **Utilities**: `import { formatName, generateId } from '@common';`
- **Components**: `import { Button, UserCard } from '@common';`
- **Layout**: `import { Container, Grid, Flex } from '@common';`
- **Typography**: `import { Heading1, Text } from '@common';`

## Scripts

- `yarn dev`: Start all applications in development mode
- `yarn build`: Build all applications
- `yarn lint`: Run ESLint on all packages
- `yarn format`: Format code with Prettier
- `yarn clean`: Clean node_modules and build artifacts

## TypeScript Configuration

The project uses TypeScript with path mapping for clean imports. The `@common/*` alias resolves to the common package source files, enabling direct TypeScript compilation without a build step.

## Architecture Benefits

- **Code Reuse**: Share components and utilities across multiple applications
- **Consistency**: Unified design system using styled-components
- **Type Safety**: Full TypeScript support with shared interfaces
- **Development Speed**: Hot reloading and fast builds
- **Maintainability**: Single source of truth for shared code
- **Modern Next.js**: App Router with improved performance and developer experience
