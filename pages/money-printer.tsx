import { Flex, Heading } from "@chakra-ui/react";

import {  StackedAreaChart } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import {
	dataset,
	metadata,
} from "@/dataset/money-printer";
import LiveValue from "@/components/AnimatedNumber";
import { CRORE, sum } from "@/utils/shared";

export default function Home() {

	return (
		<PageShell
			metadata={metadata}
		>
			<Heading as="h2" size="md">
		    M3 Supply India
			</Heading>
			<br />
			<Flex
				direction="column"
				bg="gray.900"
				p={4}
				borderRadius="md"
				boxShadow="md"
				border="1px solid"
				borderColor="gray.700"
				w="fit-content"
			>
  			<Flex w="100%" direction="row" justifyContent="space-between">
  				<Heading as="h3" size="xs" fontWeight={300} mb={2}>
  				  Money Printer
  				</Heading>
          <Heading as="h3" size="xs" fontWeight={300} mb={2}>
  				  +₹{Math.floor((2_406_293*CRORE)/(365*24*60*60))}/sec
  				</Heading>
  			</Flex>

				<LiveValue
					startValue={sum(dataset.data[0].slice(1))}
					ratePerSec={Math.floor((2_406_293*CRORE)/(365*24*60*60))}
					type="currency"
				/>
			</Flex>
		  <br/>
 			<Flex direction="column" w={"90%"}>
        <StackedAreaChart
					xyAxis={[undefined, "Value"]}
					columns={[
  					"Date", "Net Bank Credit to Government",
            "Bank Credit to Commercial Sector",
            "Net Foreign Exchange Assets of Banking Sector",
            "Governments Currency Liabilities to the Public",
            "Banking Sectors Net Non-monetary Liabilities"
					]}
					data={dataset.data.reverse()}
					type="currency"
				/>
 			</Flex>
		</PageShell>
	);
}
