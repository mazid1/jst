import { Spinner } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Application } from '../../@types';
import { useGetApplicationsQuery } from '../../redux/api/applicationApiSlice';
import { DataTable } from '../common/DataTable';

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
    // content = JSON.stringify(applications, null, 4);
    const columnHelper = createColumnHelper<Application>();
    const columns = [
      columnHelper.accessor('position', {
        cell: (info) => info.getValue(),
        header: 'Position',
      }),
      columnHelper.accessor('organization.name', {
        cell: (info) => info.getValue(),
        header: 'Company',
      }),
      columnHelper.accessor('status', {
        cell: (info) => info.getValue(),
        header: 'Status',
      }),
    ];
    content = <DataTable columns={columns} data={applications} />;
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
