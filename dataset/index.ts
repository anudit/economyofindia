import type { DatasetMetadata } from "@/utils/shared";
import { metadata as metadata1 } from "./afs-2025-2026";
import { metadata as metadata2 } from "./receipt-heads";
import { metadata as metadata3 } from "./import-export";
import { metadata as metadata4 } from "./aqi";
import { metadata as metadata5 } from "./state_budgets";

export const completeMetadata: Array<DatasetMetadata> = [
	metadata1,
	metadata2,
	metadata3,
	metadata4,
	metadata5
];
