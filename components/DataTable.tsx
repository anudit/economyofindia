import {
	type DatasetTable,
	type DatasetTableRow,
	titleCase,
} from "@/utils/shared";
import {
	Box,
	Button,
	ButtonGroup,
	Flex,
	IconButton,
	Input,
	Select,
	Table,
	TableContainer,
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
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FixedSizeList, type ListChildComponentProps } from "react-window";

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
	const [pageSize, setPageSize] = useState(20);
	const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

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
			setCurrentPage(0);
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
				<ArrowUpIcon size={14} />
			) : (
				<ArrowDownIcon size={14} />
			),
		[sortConfig],
	);

	const Row = ({ index, style }: ListChildComponentProps) => {
		const row = paginatedData[index];
		const bg = index % 2 === 0 ? "gray.800" : "gray.700";

		return (
			<Flex
				as="tr"
				// role="row"
				key={index}
				style={style}
				px={4}
				py={2}
				width="100%"
				align="center"
				borderBottom="1px solid"
				borderColor="gray.600"
				bg={bg}
				_hover={{ bg: "gray.600" }}
				fontSize="sm"
			>
				{columns.map((col, colIdx) => {
					const cellContent = String(row[col]);
					return (
						<Box
							as="td"
							key={colIdx}
							// role="cell"
							flex="1"
							pr={2}
							whiteSpace="nowrap"
							overflow="hidden"
							textOverflow="ellipsis"
							fontWeight={colIdx === 0 ? "medium" : "normal"}
							color="gray.100"
						>
							{cellContent}
						</Box>
					);
				})}
			</Flex>
		);
	};

	return (
		<TableContainer
			bg="gray.900"
			p={4}
			borderRadius="md"
			boxShadow="md"
			border="1px solid"
			borderColor="gray.700"
		>
			<Input
				placeholder="Search..."
				value={searchInput}
				onChange={(e) => {
					setSearchInput(e.target.value);
					debouncedSetSearchTerm(e.target.value);
				}}
				mb={4}
				bg="gray.800"
				color="gray.100"
				_placeholder={{ color: "gray.500" }}
			/>

			<Table variant="simple" size="sm">
				<Thead position="sticky" top={0} zIndex={1} bg="gray.700">
					<Tr>
						{columns.map((col) => (
							<Th
								key={col}
								textTransform="capitalize"
								fontWeight="bold"
								fontSize="sm"
								color="gray.300"
							>
								<Button
									variant="ghost"
									onClick={() => handleSort(col)}
									rightIcon={getSortIcon(col)}
									fontWeight="bold"
									size="sm"
									color="gray.100"
									_hover={{ bg: "gray.600" }}
									_active={{ bg: "gray.500" }}
								>
									{titleCase(col)}
								</Button>
							</Th>
						))}
					</Tr>
				</Thead>
			</Table>

			{paginatedData.length > 0 && mounted ? (
				<Box
					as="table"
					// role="table"
					height={Math.min(pageSize, paginatedData.length) * ROW_HEIGHT}
					overflowY="auto"
					width="100%"
					border="1px solid"
					borderColor="gray.700"
					borderRadius="md"
				>
					<FixedSizeList
						height={Math.min(pageSize, paginatedData.length) * ROW_HEIGHT}
						itemCount={paginatedData.length}
						itemSize={ROW_HEIGHT}
						width="100%"
					>
						{Row}
					</FixedSizeList>
				</Box>
			) : (
				<Flex
					as="tr"
					// role="row"
					height="40px"
					align="center"
					justify="center"
					border="1px solid"
					borderColor="gray.100"
				>
					<Text
						// role="cell"
						as="td"
					>
						No records found.
					</Text>
				</Flex>
			)}

			<Flex justify="space-between" align="center" mt={4} wrap="wrap" gap={2}>
				<ButtonGroup spacing={2}>
					<IconButton
						icon={<ChevronsLeftIcon size={16} />}
						onClick={() => setCurrentPage(0)}
						isDisabled={currentPage === 0}
						aria-label="First page"
						size="sm"
					/>
					<IconButton
						icon={<ChevronLeftIcon size={16} />}
						onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
						isDisabled={currentPage === 0}
						aria-label="Previous page"
						size="sm"
					/>
					<IconButton
						icon={<ChevronRightIcon size={16} />}
						onClick={() =>
							setCurrentPage((p) => Math.min(pageCount - 1, p + 1))
						}
						isDisabled={currentPage >= pageCount - 1}
						aria-label="Next page"
						size="sm"
					/>
					<IconButton
						icon={<ChevronsRightIcon size={16} />}
						onClick={() => setCurrentPage(pageCount - 1)}
						isDisabled={currentPage >= pageCount - 1}
						aria-label="Last page"
						size="sm"
					/>
				</ButtonGroup>

				<Text color="gray.300" fontSize="sm">
					Page {currentPage + 1} of {Math.max(1, pageCount)} (
					{paginatedData.length} of {filteredData.length} rows)
				</Text>

				<Flex align="center" gap={2}>
					<Text color="gray.300">Rows per page:</Text>
					<Select
						value={pageSize}
						onChange={(e) => setPageSize(Number(e.target.value))}
						w="80px"
						size="sm"
						bg="gray.800"
						color="gray.100"
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
