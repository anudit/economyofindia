import { completeMetadata } from "../dataset/index";

async function main() {
	const sitelinks = completeMetadata.map(
		(e) => `https://economyofindia.com${e.localLink}`,
	);
	const sourceLinks = completeMetadata.flatMap((e) =>
		e.sourceFiles.map((f) => f.sourceFile),
	);
	console.log({ sitelinks, sourceLinks });
}
main();
