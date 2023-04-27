import { Spinner } from '@chakra-ui/react';
import { useGetOrganizationsQuery } from '../../redux/api/organizationApiSlice';
import { DataTable } from '../common/DataTable';
import { columns } from './columnDef';

function OrganizationsList() {
  const {
    data: organizations,
    isSuccess,
    isError,
    error,
  } = useGetOrganizationsQuery();

  if (isSuccess) {
    return <DataTable columns={columns} data={organizations} />;
  }

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return <Spinner />;
}

export default OrganizationsList;
