"use client";

import type { IconButtonProps, SpanProps } from "@chakra-ui/react";
import { ClientOnly, IconButton, Skeleton, Span } from "@chakra-ui/react";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider, useTheme } from "next-themes";
import { forwardRef } from "react";

export type ColorModeProviderProps = ThemeProviderProps;

export function ColorModeProvider(props: ColorModeProviderProps) {
	return (
		<ThemeProvider attribute="class" disableTransitionOnChange {...props} />
	);
}

export type ColorMode = "light" | "dark";

export interface UseColorModeReturn {
	colorMode: ColorMode;
	setColorMode: (colorMode: ColorMode) => void;
	toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
	const { resolvedTheme, setTheme } = useTheme();
	const colorMode = (resolvedTheme ?? "dark") as ColorMode;
	return {
		colorMode,
		setColorMode: (colorMode) => setTheme(colorMode),
		toggleColorMode: () => setTheme(colorMode === "dark" ? "light" : "dark"),
	};
}

export function useColorModeValue<T>(light: T, dark: T): T {
	const { colorMode } = useColorMode();
	return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
	const { colorMode } = useColorMode();
	return colorMode === "dark" ? <>&#x1F319;</> : <>&#x2600;&#xFE0F;</>;
}

interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {
	"aria-label"?: string;
}

export const ColorModeButton = forwardRef<
	HTMLButtonElement,
	ColorModeButtonProps
>(function ColorModeButton(props, ref) {
	const { toggleColorMode } = useColorMode();
	return (
		<ClientOnly fallback={<Skeleton boxSize="8" />}>
			<IconButton
				onClick={toggleColorMode}
				variant="ghost"
				aria-label="Toggle color mode"
				size="sm"
				ref={ref}
				{...props}
			>
				<ColorModeIcon />
			</IconButton>
		</ClientOnly>
	);
});

export const LightMode = forwardRef<HTMLSpanElement, SpanProps>(
	function LightMode(props, ref) {
		return (
			<Span
				color="fg"
				display="contents"
				className="light"
				colorScheme="light"
				ref={ref}
				{...props}
			/>
		);
	},
);

export const DarkMode = forwardRef<HTMLSpanElement, SpanProps>(
	function DarkMode(props, ref) {
		return (
			<Span
				color="fg"
				display="contents"
				className="dark"
				colorScheme="dark"
				ref={ref}
				{...props}
			/>
		);
	},
);
