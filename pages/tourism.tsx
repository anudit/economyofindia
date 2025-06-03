import { Flex, Heading } from "@chakra-ui/react";

import {  PieChart } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import {
	dataset,
	metadata,
} from "@/dataset/tourism";

export default function Home() {

	return (
		<PageShell
			metadata={metadata}
		>
			<Heading as="h2" size="md">
			 Tourism
			</Heading>
			<br />
 			<Flex direction="column" w={"90%"}>
				<Heading as="h3" size="sm" fontWeight={300}>
  				TOP COUNTRIES IN TERMS OF INTERNATIONAL TOURISM RECEIPTS (India #14)
				</Heading>
        {
          Object.values(dataset).reverse().map((e, id) => {
            return (
              <Flex direction="column" w={"100%"} key={id} textAlign="center">
                <Heading as="h4" size="xs" fontWeight={300} w={"100%"} >
                  Year {e.title}
                </Heading>
                <PieChart data={e.data} type="currency" />
              </Flex>
            )
          })
        }

 			</Flex>
		</PageShell>
	);
}
