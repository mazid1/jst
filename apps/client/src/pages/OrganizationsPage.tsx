import { useLocation } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import OrganizationsList from '../components/organization/OrganizationsList';
import { history } from '../helpers/history';

const OrganizationsPage = () => {
  history.location = useLocation();

  return (
    <>
      <PageTitle title="Organizations" />
      <OrganizationsList />
    </>
  );
};

export default OrganizationsPage;
