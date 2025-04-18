import { pipeline } from "node:stream";
import { Readable } from "node:stream";
import { promisify } from "node:util";
import { createGzip } from "node:zlib";
import { completeMetadata } from "@/dataset";
import { datasetComplete as datasetComplete1 } from "@/dataset/afs-2025-2026";
import { completeData as datasetComplete3 } from "@/dataset/import-export";
import { dataset as datasetComplete2 } from "@/dataset/receipt-heads";

import type {
	Dataset3,
	Dataset4,
	DatasetMetadata,
	DatasetTable,
} from "@/utils/shared";
import type { NextApiRequest, NextApiResponse } from "next";

const pipe = promisify(pipeline);

type ErrorResponse = {
	error: string;
};

type Response =
	| false
	| {
			metadata: DatasetMetadata;
			// biome-ignore lint: no
			dataset: any;
	  };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response | ErrorResponse>,
): Promise<void> {
	if (req.method !== "GET") {
		res.status(405).json({ error: "Method not allowed" });
		return;
	}

	try {
		const { id: dataset_id } = req.query;

		const id = Array.isArray(dataset_id) ? dataset_id[0] : dataset_id;

		if (!id) {
			res.status(400).json({ error: "Dataset ID is required" });
			return;
		}

		const all_ids = completeMetadata.map((e) => e.id);

		if (all_ids.includes(id.toLowerCase())) {
			let dataset: Response;
			if (id === "afs_2025_26") {
				dataset = { metadata: completeMetadata[0], dataset: datasetComplete1 };
			} else if (id === "receipt_heads") {
				dataset = { metadata: completeMetadata[1], dataset: datasetComplete2 };
			} else if (id === "import_export") {
				dataset = { metadata: completeMetadata[2], dataset: datasetComplete3 };
			} else {
				dataset = false;
			}

			res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

			const acceptEncoding = req.headers["accept-encoding"] || "";
			const shouldCompress = acceptEncoding.includes("gzip");

			if (shouldCompress) {
				res.setHeader("Content-Encoding", "gzip");
				res.setHeader("Content-Type", "application/json");

				// Convert dataset to JSON string
				const jsonString = JSON.stringify(dataset);
				const readableStream = Readable.from(jsonString);
				const gzip = createGzip();
				res.status(200);
				await pipe(readableStream, gzip, res);
			} else {
				res.status(200).json(dataset);
			}
		} else {
			res.status(404).json({ error: "Dataset not found" });
			return;
		}
	} catch (error) {
		console.error("Error handling dataset request:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}
