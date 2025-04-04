import { SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

import { dataset, metadata } from "@/dataset/receipt-heads";
import PageShell from "@/components/PageShell";
import { DataTable } from "@/components/DataTable";

export default function Home() {
  return (
    <PageShell metadata={metadata}>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={2}>
        <DataTable dataset={dataset} />
      </SimpleGrid>
    </PageShell>
  );
}
