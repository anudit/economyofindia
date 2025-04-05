import {
  Flex,
  Select,
  Stack,
  IconButton,
  Heading,
  useBreakpointValue,
  Tooltip,
  ButtonGroup,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ExternalLink, InfoIcon } from "lucide-react";
import Link from "next/link";
import {
  chakra,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import {
  DatasetMetadata,
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
                textWrap: "auto",
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

      <Stack direction="row">
        {children}
        <Link href={metadata.sourceFile} target="_blank">
          <Tooltip label="Open Source File">
            <IconButton
              aria-label="Open Source File"
              icon={<ExternalLink height="12px" width="12px" />}
              size="sm"
              variant="outline"
              display={{ base: "none", lg: "none", xl: "flex" }}
            />
          </Tooltip>
        </Link>
      </Stack>

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
        <Select
          disabled={usdInrRate == null}
          defaultValue={0}
          borderRadius="md"
          onChange={(e) => {
            setActiveCurrency(
              Array.from(supportedCurrencies.keys())[
                e.currentTarget.selectedIndex
              ],
            );
          }}
          w="95px"
          size="sm"
        >
          {Array.from(supportedCurrencies.keys()).map((k, ind) => (
            <option value={k} key={ind} defaultChecked={ind === 0}>
              {supportedCurrencies.get(k)?.flag}{" "}
              {supportedCurrencies.get(k)?.currency}{" "}
              {ind == 1 && usdInrRate
                ? `(₹${usdInrRate.toFixed(2) || "..."})`
                : ""}
            </option>
          ))}
        </Select>
        <ButtonGroup isAttached size="sm">
          <IconButton
            icon={<ExternalLink height="12px" width="12px" />}
            variant="outline"
            aria-label="View Source File"
            display={{ base: "flex", lg: "flex", xl: "none" }}
          />
          <IconButton
            icon={<InfoIcon height="16px" width="16px" />}
            onClick={onOpen}
            variant="outline"
            aria-label="View Source File"
            display={{ base: "flex", lg: "flex", xl: "none" }}
          />
        </ButtonGroup>
      </Stack>
    </Flex>
  );
}
