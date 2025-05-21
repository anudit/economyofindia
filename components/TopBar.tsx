import {
	Flex,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	useBreakpointValue,
	useDisclosure,
} from "@chakra-ui/react";
import { CodeIcon, ExternalLink, InfoIcon, MenuIcon } from "lucide-react";
import Link from "next/link";

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
	const { isOpen, onOpen, onClose } = useDisclosure();
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
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize="sm">Dataset Details</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
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
					</ModalBody>
				</ModalContent>
			</Modal>

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
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<MenuIcon height="16px" width="16px" />}
						variant="outline"
						size="sm"
					/>
					<MenuList>
						<MenuOptionGroup
							defaultValue="0"
							title="Currency"
							type="radio"
							onChange={(e) => {
								setActiveCurrency(
									Array.from(supportedCurrencies.keys())[
										Number.parseInt(e as string)
									],
								);
							}}
						>
							{Array.from(supportedCurrencies.keys()).map((k, ind) => (
								<MenuItemOption
									value={k.toString()}
									key={ind}
									// _selected={ind === 0}
								>
									{supportedCurrencies.get(k)?.flag}{" "}
									{supportedCurrencies.get(k)?.currency}{" "}
									{ind === 1 && usdInrRate
										? `(₹${usdInrRate.toFixed(2) || "..."})`
										: ""}
								</MenuItemOption>
							))}
						</MenuOptionGroup>

						{metadata.wayback && (
							<MenuItem
								icon={<WaybackIcon height="16px" width="16px" />}
								onClick={() => {
									window.open(metadata.wayback, "_blank");
								}}
							>
								Wayback Machine
							</MenuItem>
						)}

						{metadata?.sourceFiles.map((e, id) => {
							return (
								<MenuItem
									key={id}
									icon={<ExternalLink height="16px" width="16px" />}
									onClick={() => {
										window.open(e.sourceFile, "_blank");
									}}
								>
									View Source File {id + 1}
								</MenuItem>
							);
						})}
						<MenuItem
							icon={<CodeIcon height="16px" width="16px" />}
							onClick={() => {
								window.open(metadata.api, "_blank");
							}}
						>
							API
						</MenuItem>
						<MenuItem
							icon={<InfoIcon height="16px" width="16px" />}
							onClick={onOpen}
						>
							Details
						</MenuItem>
					</MenuList>
				</Menu>
			</Stack>
		</Flex>
	);
}
