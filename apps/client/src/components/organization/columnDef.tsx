import { DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { IconButton, Link, Stack, Tooltip } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Organization } from '../../@types';

export const { accessor: createColumn } = createColumnHelper<Organization>();

export const columns = [
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
    cell: ({ getValue }) => {
      const id = getValue();
      return (
        <Stack direction="row">
          <Tooltip label="Edit" aria-label="Edit">
            <IconButton
              icon={<EditIcon />}
              aria-label="Edit"
              colorScheme="teal"
              onClick={() => console.log('Edit', id)}
            />
          </Tooltip>

          <Tooltip label="Delete" aria-label="Delete">
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete"
              colorScheme="red"
              onClick={() => console.log('Delete', id)}
            />
          </Tooltip>
        </Stack>
      );
    },
  }),
];
