import { Route, Routes } from 'react-router-dom';
import ApplicationsList from './components/application/ApplicationsList';
import LoginPage from './components/auth/LoginPage';
import RequireAuth from './components/auth/RequireAuth';
import Home from './components/home/Home';
import OrganizationsList from './components/organization/OrganizationsList';
import Sidebar from './components/sidebar/Sidebar';

export function App() {
  // const { isLoading } = useCurrentUserQuery();

  // if (isLoading) return <Progress size="xs" isIndeterminate />;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <RequireAuth>
            <Sidebar />
          </RequireAuth>
        }
      >
        <Route path="/applications" element={<ApplicationsList />} />
        <Route path="/organizations" element={<OrganizationsList />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
