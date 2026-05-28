import { Box, Flex, Text } from "@chakra-ui/react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { SupportedCurrencies } from "@/utils/shared";
import { useSharedContext } from "./SharedContext";

interface DigitProps {
	value: number;
}

const Digit: React.FC<DigitProps> = ({ value }) => {
	const numbers = Array.from({ length: 10 }, (_, i) => i);
	const digitContainerHeight = 32;
	const yOffset = value * digitContainerHeight * -1;

	return (
		<Box
			position="relative"
			w={{ base: "3", md: "5" }}
			h="8"
			overflow="hidden"
			fontSize={{ base: "xl", md: "4xl" }}
			fontWeight="medium"
		>
			<Box
				position="absolute"
				width="100%"
				style={{
					transform: `translateY(${yOffset}px)`,
					transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
				}}
			>
				{numbers.map((n) => (
					<Flex key={n} h="8" alignItems="center" justifyContent="center">
						{n}
					</Flex>
				))}
			</Box>
		</Box>
	);
};

interface AnimateNumberProps {
	value: number;
	locale: "en-US" | "en-IN";
}

export const AnimateNumber: FC<AnimateNumberProps> = ({ value, locale }) => {
	const formattedValue = value.toLocaleString(locale);
	const characters = formattedValue.split("");

	return (
		<Flex gap={0.5}>
			{" "}
			{characters.map((char, i) => {
				if (!Number.isNaN(Number(char))) {
					return <Digit key={`${char}-${i}`} value={Number(char)} />;
				} else if (char === ",") {
					return (
						<Text
							key={`comma-${i}`}
							as="span"
							fontSize={{ base: "xl", md: "4xl" }}
							fontWeight="medium"
							lineHeight="8"
							alignSelf="flex-end"
							pb="1"
						>
							{char}
						</Text>
					);
				}
				return null;
			})}
		</Flex>
	);
};

interface LiveValueProps {
	startValue: number;
	ratePerSec: number;
	endValue?: number;
	type?: "currency" | "value";
}

export default function LiveValue({
	startValue,
	ratePerSec,
	endValue = Number.POSITIVE_INFINITY,
	type = "value",
}: LiveValueProps) {
	const { activeCurrency } = useSharedContext();
	const [count, setCount] = useState(startValue);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCount((prev) => {
				const nextVal = prev + ratePerSec;
				return Math.min(nextVal, endValue);
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [ratePerSec, endValue]);

	return (
		<AnimateNumber
			value={count}
			locale={activeCurrency === SupportedCurrencies.INR ? "en-IN" : "en-US"}
		/>
	);
}
