import { DatasetTable, DatasetTableRow } from "@/utils/shared";

import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  chakra, // Import chakra factory function
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"; // Import icons
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel, // Correctly import
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const columnHelper = createColumnHelper<DatasetTableRow>();

export const DataTable = ({ tableData }: { tableData: DatasetTable }) => {
  const [sorting, setSorting] = useState<SortingState>([]); // State for sorting
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  let defaultData = tableData; // Using the prop directly

  // Define columns using the column helper
  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          ID
        </Text>
      ),
      cell: (
        info: any, // Consider using info: CellContext<DatasetTableRow, number> for better typing
      ) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {info.getValue()}
          </Text>
        </Flex>
      ),
      // enableSorting: true, // Explicitly enable sorting (optional, default is true)
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          NAME
        </Text>
      ),
      cell: (info) => (
        <Text color={textColorSecondary} fontSize="sm" fontWeight="500">
          {info.getValue()}
        </Text>
      ),
      enableSorting: true,
    }),
  ];

  // Use data from props, no need for separate state unless you modify it locally
  const data = defaultData; // Or use useState if you need local modifications like adding/removing rows

  // Create the table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting, // Pass the sorting state
    },
    onSortingChange: setSorting, // Function to update the sorting state
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // *** CORRECTLY ENABLE SORTING ***
    debugTable: true, // Optional: for debugging
  });

  useEffect(() => {
    console.log("Sorting state changed:", sorting);
  }, [sorting]);

  return (
    <Flex
      direction="column"
      w="100%"
      overflowX={{ base: "scroll", sm: "hidden", md: "hidden" }} // Consider 'auto' or 'scroll' for all sizes if needed
    >
      {/* Optional Header Section */}
      <Flex
        align={{ sm: "flex-start", lg: "center" }}
        justify="space-between"
        w="100%"
        px="22px"
        pb="20px"
        mb="10px"
        // boxShadow="0px 40px 58px -20px rgba(112, 144, 176, 0.26)" // Optional styling
      >
        <Text color={textColor} fontSize="xl" fontWeight="600">
          Top Creators {/* Or a more generic title */}
        </Text>
        {/* <Button variant="action">See all</Button> */}
      </Flex>

      {/* Table Section */}
      <Box overflowX="auto">
        {" "}
        {/* Added overflowX here for responsiveness */}
        <Table variant="simple" color="gray.500" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // Access sorting props for the column
                  const canSort = header.column.getCanSort();
                  const isSorted = header.column.getIsSorted(); // Returns 'asc', 'desc', or false

                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor={canSort ? "pointer" : "default"} // Set cursor only if sortable
                      onClick={header.column.getToggleSortingHandler()} // Attach sorting handler
                      userSelect="none" // Prevent text selection on click
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color="gray.400"
                      >
                        {/* Render the header content */}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {/* *** ADD SORTING INDICATOR *** */}
                        {canSort && ( // Show indicator only if sortable
                          <chakra.span pl="4">
                            {" "}
                            {/* Use chakra factory for styling */}
                            {
                              isSorted === "asc" ? (
                                <TriangleUpIcon aria-label="sorted ascending" />
                              ) : isSorted === "desc" ? (
                                <TriangleDownIcon aria-label="sorted descending" />
                              ) : null // No icon if not sorted
                            }
                            {/* Optional: Add a placeholder icon for sortable but unsorted columns
                             { !isSorted && <SomeSortIcon color="gray.300" /> }
                            */}
                          </chakra.span>
                        )}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table
              .getRowModel()
              .rows // .slice(0, 11) // Removed slice unless you specifically need pagination/limiting here
              .map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td
                          key={cell.id}
                          fontSize={{ sm: "14px" }}
                          minW={{ sm: "150px", md: "200px", lg: "auto" }}
                          borderColor="transparent" // Or use borderColor for lines
                          py="8px" // Adjust padding as needed
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};
