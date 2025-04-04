import { dataset, metadata } from "@/dataset/receipt-heads";
import PageShell from "@/components/PageShell";
import { DataTable } from "@/components/DataTable";

export default function Home() {
  return (
    <PageShell metadata={metadata}>
      <DataTable data={dataset} />
    </PageShell>
  );
}
