import CustomChart from "@/components/charts";
import { SupportedCurrencies } from "@/utils/shared";
import { Flex, GridItem, Heading } from "@chakra-ui/react";
import { ChartPie } from "lucide-react";
import { useSharedContext } from "./SharedContext";

export default function ChartCard({
  data,
  title,
  route,
  palette = "green",
}: {
  data: Array<Array<string | number>>;
  title: string;
  route: string;
  palette?: "green" | "red";
}) {
  const { usdInrRate, activeCurrency } = useSharedContext();

  return (
    <GridItem
      h="440px"
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      borderStyle="solid"
      borderColor="whiteAlpha.400"
      borderRadius="md"
      borderWidth="0.5px"
      _hover={{
        borderColor: "whiteAlpha.500",
      }}
      transition="all 0.2s ease"
      // colSpan={data.length > 5 ? 2 : 1}
    >
      <Flex
        w="100%"
        height="40px"
        display="flex"
        flexDirection="row"
        borderBottomStyle="solid"
        borderBottomColor="white.800"
        borderBottomWidth="0.5px"
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
          fontSize="xs"
          w="100%"
          color="whiteAlpha.700"
          fontWeight={400}
          isTruncated
          title={route}
        >
          {route}
        </Heading>
      </Flex>
      <Flex
        direction="column"
        alignItems="center"
        h="395px"
        p="10px"
        justifyContent="center"
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

        <CustomChart
          data={data.map(([k, v]) => [
            k,
            activeCurrency == SupportedCurrencies.USD
              ? //@ts-ignore
                Number.parseFloat(v) / (usdInrRate | 1)
              : v,
          ])}
          palette={palette}
        />
      </Flex>
    </GridItem>
  );
}
