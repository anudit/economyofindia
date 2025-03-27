import { Flex, SimpleGrid, Stack, Switch, Text } from "@chakra-ui/react";
import Head from "next/head";
import data from "../new.json";
import { chartDataFormat } from "@/utils/stringUtils";
import { useState } from "react";
import ChartCard from "@/components/ChartCard";

export default function Home() {
  const [isUsd, setUsd] = useState(false);

  return (
    <>
      <Head>
        <title>Economy of India</title>
        <meta name="description" content="The Economy of India at a glance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w="100%" h="100vh" flexDir="column">
        <Flex w="100%" h="50px" flexDir="row">
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
        <Flex w="100%" h="100%" flexDir="column">
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
            {Object.entries(data["Budget Estimates 2025-2026"]).map(
              ([level2Key, level2Val], level2Ind) => {
                if (typeof level2Val == "object") {
                  return Object.entries(level2Val).map(
                    ([level3Key, level3Val], level3Ind) => {
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
                            route={`${level2Key} > ${level3Key}`}
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
                                  route={`${level2Key} > ${level3Key} > ${level4Key}`}
                                  isUsd={isUsd}
                                />
                              );
                            } else {
                              return null;
                            }
                          },
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
