import { Box, Container, Progress } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import ApplicationsList from './components/application/ApplicationsList';
import LoginPage from './components/auth/LoginPage';
import RequireAuth from './components/auth/RequireAuth';
import Home from './components/home/Home';
import OrganizationsList from './components/organization/OrganizationsList';
import Sidebar from './components/sidebar/Sidebar';
import Toolbar from './components/Toolbar';
import { useCurrentUserQuery } from './redux/slices/authApiSlice';

export function App() {
  const { isLoading } = useCurrentUserQuery();

  if (isLoading) return <Progress size="xs" isIndeterminate />;

  return (
    <>
      <Sidebar>
        <Toolbar />
        <Box as="main">
          <Container maxW={'8xl'}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<RequireAuth />}>
                <Route path="/applications" element={<ApplicationsList />} />
                <Route path="/organizations" element={<OrganizationsList />} />
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </Container>
        </Box>
      </Sidebar>
    </>
  );
}

export default App;
