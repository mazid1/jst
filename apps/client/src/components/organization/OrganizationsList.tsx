import { Spinner } from '@chakra-ui/react';
import { useGetOrganizationsQuery } from '../../redux/api/organizationApiSlice';

function OrganizationsList() {
  const {
    data: organizations,
    isSuccess,
    isError,
    error,
  } = useGetOrganizationsQuery();

  if (isSuccess) {
    console.log(organizations);
    return <div>{JSON.stringify(organizations)}</div>;
  } else if (isError) {
    return <div>{error.toString()}</div>;
  }

  return <Spinner />;
}

export default OrganizationsList;
