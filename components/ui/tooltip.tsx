"use client";

import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface TooltipProps extends ChakraTooltip.RootProps {
	showArrow?: boolean;
	portaled?: boolean;
	label?: React.ReactNode;
	disabled?: boolean;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
	function Tooltip(props, ref) {
		const {
			showArrow,
			children,
			portaled = true,
			label,
			disabled,
			...rest
		} = props;

		if (disabled) return children;

		const content = (
			<ChakraTooltip.Positioner>
				<ChakraTooltip.Content ref={ref} {...rest}>
					{showArrow && (
						<ChakraTooltip.Arrow>
							<ChakraTooltip.ArrowTip />
						</ChakraTooltip.Arrow>
					)}
					{label}
				</ChakraTooltip.Content>
			</ChakraTooltip.Positioner>
		);

		return (
			<ChakraTooltip.Root {...rest}>
				<ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
				{portaled ? <Portal>{content}</Portal> : content}
			</ChakraTooltip.Root>
		);
	},
);
