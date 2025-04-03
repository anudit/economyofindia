import { Flex, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { Dispatch, SetStateAction } from "react";

import { Dataset4 } from "@/dataset/afs-2025-2026";
import { Sidebar } from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { DatasetMetadata } from "@/utils/shared";

export default function PageShell({
  setSection,
  setUsd,
  metadata,
  dataset,
  children,
}: {
  children: React.ReactNode;
  metadata: DatasetMetadata;
  dataset: Dataset4;
  setSection: Dispatch<SetStateAction<string>>;
  setUsd: Dispatch<SetStateAction<boolean>>;
}) {
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
          <TopBar
            dataset={dataset}
            metadata={metadata}
            setUsd={setUsd}
            setSection={setSection}
          />
          <Flex
            w="100%"
            h="100%"
            flexDir="column"
            backgroundColor={useColorModeValue("black", "#2E2E31")}
            p="20px"
            m="5px"
            borderRadius="10px"
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
