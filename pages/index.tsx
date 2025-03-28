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
} from "@chakra-ui/react";
import Head from "next/head";
import data from "../new.json";
import { chartDataFormat, CRORE, titleCase } from "@/utils/stringUtils";
import { useRef, useState } from "react";
import ChartCard from "@/components/ChartCard";
import StatCard from "@/components/StatCard";
import { PanelLeftOpen } from "lucide-react";

type SectionsKey = keyof typeof data;

export default function Home() {
  const [isUsd, setUsd] = useState(false);
  const [section, setSections] = useState<SectionsKey>(
    Object.keys(data)[3] as SectionsKey,
  );

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
      <Flex w="100%" h="100vh" flexDir="column">
        <Flex
          w="100vw"
          h="60px"
          flexDir="row"
          background="blackAlpha.500"
          position="fixed"
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
              onChange={(e) => {
                setSections(
                  Object.keys(data)[
                    e.currentTarget.selectedIndex
                  ] as SectionsKey,
                );
              }}
              w="200px"
              size="sm"
            >
              {Object.keys(data).map((k, ind) => {
                return (
                  <option value={ind} key={ind} defaultChecked={ind == 3}>
                    {k}
                  </option>
                );
              })}
            </Select>
          </Stack>

          <Stack direction="row">
            <Text>INR</Text>
            <Switch
              colorScheme="teal"
              onChange={(e) => {
                setUsd(e.currentTarget.checked);
              }}
            />
            <Text>USD</Text>
          </Stack>
        </Flex>
        <Flex w="100%" h="100%" flexDir="column" mt="60px">
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2} px="8px">
            {Object.entries(data[section]).map(
              ([level2Key, level2Val], level2Ind) => {
                if (
                  typeof level2Val == "object" &&
                  typeof Object.values(level2Val)[0] == "object"
                ) {
                  return Object.entries(level2Val).map(
                    ([level3Key, level3Val], level3Ind) => {
                      // console.log(level3Key, level3Val);
                      if (
                        typeof level3Val == "object" &&
                        (typeof Object.values(level3Val)[0] != "object" ||
                          Object.values(level3Val)[0] == null)
                      ) {
                        return (
                          <ChartCard
                            data={chartDataFormat(level3Val)}
                            title={level3Key}
                            key={level3Key}
                            route={`${titleCase(section)} > ${titleCase(level2Key)}`}
                            isUsd={isUsd}
                          />
                        );
                      } else if (
                        typeof level3Val == "object" &&
                        typeof Object.values(level3Val)[0] == "object" &&
                        Object.values(level3Val)[0] != null
                      ) {
                        return Object.entries(level3Val).map(
                          ([level4Key, level4Val], level4Ind) => {
                            if (
                              typeof level4Val == "object" &&
                              level4Val != null
                            ) {
                              return (
                                <ChartCard
                                  data={chartDataFormat(
                                    level4Val as {
                                      [key: string]: number | null;
                                    },
                                  )}
                                  title={level4Key}
                                  key={level4Key}
                                  route={`${titleCase(section)} > ${titleCase(level2Key)} > ${titleCase(level3Key)}`}
                                  isUsd={isUsd}
                                />
                              );
                            } else {
                              return null;
                            }
                          },
                        );
                      } else if (typeof level3Val == "number") {
                        return (
                          <StatCard
                            stat={level3Val * CRORE}
                            title={level3Key}
                            key={level3Key}
                            route={`${titleCase(section)} > ${titleCase(level2Key)} > ${titleCase(level3Key)}`}
                            isUsd={isUsd}
                          />
                        );
                      } else {
                        return null;
                      }
                    },
                  );
                }
              },
            )}
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}
