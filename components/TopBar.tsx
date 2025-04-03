import {
  Flex,
  Select,
  Stack,
  Switch,
  Text,
  IconButton,
  Heading,
  useBreakpointValue,
  Tooltip,
} from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";

import { Dataset4 } from "@/dataset/afs-2025-2026";
import { DatasetMetadata, supportedCurrencies } from "@/utils/shared";
import { useSharedContext } from "./SharedContext";

export default function TopBar({
  dataset,
  metadata,
  setSection,
}: {
  dataset: Dataset4;
  metadata: DatasetMetadata;
  setSection: Dispatch<SetStateAction<string>>;
}) {
  const { usdInrRate, setActiveCurrency } = useSharedContext();

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
      <Stack direction="row">
        <Select
          defaultValue={3}
          borderRadius="md"
          onChange={(e) => {
            setSection(Object.keys(dataset)[e.currentTarget.selectedIndex]);
          }}
          w={{ base: "50px", md: "250px" }}
          size="sm"
        >
          {Object.keys(dataset).map((k, ind) => (
            <option value={ind} key={ind} defaultChecked={ind === 3}>
              {k}
            </option>
          ))}
        </Select>
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

          <IconButton
            icon={<ExternalLink height="12px" width="12px" />}
            size="sm"
            variant="outline"
            aria-label="View Source File"
            display={{ base: "flex", lg: "flex", xl: "none" }}
          />
        </Link>
      </Stack>

      <Heading
        fontSize="sm"
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        whiteSpace="nowrap"
      >
        {title}
      </Heading>

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
        w="100px"
        size="sm"
      >
        {Array.from(supportedCurrencies.keys()).map((k, ind) => (
          <option value={k} key={ind} defaultChecked={ind === 0}>
            {supportedCurrencies.get(k)?.flag}{" "}
            {supportedCurrencies.get(k)?.currency}
          </option>
        ))}
      </Select>
    </Flex>
  );
}
