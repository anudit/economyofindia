import { DatasetTable, DatasetTableRow } from "@/utils/shared";
import React, { useState, useEffect, useMemo, useCallback } from "react";
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
} from "@chakra-ui/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { FixedSizeList as List } from "react-window";
import debounce from "lodash.debounce";
import { ListChildComponentProps } from "react-window";

interface DataTableProps {
  data: DatasetTable;
}

type SortDirection = "asc" | "desc" | null;

interface SortConfig {
  key: string;
  direction: SortDirection;
}

const ROW_HEIGHT = 40;

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<DatasetTableRow[]>(data || []);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const debouncedSetSearchTerm = useMemo(
    () => debounce(setSearchTerm, 150),
    [],
  );

  useEffect(() => {
    setTableData(data || []);
  }, [data]);

  const columns = useMemo(() => {
    if (!tableData.length) return [];
    return Object.keys(tableData[0]);
  }, [tableData]);

  const filteredData = useMemo(() => {
    let result = [...tableData];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(lowerSearch),
        ),
      );
    }

    if (sortConfig?.direction) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        return sortConfig.direction === "asc"
          ? aVal > bVal
            ? 1
            : aVal < bVal
              ? -1
              : 0
          : aVal < bVal
            ? 1
            : aVal > bVal
              ? -1
              : 0;
      });
    }

    return result;
  }, [tableData, sortConfig, searchTerm]);

  const pageCount = Math.ceil(filteredData.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSort = useCallback((key: string) => {
    setSortConfig((current) => {
      let direction: SortDirection = "asc";
      if (current?.key === key) {
        direction =
          current.direction === "asc"
            ? "desc"
            : current.direction === "desc"
              ? null
              : "asc";
      }
      return direction ? { key, direction } : null;
    });
  }, []);

  const getSortIcon = useCallback(
    (key: string) =>
      !sortConfig ||
      sortConfig.key !== key ? undefined : sortConfig.direction === "asc" ? (
        <ArrowUpIcon />
      ) : (
        <ArrowDownIcon />
      ),
    [sortConfig],
  );

  const Row = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      const row = paginatedData[index];
      if (!row) return null;

      return (
        <Tr style={style}>
          {columns.map((col) => (
            <Td key={`${index}-${col}`}>{String(row[col])}</Td>
          ))}
        </Tr>
      );
    },
    [paginatedData, columns],
  );

  return (
    <TableContainer>
      <Input
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          debouncedSetSearchTerm(e.target.value);
        }}
        mb={4}
      />

      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={col}>
                <Button
                  variant="ghost"
                  onClick={() => handleSort(col)}
                  rightIcon={getSortIcon(col)}
                >
                  {col}
                </Button>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.length > 0 ? (
            <List
              key={paginatedData.length} // Force remount on data length change (important)
              height={Math.min(pageSize, paginatedData.length) * ROW_HEIGHT}
              itemCount={paginatedData.length}
              itemSize={ROW_HEIGHT}
              width="100%"
            >
              {Row}
            </List>
          ) : (
            <Tr>
              <Td colSpan={columns.length} textAlign="center">
                No records found.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      <Flex justify="space-between" align="center" mt={4}>
        <ButtonGroup spacing={2}>
          <IconButton
            icon={<ChevronsLeftIcon />}
            onClick={() => setCurrentPage(0)}
            isDisabled={currentPage === 0}
            aria-label="First page"
          />
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            isDisabled={currentPage === 0}
            aria-label="Previous page"
          />
          <IconButton
            icon={<ChevronRightIcon />}
            onClick={() =>
              setCurrentPage((p) => Math.min(pageCount - 1, p + 1))
            }
            isDisabled={currentPage >= pageCount - 1}
            aria-label="Next page"
          />
          <IconButton
            icon={<ChevronsRightIcon />}
            onClick={() => setCurrentPage(pageCount - 1)}
            isDisabled={currentPage >= pageCount - 1}
            aria-label="Last page"
          />
        </ButtonGroup>

        <Text>
          Page {currentPage + 1} of {Math.max(1, pageCount)}
        </Text>

        <Flex align="center" gap={2}>
          <Text>Rows per page:</Text>
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            w="80px"
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
