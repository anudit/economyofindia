import { numFormat } from "@/utils/stringUtils";
import { Flex, GridItem, Heading } from "@chakra-ui/react";
import { ChartPie } from "lucide-react";
import { useBreakpointValue } from "@chakra-ui/react";

export default function StatCard({
  stat,
  title,
  route,
  isUsd = false,
}: {
  stat: number;
  title: string;
  route: string;
  isUsd: boolean;
}) {
  const respWidth = useBreakpointValue({
    base: "100vw",
    md: "100%",
    lg: "100%",
  });

  return (
    <GridItem
      w={respWidth}
      h="440px"
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      borderStyle="solid"
      borderColor="whiteAlpha.400"
      borderRadius="12"
      borderWidth="1px"
    >
      <Flex
        w="100%"
        height="40px"
        display="flex"
        flexDirection="row"
        borderBottomStyle="solid"
        borderBottomColor="white.800"
        borderBottomWidth="1px"
        justifyContent="start"
        alignItems="center"
        paddingLeft="20px"
      >
        <ChartPie
          color="rgba(255, 255, 255, 0.48)"
          size={14}
          style={{ marginRight: "10px" }}
        />
        <Heading
          as="h4"
          fontSize="sm"
          w="100%"
          color="whiteAlpha.600"
          fontWeight={400}
          isTruncated
        >
          {route}
        </Heading>
      </Flex>
      <Flex
        direction="column"
        alignItems="center"
        h="200px"
        p="10px"
        justifyContent="space-around"
      >
        <Heading
          as="h3"
          fontSize="md"
          w="100%"
          color="#ffffffc9"
          textAlign="center"
        >
          {title}
        </Heading>
        <Heading
          as="p"
          fontSize="xxx-large"
          w="100%"
          color="#ffffffc9"
          textAlign="center"
        >
          {numFormat(stat, true, isUsd ? "usd" : "inr")}
        </Heading>
      </Flex>
    </GridItem>
  );
}
