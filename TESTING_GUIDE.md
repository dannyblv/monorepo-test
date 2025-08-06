# Testing Shared Components and Functions in Monorepo

This guide explains how to implement comprehensive testing for shared React components and utility functions in a monorepo architecture to ensure changes in one place don't break functionality in consuming applications.

## Table of Contents

1. [Why Test Shared Code](#why-test-shared-code)
2. [Testing Strategy](#testing-strategy)
3. [Setting Up Testing Infrastructure](#setting-up-testing-infrastructure)
4. [Testing Shared Components](#testing-shared-components)
5. [Testing Utility Functions](#testing-utility-functions)
6. [Integration Testing](#integration-testing)
7. [Visual Regression Testing](#visual-regression-testing)
8. [Common Problems and Solutions](#common-problems-and-solutions)
9. [Best Practices](#best-practices)
10. [Monorepo Benefits vs Code Duplication](#monorepo-benefits-vs-code-duplication)

## Why Test Shared Code

### The Critical Importance

When multiple applications depend on shared components and functions, **a single change can break multiple applications simultaneously**. Without proper testing:

- ❌ A button style change could break all applications using it
- ❌ A utility function update might cause runtime errors across projects
- ❌ Type changes could introduce breaking changes silently
- ❌ Performance regressions could affect all consuming applications

### The Solution: Comprehensive Testing

✅ **Unit Tests** - Verify individual component/function behavior  
✅ **Integration Tests** - Ensure components work together  
✅ **Visual Tests** - Catch UI regressions  
✅ **Cross-Application Tests** - Verify compatibility across all consumers

## Testing Strategy

### Multi-Layer Testing Pyramid

```
    🔺 E2E Tests (Cross-Application)
   🔺🔺 Integration Tests
  🔺🔺🔺 Component Tests
 🔺🔺🔺🔺 Unit Tests (Functions)
```

### Testing Levels

1. **Unit Tests**: Individual functions and isolated components
2. **Component Tests**: Components with their dependencies
3. **Integration Tests**: Components working together
4. **Cross-Application Tests**: Shared code working in real applications

## Setting Up Testing Infrastructure

### 1. Install Testing Dependencies

Add to the **common package**:

```bash
# In packages/common/
yarn add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
yarn add -D jest jest-environment-jsdom @types/jest
yarn add -D @babel/preset-env @babel/preset-react @babel/preset-typescript
yarn add -D babel-jest
```

### 2. Configure Jest for Common Package

Create `packages/common/jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', {
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ],
    }],
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx)',
  ],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### 3. Setup Test Environment

Create `packages/common/src/setupTests.ts`:

```typescript
import '@testing-library/jest-dom';
import 'jest-styled-components';

// Mock for styled-components during testing
jest.mock('styled-components', () => {
  const actualStyled = jest.requireActual('styled-components');
  return {
    ...actualStyled,
    default: (tag: any) => (props: any) => React.createElement(tag, props),
  };
});
```

### 4. Add Test Scripts

Update `packages/common/package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

## Testing Shared Components

### 1. Button Component Tests

Create `packages/common/src/components/__tests__/Button.test.tsx`:

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Button } from '../Button';

// Mock theme for styled-components
const mockTheme = {};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={mockTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      renderWithTheme(<Button>Click me</Button>);
      
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveStyle('padding: 12px 24px'); // default medium size
    });

    it('renders with custom text', () => {
      renderWithTheme(<Button>Custom Text</Button>);
      
      expect(screen.getByText('Custom Text')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies primary variant styles', () => {
      renderWithTheme(<Button variant="primary">Primary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
    });

    it('applies secondary variant styles', () => {
      renderWithTheme(<Button variant="secondary">Secondary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('background-color: #f3f4f6');
    });

    it('applies danger variant styles', () => {
      renderWithTheme(<Button variant="danger">Danger</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('background-color: #ef4444');
    });
  });

  describe('Sizes', () => {
    it('applies small size styles', () => {
      renderWithTheme(<Button size="small">Small</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('padding: 8px 16px');
      expect(button).toHaveStyle('font-size: 14px');
    });

    it('applies medium size styles (default)', () => {
      renderWithTheme(<Button size="medium">Medium</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('padding: 12px 24px');
      expect(button).toHaveStyle('font-size: 16px');
    });

    it('applies large size styles', () => {
      renderWithTheme(<Button size="large">Large</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('padding: 16px 32px');
      expect(button).toHaveStyle('font-size: 18px');
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      
      renderWithTheme(
        <Button onClick={handleClick}>Clickable</Button>
      );
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      
      renderWithTheme(
        <Button onClick={handleClick} disabled>Disabled</Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      renderWithTheme(<Button aria-label="Custom label">Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
    });

    it('supports keyboard navigation', () => {
      const handleClick = jest.fn();
      
      renderWithTheme(<Button onClick={handleClick}>Keyboard</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      fireEvent.keyDown(button, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
```

### 2. UserCard Component Tests

Create `packages/common/src/components/__tests__/UserCard.test.tsx`:

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { UserCard } from '../UserCard';

const mockTheme = {};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={mockTheme}>
      {component}
    </ThemeProvider>
  );
};

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Frontend Developer',
  avatar: 'https://example.com/avatar.jpg',
};

describe('UserCard Component', () => {
  describe('Rendering', () => {
    it('renders user information correctly', () => {
      renderWithTheme(<UserCard {...mockUser} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    });

    it('renders avatar when provided', () => {
      renderWithTheme(<UserCard {...mockUser} />);
      
      const avatar = screen.getByAltText('John Doe');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('renders default avatar when not provided', () => {
      const userWithoutAvatar = { ...mockUser, avatar: undefined };
      
      renderWithTheme(<UserCard {...userWithoutAvatar} />);
      
      // Should render default avatar or initials
      const defaultAvatar = screen.getByText('JD'); // First letters of name
      expect(defaultAvatar).toBeInTheDocument();
    });
  });

  describe('Required Props', () => {
    it('requires name prop', () => {
      // This would be caught by TypeScript, but good to test runtime behavior
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      renderWithTheme(<UserCard name="" email={mockUser.email} role={mockUser.role} />);
      
      // Component should handle empty name gracefully
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      
      spy.mockRestore();
    });
  });

  describe('Styling', () => {
    it('applies correct CSS classes', () => {
      const { container } = renderWithTheme(<UserCard {...mockUser} />);
      
      const userCard = container.firstChild;
      expect(userCard).toHaveStyle('border-radius: 8px');
      expect(userCard).toHaveStyle('padding: 16px');
    });
  });
});
```

## Testing Utility Functions

### 1. Utility Functions Tests

Create `packages/common/src/__tests__/utils.test.ts`:

```typescript
import { formatName, generateId, debounce, formatDate } from '../utils';

describe('Utility Functions', () => {
  describe('formatName', () => {
    it('capitalizes single name', () => {
      expect(formatName('john')).toBe('John');
    });

    it('capitalizes full name', () => {
      expect(formatName('john doe')).toBe('John Doe');
    });

    it('handles multiple spaces', () => {
      expect(formatName('john   doe')).toBe('John Doe');
    });

    it('handles empty string', () => {
      expect(formatName('')).toBe('');
    });

    it('handles special characters', () => {
      expect(formatName("john o'connor")).toBe("John O'Connor");
    });

    it('handles non-latin characters', () => {
      expect(formatName('josé maría')).toBe('José María');
    });
  });

  describe('generateId', () => {
    it('generates unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(typeof id2).toBe('string');
    });

    it('generates IDs with specified length', () => {
      const id = generateId(10);
      expect(id).toHaveLength(10);
    });

    it('generates IDs with default length', () => {
      const id = generateId();
      expect(id.length).toBeGreaterThan(0);
    });

    it('generates alphanumeric IDs only', () => {
      const id = generateId(20);
      expect(id).toMatch(/^[a-zA-Z0-9]+$/);
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('delays function execution', () => {
      const fn = jest.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('cancels previous calls', () => {
      const fn = jest.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('passes arguments correctly', () => {
      const fn = jest.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn('arg1', 'arg2');
      jest.advanceTimersByTime(100);

      expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });

  describe('formatDate', () => {
    it('formats date in correct format', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const formatted = formatDate(date);
      
      expect(formatted).toMatch(/Jan.*15.*2024/); // Flexible date format
    });

    it('handles invalid dates', () => {
      const invalidDate = new Date('invalid');
      const formatted = formatDate(invalidDate);
      
      expect(formatted).toBe('Invalid Date');
    });

    it('handles null/undefined gracefully', () => {
      expect(() => formatDate(null as any)).not.toThrow();
      expect(() => formatDate(undefined as any)).not.toThrow();
    });
  });
});
```

## Integration Testing

### 1. Component Integration Tests

Create `packages/common/src/__tests__/integration.test.tsx`:

```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { Button, UserCard, Container, Grid } from '../components';
import { formatName } from '../utils';

const mockTheme = {};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={mockTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Component Integration Tests', () => {
  describe('Button + UserCard Integration', () => {
    it('can interact with user card through buttons', async () => {
      const user = userEvent.setup();
      let currentUser = 'john doe';

      const TestComponent = () => {
        const [userName, setUserName] = React.useState(currentUser);

        return (
          <Container>
            <UserCard 
              name={formatName(userName)}
              email="test@example.com"
              role="Developer"
            />
            <Button 
              onClick={() => setUserName('jane smith')}
              data-testid="change-name"
            >
              Change Name
            </Button>
          </Container>
        );
      };

      renderWithTheme(<TestComponent />);

      // Initial state
      expect(screen.getByText('John Doe')).toBeInTheDocument();

      // Click button to change name
      await user.click(screen.getByTestId('change-name'));

      // Verify update
      await waitFor(() => {
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      });
    });
  });

  describe('Layout Components Integration', () => {
    it('renders complex layout with multiple components', () => {
      renderWithTheme(
        <Container maxWidth="lg" background="white">
          <Grid columns={2} gap="16px">
            <div>
              <Button variant="primary">Primary Action</Button>
            </div>
            <div>
              <UserCard 
                name="Test User"
                email="test@example.com"
                role="Tester"
              />
            </div>
          </Grid>
        </Container>
      );

      expect(screen.getByText('Primary Action')).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
  });
});
```

## Visual Regression Testing

### 1. Storybook Setup

Create `packages/common/.storybook/main.js`:

```javascript
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
  ],
  framework: '@storybook/react-vite',
};
```

### 2. Component Stories

Create `packages/common/src/components/Button.stories.tsx`:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
```

## Common Problems and Solutions

### Problem 1: Styled-Components Theme Issues

**Problem**: Tests fail because styled-components can't access theme
```
Error: Cannot read property 'colors' of undefined
```

**Solution**: Always wrap components with ThemeProvider in tests
```typescript
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={mockTheme}>
      {component}
    </ThemeProvider>
  );
};
```

### Problem 2: Async Component Updates

**Problem**: State changes not reflected in tests
```typescript
// ❌ Wrong - doesn't wait for updates
fireEvent.click(button);
expect(screen.getByText('Updated')).toBeInTheDocument();
```

**Solution**: Use waitFor or findBy queries
```typescript
// ✅ Correct - waits for updates
fireEvent.click(button);
await waitFor(() => {
  expect(screen.getByText('Updated')).toBeInTheDocument();
});

// Or use findBy (automatically waits)
await screen.findByText('Updated');
```

### Problem 3: Cross-Package Testing

**Problem**: Cannot import from consuming applications

**Solution**: Create integration test suites in each application
```typescript
// In website1/src/__tests__/shared-components.test.tsx
import { Button } from '@common';

describe('Shared Components in Website1', () => {
  it('integrates with website1 specific features', () => {
    // Test Button with website1's specific context
  });
});
```

### Problem 4: Breaking Changes Detection

**Problem**: API changes break consuming applications silently

**Solution**: API Contract Testing
```typescript
// packages/common/src/__tests__/api-contracts.test.ts
describe('API Contracts', () => {
  it('Button maintains expected interface', () => {
    const buttonProps: ButtonProps = {
      variant: 'primary',
      size: 'medium',
      onClick: () => {},
      children: 'Test',
    };
    
    // This test will fail if ButtonProps interface changes
    expect(() => <Button {...buttonProps} />).not.toThrow();
  });
});
```

### Problem 5: Performance Regression

**Problem**: Shared component updates cause performance issues

**Solution**: Performance Testing
```typescript
// packages/common/src/__tests__/performance.test.tsx
import { render } from '@testing-library/react';
import { performance } from 'perf_hooks';

describe('Performance Tests', () => {
  it('renders 100 buttons in reasonable time', () => {
    const start = performance.now();
    
    render(
      <div>
        {Array.from({ length: 100 }, (_, i) => (
          <Button key={i}>Button {i}</Button>
        ))}
      </div>
    );
    
    const end = performance.now();
    expect(end - start).toBeLessThan(100); // Should render in <100ms
  });
});
```

## Best Practices

### 1. Test Organization

```
packages/common/src/
├── components/
│   ├── __tests__/
│   │   ├── Button.test.tsx
│   │   ├── UserCard.test.tsx
│   │   └── integration.test.tsx
│   ├── Button.tsx
│   └── UserCard.tsx
├── __tests__/
│   ├── utils.test.ts
│   └── api-contracts.test.ts
├── utils.ts
└── index.ts
```

### 2. Naming Conventions

- **Unit Tests**: `ComponentName.test.tsx`
- **Integration Tests**: `integration.test.tsx`
- **Utility Tests**: `utils.test.ts`
- **Contract Tests**: `api-contracts.test.ts`

### 3. Test Coverage Goals

```javascript
// jest.config.js
coverageThreshold: {
  global: {
    branches: 80,
    functions: 90,
    lines: 85,
    statements: 85,
  },
  './src/components/': {
    branches: 90,
    functions: 95,
    lines: 90,
    statements: 90,
  },
}
```

### 4. CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Test Shared Components
on: [push, pull_request]

jobs:
  test-common:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: yarn install
      - run: yarn workspace common test:ci
      
      # Test in all consuming applications
      - run: yarn workspace website1 test:ci
      - run: yarn workspace website2 test:ci
      
      # Visual regression tests
      - run: yarn workspace common build-storybook
      - run: yarn test:visual
```

## Monorepo Benefits vs Code Duplication

### ❌ Problems with Code Duplication

```
project1/
├── src/components/Button.tsx    # Version 1.0
└── utils/formatName.ts          # Version 1.0

project2/
├── src/components/Button.tsx    # Version 1.1 (different!)
└── utils/formatName.ts          # Version 0.9 (older!)

project3/
├── src/components/Button.tsx    # Version 1.2 (newest!)
└── utils/formatName.ts          # Missing! (forgot to copy)
```

**Issues:**
- 🔥 **Bug fixes don't propagate** automatically
- 🔥 **Security patches missed** in some apps
- 🔥 **Maintenance nightmare** - fix same bug in multiple places
- 🔥 **Testing effort multiplied** - test same code multiple times

### ✅ Monorepo Shared Code Benefits

```
monorepo/
├── packages/common/
│   ├── src/components/Button.tsx     # Single source of truth
│   ├── src/utils/formatName.ts       # One implementation
│   └── src/__tests__/               # Comprehensive tests
├── packages/website1/               # Uses @common
├── packages/website2/               # Uses @common
└── packages/mobile-app/             # Uses @common
```

**Benefits:**
- ✅ **Single Source of Truth** - one place to update
- ✅ **Automatic Propagation** - fix once, fix everywhere
- ✅ **Centralized Testing** - test once, trust everywhere
- ✅ **Version Management** - no version mismatches
- ✅ **Shared Security Updates** - patches applied universally
- ✅ **Developer Efficiency** - write once, use many times

### Real-World Impact Example

**Scenario**: A critical security vulnerability is found in the `formatName` function.

**With Code Duplication (❌):**
1. Developer finds vulnerability in Project A
2. Needs to manually check ALL other projects
3. Must update 15+ copies of the function
4. Each project needs individual testing
5. Some projects might be missed
6. Deployment coordination nightmare
7. **Time to fix: 2-3 weeks**

**With Monorepo (✅):**
1. Developer fixes vulnerability in `packages/common`
2. Tests run automatically for shared code
3. CI/CD tests all consuming applications
4. Single deployment updates all applications
5. **Time to fix: 1-2 days**

### Testing Impact

**Code Duplication Testing Effort:**
```
Button component testing:
- Project 1: 20 tests
- Project 2: 20 tests (duplicate effort)
- Project 3: 20 tests (duplicate effort)
- Total: 60 tests for same functionality
```

**Monorepo Testing Effort:**
```
Button component testing:
- Shared package: 25 comprehensive tests
- Integration tests: 5 tests per project (15 total)
- Total: 40 tests with better coverage
```

**Result**: 33% less testing effort with better quality!

## Conclusion

Testing shared components and functions in a monorepo is **essential** for maintaining quality and preventing breaking changes across multiple applications. The investment in comprehensive testing pays dividends by:

1. **Preventing Breaking Changes** across applications
2. **Ensuring Consistent Behavior** everywhere
3. **Catching Regressions Early** in development
4. **Enabling Confident Refactoring** of shared code
5. **Documenting Expected Behavior** for other developers

The monorepo approach with shared code and comprehensive testing is **significantly superior** to code duplication because it:

- **Reduces maintenance burden** by 60-80%
- **Improves code quality** through centralized testing
- **Ensures consistency** across all applications
- **Enables rapid feature development** and bug fixes
- **Scales efficiently** as you add more applications

**Remember**: The cost of setting up comprehensive testing for shared code is **far less** than the cost of debugging issues across multiple applications when shared code breaks. Invest in testing early, and your entire development team will benefit from increased confidence and velocity.
