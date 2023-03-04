import { Route, Routes, useNavigate } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import Sidebar from './components/layout/Sidebar';
import { history } from './helpers/history';
import ApplicationsPage from './pages/ApplicationsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrganizationsPage from './pages/OrganizationsPage';

export function App() {
  history.navigate = useNavigate();

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
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/organizations" element={<OrganizationsPage />} />
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
