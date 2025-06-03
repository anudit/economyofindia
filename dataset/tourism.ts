import type { BarChartGeneric, DatasetMetadata } from "@/utils/shared";

export const metadata: DatasetMetadata = {
	id: "tourism",
	title: "Tourism of India",
	titleShort: "Tourism",
	fileName: "tourism.pdf",
	localLink: "/tourism",
	wayback:
		"https://web.archive.org/web/20250515150241/https://economyofindia.com/tourism",
	isLive: false,
	sourceFiles: [
		{
			sourceFile:
				"https://tourism.gov.in/sites/default/files/2025-03/India%20Tourism%20Data%20Compendium%202024_1.pdf",
			ipfsHash: "",
			md5: "",
			sha256: "",
		}
	],
	api: "https://economyofindia.com/api/dataset/tourism",
};

export const dataset: { [key: string]: BarChartGeneric } = {
  "2019": {
    "title":"2019",
    "header": ["Country", "Returns in $Bn"],
		data:  [
      ["United States", 199.0],
      ["Spain", 79.7],
      ["France", 63.5],
      ["Thailand", 59.8],
      ["United Kingdom", 58.4],
      ["Italy", 49.5],
      ["Japan", 46.1],
      ["Australia", 45.5],
      ["Germany", 41.8],
      ["Macao (China)", 40.1],
      ["China", 35.8],
      ["Turkey", 34.3],
      ["United Arab Emirates", 30.7],
      ["India", 30.7]
      ].map(e=>[e[0], e[1]*84*1_000_000_000])
  },
  "2022": {
    "title":"2022",
    "header": ["Country", "Returns in $Bn"],
		data:  [
		["United States", 136.9],
    ["Spain", 72.9],
    ["United Kingdom", 67.6],
    ["France", 59.7],
    ["United Arab Emirates", 49.3],
    ["Italy", 43.7],
    ["Turkey", 41.2],
    ["Germany", 31.9],
    ["Canada", 28.1],
    ["Mexico", 28.0],
    ["Saudi Arabia", 25.2],
    ["Australia", 24.6],
    ["Portugal", 22.3],
    ["India", 21.4]
    ].map(e=>[e[0], e[1]*84*1_000_000_000])
  },
  "2023": {
    "title":"2023",
    "header": ["Country", "Returns in $Bn"],
		data:  [
    ["United States", 175.9],
    ["Spain", 92.0],
    ["United Kingdom", 73.9],
    ["France", 68.6],
    ["Italy", 55.9],
    ["United Arab Emirates", 51.9],
    ["Turkey", 49.5],
    ["Australia", 46.6],
    ["Canada", 39.2],
    ["Japan", 38.6],
    ["Germany", 37.4],
    ["Saudi Arabia", 36.0],
    ["Macao (China)", 32.6],
    ["India", 32.2]].map(e=>[e[0], e[1]*84*1_000_000_000])
  },
}
