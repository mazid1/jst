import { useLocation } from 'react-router-dom';
import OrganizationsList from '../components/organization/OrganizationsList';
import { history } from '../helpers/history';

const OrganizationsPage = () => {
  history.location = useLocation();

  return <OrganizationsList />;
};

export default OrganizationsPage;
