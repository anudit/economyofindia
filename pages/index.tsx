import { Select, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

import { dataset, dataset2, metadata } from "@/dataset/afs-2025-2026";
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
          w={{ base: "50px", md: "250px" }}
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
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        <ChartGrid
          dataset={dataset[section]}
          section={section}
          palette="green"
        />
        <ChartGrid
          dataset={dataset2[section]}
          section={section}
          palette="red"
        />
      </SimpleGrid>
    </PageShell>
  );
}
