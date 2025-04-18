import SimpleDataTable from "@/components/SimpleDataTable";
import PageShell from "@/components/PageShell";
import { dataset, metadata } from "@/dataset/state_budgets";

export default function Home() {
  return (
    <PageShell metadata={metadata}>
      <SimpleDataTable data={dataset} />
    </PageShell>
  );
}
