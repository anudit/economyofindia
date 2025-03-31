import {
  Flex,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button,
  IconButton,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { dataset, dataset2, metadata } from "@/dataset/afs-2025-2026";
import {
  chartDataFormat,
  CRORE,
  SimpleDataset,
  titleCase,
  USDINR,
} from "@/utils/shared";
import { useRef, useState } from "react";
import ChartCard from "@/components/ChartCard";
import StatCard from "@/components/StatCard";
import { ExternalLink, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import ChartGrid from "@/components/ChartGrid";

export default function Home() {
  const [isUsd, setUsd] = useState(false);
  const [section, setSections] = useState<string>(Object.keys(dataset)[3]);
  const title = useBreakpointValue({
    base: metadata.titleShort,
    xl: metadata.title,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <Head>
        <title>Economy of India</title>
        <meta name="description" content="The Economy of India at a glance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent zIndex={10001}>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Flex
        w="100vw"
        h="60px"
        flexDir="row"
        background="blackAlpha.500"
        position="fixed"
        top="0"
        alignItems="center"
        justifyContent="space-between"
        paddingX="20px"
        backdropFilter="blur(6px)"
        zIndex={10000}
      >
        <Stack direction="row">
          <IconButton
            ref={btnRef}
            icon={<PanelLeftOpen />}
            onClick={onOpen}
            aria-label="Open Sidebar"
            variant="ghost"
            size="sm"
          />
          <Select
            defaultValue={3}
            borderRadius="md"
            onChange={(e) => {
              setSections(Object.keys(dataset)[e.currentTarget.selectedIndex]);
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
            <Button
              leftIcon={<ExternalLink height="12px" width="12px" />}
              size="sm"
              variant="outline"
              display={{ base: "none", lg: "none", xl: "flex" }}
            >
              File Source
            </Button>

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

      <Flex w="100%" h="100%" flexDir="column" mt="60px">
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2} px="8px">
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
    </>
  );
}
