import { PdfIcon } from "@/components/Icons";
import { completeMetadata } from "@/dataset";
import type { DatasetMetadata } from "@/utils/shared";
import {
	Box,
	Flex,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
	Tooltip,
	VStack,
	useBreakpointValue,
} from "@chakra-ui/react";
import { PanelLeftClose, PanelLeftOpen, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

type SidebarDisplayItem = {
	fileName: string;
	link: `/${string}`;
};
const allDisplayFiles: SidebarDisplayItem[] = completeMetadata.map((e) => ({
	fileName: e.fileName,
	link: e.localLink,
}));

// Optimized Levenshtein distance calculation
const levenshteinDistance = (s1: string, s2: string): number => {
	// Both strings should already be lowercase at this point
	const m = s1.length;
	const n = s2.length;

	// Early termination for empty strings
	if (m === 0) return n;
	if (n === 0) return m;

	// Optimization: if strings are too different in length, they won't be good matches
	if (Math.abs(m - n) > Math.min(m, n) * 0.5) {
		return Math.max(m, n); // Return a large distance
	}

	// We only need two rows of the matrix for computation
	let prevRow = Array(n + 1).fill(0);
	let currRow = Array(n + 1).fill(0);

	// Initialize the first row
	for (let j = 0; j <= n; j++) {
		prevRow[j] = j;
	}

	// Fill the matrix
	for (let i = 1; i <= m; i++) {
		currRow[0] = i;

		for (let j = 1; j <= n; j++) {
			const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
			currRow[j] = Math.min(
				prevRow[j] + 1, // deletion
				currRow[j - 1] + 1, // insertion
				prevRow[j - 1] + cost, // substitution
			);

			// Optimization: transposition
			if (
				i > 1 &&
				j > 1 &&
				s1[i - 1] === s2[j - 2] &&
				s1[i - 2] === s2[j - 1]
			) {
				currRow[j] = Math.min(currRow[j], prevRow[j - 2] + 1);
			}
		}

		// Swap rows for next iteration
		[prevRow, currRow] = [currRow, prevRow];
	}

	return prevRow[n]; // The distance is in prevRow because we swapped
};

// Prepare searchable fields once for each item
const prepareSearchableData = (
	metadata: DatasetMetadata[],
): Array<{
	item: DatasetMetadata;
	searchableFields: { field: string; value: string }[];
}> => {
	return metadata.map((item) => {
		const searchableFields = [
			{ field: "title", value: item.title?.toLowerCase() || "" },
			{ field: "titleShort", value: item.titleShort?.toLowerCase() || "" },
			{ field: "fileName", value: item.fileName.toLowerCase() },
			{ field: "sourceFile", value: item.sourceFile?.toLowerCase() || "" },
			{ field: "ipfsHash", value: item.ipfsHash?.toLowerCase() || "" },
			{ field: "sha256", value: item.sha256?.toLowerCase() || "" },
			{ field: "md5", value: item.md5?.toLowerCase() || "" },
		].filter((f) => f.value.length > 0); // Only keep fields with values

		return {
			item,
			searchableFields,
		};
	});
};

// Custom fuzzy search function
const fuzzySearch = (
	query: string,
	preparedData: ReturnType<typeof prepareSearchableData>,
	threshold = 0.4,
): { item: DatasetMetadata; score: number }[] => {
	// Early return if query is empty
	if (!query) return [];

	// Process each item
	const results = preparedData.map(({ item, searchableFields }) => {
		// Quick check for exact matches (optimization)
		for (const { value } of searchableFields) {
			if (value.includes(query)) {
				return { item, score: 0 };
			}
		}

		// Calculate best score across all fields
		let bestScore = 1.0; // Start with worst possible score

		for (const { value } of searchableFields) {
			// Skip if the field is too different in length
			if (Math.abs(value.length - query.length) > query.length) continue;

			// Calculate normalized Levenshtein distance
			const distance = levenshteinDistance(query, value);
			const normalizedScore = distance / Math.max(query.length, value.length);

			// Keep the best score
			bestScore = Math.min(bestScore, normalizedScore);

			// Early termination if we found a perfect match
			if (bestScore === 0) break;
		}

		return { item, score: bestScore };
	});

	// Filter and sort results
	return results
		.filter((result) => result.score <= threshold)
		.sort((a, b) => a.score - b.score);
};

const SidebarItem = ({
	fileName,
	link,
	isCollapsed,
}: {
	fileName: string;
	link: `/${string}`;
	isCollapsed: boolean;
}) => {
	const router = useRouter();

	return (
		<Tooltip label={fileName} placement="right" isDisabled={!isCollapsed}>
			<Link href={link} prefetch={true}>
				<Flex
					align="center"
					p={2}
					borderRadius="lg"
					// biome-ignore lint: no
					role="group"
					cursor="pointer"
					_hover={{
						bg: "#2E2E31",
						color: "white",
					}}
					background={router.pathname === link ? "#2E2E31" : "transparent"}
					width="-webkit-fill-available"
					overflow="hidden"
					justifyContent={isCollapsed ? "center" : "flex-start"}
				>
					<Icon as={PdfIcon} mr={isCollapsed ? 0 : 4} boxSize={5} />
					{!isCollapsed && (
						<Text fontSize="sm" isTruncated>
							{fileName}
						</Text>
					)}
				</Flex>
			</Link>
		</Tooltip>
	);
};

export const Sidebar = () => {
	const initialIsCollapsed = useBreakpointValue({ base: true, md: false });
	const [isCollapsed, setIsCollapsed] = useState(initialIsCollapsed);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredFiles, setFilteredFiles] =
		useState<SidebarDisplayItem[]>(allDisplayFiles);

	const toggleSidebar = () => setIsCollapsed(!isCollapsed);
	const sidebarWidth = isCollapsed ? "49px" : "250px";

	// Prepare searchable data once on component mount
	const preparedData = useMemo(
		() => prepareSearchableData(completeMetadata),
		[],
	);

	// Debounce search for better performance
	useEffect(() => {
		const query = searchQuery.trim();
		if (!query) {
			setFilteredFiles(allDisplayFiles);
			return;
		}

		const startTime = performance.now();

		// Simple substring search first for exact matches
		const exactMatches = allDisplayFiles.filter((file) =>
			file.fileName.toLowerCase().includes(query.toLowerCase()),
		);

		if (exactMatches.length > 0) {
			setFilteredFiles(exactMatches);
			const endTime = performance.now();
			console.log("exact search in", endTime - startTime, "ms");
			return;
		}

		// Fall back to fuzzy search
		const results = fuzzySearch(query.toLowerCase(), preparedData, 0.4);

		const matchedFiles: SidebarDisplayItem[] = results.map(({ item }) => ({
			fileName: item.fileName,
			link: item.localLink,
		}));

		setFilteredFiles(matchedFiles);

		const endTime = performance.now();
		console.log("fuzzy search in", endTime - startTime, "ms");
	}, [searchQuery, preparedData]);

	return (
		<Box
			as="nav"
			background="#23222570"
			w={sidebarWidth}
			h="100vh"
			position="sticky"
			top={0}
			left={0}
			zIndex={1}
			overflowX="hidden"
			transition="width 0.2s ease"
			px={isCollapsed ? 1 : 3}
			pt={4}
			display="flex"
			flexDirection="column"
		>
			<Flex justify={isCollapsed ? "center" : "flex-start"} align="center">
				<IconButton
					icon={
						isCollapsed ? (
							<PanelLeftOpen strokeWidth={2} size={22} />
						) : (
							<PanelLeftClose strokeWidth={2} size={22} />
						)
					}
					onClick={toggleSidebar}
					aria-label="Open Sidebar"
					variant="ghost"
					size="sm"
				/>
			</Flex>

			<InputGroup
				onClick={() => {
					isCollapsed ? toggleSidebar() : null;
				}}
				height="40px"
				display="flex"
				alignItems="center"
				mt={4}
			>
				<InputLeftElement pointerEvents="none">
					<SearchIcon color="white" size={14} />
				</InputLeftElement>
				<Input
					type="text"
					placeholder="Search"
					variant="unstyled"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</InputGroup>

			<VStack align="stretch" spacing={1} flexGrow={1} mt={4}>
				{filteredFiles.map(({ fileName, link }, i) => (
					<SidebarItem
						key={i}
						fileName={fileName}
						link={link}
						isCollapsed={isCollapsed as boolean}
					/>
				))}
			</VStack>
		</Box>
	);
};
