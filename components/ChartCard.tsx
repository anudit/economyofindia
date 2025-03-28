import {
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import CustomChart from "@/components/charts";
import { ChartPie } from "lucide-react";

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
    <GridItem
      w="100%"
      h="440px"
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      borderStyle="solid"
      borderColor="whiteAlpha.400"
      borderRadius="12"
      borderWidth="1px"
      colSpan={data.length > 5 ? 2 : 1}
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
      <Flex direction="column" alignItems="center" h="395px" p="10px">
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
    </GridItem>
  );
}
