import { Spinner } from '@chakra-ui/react';
import { useGetOrganizationsQuery } from '../../redux/api/organizationApiSlice';

function OrganizationsList() {
  const {
    data: organizations,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrganizationsQuery();

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
}

export default OrganizationsList;
