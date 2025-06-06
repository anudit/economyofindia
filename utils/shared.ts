import { useSharedContext } from "@/components/SharedContext";

export const CRORE = 10000000;
export const LAKH = 100000;

export const average = (arr: number[]): number =>
	arr.reduce((p, c) => p + c, 0) / arr.length;

export const aqiToDetails = (num: number): { title: string; hex: string } => {
	if (num > 500) return { title: "Hazardous", hex: "#ff7c7c" };
	else if (num > 400) return { title: "Severe", hex: "#ffadad" };
	else if (num > 300) return { title: "Very Poor", hex: "#F2A89C" };
	else if (num > 200) return { title: "Poor", hex: "#F7D59C" };
	else if (num > 100) return { title: "Moderate", hex: "#e4f89b" };
	else if (num > 50) return { title: "Satisfactory", hex: "#BFD8B8" };
	else return { title: "Good", hex: "#71e88a" };
};

export const STATES = [
	"Andaman and Nicobar",
	"Andhra Pradesh",
	"Assam",
	"Bihar",
	"Chandigarh",
	"Chhattisgarh",
	"Delhi",
	"Gujarat",
	"Haryana",
	"Himachal Pradesh",
	"Karnataka",
	"Kerala",
	"Madhya Pradesh",
	"Maharashtra",
	"Manipur",
	"Meghalaya",
	"Mizoram",
	"Odisha",
	"Puducherry",
	"Punjab",
	"Rajasthan",
	"Tamil Nadu",
	"Telangana",
	"Tripura",
	"Uttar Pradesh",
	"Uttarakhand",
	"West Bengal",
];

export enum SupportedCurrencies {
	INR,
	USD,
}

export const supportedCurrencies = new Map<
	SupportedCurrencies,
	{ flag: string; currency: string; symbol: string }
>([
	[SupportedCurrencies.INR, { flag: "🇮🇳", currency: "INR", symbol: "₹" }],
	[SupportedCurrencies.USD, { flag: "🇺🇸", currency: "USD", symbol: "$" }],
]);

export const COLORS = [
	"#56ab91",
	"#78c6a3",
	"#67b99a",
	"#248277",
	"#358f80",
	"#036666",
	"#469d89",
	"#99e2b4",
	"#14746f",
	"#88d4ab",
];

export const RED_COLORS = [
	"#FAA19B",
	"#F88279",
	"#F66257",
	"#F44336",
	"#D63B2F",
	"#B73229",
	"#992A22",
	"#7A221B",
];

export type DatasetTableRow = { [key: string]: string | number };
export type DatasetTable = Array<DatasetTableRow>;

export type PieChartGeneric = [string, number][];
export type Dataset3 = {
	[key: string]:
		| {
				// l1
				[key: string]: // l2
					| {
							[key: string]: //l3
							{ [key: string]: DataItemValue } | DataItemValue; // l4
					  }
					| DataItemValue;
		  }
		| DataItemValue;
};

export type Dataset4 = {
	[key: string]: Dataset3;
};

export const numFormat = (
	num: number,
	activeCurrency: SupportedCurrencies,
	short = false,
	disableConvert = false,
	hideSymbol = false,
): string => {
	if (activeCurrency === SupportedCurrencies.INR) {
		if (short) {
			if (num >= CRORE) {
				return `${hideSymbol === false ? "₹" : ""}${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(num / CRORE)}Cr`;
			} else if (num >= 100000) {
				return `${hideSymbol === false ? "₹" : ""}${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(num / 100000)}L`;
			} else {
				return `${hideSymbol === false ? "₹" : ""}${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(num)}`;
			}
		} else {
			return `${hideSymbol === false ? "₹" : ""} ${new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(num)}`;
		}
	} else if (activeCurrency === SupportedCurrencies.USD) {
		const { usdInrRate } = useSharedContext();
		const usdValue = disableConvert ? num : num / (usdInrRate || 1);
		if (short) {
			if (usdValue >= 1e12) {
				return `${hideSymbol === false ? "$" : ""}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(usdValue / 1e9)}Tr`;
			} else if (usdValue >= 1e9) {
				return `${hideSymbol === false ? "$" : ""}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(usdValue / 1e9)}Bn`;
			} else if (usdValue >= 1e6) {
				return `${hideSymbol === false ? "$" : ""}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(usdValue / 1e6)}M`;
			} else {
				return `${hideSymbol === false ? "$" : ""}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(usdValue)}`;
			}
		} else {
			return `${new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(usdValue)} USD`;
		}
	} else {
		throw Error(`Invalid Currency ${activeCurrency}`);
	}
};

export type DataItemValue = number | null;
export type SimpleDataset = { [key: string]: DataItemValue };

export type DatasetMetadataFile = {
	sourceFile: string;
	ipfsHash: string;
	sha256: string;
	md5: string;
	wayback?: string;
};

export type DatasetMetadata = {
	id: string;
	title: string;
	titleShort: string;
	fileName: string;
	localLink: `/${string}`;
	isLive: boolean;
	wayback?: string;
	sourceFiles: DatasetMetadataFile[];
	api: string;
};

export const chartDataFormat = (
	data: SimpleDataset,
	convert = true,
): Array<[string, number]> => {
	return Object.entries(data)
		.map(([k, v], ind) => {
			if (v != null && v !== 0) {
				return [k as string, (v * (convert === true ? CRORE : 1)) as number];
			} else {
				return null;
			}
		})
		.filter((e) => e != null) as Array<[string, number]>;
};

export function titleCase(s: string) {
	return s
		.toLowerCase()
		.replaceAll("_", " ")
		.split(" ")
		.map((word) =>
			word === "of" ? "of" : word.charAt(0).toUpperCase() + word.slice(1),
		)
		.join(" ");
}

export function sum(arr: number[]) {
	let res = 0;
	for (const x of arr) {
		res += x;
	}
	return res;
}

export const daysSinceNow = (startDate: Date) => {
	const now = Date.now();
	const diffMs = now - startDate.getTime();
	const daysSince = diffMs / (1000 * 60 * 60 * 24);
	return daysSince;
};

export type BarChartGeneric = {
	title: string;
	header: string[];
	data: [string, ...number[]][];
};

export type Dict<T> = { [key: string]: T };

export type StatGeneric = Dict<number>;

export type BarChartGenericWithStyle = {
	title: string;
	header: [string, string, { role: "style" }];
	data: [string, number, string][];
};

export type AreaChartGeneric = {
	xyAxis: Array<string | undefined>;
	columns: string[];
	colors?: string[];
	data: [string, ...number[]][];
	type?: "value" | "currency"
};
