import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Organization } from '../../@types';

export const { accessor: createColumn } = createColumnHelper<Organization>();

export const columns = [
  createColumn('name', { header: 'Name' }),
  createColumn('location', { header: 'Location' }),
  createColumn('companySize', { header: 'Size' }),
  createColumn('minSalary', { header: 'Min Salary' }),
  createColumn('maxSalary', { header: 'Max Salary' }),
  createColumn('website', {
    header: 'Website',
    cell: ({ getValue }) => {
      const url = getValue();
      return (
        <Link href={url} isExternal>
          {url} <ExternalLinkIcon mx="2px" />
        </Link>
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
];
