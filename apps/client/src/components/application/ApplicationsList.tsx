import { Spinner } from '@chakra-ui/react';

import { createColumnHelper } from '@tanstack/react-table';
import { Application } from '../../@types';
import { useGetApplicationsQuery } from '../../redux/api/applicationApiSlice';
import { DataTable } from '../common/DataTable';

const { accessor: createColumn } = createColumnHelper<Application>();

function ApplicationsList() {
  const {
    data: applications,
    isSuccess,
    isError,
    error,
  } = useGetApplicationsQuery();

  const columns = [
    createColumn('position', { header: 'Position' }),
    createColumn('organization.name', { header: 'Company' }),
    createColumn('location', { header: 'Location' }),
    createColumn('status', { header: 'Status' }),
    createColumn('interviews', {
      header: 'Next Interview',
      cell: (info) => info.getValue()?.at(0)?.dateTime,
    }),
  ];

  if (isSuccess) {
    return <DataTable columns={columns} data={applications} />;
  }

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return <Spinner />;
}

export default ApplicationsList;
