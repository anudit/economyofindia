import type { DatasetMetadata } from "@/utils/shared";

export const metadata: DatasetMetadata = {
	id: "aqi",
	title: "AQI - India",
	titleShort: "AQI",
	fileName: "aqi.live",
	localLink: "/aqi",
	wayback:
		"http://web.archive.org/web/20250515150640/https://economyofindia.com/aqi",
	isLive: true,
	sourceFiles: [
		{
			sourceFile: "https://airquality.cpcb.gov.in/AQI_India/",
			ipfsHash: "",
			md5: "",
			sha256: "",
		},
	],

	api: "https://aqi.economyofindia.com",
};
