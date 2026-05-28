import { Button, Flex, Heading } from "@chakra-ui/react";
import { Fullscreen } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import type { ReactInfiniteCanvasHandle } from "react-infinite-canvas";
import {
	BarChart,
	PieChart,
	Sankey,
	type SankeyDataRow,
	type SankeyDataWithHeader,
} from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { dataset, dataset2, dataset3, metadata } from "@/dataset/ministries";

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
					data={dataset2.data
						.map(
							(e) =>
								[e[0], (e[1] as number) <= 0 ? 0 : e[1]] as [
									string,
									...number[],
								],
						)
						.sort((a, b) => b[1] - a[1])}
					type="currency"
				/>
				<BarChart
					header={dataset2.header}
					data={dataset2.data
						.map(
							(e) =>
								[e[0], (e[1] as number) <= 0 ? 0 : e[1]] as [
									string,
									...number[],
								],
						)
						.sort((a, b) => b[1] - a[1])}
					options={{ direction: "vertical", height: 800, fontSize: 6 }}
				/>
				<BarChart
					header={dataset2.header}
					data={dataset2.data
						.map(
							(e) =>
								[e[0], (e[1] as number) <= 0 ? 0 : e[1]] as [
									string,
									...number[],
								],
						)
						.sort((a, b) => b[1] - a[1])}
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
						<Button size="lg" onClick={handleFullScreen}>
							<Fullscreen />
							Full Screen
						</Button>
						<Sankey
							data={
								[["From", "To", "Weight"] as unknown as SankeyDataRow].concat(
									dataset3,
								) as unknown as SankeyDataWithHeader
							}
							height="10000px"
							iters={5}
						/>
					</ReactInfiniteCanvas>
				</Flex>
			</Flex>
		</PageShell>
	);
}
