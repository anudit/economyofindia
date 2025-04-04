// DataTable.tsx
import React, { useState, useMemo, useEffect } from "react"; // Added useEffect for logging
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
  Select,
  chakra,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
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
  OnChangeFn, // Import OnChangeFn type for clarity
} from "@tanstack/react-table";
import { DatasetTableRow } from "@/utils/shared";

interface DataTableProps {
  dataset: Array<DatasetTableRow>;
}

export const DataTable: React.FC<DataTableProps> = ({ dataset }) => {
  // === State ===
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // === Columns ===
  const columns = useMemo<ColumnDef<DatasetTableRow>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
        enableGlobalFilter: true, // Ensure filtering is enabled
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
        enableGlobalFilter: true, // Ensure filtering is enabled
        cell: (info) => info.getValue(),
      },
    ],
    [],
  );

  // === Logging State Changes (for debugging) ===
  useEffect(() => {
    console.log("Sorting State Changed:", sorting);
  }, [sorting]);

  useEffect(() => {
    console.log("Global Filter Changed:", globalFilter);
  }, [globalFilter]);

  useEffect(() => {
    console.log("Pagination State Changed:", pagination);
  }, [pagination]);

  // === Table Instance ===
  const table = useReactTable<DatasetTableRow>({
    data: dataset,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    // --- State Update Handlers ---
    // Pass the setter functions directly. React's setState can handle updater functions.
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter, // For manual input change
    onPaginationChange: setPagination,

    // --- Row Model Hooks (Essential for features) ---
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // Enables sorting
    getFilteredRowModel: getFilteredRowModel(), // Enables filtering (global and column)
    getPaginationRowModel: getPaginationRowModel(), // Enables pagination

    // --- Enable Debugging ---
    debugTable: true, // Logs internal table state changes to console
    // debugHeaders: true, // Optional: Log header details
    // debugColumns: true, // Optional: Log column details
  });

  // === Debugging: Log Row Model Output ===
  // console.log('Table Instance:', table);
  // console.log('Current Row Model Rows:', table.getRowModel().rows);

  // === Render ===
  return (
    <Box p={4}>
      {/* Global Filter Input */}
      <Box mb={4}>
        <Input
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          // Use the table's recommended handler for filter state
          // OR directly set state like before (should also work if table reads state)
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
                    // Ensure getToggleSortingHandler is called onClick
                    onClick={header.column.getToggleSortingHandler()}
                    cursor={header.column.getCanSort() ? "pointer" : "default"}
                    userSelect={header.column.getCanSort() ? "none" : "auto"}
                    title={
                      // Add title for better UX
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === "asc"
                          ? "Sort ascending"
                          : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                        : undefined
                    }
                  >
                    <Flex align="center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {/* Sort Icons */}
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
            {/* Make sure to use getRowModel().rows here */}
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
                  {table.getState().globalFilter
                    ? "No results matching filter."
                    : "No data available."}
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
        {/* Buttons */}
        <Flex align="center" gap={2}>
          <Button
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
            size="sm"
          >
            {"<<"}
          </Button>
          <Button
            // Ensure table.previousPage() is called
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
            size="sm"
          >
            {"<"}
          </Button>
          <Button
            // Ensure table.nextPage() is called
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

        {/* Page Info and Controls */}
        <Flex align="center" gap={2} flexWrap="wrap">
          {" "}
          {/* Added wrap here */}
          <Text whiteSpace="nowrap">
            Page{" "}
            <strong>
              {/* Ensure reading state from table instance */}
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </Text>
          <Text whiteSpace="nowrap" display={{ base: "none", md: "inline" }}>
            | Go to page:
          </Text>{" "}
          {/* Hide on small screens */}
          <Input
            type="number"
            // Use controlled value from table state
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page); // Use table method to set page
            }}
            width="60px"
            size="sm"
            ml={1}
            mr={1}
          />
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value)); // Use table method
            }}
            width="120px" // Slightly wider for "Show X"
            size="sm"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        {/* Total Rows */}
        <Text whiteSpace="nowrap">
          {/* Use getFilteredRowModel().rows.length for count after filtering */}
          Rows: {table.getFilteredRowModel().rows.length}
        </Text>
      </Flex>
    </Box>
  );
};
