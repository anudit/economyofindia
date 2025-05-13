import { Flex, Heading} from "@chakra-ui/react";

import { BarChart } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { dataset, metadata } from "@/dataset/taxpayers";

export default function Home() {
	return (
		<PageShell metadata={metadata}>
			 <Heading as="h2" size="md">
		  Taxpayers
			</Heading>
			<br />
      {
        dataset.map((d, id) => {
          return (
            <Flex key={id} w={{base: "90%", md: "100%"}} maxW="900px" flexDirection="column" mb={4}>
              <Heading as="h3" fontSize="18px" fontWeight={300} >{d.title}</Heading>
              <BarChart header={d.header} data={d.data}  />
            </Flex>
          )
        })
      }

		</PageShell>
	);
}
