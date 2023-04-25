import { createColumnHelper } from '@tanstack/react-table';
import { Application } from '../../@types';

const columnHelper = createColumnHelper<Application>();

export const columns = [
  columnHelper.accessor('position', {
    cell: (info) => info.getValue(),
    header: 'Position',
  }),
  columnHelper.accessor('organization.name', {
    cell: (info) => info.getValue(),
    header: 'Company',
  }),
  columnHelper.accessor('location', {
    cell: (info) => info.getValue(),
    header: 'Location',
  }),
  columnHelper.accessor('status', {
    cell: (info) => info.getValue(),
    header: 'Status',
  }),
  columnHelper.accessor('interviews', {
    cell: (info) => info.getValue()?.at(0)?.dateTime,
    header: 'Next Interview',
  }),
];
