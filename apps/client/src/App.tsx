import { Box, Container, Progress } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import ApplicationsList from './components/application/ApplicationsList';
import RequireAuth from './components/auth/RequireAuth';
import Footer from './components/Footer';
import Home from './components/home/Home';
import OrganizationsList from './components/organization/OrganizationsList';
import Toolbar from './components/Toolbar';
import { useCurrentUserQuery } from './redux/slices/authApiSlice';

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
            <Route element={<RequireAuth />}>
              <Route path="/applications" element={<ApplicationsList />} />
              <Route path="/organizations" element={<OrganizationsList />} />
            </Route>
          </Routes>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default App;
