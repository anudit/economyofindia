import { numFormat } from "@/utils/shared";
import { Flex, GridItem, Heading } from "@chakra-ui/react";
import { ChartPie } from "lucide-react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useSharedContext } from "./SharedContext";
import { useEffect } from "react";

export default function StatCard({
  stat,
  title,
  route,
}: {
  stat: number;
  title: string;
  route: string;
}) {
  const { activeCurrency } = useSharedContext();

  useEffect(() => {
    console.log("stat cur", activeCurrency);
  }, [activeCurrency]);
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
      borderRadius="md"
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
      <Heading
        as="h3"
        fontSize="md"
        w="100%"
        color="#ffffffc9"
        textAlign="center"
        p="10px"
        mt="10px"
      >
        {title}
      </Heading>
      <Heading
        fontSize="xxx-large"
        w="100%"
        h="310px"
        display="flex"
        color="#ffffffc9"
        justifyContent="center"
        alignItems="center"
        p="10px"
      >
        {numFormat(stat, activeCurrency, true, false)}
      </Heading>
    </GridItem>
  );
}
