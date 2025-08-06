import styled, { css } from 'styled-components';

/**
 * Props for the Container component
 */
export interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  centered?: boolean;
  background?: 'white' | 'gray' | 'transparent';
}

/**
 * A flexible Container component for consistent layout across applications
 */
export const Container = styled.div<ContainerProps>`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  
  /* Max width variants */
  ${({ maxWidth = 'lg' }) => {
    switch (maxWidth) {
      case 'sm':
        return css`max-width: 640px;`;
      case 'md':
        return css`max-width: 768px;`;
      case 'lg':
        return css`max-width: 1024px;`;
      case 'xl':
        return css`max-width: 1280px;`;
      case 'full':
        return css`max-width: 100%;`;
      default:
        return css`max-width: 1024px;`;
    }
  }}
  
  /* Padding variants */
  ${({ padding = 'md' }) => {
    switch (padding) {
      case 'none':
        return css`padding: 0;`;
      case 'sm':
        return css`padding: 16px;`;
      case 'lg':
        return css`padding: 48px 24px;`;
      default:
        return css`padding: 32px 16px;`;
    }
  }}
  
  /* Background variants */
  ${({ background = 'transparent' }) => {
    switch (background) {
      case 'white':
        return css`
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        `;
      case 'gray':
        return css`
          background-color: #f9fafb;
          border-radius: 8px;
        `;
      default:
        return css`background-color: transparent;`;
    }
  }}
  
  /* Centered content */
  ${({ centered }) => centered && css`
    text-align: center;
  `}
`;

/**
 * A page wrapper component that provides consistent page layout
 */
export const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 48px 16px;
  
  @media (max-width: 640px) {
    padding: 24px 8px;
  }
`;

/**
 * Typography components
 */
export const Heading1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 16px 0;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Heading2 = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Heading3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
  line-height: 1.4;
`;

export const Text = styled.p`
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 16px 0;
`;

/**
 * Grid components for layout
 */
export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 1 }) => columns}, 1fr);
  gap: ${({ gap = '24px' }) => gap};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Flex = styled.div<{ 
  direction?: 'row' | 'column'; 
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  gap: ${({ gap = '16px' }) => gap};
  flex-wrap: ${({ wrap = false }) => wrap ? 'wrap' : 'nowrap'};
  
  ${({ justify = 'start' }) => {
    switch (justify) {
      case 'center': return css`justify-content: center;`;
      case 'end': return css`justify-content: flex-end;`;
      case 'between': return css`justify-content: space-between;`;
      case 'around': return css`justify-content: space-around;`;
      default: return css`justify-content: flex-start;`;
    }
  }}
  
  ${({ align = 'stretch' }) => {
    switch (align) {
      case 'start': return css`align-items: flex-start;`;
      case 'center': return css`align-items: center;`;
      case 'end': return css`align-items: flex-end;`;
      default: return css`align-items: stretch;`;
    }
  }}
`;
