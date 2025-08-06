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
  generateId,
  formatDate
} from '@common';

function App() {
  const sampleUsers = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      role: 'Product Manager'
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      role: 'UI/UX Designer'
    },
    {
      name: 'Carol Williams',
      email: 'carol@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      role: 'Backend Developer'
    }
  ];

  return (
    <PageWrapper>
      <Container maxWidth="xl" background="white">
        <Heading1>Website 2 - Vite</Heading1>
        <Text>This is the Vite application showcasing the same shared styled components from the common package</Text>
        
        <Container maxWidth="lg" padding="lg" background="gray">
          <Heading2>Interactive Demo</Heading2>
          <Grid columns={3} gap="24px">
            <div>
              <Heading2>Buttons</Heading2>
              <Flex direction="column" gap="12px">
                <Button 
                  variant="primary" 
                  size="medium" 
                  onClick={() => alert('Vite app button clicked!')}
                >
                  Vite Primary
                </Button>
                <Button 
                  variant="secondary" 
                  size="large" 
                  onClick={() => alert('Large secondary button!')}
                >
                  Large Secondary
                </Button>
                <Button 
                  variant="danger" 
                  size="small" 
                  onClick={() => alert('Small danger button!')}
                >
                  Small Danger
                </Button>
              </Flex>
            </div>
            
            <div>
              <Heading2>Utilities</Heading2>
              <Text>
                <strong>Formatted:</strong> {formatName('jane doe')}
                <br />
                <strong>ID:</strong> {generateId()}
                <br />
                <strong>Today:</strong> {formatDate(new Date())}
              </Text>
            </div>

            <div>
              <Heading2>Single User</Heading2>
              <UserCard
                name={sampleUsers[0].name}
                email={sampleUsers[0].email}
                avatar={sampleUsers[0].avatar}
                role={sampleUsers[0].role}
              />
            </div>
          </Grid>
        </Container>

        <Container maxWidth="lg" padding="md">
          <Heading2>Team Directory</Heading2>
          <Text>All team members using shared UserCard components:</Text>
          <Grid columns={3} gap="20px">
            {sampleUsers.map((user, index) => (
              <UserCard
                key={index}
                name={user.name}
                email={user.email}
                avatar={user.avatar}
                role={user.role}
              />
            ))}
          </Grid>
        </Container>

        <Container maxWidth="md" background="gray" padding="lg" centered>
          <Heading2>About This Demo</Heading2>
          <Text>
            This Vite application demonstrates the power of shared styled-components
            in a monorepo setup. The same Button, UserCard, Container, and typography
            components are used across both the Next.js and Vite applications,
            ensuring consistent design and reducing code duplication.
          </Text>
          <Flex justify="center" gap="16px">
            <Button 
              variant="secondary" 
              onClick={() => window.open('http://localhost:3000', '_blank')}
            >
              View Next.js App
            </Button>
            <Button 
              variant="primary" 
              onClick={() => alert('This is the Vite app!')}
            >
              Current: Vite App
            </Button>
          </Flex>
        </Container>
      </Container>
    </PageWrapper>
  );
}

export default App;
