import {
	Flex,
	GridItem,
	Heading,
	NativeSelect,
	SimpleGrid,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Sankey } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
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
				<NativeSelect.Root
					defaultValue="1"
					onChange={(e) => {
						setSection(
							totalSections[(e.target as HTMLSelectElement).selectedIndex],
						);
					}}
					size="sm"
					width={{ base: "130px", sm: "130px", md: "250px" }}
				>
					<NativeSelect.Field borderRadius="md">
						{totalSections.map((k, ind) => (
							<option value={ind} key={ind}>
								{k}
							</option>
						))}
					</NativeSelect.Field>
					<NativeSelect.Indicator />
				</NativeSelect.Root>
			}
		>
			<SimpleGrid columns={{ base: 1, sm: 1, lg: 2 }} gap={2}>
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
								<SimpleGrid columns={3} gap={5} w="600px">
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
								<SimpleGrid columns={3} gap={5} w="600px">
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
								<SimpleGrid columns={3} gap={5} w="600px">
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
