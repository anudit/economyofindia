import {
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import CustomChart from "@/components/charts";
import { chartDataFormat, CRORE, CurrencyType } from "@/utils/stringUtils";

export default function ChartCard({
  data,
  title,
  route,
  isUsd = false,
}: {
  data: Array<{ name: string; value: number; fill?: string }>;
  title: string;
  route: string;
  isUsd: boolean;
}) {
  return (
    <Flex
      w="100%"
      h="450px"
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      borderStyle="solid"
      borderColor="white.800"
      borderRadius="12"
      borderWidth="1px"
    >
      <Heading
        as="h4"
        fontSize="sm"
        w="100%"
        color="#ffffffc9"
        borderBottomStyle="solid"
        borderBottomColor="white.800"
        borderBottomWidth="1px"
        height="40px"
        display="flex"
        justifyContent="start"
        alignItems="center"
        paddingLeft="20px"
        fontWeight={400}
      >
        {route}
      </Heading>
      <Flex
        direction="column"
        alignItems="center"
        h="100%"
        justifyContent="end"
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
        <CustomChart data={data} cur={isUsd ? "usd" : "inr"} />
      </Flex>
    </Flex>
  );
}
