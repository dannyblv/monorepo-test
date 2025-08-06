/**
 * Common package - Shared utilities and components
 * 
 * This package contains reusable React components and utility functions
 * that can be imported and used in both website1 (Next.js) and website2 (Vite)
 */

// Export all utility functions
export {
  formatName,
  generateId,
  debounce,
  formatDate,
} from './utils';

// Export all components
export { Button } from './components/Button';
export { UserCard } from './components/UserCard';
export { 
  Container, 
  PageWrapper, 
  Heading1, 
  Heading2, 
  Heading3, 
  Text, 
  Grid, 
  Flex 
} from './components/Layout';

// Export types
export type { ButtonProps } from './components/Button';
export type { UserCardProps } from './components/UserCard';
export type { ContainerProps } from './components/Layout';
