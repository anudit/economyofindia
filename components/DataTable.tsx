import {
	Box,
	Button,
	ButtonGroup,
	Flex,
	IconButton,
	Input,
	NativeSelect,
	Table,
	Text,
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
import { List, type RowComponentProps } from "react-window";
import {
	type DatasetTable,
	type DatasetTableRow,
	titleCase,
} from "@/utils/shared";

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

	const Row = ({ index, style }: RowComponentProps) => {
		const row = paginatedData[index];
		const bg = index % 2 === 0 ? "gray.800" : "gray.700";

		return (
			<Flex
				as="tr"
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
		<Box
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

			<Table.Root variant="line" size="sm">
				<Table.Header position="sticky" top={0} zIndex={1} bg="gray.700">
					<Table.Row>
						{columns.map((col) => (
							<Table.ColumnHeader
								key={col}
								textTransform="capitalize"
								fontWeight="bold"
								fontSize="sm"
								color="gray.300"
							>
								<Button
									variant="ghost"
									onClick={() => handleSort(col)}
									fontWeight="bold"
									size="sm"
									color="gray.100"
									_hover={{ bg: "gray.600" }}
									_active={{ bg: "gray.500" }}
								>
									{titleCase(col)}
									{getSortIcon(col)}
								</Button>
							</Table.ColumnHeader>
						))}
					</Table.Row>
				</Table.Header>
			</Table.Root>

			{paginatedData.length > 0 && mounted ? (
				<Box
					as="table"
					width="100%"
					height={Math.min(pageSize, paginatedData.length) * ROW_HEIGHT}
					border="1px solid"
					borderColor="gray.700"
					borderRadius="md"
				>
					<List
						rowCount={paginatedData.length}
						rowHeight={ROW_HEIGHT}
						rowComponent={Row}
						rowProps={{} as any}
					/>
				</Box>
			) : (
				<Flex
					as="tr"
					height="40px"
					align="center"
					justify="center"
					border="1px solid"
					borderColor="gray.100"
				>
					<Text as="td">No records found.</Text>
				</Flex>
			)}

			<Flex justify="space-between" align="center" mt={4} wrap="wrap" gap={2}>
				<ButtonGroup attached={false}>
					<IconButton
						onClick={() => setCurrentPage(0)}
						disabled={currentPage === 0}
						aria-label="First page"
						size="sm"
					>
						<ChevronsLeftIcon size={16} />
					</IconButton>
					<IconButton
						onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
						disabled={currentPage === 0}
						aria-label="Previous page"
						size="sm"
					>
						<ChevronLeftIcon size={16} />
					</IconButton>
					<IconButton
						onClick={() =>
							setCurrentPage((p) => Math.min(pageCount - 1, p + 1))
						}
						disabled={currentPage >= pageCount - 1}
						aria-label="Next page"
						size="sm"
					>
						<ChevronRightIcon size={16} />
					</IconButton>
					<IconButton
						onClick={() => setCurrentPage(pageCount - 1)}
						disabled={currentPage >= pageCount - 1}
						aria-label="Last page"
						size="sm"
					>
						<ChevronsRightIcon size={16} />
					</IconButton>
				</ButtonGroup>

				<Text color="gray.300" fontSize="sm">
					Page {currentPage + 1} of {Math.max(1, pageCount)} (
					{paginatedData.length} of {filteredData.length} rows)
				</Text>

				<Flex align="center" gap={2}>
					<Text color="gray.300">Rows per page:</Text>
					<NativeSelect.Root size="sm" width="80px">
						<NativeSelect.Field
							bg="gray.800"
							color="gray.100"
							value={pageSize}
							onChange={(e) =>
								setPageSize(Number((e.target as HTMLSelectElement).value))
							}
						>
							{[10, 20, 50, 100].map((size) => (
								<option key={size} value={size}>
									{size}
								</option>
							))}
						</NativeSelect.Field>
						<NativeSelect.Indicator />
					</NativeSelect.Root>
				</Flex>
			</Flex>
		</Box>
	);
};
