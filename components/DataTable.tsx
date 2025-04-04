import { DatasetTable, DatasetTableRow } from "@/utils/shared";
import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Button,
  ButtonGroup,
  IconButton,
  Text,
  Flex,
  Select,
  Box,
} from "@chakra-ui/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

interface DataTableProps {
  data: DatasetTable;
}

type SortDirection = "asc" | "desc" | null;

interface SortConfig {
  key: string;
  direction: SortDirection;
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  // State
  const [tableData, setTableData] = useState<DatasetTableRow[]>(data || []);
  const [filteredData, setFilteredData] = useState<DatasetTableRow[]>(
    data || [],
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Get column headers
  const columns = useMemo(() => {
    if (!tableData.length) return [];
    return Object.keys(tableData[0]);
  }, [tableData]);

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: SortDirection = "asc";

    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig(direction ? { key, direction } : null);
  };

  // Get sort icon
  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return undefined;
    return sortConfig.direction === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />;
  };

  // Sort and filter data
  useEffect(() => {
    let result = [...tableData];

    // Apply search filter
    if (searchTerm) {
      result = result.filter((row) => {
        return Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        );
      });
    }

    // Apply sorting
    if (sortConfig && sortConfig.direction) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(result);
    // Reset to first page when filter/sort changes
    setCurrentPage(0);
  }, [tableData, sortConfig, searchTerm]);

  // Handle data update
  useEffect(() => {
    setTableData(data || []);
  }, [data]);

  // Pagination
  const pageCount = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, pageSize]);

  // Pagination controls
  const goToFirstPage = () => setCurrentPage(0);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(0, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(pageCount - 1, prev + 1));
  const goToLastPage = () => setCurrentPage(Math.max(0, pageCount - 1));
  const goToPage = (page: number) =>
    setCurrentPage(Math.min(Math.max(0, page), pageCount - 1));
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < pageCount - 1;

  return (
    <TableContainer>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />

      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column}>
                <Button
                  variant="ghost"
                  onClick={() => handleSort(column)}
                  rightIcon={getSortIcon(column)}
                >
                  {column}
                </Button>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {columns.map((column) => (
                  <Td key={`${rowIndex}-${column}`}>{String(row[column])}</Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={columns.length} textAlign="center">
                No records found.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      <Flex
        justifyContent="space-between"
        mt={4}
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Flex gap={2} alignItems="center">
          <ButtonGroup spacing={2}>
            <IconButton
              aria-label="First Page"
              icon={<ChevronsLeftIcon />}
              onClick={goToFirstPage}
              isDisabled={!canGoPrevious}
              size={{ base: "sm", md: "md" }}
            />
            <IconButton
              aria-label="Previous Page"
              icon={<ChevronLeftIcon />}
              onClick={goToPreviousPage}
              isDisabled={!canGoPrevious}
              size={{ base: "sm", md: "md" }}
            />
            <IconButton
              aria-label="Next Page"
              icon={<ChevronRightIcon />}
              onClick={goToNextPage}
              isDisabled={!canGoNext}
              size={{ base: "sm", md: "md" }}
            />
            <IconButton
              aria-label="Last Page"
              icon={<ChevronsRightIcon />}
              onClick={goToLastPage}
              isDisabled={!canGoNext}
              size={{ base: "sm", md: "md" }}
            />
          </ButtonGroup>

          <Text ml={2}>
            Page {currentPage + 1} of {Math.max(1, pageCount)}
          </Text>
        </Flex>

        <Flex gap={2} alignItems="center">
          <Text>Go to page:</Text>
          <Input
            type="number"
            defaultValue={currentPage + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              goToPage(page);
            }}
            w="60px"
            size={{ base: "sm", md: "md" }}
          />
        </Flex>

        <Flex gap={2} alignItems="center">
          <Text>Rows per page:</Text>
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            w="80px"
            size={{ base: "sm", md: "md" }}
          >
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>

      <Text mt={2}>
        Showing {paginatedData.length} of {filteredData.length} rows
      </Text>
    </TableContainer>
  );
};

export default DataTable;
