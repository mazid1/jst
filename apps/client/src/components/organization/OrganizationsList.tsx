import { DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Link,
  Spinner,
  Stack,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';
import { Organization } from '../../@types';
import { handleError } from '../../helpers/handleError';
import {
  useDeleteOrganizationMutation,
  useGetOrganizationsQuery,
} from '../../redux/api/organizationApiSlice';
import { DataTable } from '../common/DataTable';
import OrganizationFormModal from './OrganizationFormModal';

export const { accessor: createColumn } = createColumnHelper<Organization>();

function OrganizationsList() {
  const {
    data: organizations,
    isSuccess,
    isError,
    error,
  } = useGetOrganizationsQuery();
  const [deleteOrganization] = useDeleteOrganizationMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [selectedOrg, setSelectedOrg] = useState<Organization>();

  const handleDeleteOrganization = async (id: string) => {
    try {
      await deleteOrganization(id);
      toast({
        title: 'Deleted.',
        description: 'Organization is deleted successfully.',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      handleError(error, toast);
    }
  };

  const columns = [
    createColumn('name', { header: 'Name' }),
    createColumn('location', { header: 'Location' }),
    createColumn('size', { header: 'Size' }),
    createColumn('minSalary', { header: 'Min Salary' }),
    createColumn('maxSalary', { header: 'Max Salary' }),
    createColumn('website', {
      header: 'Website',
      cell: ({ getValue }) => {
        const url = getValue();
        return (
          url && (
            <Link href={url} isExternal>
              {url} <ExternalLinkIcon mx="2px" />
            </Link>
          )
        );
      },
    }),
    createColumn('linkedinPage', {
      header: 'Linkedin',
      cell: ({ getValue }) => {
        const url = getValue();
        return (
          url && (
            <Link href={url} isExternal>
              {url} <ExternalLinkIcon mx="2px" />
            </Link>
          )
        );
      },
    }),
    createColumn('_id', {
      header: 'Actions',
      cell: ({ getValue, row }) => {
        const id = getValue();
        return (
          <Stack direction="row">
            <Tooltip label="Edit" aria-label="Edit">
              <IconButton
                icon={<EditIcon />}
                aria-label="Edit"
                colorScheme="teal"
                onClick={() => {
                  setSelectedOrg(row.original);
                  onOpen();
                }}
              />
            </Tooltip>

            <Tooltip label="Delete" aria-label="Delete">
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete"
                colorScheme="red"
                onClick={() => handleDeleteOrganization(id)}
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
        <DataTable columns={columns} data={organizations} />
        <OrganizationFormModal
          isOpen={isOpen}
          onClose={onClose}
          headerText="Update organization"
          saveButtonText="Save Organization"
          organization={selectedOrg}
        />
      </>
    );
  }

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return <Spinner />;
}

export default OrganizationsList;
