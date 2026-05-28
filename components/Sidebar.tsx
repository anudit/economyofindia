import {
	Box,
	Flex,
	Icon,
	IconButton,
	Input,
	Stack,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import { PanelLeftClose, PanelLeftOpen, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { LiveIcon, PdfIcon } from "@/components/Icons";
import { Tooltip } from "@/components/ui/tooltip";
import { completeMetadata } from "@/dataset";
import type { DatasetMetadata } from "@/utils/shared";

type SidebarDisplayItem = {
	fileName: string;
	link: `/${string}`;
};
const allDisplayFiles: SidebarDisplayItem[] = completeMetadata.map((e) => ({
	fileName: e.fileName,
	link: e.localLink,
}));

const levenshteinDistance = (s1: string, s2: string): number => {
	const m = s1.length;
	const n = s2.length;

	if (m === 0) return n;
	if (n === 0) return m;

	if (Math.abs(m - n) > Math.min(m, n) * 0.5) {
		return Math.max(m, n);
	}

	let prevRow = Array(n + 1).fill(0);
	let currRow = Array(n + 1).fill(0);

	for (let j = 0; j <= n; j++) {
		prevRow[j] = j;
	}

	for (let i = 1; i <= m; i++) {
		currRow[0] = i;

		for (let j = 1; j <= n; j++) {
			const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
			currRow[j] = Math.min(
				prevRow[j] + 1,
				currRow[j - 1] + 1,
				prevRow[j - 1] + cost,
			);

			if (
				i > 1 &&
				j > 1 &&
				s1[i - 1] === s2[j - 2] &&
				s1[i - 2] === s2[j - 1]
			) {
				currRow[j] = Math.min(currRow[j], prevRow[j - 2] + 1);
			}
		}

		[prevRow, currRow] = [currRow, prevRow];
	}

	return prevRow[n];
};

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
			{
				field: "sourceFile",
				value:
					item.sourceFiles.map((e) => e.sourceFile.toLowerCase()).join(" ") ||
					"",
			},
		].filter((f) => f.value.length > 0);

		return {
			item,
			searchableFields,
		};
	});
};

const fuzzySearch = (
	query: string,
	preparedData: ReturnType<typeof prepareSearchableData>,
	threshold = 0.4,
): { item: DatasetMetadata; score: number }[] => {
	if (!query) return [];

	const results = preparedData.map(({ item, searchableFields }) => {
		for (const { value } of searchableFields) {
			if (value.includes(query)) {
				return { item, score: 0 };
			}
		}

		let bestScore = 1.0;

		for (const { value } of searchableFields) {
			if (Math.abs(value.length - query.length) > query.length) continue;

			const distance = levenshteinDistance(query, value);
			const normalizedScore = distance / Math.max(query.length, value.length);

			bestScore = Math.min(bestScore, normalizedScore);

			if (bestScore === 0) break;
		}

		return { item, score: bestScore };
	});

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
		<Tooltip
			label={fileName}
			positioning={{ placement: "right" }}
			disabled={!isCollapsed}
		>
			<Link href={link} prefetch={true}>
				<Flex
					align="center"
					p={2}
					borderRadius="lg"
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
					{fileName.endsWith(".live") ? (
						<Icon asChild mr={isCollapsed ? 0 : 4} boxSize={5}>
							<LiveIcon />
						</Icon>
					) : (
						<Icon asChild mr={isCollapsed ? 0 : 4} boxSize={5}>
							<PdfIcon />
						</Icon>
					)}

					{!isCollapsed && (
						<Text fontSize="sm" truncate>
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

	const preparedData = useMemo(
		() => prepareSearchableData(completeMetadata),
		[],
	);

	useEffect(() => {
		const query = searchQuery.trim();
		if (!query) {
			setFilteredFiles(allDisplayFiles);
			return;
		}

		const startTime = performance.now();

		const exactMatches = allDisplayFiles.filter((file) =>
			file.fileName.toLowerCase().includes(query.toLowerCase()),
		);

		if (exactMatches.length > 0) {
			setFilteredFiles(exactMatches);
			const endTime = performance.now();
			console.log("exact search in", endTime - startTime, "ms");
			return;
		}

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
					onClick={toggleSidebar}
					aria-label="Open Sidebar"
					variant="ghost"
					size="sm"
				>
					{isCollapsed ? (
						<PanelLeftOpen strokeWidth={2} size={22} />
					) : (
						<PanelLeftClose strokeWidth={2} size={22} />
					)}
				</IconButton>
			</Flex>

			<Flex
				onClick={() => {
					isCollapsed ? toggleSidebar() : null;
				}}
				height="40px"
				display="flex"
				alignItems="center"
				mt={4}
				position="relative"
			>
				<Box position="absolute" left="8px" pointerEvents="none">
					<SearchIcon color="white" size={14} />
				</Box>
				<Input
					type="text"
					placeholder="Search"
					variant="flushed"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					pl="28px"
				/>
			</Flex>

			<Stack align="stretch" gap={1} flexGrow={1} mt={4}>
				{filteredFiles.map(({ fileName, link }, i) => (
					<SidebarItem
						key={i}
						fileName={fileName}
						link={link}
						isCollapsed={isCollapsed as boolean}
					/>
				))}
			</Stack>
		</Box>
	);
};
