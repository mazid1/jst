import { useLocation } from 'react-router-dom';
import { history } from '../helpers/history';

const ApplicationsPage = () => {
  history.location = useLocation();

  return <div>ApplicationsList</div>;
};

export default ApplicationsPage;
