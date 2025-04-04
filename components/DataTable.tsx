import React, { useState, useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Box,
  Flex,
  Button,
  Text,
  IconButton,
  Select,
  chakra, // Import chakra factory function
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"; // For sort icons
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { DatasetTable } from "@/utils/shared";

// --- Assume DataItem is defined as above ---
interface DataItem {
  id: string;
  name: string;
}
// ---

interface DataTableProps {
  dataset: DatasetTable;
}

export const DataTable: React.FC<DataTableProps> = ({ dataset }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, // Initial page index
    pageSize: 10, // Rows per page
  });

  // Define Table Columns using TanStack's ColumnDef
  const columns = useMemo<ColumnDef<DataItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        // You can disable sorting/filtering for specific columns like ID if needed
        enableSorting: true,
        enableGlobalFilter: true,
        cell: (info) => info.getValue(), // Default cell rendering
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
        enableGlobalFilter: true,
        cell: (info) => info.getValue(),
      },
    ],
    [], // No dependencies, columns are static based on DataItem structure
  );

  // Create the table instance using TanStack Table hooks
  const table = useReactTable({
    data: dataset,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // debugTable: true, // Uncomment for debugging table state
  });

  return (
    <Box p={4}>
      {/* Global Filter Input */}
      <Box mb={4}>
        <Input
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(String(e.target.value))}
          maxWidth="300px"
        />
      </Box>

      {/* Table */}
      <TableContainer borderWidth="1px" borderRadius="md">
        <Table variant="striped">
          <Thead bg="gray.100">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    cursor={header.column.getCanSort() ? "pointer" : "default"}
                    userSelect={header.column.getCanSort() ? "none" : "auto"} // Prevent text selection on sort click
                  >
                    <Flex align="center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {/* Add Sort Icons */}
                      <chakra.span pl="2">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <Tr>
                <Td colSpan={columns.length} textAlign="center">
                  No results found.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Flex
        justify="space-between"
        align="center"
        mt={4}
        flexWrap="wrap"
        gap={2}
      >
        <Flex align="center" gap={2}>
          <Button
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
            size="sm"
          >
            {"<<"}
          </Button>
          <Button
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
            size="sm"
          >
            {"<"}
          </Button>
          <Button
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
            size="sm"
          >
            {">"}
          </Button>
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            isDisabled={!table.getCanNextPage()}
            size="sm"
          >
            {">>"}
          </Button>
        </Flex>

        <Flex align="center" gap={2}>
          <Text whiteSpace="nowrap">
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </Text>
          <Text whiteSpace="nowrap">| Go to page:</Text>
          <Input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            width="60px"
            size="sm"
            ml={1}
            mr={1}
          />
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            width="100px"
            size="sm"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Text whiteSpace="nowrap">
          Total Rows: {table.getPrePaginationRowModel().rows.length}
        </Text>
      </Flex>
    </Box>
  );
};
