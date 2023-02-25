import { Route, Routes, useNavigate } from 'react-router-dom';
import ApplicationsList from './components/application/ApplicationsList';
import LoginPage from './components/auth/LoginPage';
import RequireAuth from './components/auth/RequireAuth';
import Home from './components/home/Home';
import Sidebar from './components/layout/Sidebar';
import OrganizationsList from './components/organization/OrganizationsList';
import { history } from './helpers/history';

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
        <Route path="/applications" element={<ApplicationsList />} />
        <Route path="/organizations" element={<OrganizationsList />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
