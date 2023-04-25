import { useLocation } from 'react-router-dom';
import ApplicationsList from '../components/application/ApplicationsList';
import PageTitle from '../components/common/PageTitle';
import { history } from '../helpers/history';

const ApplicationsPage = () => {
  history.location = useLocation();

  return (
    <>
      <PageTitle title="Applications" />
      <ApplicationsList />
    </>
  );
};

export default ApplicationsPage;
