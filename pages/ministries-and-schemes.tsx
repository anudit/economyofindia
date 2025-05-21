import { Flex, Heading } from "@chakra-ui/react";

import { BarChart, PieChart, Sankey } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { useMounted } from "@/components/useMounted";
import { dataset, dataset2, dataset3, metadata } from "@/dataset/ministries";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import type { ReactInfiniteCanvasHandle } from "react-infinite-canvas";

const ReactInfiniteCanvas = dynamic(
	() => import("react-infinite-canvas").then((mod) => mod.ReactInfiniteCanvas),
	{
		ssr: false,
	},
);

export default function Home() {
	const canvasRef = useRef<ReactInfiniteCanvasHandle>(null);
	// useEffect(() => {
	//   console.log(dataset3);
	// }, []);

	return (
		<PageShell metadata={metadata}>
			<Flex
				w={{ base: "90%", md: "100%" }}
				maxW="900px"
				flexDirection="column"
				mb={4}
			>
				<Heading as="h3" fontSize="18px" fontWeight={300}>
					Ministry/Deptarment wise Expenses
				</Heading>
				<br />
				<PieChart
					data={dataset.data.sort((a, b) => b[1] - a[1])}
					type="currency"
					// options={{ direction: "vertical", height: 800, fontSize: 8 }}
				/>
				<BarChart
					header={dataset.header}
					data={dataset.data}
					options={{ direction: "vertical", height: 800, fontSize: 8 }}
				/>
				<Heading as="h3" fontSize="18px" fontWeight={300}>
					Scheme wise Expense
				</Heading>
				<br />
				<PieChart
					data={
						dataset2.data
							.map((e) => [e[0], e[1] <= 0 ? 0 : e[1]])
							.sort((a, b) => b[1] - a[1]) as [string, ...number[]][]
					}
					type="currency"
					// options={{ direction: "vertical", height: 800, fontSize: 8 }}
				/>
				<BarChart
					header={dataset2.header}
					data={
						dataset2.data
							.map((e) => [e[0], e[1] <= 0 ? 0 : e[1]])
							.sort((a, b) => b[1] - a[1]) as [string, ...number[]][]
					}
					options={{ direction: "vertical", height: 800, fontSize: 6 }}
				/>
				<Flex maxW="100%" height="700px">
					<ReactInfiniteCanvas
						ref={canvasRef}
						onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
							mountFunc.fitContentToView({ scale: 0.3 });
						}}
					>
						<Sankey
							data={[["From", "To", "Weight"]].concat(dataset3)}
							iters={20}
						/>
					</ReactInfiniteCanvas>
				</Flex>
			</Flex>
		</PageShell>
	);
}
