import { COLORS, RED_COLORS, numFormat } from "@/utils/shared";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useSharedContext } from "./SharedContext";

export const SingleStat = ({
	title,
	value,
	palette,
}: {
	title: string;
	value: number;
	palette?: "green" | "red";
}) => {
	const { activeCurrency } = useSharedContext();
	return (
		<Flex
			direction="column"
			bg="gray.900"
			p={4}
			borderRadius="md"
			boxShadow="md"
			border="1px solid"
			borderColor="gray.700"
			w="190px"
		>
			<Heading as="h3" size="xs" fontWeight={300}>
				{title}
			</Heading>
			<Text
				fontSize="large"
				mt={2}
				fontWeight={500}
				color={
					palette
						? palette === "green"
							? COLORS[2]
							: RED_COLORS[2]
						: undefined
				}
			>
				{numFormat(value, activeCurrency, true)}
			</Text>
		</Flex>
	);
};
