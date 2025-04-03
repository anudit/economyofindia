import { useSharedContext } from "@/components/SharedContext";

export const CRORE = 10000000;

export enum SupportedCurrencies {
  "INR",
  "USD",
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
  "#fde0e0",
  "#f4c1c1",
  "#fdaaaa",
  "#f97c7c",
  "#ee6969",
];

export type CurrecyResp = {
  date: string;
  usd: { inr: number };
};

export const numFormat = (
  num: number,
  activeCurrency: SupportedCurrencies,
  short: boolean = false,
  disableConvert: boolean = false,
): string | null => {
  if (activeCurrency === SupportedCurrencies.INR) {
    if (short) {
      if (num >= CRORE) {
        return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(num / CRORE)}Cr`;
      } else if (num >= 100000) {
        return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(num / 100000)}L`;
      } else {
        return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(num)}`;
      }
    } else {
      return `₹ ${new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(num)}`;
    }
  } else if (activeCurrency === SupportedCurrencies.USD) {
    const { usdInrRate } = useSharedContext();
    const usdValue = disableConvert ? num : num / (usdInrRate || 1);
    if (short) {
      if (usdValue >= 1e9) {
        return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(usdValue / 1e9)}Bn`;
      } else if (usdValue >= 1e6) {
        return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(usdValue / 1e6)}M`;
      } else {
        return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(usdValue)}`;
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
export type DatasetMetadata = {
  title: string;
  titleShort: string;
  fileName: string;
  sourceFile: string;
  localLink: `/${string}`;
  ipfsHash: string;
  sha256: string;
  md5: string;
};

export const chartDataFormat = (
  data: SimpleDataset,
): Array<Array<string | number>> => {
  return Object.entries(data)
    .map(([k, v], ind) => {
      if (v != null && v != 0) {
        return [k, v * CRORE];
      } else {
        return null;
      }
    })
    .filter((e) => e != null);
};

export function titleCase(s: string) {
  return s
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
