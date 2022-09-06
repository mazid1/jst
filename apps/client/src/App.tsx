import { Box, Container, Progress } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Footer from './app/Footer';
import Toolbar from './app/Toolbar';
import ApplicationsList from './features/application/ApplicationsList';
import { useCurrentUserQuery } from './features/auth/authApiSlice';
import Home from './features/home/Home';
import OrganizationsList from './features/organization/OrganizationsList';

export function App() {
  const { isLoading } = useCurrentUserQuery();

  if (isLoading) return <Progress size="xs" isIndeterminate />;

  return (
    <>
      <Toolbar />
      <Box as="main">
        <Container maxW={'8xl'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/applications" element={<ApplicationsList />} />
            <Route path="/organizations" element={<OrganizationsList />} />
          </Routes>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default App;
