import {
  IconButton,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';
import { Application } from '../../@types';
import { handleError } from '../../helpers/handleError';
import {
  useDeleteApplicationMutation,
  useGetApplicationsQuery,
} from '../../redux/api/applicationApiSlice';
import { DataTable } from '../common/DataTable';
import { useConfirmation } from '../common/confirmation';
import ApplicationFormModal from './ApplicationFormModal';

const { accessor: createColumn } = createColumnHelper<Application>();

function ApplicationsList() {
  // query
  const {
    data: applications,
    isSuccess,
    isError,
    error,
  } = useGetApplicationsQuery();

  // mutation
  const [deleteApplication] = useDeleteApplicationMutation();

  // hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { ask } = useConfirmation();

  // states
  const [selectedApplication, setSelectedApplication] = useState<Application>();

  // handlers
  const handleDeleteApplication = async (application: Application) => {
    const { _id: id, position, organization } = application;
    const positionText = organization?.name ? (
      <>
        <strong>{position}</strong> at <strong>{organization.name}</strong>
      </>
    ) : (
      <strong>{position}</strong>
    );
    try {
      const isConfirmed = await ask({
        header: `Delete Organization`,
        message: (
          <Text>
            Are you sure you want to delete the application for the position of{' '}
            {positionText}?
            <br />
            This action can not be undone.
          </Text>
        ),
        acceptButtonText: 'Delete',
        rejectButtonText: 'Cancel',
      });
      if (!isConfirmed) return;

      await deleteApplication(id);
      toast({
        title: 'Deleted.',
        description: 'Application is deleted successfully.',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      handleError(error, toast);
    }
  };

  const columns = [
    createColumn('position', { header: 'Position' }),
    createColumn('organization.name', { header: 'Company' }),
    createColumn('location', { header: 'Location' }),
    createColumn('status', { header: 'Status' }),
    createColumn('interviews', {
      header: 'Next Interview',
      cell: (info) => info.getValue()?.at(0)?.dateTime,
    }),
    createColumn('_id', {
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <Stack direction="row">
            <Tooltip label="Edit" aria-label="Edit">
              <IconButton
                icon={<EditIcon />}
                aria-label="Edit"
                colorScheme="teal"
                onClick={() => {
                  setSelectedApplication(row.original);
                  onOpen();
                }}
              />
            </Tooltip>

            <Tooltip label="Delete" aria-label="Delete">
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete"
                colorScheme="red"
                onClick={() => handleDeleteApplication(row.original)}
              />
            </Tooltip>
          </Stack>
        );
      },
    }),
  ];

  if (isSuccess) {
    return (
      <>
        <DataTable columns={columns} data={applications} />
        <ApplicationFormModal
          isOpen={isOpen}
          onClose={onClose}
          headerText="Update application"
          saveButtonText="Save Application"
          application={selectedApplication}
        />
      </>
    );
  }

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return <Spinner />;
}

export default ApplicationsList;
