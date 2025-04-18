import { Flex, Heading, SimpleGrid, Text, chakra } from "@chakra-ui/react";
import { MinusIcon, PlusIcon, TrendingDown, TrendingUp } from "lucide-react";

import { BarChart } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { useSharedContext } from "@/components/SharedContext";
import SimpleDataTable from "@/components/SimpleDataTable";
import { stateToIcon } from "@/components/StateIcons";
import { dataset, dataset2, dataset3, metadata } from "@/dataset/state-budgets";
import { CRORE, numFormat } from "@/utils/shared";

export default function Home() {
	return (
		<PageShell metadata={metadata}>
			<Heading as="h2" size="md" maxW="95%">
				Key fiscal indicators for states (FY25 BE)
			</Heading>
			<br />
			<SimpleGrid maxW="95%" columns={[1, 1, 2, 3, 4]}>
				{Object.entries(dataset2).map(([state, value], id) => {
					return (
						<Stat
							key={id}
							title={state}
							value1={value["Revenue receipts FY25BE (Rs '00 crore)"]}
							diff1={value["Revenue receipts YoY (%)"]}
							value2={value["Non‑debt Capital Receipts FY25BE (Rs '00 crore)"]}
							diff2={value["Non‑debt Capital Receipts YoY (%)"]}
							value3={value["Revenue expenditure FY25BE (Rs '00 crore)"]}
							diff3={value["Revenue expenditure YoY (%)"]}
							value4={value["Capital expenditure FY25BE (Rs '00 crore)"]}
							diff4={value["Capital expenditure YoY (%)"]}
							diff5={value["Fiscal deficit change over FY24RE (bps)"] * 0.01}
						/>
					);
				})}
			</SimpleGrid>
			<br />
			{dataset3.map((d, id) => {
				return (
					<Flex key={id} w="95%" direction="column" my={2}>
						<Heading as="h2" size="md">
							{d.title}
						</Heading>
						<BarChart header={d.header} data={d.data} />
					</Flex>
				);
			})}
			<br />
			<Heading as="h2" size="md" maxW="95%">
				2024
			</Heading>
			<br />
			<SimpleDataTable data={dataset} />
		</PageShell>
	);
}

const Stat = ({
	title,
	value1,
	diff1,
	diff2,
	diff3,
	diff4,
	diff5,
	value2,
	value3,
	value4,
}: {
	title: string;
	value1: number;
	diff1: number;
	value2: number;
	diff2: number;
	value3: number;
	diff3: number;
	value4: number;
	diff4: number;
	diff5: number;
}) => {
	const { activeCurrency } = useSharedContext();
	return (
		<Flex
			direction="column"
			bg="gray.900"
			p={4}
			m={2}
			borderRadius="md"
			boxShadow="md"
			border="1px solid"
			borderColor="gray.700"
			w="350px"
		>
			<Flex
				alignItems="center"
				direction="row"
				justifyContent="space-between"
				mb={2}
			>
				<Heading as="h3" size="md" fontWeight={800}>
					{title}
				</Heading>
				{stateToIcon(title)}
			</Flex>
			<Flex alignItems="center" direction="column" fontSize={"sm"}>
				<Flex w="100%" justifyContent="space-between" alignItems="center">
					<Text>Revenue receipts</Text>
					<Flex fontWeight={500} alignItems="center">
						<PlusIcon size={14} />{" "}
						<Text>{numFormat(value1 * CRORE * 100, activeCurrency, true)}</Text>
						{diff1 > 0 ? (
							<chakra.span
								fontSize="12px"
								color={"green"}
								fontWeight={300}
								ml={1}
								display="inline-flex"
								alignItems="flex-start"
							>
								<TrendingUp
									size={12}
									style={{
										marginLeft: "2px",
										marginRight: "2px",
										marginTop: "3px",
									}}
								/>{" "}
								{diff1}%
							</chakra.span>
						) : (
							<chakra.span
								fontSize="12px"
								color={"red"}
								fontWeight={300}
								ml={1}
								display="inline-flex"
								alignItems="flex-start"
							>
								<TrendingDown
									size={12}
									style={{
										marginLeft: "2px",
										marginRight: "2px",
										marginTop: "3px",
									}}
								/>{" "}
								{diff1}%
							</chakra.span>
						)}
					</Flex>
				</Flex>

				<Flex w="100%" justifyContent="space-between">
					<Text>Non‑debt Capital Receipts</Text>
					<Flex fontWeight={500} alignItems="center">
						<PlusIcon size={14} />{" "}
						<Text>{numFormat(value2 * CRORE * 100, activeCurrency, true)}</Text>
						{diff2 > 0 ? (
							<chakra.span
								fontSize="12px"
								color={"green"}
								fontWeight={300}
								ml={1}
								display="inline-flex"
								alignItems="flex-start"
							>
								<TrendingUp
									size={12}
									style={{
										marginLeft: "2px",
										marginRight: "2px",
										marginTop: "3px",
									}}
								/>{" "}
								{diff2}%
							</chakra.span>
						) : (
							<chakra.span
								fontSize="12px"
								color={"red"}
								fontWeight={300}
								ml={1}
								display="inline-flex"
								alignItems="flex-start"
							>
								<TrendingDown
									size={12}
									style={{
										marginLeft: "2px",
										marginRight: "2px",
										marginTop: "3px",
									}}
								/>{" "}
								{diff2}%
							</chakra.span>
						)}
					</Flex>
				</Flex>

				<Flex w="100%" justifyContent="space-between">
					<Text>Revenue expenditure</Text>
					<Flex fontWeight={500} alignItems="center">
						<MinusIcon size={14} />{" "}
						<Text>{numFormat(value3 * CRORE * 100, activeCurrency, true)}</Text>
						{diff3 < 0 ? (
							<chakra.span
								fontSize="12px"
								color={"green"}
								fontWeight={300}
								display="inline-flex"
								alignItems="flex-start"
							>
								<TrendingDown
									size={12}
									style={{
										marginLeft: "2px",
										marginRight: "2px",
										marginTop: "3px",
									}}
								/>{" "}
								{diff3}%
							</chakra.span>
						) : (
							<chakra.span
								fontSize="12px"
								color={"red"}
								fontWeight={300}
								ml={1}
								display="inline-flex"
								alignItems="flex-start"
							>
								<TrendingUp
									size={12}
									style={{
										marginLeft: "2px",
										marginRight: "2px",
										marginTop: "3px",
									}}
								/>{" "}
								{diff3}%
							</chakra.span>
						)}
					</Flex>
				</Flex>

				<Flex w="100%" justifyContent="space-between">
					<Text>Capital expenditure</Text>
					<Flex fontWeight={500} alignItems="center">
						<MinusIcon size={14} />{" "}
						<Text>{numFormat(value4 * CRORE * 100, activeCurrency, true)}</Text>
						{diff4 < 0 ? (
							<chakra.span
								fontSize="12px"
								color={"green"}
								fontWeight={300}
								display="inline-flex"
								alignItems="flex-start"
							>
								<TrendingDown
									size={12}
									style={{
										marginLeft: "2px",
										marginRight: "2px",
										marginTop: "3px",
									}}
								/>{" "}
								{diff4}%
							</chakra.span>
						) : (
							<chakra.span
								fontSize="12px"
								color={"red"}
								fontWeight={300}
								ml={1}
								display="inline-flex"
								alignItems="flex-start"
							>
								<TrendingUp
									size={12}
									style={{
										marginLeft: "2px",
										marginRight: "2px",
										marginTop: "3px",
									}}
								/>{" "}
								{diff4}%
							</chakra.span>
						)}
					</Flex>
				</Flex>

				<Flex w="100%" justifyContent="space-between">
					<Text>Net Deficit = </Text>
					<Flex fontWeight={500} alignItems="center">
						{value1 + value2 - (value3 + value4) > 0 ? (
							<PlusIcon size={14} />
						) : (
							<MinusIcon size={14} />
						)}
						<Text>
							{numFormat(
								Math.abs(value1 + value2 - (value3 + value4)) * CRORE * 100,
								activeCurrency,
								true,
							)}
						</Text>
						{diff5 < 0 ? (
							<chakra.span
								fontSize="12px"
								color={"green"}
								fontWeight={300}
								ml={1}
								display="inline-flex"
								alignItems="flex-start"
							>
								<TrendingDown
									size={12}
									style={{
										marginLeft: "2px",
										marginRight: "2px",
										marginTop: "3px",
									}}
								/>{" "}
								{diff5.toFixed(2)}%
							</chakra.span>
						) : (
							<chakra.span
								fontSize="12px"
								color={"red"}
								fontWeight={300}
								ml={1}
								display="inline-flex"
								alignItems="flex-start"
							>
								<TrendingUp
									size={12}
									style={{
										marginLeft: "2px",
										marginRight: "2px",
										marginTop: "3px",
									}}
								/>{" "}
								{diff5.toFixed(2)}%
							</chakra.span>
						)}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
