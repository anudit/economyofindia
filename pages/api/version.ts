import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ buildId: string | undefined }>,
): Promise<void> {
	res.status(200).json({ buildId: process.env.VERCEL_GIT_COMMIT_SHA });
}
