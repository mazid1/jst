import { useLocation } from 'react-router-dom';
import { history } from '../../helpers/history';

const ApplicationsList = () => {
  history.location = useLocation();

  return <div>ApplicationsList</div>;
};

export default ApplicationsList;
