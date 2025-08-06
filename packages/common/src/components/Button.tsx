import React from 'react';
import styled, { css } from 'styled-components';

/**
 * Props for the Button component
 */
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

/**
 * Styled button component with variants and sizes
 */
const StyledButton = styled.button<ButtonProps>`
  /* Base styles */
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Size variants */
  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 6px 12px;
          font-size: 14px;
        `;
      case 'large':
        return css`
          padding: 12px 24px;
          font-size: 18px;
        `;
      default:
        return css`
          padding: 8px 16px;
          font-size: 16px;
        `;
    }
  }}
  
  /* Color variants */
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: #f3f4f6;
          color: #1f2937;
          
          &:hover:not(:disabled) {
            background-color: #e5e7eb;
          }
        `;
      case 'danger':
        return css`
          background-color: #dc2626;
          color: white;
          
          &:hover:not(:disabled) {
            background-color: #b91c1c;
          }
        `;
      default:
        return css`
          background-color: #2563eb;
          color: white;
          
          &:hover:not(:disabled) {
            background-color: #1d4ed8;
          }
        `;
    }
  }}
`;

/**
 * A reusable Button component that can be used across both websites
 * This component provides consistent styling and behavior using styled-components
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </StyledButton>
  );
};
