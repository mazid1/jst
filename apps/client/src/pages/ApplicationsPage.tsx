import { Stack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import AddApplication from '../components/application/AddApplication';
import ApplicationsList from '../components/application/ApplicationsList';
import PageTitle from '../components/common/PageTitle';
import { history } from '../helpers/history';

const ApplicationsPage = () => {
  history.location = useLocation();

  return (
    <>
      <PageTitle title="Applications (Under construction)" />
      <Stack direction="row" justifyContent="end" mb={6}>
        <AddApplication />
      </Stack>
      <ApplicationsList />
    </>
  );
};

export default ApplicationsPage;
