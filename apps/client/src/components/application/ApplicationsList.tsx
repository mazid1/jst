import { Spinner } from '@chakra-ui/react';
import { useGetApplicationsQuery } from '../../redux/api/applicationApiSlice';

function ApplicationsList() {
  const {
    data: applications,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetApplicationsQuery();

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    console.log(applications);
    content = JSON.stringify(applications, null, 4);
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <div>ApplicationsList</div>
      {content}
    </>
  );
}

export default ApplicationsList;
