import { Sankey, type SankeyDataRow } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { useSharedContext } from "@/components/SharedContext";
import { SingleStat } from "@/components/SingleStat";
import {
	commodityWiseTotal,
	countryWiseTotal,
	dataset1,
	dataset2,
	dataset3,
	dataset4,
	dataset5,
	dataset6,
	metadata,
	regionWiseTotal,
} from "@/dataset/import-export";
import {
	Flex,
	GridItem,
	Heading,
	Select,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const ReactInfiniteCanvas = dynamic(
	() => import("react-infinite-canvas").then((mod) => mod.ReactInfiniteCanvas),
	{
		ssr: false,
	},
);

import type { ReactInfiniteCanvasHandle } from "react-infinite-canvas";

const totalSections = ["2023-2024", "2024-2025"] as const;
type totalSections = (typeof totalSections)[number];

export default function Home() {
	const canvasRef = useRef<ReactInfiniteCanvasHandle>(null);
	const canvasRef2 = useRef<ReactInfiniteCanvasHandle>(null);
	const canvasRef3 = useRef<ReactInfiniteCanvasHandle>(null);
	const [section, setSection] = useState<totalSections>(totalSections[1]);

	return (
		<PageShell
			metadata={metadata}
			topBarChildren={
				<Select
					defaultValue={1}
					borderRadius="md"
					onChange={(e) => {
						setSection(totalSections[e.currentTarget.selectedIndex]);
					}}
					w={{ base: "130px", sm: "130px", md: "250px" }}
					size="sm"
				>
					{totalSections.map((k, ind) => (
						<option value={ind} key={ind}>
							{k}
						</option>
					))}
				</Select>
			}
		>
			<SimpleGrid columns={{ base: 1, sm: 1, lg: 2 }} spacing={2}>
				<GridItem>
					<Heading as="h3" size="sm" mb={4}>
						Import/Export :: Commodity-wise
					</Heading>
					<Flex maxW="100%" height="700px">
						<ReactInfiniteCanvas
							ref={canvasRef}
							onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
								mountFunc.fitContentToView({ scale: 0.3 });
							}}
						>
							<div>
								<SimpleGrid columns={3} spacing={5} w="600px">
									<SingleStat
										title="Total Imports"
										value={commodityWiseTotal.import[section]}
										palette="red"
									/>
									<SingleStat
										title="Total Exports"
										value={commodityWiseTotal.export[section]}
										palette="green"
									/>
									<SingleStat
										title="Deficit"
										value={
											commodityWiseTotal.import[section] -
											commodityWiseTotal.export[section]
										}
										palette="red"
									/>
								</SimpleGrid>
								<br />
								<Sankey data={section === "2023-2024" ? dataset1 : dataset2} />
							</div>
						</ReactInfiniteCanvas>
					</Flex>
				</GridItem>
				<GridItem>
					<Heading as="h3" size="sm" mb={4}>
						Import/Export :: Region-wise
					</Heading>
					<Flex maxW="100%" height="700px">
						<ReactInfiniteCanvas
							ref={canvasRef2}
							onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
								mountFunc.fitContentToView({ scale: 0.3 });
							}}
						>
							<div>
								<SimpleGrid columns={3} spacing={5} w="600px">
									<SingleStat
										title="Total Imports"
										value={regionWiseTotal.import[section]}
										palette="red"
									/>
									<SingleStat
										title="Total Exports"
										value={regionWiseTotal.export[section]}
										palette="green"
									/>
									<SingleStat
										title="Deficit"
										value={
											regionWiseTotal.import[section] -
											regionWiseTotal.export[section]
										}
										palette="red"
									/>
								</SimpleGrid>
								<Sankey
									fontSize={32}
									height="2000px"
									data={section === "2023-2024" ? dataset3 : dataset4}
								/>
							</div>
						</ReactInfiniteCanvas>
					</Flex>
				</GridItem>
				<GridItem>
					<Heading as="h3" size="sm" mb={4}>
						Import/Export :: Country-wise
					</Heading>
					<Flex maxW="100%" height="700px">
						<ReactInfiniteCanvas
							ref={canvasRef3}
							onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
								mountFunc.fitContentToView({ scale: 0.3 });
							}}
						>
							<div>
								<SimpleGrid columns={3} spacing={5} w="600px">
									<SingleStat
										title="Total Imports"
										value={countryWiseTotal.import[section]}
										palette="red"
									/>
									<SingleStat
										title="Total Exports"
										value={countryWiseTotal.export[section]}
										palette="green"
									/>
									<SingleStat
										title="Deficit"
										value={
											countryWiseTotal.import[section] -
											countryWiseTotal.export[section]
										}
										palette="red"
									/>
								</SimpleGrid>
								<Sankey
									fontSize={16}
									height="8000px"
									data={section === "2023-2024" ? dataset5 : dataset6}
								/>
							</div>
						</ReactInfiniteCanvas>
					</Flex>
				</GridItem>
			</SimpleGrid>
		</PageShell>
	);
}
