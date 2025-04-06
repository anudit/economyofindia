import { Divider, Heading, Select, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

import {
  dataset,
  dataset2,
  dataset3,
  dataset4,
  dataset5,
  dataset6,
  dataset7,
  dataset8,
  dataset9,
  metadata,
} from "@/dataset/afs-2025-2026";
import ChartGrid from "@/components/ChartGrid";
import PageShell from "@/components/PageShell";

export default function Home() {
  const [section, setSection] = useState<string>(Object.keys(dataset)[3]);

  return (
    <PageShell
      metadata={metadata}
      topBarChildren={
        <Select
          defaultValue={3}
          borderRadius="md"
          onChange={(e) => {
            setSection(Object.keys(dataset)[e.currentTarget.selectedIndex]);
          }}
          w={{ base: "70px", sm: "120px", md: "250px" }}
          size="sm"
        >
          {Object.keys(dataset).map((k, ind) => (
            <option value={ind} key={ind} defaultChecked={ind === 3}>
              {k}
            </option>
          ))}
        </Select>
      }
    >
      <Heading as="h3" size="sm" mb={4}>
        STATEMENT I - CONSOLIDATED FUND OF INDIA - REVENUE ACCOUNT - RECEIPTS
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        <ChartGrid
          dataset={dataset[section]}
          section={section}
          palette="green"
        />
      </SimpleGrid>
      <Heading as="h3" size="sm" my={8}>
        STATEMENT I - CONSOLIDATED FUND OF INDIA - REVENUE ACCOUNT -
        DISBURSEMENTS
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        <ChartGrid
          dataset={dataset2[section]}
          section={section}
          palette="red"
        />
      </SimpleGrid>
      <Heading as="h3" size="sm" my={8}>
        STATEMENT I - CONSOLIDATED FUND OF INDIA - CAPITAL ACCOUNT - RECEIPTS
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        <ChartGrid
          dataset={dataset3[section]}
          section={section}
          palette="green"
        />
      </SimpleGrid>
      <Heading as="h3" size="sm" my={8}>
        STATEMENT I - CONSOLIDATED FUND OF INDIA - CAPITAL ACCOUNT -
        DISBURSEMENTS
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        <ChartGrid
          dataset={dataset4[section]}
          section={section}
          palette="red"
        />
      </SimpleGrid>
      <Heading as="h3" size="sm" my={8}>
        STATEMENT IA - DISBURSEMENTS 'CHARGED' ON THE CONSOLIDATED FUND OF INDIA
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        <ChartGrid
          dataset={dataset5[section]}
          section={section}
          palette="red"
        />
      </SimpleGrid>
      <Heading as="h3" size="sm" my={8}>
        STATEMENT III - PUBLIC ACCOUNT OF INDIA - RECEIPTS
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        <ChartGrid
          dataset={dataset6[section]}
          section={section}
          palette="green"
        />
      </SimpleGrid>
      <Heading as="h3" size="sm" my={8}>
        STATEMENT III - PUBLIC ACCOUNT OF INDIA - DISBURSEMENTS
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        <ChartGrid
          dataset={dataset7[section]}
          section={section}
          palette="red"
        />
      </SimpleGrid>
      <Heading as="h3" size="sm" my={8}>
        RECEIPTS AND EXPENDITURE OF UNION TERRITORIES WITHOUT LEGISTATURE
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        <ChartGrid
          dataset={dataset8[section]}
          section={section}
          palette="green"
        />
      </SimpleGrid>
      <br />
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        <ChartGrid
          dataset={dataset9[section]}
          section={section}
          palette="red"
        />
      </SimpleGrid>
    </PageShell>
  );
}
