import { SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

import { dataset, dataset2, metadata } from "@/dataset/afs-2025-2026";
import ChartGrid from "@/components/ChartGrid";
import PageShell from "@/components/PageShell";

export default function Home() {
  const [section, setSection] = useState<string>(Object.keys(dataset)[3]);

  return (
    <PageShell setSection={setSection} dataset={dataset} metadata={metadata}>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        <ChartGrid dataset={dataset} section={section} palette="green" />
        <ChartGrid dataset={dataset2} section={section} palette="red" />
      </SimpleGrid>
    </PageShell>
  );
}
