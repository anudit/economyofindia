import {
	Dialog,
	Flex,
	Heading,
	IconButton,
	Menu,
	Portal,
	Stack,
	useBreakpointValue,
	useDisclosure,
} from "@chakra-ui/react";
import { CodeIcon, ExternalLink, InfoIcon, MenuIcon } from "lucide-react";

import {
	type DatasetMetadata,
	supportedCurrencies,
	titleCase,
} from "@/utils/shared";
import { WaybackIcon } from "./Icons";
import { useSharedContext } from "./SharedContext";

export default function TopBar({
	metadata,
	children,
}: {
	metadata: DatasetMetadata;
	children: React.ReactNode;
}) {
	const { usdInrRate, setActiveCurrency } = useSharedContext();
	const { open, onOpen, onClose } = useDisclosure();
	const title = useBreakpointValue({
		base: metadata.titleShort,
		xl: metadata.title,
	});

	return (
		<Flex
			w="100%"
			h="60px"
			flexDir="row"
			background="#23222570"
			position="sticky"
			top="0"
			alignItems="center"
			justifyContent={{ base: "space-between", md: "space-between" }}
			pl="10px"
			pr="20px"
			backdropFilter="blur(6px)"
			zIndex={100}
		>
			<Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header fontSize="sm">Dataset Details</Dialog.Header>
							<Dialog.CloseTrigger />
							<Dialog.Body>
								<pre
									style={{
										textWrap: "balance",
										wordBreak: "break-all",
										fontSize: "12px",
									}}
								>
									{JSON.stringify(metadata, null, 4)}
								</pre>
								<br />
							</Dialog.Body>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>

			<Stack direction="row">{children}</Stack>

			<Heading
				fontSize="sm"
				whiteSpace="nowrap"
				position={{ base: undefined, md: "absolute" }}
				left={{ base: undefined, md: "50%" }}
				transform={{ base: undefined, md: "translateX(-50%)" }}
			>
				{titleCase(title as string)}
			</Heading>

			<Stack direction="row">
				<Menu.Root>
					<Menu.Trigger asChild>
						<IconButton aria-label="Options" variant="outline" size="sm">
							<MenuIcon height="16px" width="16px" />
						</IconButton>
					</Menu.Trigger>
					<Portal>
						<Menu.Positioner>
							<Menu.Content>
								<Menu.RadioItemGroup
									defaultValue="0"
									onValueChange={(e) => {
										setActiveCurrency(
											Array.from(supportedCurrencies.keys())[
												Number.parseInt(e.value as string, 10)
											],
										);
									}}
								>
									{Array.from(supportedCurrencies.keys()).map((k, ind) => (
										<Menu.RadioItem value={k.toString()} key={ind}>
											{supportedCurrencies.get(k)?.flag}{" "}
											{supportedCurrencies.get(k)?.currency}{" "}
											{ind === 1 && usdInrRate
												? `(₹${usdInrRate.toFixed(2) || "..."})`
												: ""}
										</Menu.RadioItem>
									))}
								</Menu.RadioItemGroup>

								{metadata.wayback && (
									<Menu.Item
										value="wayback"
										onClick={() => {
											window.open(metadata.wayback, "_blank");
										}}
									>
										<WaybackIcon height="16px" width="16px" />
										Wayback Machine
									</Menu.Item>
								)}

								{metadata?.sourceFiles.map((e, id) => {
									return (
										<Menu.Item
											key={id}
											value={`source-${id}`}
											onClick={() => {
												window.open(e.sourceFile, "_blank");
											}}
										>
											<ExternalLink height="16px" width="16px" />
											View Source File {id + 1}
										</Menu.Item>
									);
								})}
								<Menu.Item
									value="api"
									onClick={() => {
										window.open(metadata.api, "_blank");
									}}
								>
									<CodeIcon height="16px" width="16px" />
									API
								</Menu.Item>
								<Menu.Item value="details" onClick={onOpen}>
									<InfoIcon height="16px" width="16px" />
									Details
								</Menu.Item>
							</Menu.Content>
						</Menu.Positioner>
					</Portal>
				</Menu.Root>
			</Stack>
		</Flex>
	);
}
