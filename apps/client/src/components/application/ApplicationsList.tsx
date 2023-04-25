import { Spinner } from '@chakra-ui/react';

import { useGetApplicationsQuery } from '../../redux/api/applicationApiSlice';
import { DataTable } from '../common/DataTable';
import { columns } from './columnDef';

function ApplicationsList() {
  const {
    data: applications,
    isSuccess,
    isError,
    error,
  } = useGetApplicationsQuery();

  if (isSuccess) {
    return <DataTable columns={columns} data={applications} />;
  }

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return <Spinner />;
}

export default ApplicationsList;
