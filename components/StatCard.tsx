import { Flex, GridItem, Heading } from "@chakra-ui/react";
import { ChartPie } from "lucide-react";
import { useEffect } from "react";

import { COLORS, RED_COLORS, numFormat } from "@/utils/shared";
import { useSharedContext } from "./SharedContext";

export default function StatCard({
	stat,
	title,
	route,
	palette = "green",
}: {
	stat: number;
	title: string;
	route: string;
	palette?: "green" | "red";
}) {
	const { activeCurrency } = useSharedContext();

	return (
		<GridItem
			// w={respWidth}
			h="440px"
			flexDir="column"
			justifyContent="space-between"
			alignItems="center"
			borderStyle="solid"
			borderColor="whiteAlpha.400"
			borderRadius="md"
			borderWidth="1px"
			_hover={{
				borderColor: "whiteAlpha.500",
			}}
		>
			<Flex
				w="100%"
				height="40px"
				display="flex"
				flexDirection="row"
				borderBottomStyle="solid"
				borderBottomColor="white.800"
				borderBottomWidth="0.5px"
				justifyContent="start"
				alignItems="center"
				paddingLeft="20px"
			>
				<ChartPie
					color="rgba(255, 255, 255, 0.48)"
					size={14}
					style={{ marginRight: "10px" }}
				/>
				<Heading
					as="h4"
					fontSize="xs"
					w="100%"
					color="whiteAlpha.600"
					fontWeight={400}
					isTruncated
				>
					{route}
				</Heading>
			</Flex>
			<Heading
				as="h3"
				fontSize="md"
				w="100%"
				color="#ffffffc9"
				textAlign="center"
				p="10px"
				mt="10px"
			>
				{title}
			</Heading>
			<Heading
				fontSize="xxx-large"
				w="100%"
				h="310px"
				display="flex"
				color={palette === "green" ? COLORS[2] : RED_COLORS[2]}
				justifyContent="center"
				alignItems="center"
				p="10px"
			>
				{numFormat(stat, activeCurrency, true, false)}
			</Heading>
		</GridItem>
	);
}
