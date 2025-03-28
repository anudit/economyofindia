import { Flex, SimpleGrid, Stack, Switch, Text } from "@chakra-ui/react";
import Head from "next/head";
import data from "../new.json";
import { chartDataFormat, titleCase } from "@/utils/stringUtils";
import { useState } from "react";
import ChartCard from "@/components/ChartCard";
import StatCard from "@/components/StatCard";

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
        <Flex
          w="100%"
          h="60px"
          flexDir="row-reverse"
          background="blackAlpha.500"
          position="fixed"
          alignItems="center"
          paddingX="20px"
          backdropFilter="blur(6px)"
          zIndex={10000}
        >
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
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
            {Object.entries(data["Budget Estimates 2025-2026"]).map(
              ([level2Key, level2Val], level2Ind) => {
                if (
                  typeof level2Val == "object" &&
                  typeof Object.values(level2Val)[0] == "object"
                ) {
                  return Object.entries(level2Val).map(
                    ([level3Key, level3Val], level3Ind) => {
                      console.log(level3Key, level3Val);
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
                            route={`${titleCase(level2Key)}`}
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
                                  route={`${titleCase(level2Key)} > ${titleCase(level3Key)}`}
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
                            stat={level3Val}
                            title={level3Key}
                            key={level3Key}
                            route={`${titleCase(level2Key)} > ${titleCase(level3Key)}`}
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
