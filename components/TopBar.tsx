import {
	ButtonGroup,
	Flex,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
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
	Select,
	Stack,
	useBreakpointValue,
	useDisclosure,
} from "@chakra-ui/react";
import {
	CodeIcon,
	ExternalLink,
	ExternalLinkIcon,
	InfoIcon,
	MenuIcon,
	PlusIcon,
} from "lucide-react";
import Link from "next/link";

import {
	type DatasetMetadata,
	supportedCurrencies,
	titleCase,
} from "@/utils/shared";
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
			justifyContent="space-between"
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
				position="absolute"
				left="50%"
				transform="translateX(-50%)"
				whiteSpace="nowrap"
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
							defaultValue="asc"
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
									defaultChecked={ind === 0}
								>
									{supportedCurrencies.get(k)?.flag}{" "}
									{supportedCurrencies.get(k)?.currency}{" "}
									{ind == 1 && usdInrRate
										? `(₹${usdInrRate.toFixed(2) || "..."})`
										: ""}
								</MenuItemOption>
							))}
						</MenuOptionGroup>

						<MenuItem
							icon={<ExternalLink height="16px" width="16px" />}
							onClick={() => {
								window.open(metadata.sourceFile, "_blank");
							}}
						>
							View Source File
						</MenuItem>
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
							<Link href={metadata.sourceFile} target="_blank" passHref>
								Details
							</Link>
						</MenuItem>
					</MenuList>
				</Menu>
			</Stack>
		</Flex>
	);
}
