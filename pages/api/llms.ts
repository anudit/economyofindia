import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		{ buildId: string | undefined } | { message: string } | string
	>,
): Promise<any> {
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "*");

	// Handle preflight OPTIONS request
	if (req.method === "OPTIONS") {
		res.status(200).end(); // Respond with 200 OK and end the request.
		return;
	}

	// Handle actual GET request
	if (req.method === "GET") {
		return "datatatatatat";
	} else {
		// Handle any other HTTP methods not allowed
		res.setHeader("Allow", ["GET", "OPTIONS"]);
		res.status(405).json({ message: `Method ${req.method} Not Allowed` });
	}
}
