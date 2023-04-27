import { createColumnHelper } from '@tanstack/react-table';
import { Application } from '../../@types';

const { accessor: createColumn } = createColumnHelper<Application>();

export const columns = [
  createColumn('position', { header: 'Position' }),
  createColumn('organization.name', { header: 'Company' }),
  createColumn('location', { header: 'Location' }),
  createColumn('status', { header: 'Status' }),
  createColumn('interviews', {
    header: 'Next Interview',
    cell: (info) => info.getValue()?.at(0)?.dateTime,
  }),
];
