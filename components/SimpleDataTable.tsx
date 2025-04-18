import type { DatasetTable, DatasetTableRow } from "@/utils/shared";
import { titleCase } from "@/utils/shared";
import {
	Box,
	Button,
	ButtonGroup,
	Flex,
	HStack,
	IconButton,
	Input,
	Select,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import debounce from "lodash.debounce";
import {
	ArrowDownIcon,
	ArrowUpIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { FC } from "react";

interface DataTableProps {
	data: DatasetTable;
}

type SortDirection = "asc" | "desc" | null;
interface SortConfig {
	key: string;
	direction: SortDirection;
}

const DataTable: FC<DataTableProps> = ({ data }) => {
	// --- state ---
	const [tableData, setTableData] = useState<DatasetTableRow[]>(data ?? []);
	const [searchInput, setSearchInput] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [pageSize, setPageSize] = useState(20);

	// Sync incoming data
	useEffect(() => {
		setTableData(data ?? []);
	}, [data]);

	// Reset to first page whenever the search term changes
	useEffect(() => {
		setCurrentPage(0);
	}, [searchTerm]);

	// Debounce updating the actual search term
	const debouncedSetSearchTerm = useMemo(
		() => debounce((val: string) => setSearchTerm(val), 150),
		[],
	);
	useEffect(() => {
		return () => {
			debouncedSetSearchTerm.cancel();
		};
	}, [debouncedSetSearchTerm]);

	// Figure out column keys (assumes all rows share same shape)
	const columns = useMemo(() => {
		if (tableData.length === 0) return [];
		return Object.keys(tableData[0]);
	}, [tableData]);

	// Apply search and sort
	const filteredData = useMemo(() => {
		let result = [...tableData];

		// filter
		if (searchTerm) {
			const lower = searchTerm.toLowerCase();
			result = result.filter((row) =>
				Object.values(row).some((val) =>
					String(val).toLowerCase().includes(lower),
				),
			);
		}

		// sort
		if (sortConfig?.direction && sortConfig.key) {
			result.sort((a, b) => {
				const aVal = a[sortConfig.key];
				const bVal = b[sortConfig.key];
				if (aVal === bVal) return 0;
				if (sortConfig.direction === "asc") {
					return aVal > bVal ? 1 : -1;
				} else {
					return aVal < bVal ? 1 : -1;
				}
			});
		}

		return result;
	}, [tableData, searchTerm, sortConfig]);

	// Pagination calculations
	const pageCount = Math.ceil(filteredData.length / pageSize);
	const paginatedData = useMemo(() => {
		const start = currentPage * pageSize;
		return filteredData.slice(start, start + pageSize);
	}, [filteredData, currentPage, pageSize]);

	// Handlers for sorting
	const handleSort = useCallback((key: string) => {
		setSortConfig((prev) => {
			if (prev?.key === key) {
				// cycle asc → desc → none → asc
				const dir =
					prev.direction === "asc"
						? "desc"
						: prev.direction === "desc"
							? null
							: "asc";
				return dir ? { key, direction: dir } : null;
			}
			return { key, direction: "asc" };
		});
	}, []);

	const getSortIcon = useCallback(
		(key: string) => {
			if (!sortConfig || sortConfig.key !== key) return undefined;
			return sortConfig.direction === "asc" ? (
				<ArrowUpIcon size={14} style={{ marginLeft: 4, minWidth: "14px" }} />
			) : (
				<ArrowDownIcon size={14} style={{ marginLeft: 4, minWidth: "14px" }} />
			);
		},
		[sortConfig],
	);

	return (
		<TableContainer
			p={4}
			bg="gray.900"
			border="1px solid"
			borderColor="gray.700"
			borderRadius="md"
			boxShadow="md"
			maxW="90vw"
			// make it scrollable on narrow screens
		>
			{/* Search input */}
			<Input
				placeholder="Search..."
				value={searchInput}
				onChange={(e) => {
					setSearchInput(e.target.value);
					debouncedSetSearchTerm(e.target.value);
				}}
				w="100%"
				mb={4}
				bg="gray.800"
				color="gray.100"
				_placeholder={{ color: "gray.500" }}
			/>

			<Flex maxW="100%" overflowX="auto">
				{/* Table */}
				<Table
					variant="simple"
					size={"sm"}
					//@ts-ignore
					tableLayout="auto" // allow columns to size to their content/header
					minW="100%" // ensure it won't collapse narrower than its container
				>
					<Thead position="sticky" top={0} bg="gray.700" zIndex={1} h="60px">
						<Tr h="60px">
							{columns.map((col, idx) => (
								<Th
									key={col}
									textTransform="capitalize"
									fontSize="sm"
									color="gray.300"
									whiteSpace="nowrap"
									h="60px"
									onClick={() => handleSort(col)}
									style={
										idx > 0
											? {
													textWrap: "balance",
													maxWidth: "100px",
													textAlign: "center",
												}
											: {}
									}
								>
									<Flex
										direction="row"
										justifyContent="center"
										alignItems="center"
									>
										{titleCase(col)}
										{getSortIcon(col)}
									</Flex>
								</Th>
							))}
						</Tr>
					</Thead>
					<Tbody>
						{paginatedData.length > 0 ? (
							paginatedData.map((row, idx) => (
								<Tr
									key={idx}
									bg={idx % 2 === 0 ? "gray.800" : "gray.700"}
									_hover={{ bg: "gray.600" }}
								>
									{columns.map((col, cidx) => (
										<Td
											key={cidx}
											fontWeight={cidx === 0 ? "medium" : "normal"}
											whiteSpace="nowrap"
											overflow="hidden"
											textOverflow="ellipsis"
											textAlign={cidx > 0 ? "center" : "left"}
											color="gray.100"
											style={
												idx > 0
													? {
															textWrap: "balance",
															maxWidth: "100px",
														}
													: {}
											}
										>
											{String(row[col])}
										</Td>
									))}
								</Tr>
							))
						) : (
							<Tr>
								<Td colSpan={columns.length}>
									<Text textAlign="center">No records found.</Text>
								</Td>
							</Tr>
						)}
					</Tbody>
				</Table>
			</Flex>

			{/* Pagination controls */}
			<Flex justify="space-between" align="center" mt={4} wrap="wrap" gap={2}>
				<ButtonGroup spacing={2}>
					<IconButton
						aria-label="First page"
						size="sm"
						icon={<ChevronsLeftIcon size={16} />}
						onClick={() => setCurrentPage(0)}
						isDisabled={currentPage === 0}
					/>
					<IconButton
						aria-label="Previous page"
						size="sm"
						icon={<ChevronLeftIcon size={16} />}
						onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
						isDisabled={currentPage === 0}
					/>
					<IconButton
						aria-label="Next page"
						size="sm"
						icon={<ChevronRightIcon size={16} />}
						onClick={() =>
							setCurrentPage((p) => Math.min(pageCount - 1, p + 1))
						}
						isDisabled={currentPage >= pageCount - 1}
					/>
					<IconButton
						aria-label="Last page"
						size="sm"
						icon={<ChevronsRightIcon size={16} />}
						onClick={() => setCurrentPage(pageCount - 1)}
						isDisabled={currentPage >= pageCount - 1}
					/>
				</ButtonGroup>

				<Text color="gray.300" fontSize="sm">
					Page {currentPage + 1} of {pageCount || 1} ({paginatedData.length} of{" "}
					{filteredData.length} rows)
				</Text>

				<Flex align="center" gap={2}>
					<Text color="gray.300" fontSize="sm">
						Rows per page:
					</Text>
					<Select
						size="sm"
						w="80px"
						bg="gray.800"
						color="gray.100"
						value={pageSize}
						onChange={(e) => setPageSize(Number(e.target.value))}
					>
						{[10, 20, 50, 100].map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</Select>
				</Flex>
			</Flex>
		</TableContainer>
	);
};

export default DataTable;
