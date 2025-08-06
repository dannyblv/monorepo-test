'use client';

import { 
  Button, 
  UserCard, 
  Container,
  PageWrapper,
  Heading1,
  Heading2,
  Text,
  Grid,
  Flex,
  formatName, 
  generateId 
} from '@common';

export default function Home() {
  const sampleUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'Frontend Developer'
  };

  return (
    <PageWrapper>
      <Container maxWidth="lg" background="white" centered>
        <Heading1>Website 1 - Next.js</Heading1>
        <Text>This is the Next.js application using shared styled components from the common package</Text>
        
        <Grid columns={2} gap="32px">
          <div>
            <Heading2>Shared Components Demo</Heading2>
            <Flex direction="column" gap="16px">
              <Button 
                variant="primary" 
                size="large" 
                onClick={() => alert('Hello from shared button!')}
              >
                Primary Button
              </Button>
              <Button 
                variant="secondary" 
                size="medium" 
                onClick={() => alert('Secondary button clicked!')}
              >
                Secondary Button
              </Button>
              <Button 
                variant="danger" 
                size="small" 
                onClick={() => alert('Danger button clicked!')}
              >
                Danger Button
              </Button>
            </Flex>
          </div>
          
          <div>
            <Heading2>User Card Demo</Heading2>
            <UserCard
              name={sampleUser.name}
              email={sampleUser.email}
              avatar={sampleUser.avatar}
              role={sampleUser.role}
            />
          </div>
        </Grid>

        <Container maxWidth="md" padding="lg" background="gray">
          <Heading2>Utility Functions Demo</Heading2>
          <Text>
            <strong>Formatted Name:</strong> {formatName('john doe')}
            <br />
            <strong>Generated ID:</strong> {generateId()}
          </Text>
          <Text>
            This container demonstrates nested containers with different styling options.
            The outer container has a white background and large max-width, while this inner
            container has a gray background and medium max-width. All components are styled
            using styled-components from the shared common package.
          </Text>
        </Container>
      </Container>
    </PageWrapper>
  );
}
