import { Button, Flex, Heading, Text } from "@chakra-ui/react";

import { BarChart, PieChart, Sankey } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { useMounted } from "@/components/useMounted";
import { dataset, dataset2, dataset3, metadata } from "@/dataset/ministries";
import { Fullscreen } from "lucide-react";
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

	const handleFullScreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			document.querySelector(".inf")?.requestFullscreen();
		}
	};

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
				<Heading as="h3" fontSize="18px" fontWeight={300}>
					Ministry/Scheme/State wise Expense FY 2024/25
				</Heading>
				<Flex maxW="100%" height="700px">
					<ReactInfiniteCanvas
						className="inf"
						ref={canvasRef}
						onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
							mountFunc.fitContentToView({ scale: 0.3 });
						}}
					>
						<>
							<Button
								size="lg"
								leftIcon={<Fullscreen />}
								onClick={handleFullScreen}
							>
								Full Screen
							</Button>
							<Sankey
								data={[["From", "To", "Weight"]].concat(dataset3)}
								height="10000px"
								iters={5}
							/>
						</>
					</ReactInfiniteCanvas>
				</Flex>
			</Flex>
		</PageShell>
	);
}
