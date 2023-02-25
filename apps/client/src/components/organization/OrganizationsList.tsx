import { Spinner } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { history } from '../../helpers/history';
import { useGetOrganizationsQuery } from '../../redux/api/organizationApiSlice';

const OrganizationsList = () => {
  history.location = useLocation();

  const {
    data: organizations,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrganizationsQuery(null);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    console.log(organizations);
    content = JSON.stringify(organizations);
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <div>OrganizationsList</div>
      {content}
    </>
  );
};

export default OrganizationsList;
