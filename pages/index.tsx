import {
  Flex,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  IconButton,
  Heading,
  useBreakpointValue,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import Head from "next/head";
import { ExternalLink, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";

import { dataset, dataset2, metadata } from "@/dataset/afs-2025-2026";
import ChartGrid from "@/components/ChartGrid";
import { Sidebar } from "@/components/Sidebar";
import { USDINR } from "@/utils/shared";

export default function Home() {
  const [isUsd, setUsd] = useState(false);
  const [section, setSections] = useState<string>(Object.keys(dataset)[3]);
  const title = useBreakpointValue({
    base: metadata.titleShort,
    xl: metadata.title,
  });

  return (
    <>
      <Head>
        <title>Economy of India</title>
        <meta name="description" content="The Economy of India at a glance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="row" w="100vw" minH="100vh">
        <Sidebar />
        <Flex direction="column" w="100%" minH="100vh">
          <Flex
            w="100%"
            h="60px"
            flexDir="row"
            background="#23222570"
            position="sticky"
            top="0"
            alignItems="center"
            justifyContent="space-between"
            paddingX="20px"
            backdropFilter="blur(6px)"
            zIndex={100}
          >
            <Stack direction="row">
              <Select
                defaultValue={3}
                borderRadius="md"
                onChange={(e) => {
                  setSections(
                    Object.keys(dataset)[e.currentTarget.selectedIndex],
                  );
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

            <Stack direction="row">
              <Text fontSize="sm">INR</Text>
              <Switch
                colorScheme="teal"
                onChange={(e) => {
                  setUsd(e.currentTarget.checked);
                }}
              />
              <Text fontSize="sm">USD ({USDINR})</Text>
            </Stack>
          </Flex>

          <Flex
            w="100%"
            h="100%"
            flexDir="column"
            backgroundColor={useColorModeValue("black", "#2E2E31")}
            p="20px"
            borderRadius="10px"
          >
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
              <ChartGrid
                dataset={dataset}
                isUsd={isUsd}
                section={section}
                palette="green"
              />
              <ChartGrid
                dataset={dataset2}
                isUsd={isUsd}
                section={section}
                palette="red"
              />
            </SimpleGrid>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
