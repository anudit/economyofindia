import { completeMetadata } from "../dataset/index";

async function getStatus(link: string) {
  const data = await fetch(`http://archive.org/wayback/available?url=${link}`);
  const resp = await data.json();
  return resp;
}

async function save(link: string) {
  console.log('🟡', link);
  const data = await fetch(`https://web.archive.org/save/${link}`);
  const resp = await data.text();
  if(data.ok){
    console.log('🟢', link)
  }
  return resp;
}

async function main() {
	const sitelinks = completeMetadata.map(
		(e) => `https://economyofindia.com${e.localLink}`,
	);
	const sourceLinks = completeMetadata.flatMap((e) =>
		e.sourceFiles.map((f) => f.sourceFile),
	);

  for (let i = 0; i < sitelinks.length; i++) {
    await save(sitelinks[sitelinks.length-1-i]);
  }
  for (let i = 0; i < sourceLinks.length; i++) {
    await save(sourceLinks[i]);
  }

}

main();
