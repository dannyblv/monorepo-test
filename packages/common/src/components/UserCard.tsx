import React from 'react';
import styled from 'styled-components';
import { formatName } from '../utils';

/**
 * Props for the UserCard component
 */
export interface UserCardProps {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  className?: string;
}

/**
 * Styled components for the UserCard
 */
const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 24px;
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
`;

const Avatar = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const AvatarPlaceholder = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  background-color: #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    font-size: 18px;
    font-weight: 500;
    color: #6b7280;
  }
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #111827;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserEmail = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.p`
  font-size: 14px;
  color: #2563eb;
  font-weight: 500;
  margin: 0;
`;

/**
 * A reusable UserCard component that displays user information
 * This component demonstrates the use of shared utilities (formatName) and styled-components
 */
export const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  role,
  avatar,
  className,
}) => {
  // Use the shared utility function to format the name
  const formattedName = formatName(name);
  
  return (
    <CardContainer className={className}>
      <CardContent>
        {/* Avatar section */}
        <AvatarContainer>
          {avatar ? (
            <Avatar
              src={avatar}
              alt={`${formattedName}'s avatar`}
            />
          ) : (
            <AvatarPlaceholder>
              <span>{formattedName.charAt(0)}</span>
            </AvatarPlaceholder>
          )}
        </AvatarContainer>
        
        {/* User information */}
        <UserInfo>
          <UserName>{formattedName}</UserName>
          <UserEmail>{email}</UserEmail>
          <UserRole>{role}</UserRole>
        </UserInfo>
      </CardContent>
    </CardContainer>
  );
};
