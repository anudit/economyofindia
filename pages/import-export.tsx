import { Sankey, type SankeyDataRow } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { useSharedContext } from "@/components/SharedContext";
import { SingleStat } from "@/components/SingleStat";
import {
	commodityWiseTotal,
	dataset1,
	dataset2,
	dataset3,
	dataset4,
	metadata,
	regionWiseTotal,
} from "@/dataset/import-export";
import { CRORE, numFormat, sum } from "@/utils/shared";
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
	const { activeCurrency } = useSharedContext();
	const [section, setSection] = useState<totalSections>(totalSections[1]);

	return (
		<PageShell
			metadata={metadata}
			topBarChildren={
				<Select
					defaultValue={3}
					borderRadius="md"
					onChange={(e) => {
						setSection(totalSections[e.currentTarget.selectedIndex]);
					}}
					w={{ base: "130px", sm: "130px", md: "250px" }}
					size="sm"
				>
					{totalSections.map((k, ind) => (
						<option value={ind} key={ind} selected={ind === 1}>
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
								mountFunc.fitContentToView({ scale: 0.2 });
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
								mountFunc.fitContentToView({ scale: 0.2 });
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
									data={section === "2023-2024" ? dataset3 : dataset4}
								/>
							</div>
						</ReactInfiniteCanvas>
					</Flex>
				</GridItem>
			</SimpleGrid>
		</PageShell>
	);
}
