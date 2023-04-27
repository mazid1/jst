import { Stack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import AddOrganization from '../components/organization/AddOrganization';
import OrganizationsList from '../components/organization/OrganizationsList';
import { history } from '../helpers/history';

const OrganizationsPage = () => {
  history.location = useLocation();

  return (
    <>
      <PageTitle title="Organizations" />
      <Stack direction="row" justifyContent="end" mb={6}>
        <AddOrganization />
      </Stack>
      <OrganizationsList />
    </>
  );
};

export default OrganizationsPage;
