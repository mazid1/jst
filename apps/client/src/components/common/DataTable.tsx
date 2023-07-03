import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
} from '@chakra-ui/react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { range } from 'lodash';
import { useMemo, useState } from 'react';

export type PageInfo = {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
};

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  pageInfo?: PageInfo;
  onPageChange?: (skip: number) => void;
};

export function DataTable<Data extends object>({
  data,
  columns,
  pageInfo,
  onPageChange,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const paginationButtons = useMemo(() => {
    if (pageInfo) {
      const { currentPage: currentPageLabel, totalPages, pageSize } = pageInfo;
      const currentPageValue = currentPageLabel - 1;

      const minPageLabel = Math.max(1, currentPageLabel - 2);
      const minPageValue = minPageLabel - 1;

      const maxPageLabel = Math.min(totalPages, currentPageLabel + 2);
      const maxPageValue = maxPageLabel - 1;

      const numberButtonsLabel = range(minPageLabel, maxPageLabel + 1);
      const pageButtonsLabel = ['<<', '<', ...numberButtonsLabel, '>', '>>'];

      const buttonList = pageButtonsLabel.map((label) => {
        if (label === '<<')
          return {
            label,
            skip: 0,
          };
        if (label === '<')
          return {
            label,
            skip: Math.max(currentPageValue - 1, minPageValue) * pageSize,
          };
        if (label === '>')
          return {
            label,
            skip: Math.min(currentPageValue + 1, maxPageValue) * pageSize,
          };
        if (label === '>>')
          return {
            label,
            skip: (totalPages - 1) * pageSize,
          };
        return {
          label,
          skip: (Number(label) - 1) * pageSize,
        };
      });
      return buttonList;
    } else return [];
  }, [pageInfo]);

  console.log({ pageInfo, paginationButtons });

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <chakra.span pl="4">
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'desc' ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = cell.column.columnDef.meta;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {paginationButtons.length > 0 && (
        <Center>
          <Stack direction="row" my={4}>
            {paginationButtons.map((b) => (
              <Button
                key={b.label}
                onClick={() => onPageChange?.(b.skip)}
                isDisabled={
                  pageInfo?.currentPage === b.label ||
                  (pageInfo?.currentPage === 1 &&
                    ['<', '<<'].includes(String(b.label))) ||
                  (pageInfo?.currentPage === pageInfo?.totalPages &&
                    ['>', '>>'].includes(String(b.label)))
                }
              >
                {b.label}
              </Button>
            ))}
          </Stack>
        </Center>
      )}
    </TableContainer>
  );
}
