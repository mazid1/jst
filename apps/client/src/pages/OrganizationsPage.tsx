import { AddIcon } from '@chakra-ui/icons';
import { Button, Stack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import OrganizationsList from '../components/organization/OrganizationsList';
import { history } from '../helpers/history';

const OrganizationsPage = () => {
  history.location = useLocation();

  return (
    <>
      <PageTitle title="Organizations" />
      <Stack direction="row" justifyContent="end" mb={6}>
        <Button leftIcon={<AddIcon />} colorScheme="teal">
          Add Organization
        </Button>
      </Stack>
      <OrganizationsList />
    </>
  );
};

export default OrganizationsPage;
