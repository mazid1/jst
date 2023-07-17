import { Container, Spinner, useToast } from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router-dom';
import ApplicationDetailLayout from '../components/application/detail/ApplicationDetailLayout';
import { handleError } from '../helpers/handleError';
import { history } from '../helpers/history';
import { useGetApplicationQuery } from '../redux/api/applicationApiSlice';

const ApplicationDetailPage = () => {
  history.location = useLocation();

  const toast = useToast();
  const { applicationId } = useParams();
  const { data, error, isLoading } = useGetApplicationQuery(applicationId!);

  if (isLoading) return <Spinner />;

  if (error) {
    handleError(error, toast);
    return <div>Error occured, please try refresh.</div>;
  }

  if (!data) {
    return <Container>Application not found</Container>;
  }

  return <ApplicationDetailLayout application={data} />;
};

export default ApplicationDetailPage;
