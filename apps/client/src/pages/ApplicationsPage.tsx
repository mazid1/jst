import { useLocation } from 'react-router-dom';
import ApplicationsList from '../components/application/ApplicationsList';
import { history } from '../helpers/history';

const ApplicationsPage = () => {
  history.location = useLocation();

  return <ApplicationsList />;
};

export default ApplicationsPage;
