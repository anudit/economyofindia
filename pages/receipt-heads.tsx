import { DataTable } from "@/components/DataTable";
import PageShell from "@/components/PageShell";
import { dataset, metadata } from "@/dataset/receipt-heads";

export default function Home() {
	return (
		<PageShell metadata={metadata}>
			<DataTable data={dataset} />
		</PageShell>
	);
}
