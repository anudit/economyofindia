import { SupportedCurrencies, supportedCurrencies } from "@/utils/shared";
import {
	Box,
	Flex,
	Text,
	chakra,
	shouldForwardProp,
	useTheme,
} from "@chakra-ui/react";
import {
	animate,
	isValidMotionProp,
	motion,
	useMotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";
import type { FC } from "react";
import { useSharedContext } from "./SharedContext";

const MotionBox = chakra(motion.div, {
	shouldForwardProp: (prop) =>
		isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface DigitProps {
	value: number;
}

const Digit: React.FC<DigitProps> = ({ value }) => {
	const y = useMotionValue(0);
	const numbers = Array.from({ length: 10 }, (_, i) => i);
	// const theme = useTheme(); // theme can be used for dynamic height if needed

	// Assuming h="8" corresponds to 2rem, and 1rem = 16px, so 32px.
	// This height is crucial for the animation to align digits correctly.
	const digitContainerHeight = 32; // Or derive from theme: parseFloat(theme.space[8]) * 16

	useEffect(() => {
		const animation = animate(y, value * digitContainerHeight * -1, {
			type: "spring",
			damping: 30,
			stiffness: 300,
		});
		return animation.stop;
	}, [value, y, digitContainerHeight]);

	return (
		<Box
			position="relative"
			w={{ base: "3", md: "5" }}
			h="8" // This should match digitContainerHeight in rem/theme units
			overflow="hidden"
			fontSize={{ base: "xl", md: "4xl" }} // Ensure this matches the parent's font size for consistency
			fontWeight="medium" // Ensure this matches the parent's font weight
		>
			<MotionBox position="absolute" width="100%" style={{ y }}>
				{numbers.map((n) => (
					<Flex
						key={n}
						h="8" // Match the outer box height
						alignItems="center"
						justifyContent="center"
					>
						{n}
					</Flex>
				))}
			</MotionBox>
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
			{/* Adjust gap as needed */}
			{characters.map((char, i) => {
				if (!Number.isNaN(Number(char))) {
					// Check if the character is a digit
					return <Digit key={`${char}-${i}`} value={Number(char)} />;
				} else if (char === ",") {
					// Render comma - style as needed
					return (
						<Text
							key={`comma-${i}`}
							as="span"
							fontSize={{ base: "xl", md: "4xl" }} // Match digit font size
							fontWeight="medium" // Match digit font weight
							lineHeight="8" // Align with digit height (2rem or 32px)
							alignSelf="flex-end" // Try to align it with the bottom of the digits
							pb="1" // Small padding adjustment if needed for vertical alignment
						>
							{char}
						</Text>
					);
				}
				return null; // Should not happen with toLocaleString output for numbers
			})}
		</Flex>
	);
};

interface LiveValueProps {
	startValue: number;
	ratePerSec: number;
	endValue?: number;
	type?: "currency" | "value"; // Added locale prop
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

		return () => clearInterval(intervalId); // Cleanup interval on component unmount
	}, [ratePerSec, endValue]); // startValue is only for initialization

	return (
		<AnimateNumber
			value={count}
			locale={activeCurrency === SupportedCurrencies.INR ? "en-IN" : "en-US"}
		/>
	);
}
