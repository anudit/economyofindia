import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ buildId: string | undefined }>,
): Promise<void> {
	const buildId =
		process.env.VERCEL_GIT_COMMIT_SHA ||
		process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
	console.log("API Route /api/version returning buildId:", buildId); // Add logging
	res.status(200).json({ buildId: buildId });
}
