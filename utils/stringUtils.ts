export const USDINR = 85.56;
export const CRORE = 10000000;

export type CurrencyType = "inr" | "usd";
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

export const numFormat = (
  num: number,
  short: boolean = false,
  cur: CurrencyType = "inr",
  disableConvert: boolean = false,
): string | null => {
  if (cur === "inr") {
    if (short) {
      if (num >= CRORE) {
        return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(num / CRORE)}Cr`;
      } else if (num >= 100000) {
        return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(num / 100000)}L`;
      } else {
        return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(num)}`;
      }
    } else {
      return `₹ ${new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(num)}`;
    }
  } else if (cur === "usd") {
    const usdValue = disableConvert ? num : num / USDINR;
    if (short) {
      if (usdValue >= 1e9) {
        return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(usdValue / 1e9)}Bn`;
      } else if (usdValue >= 1e6) {
        return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(usdValue / 1e6)}M`;
      } else {
        return `$${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(usdValue)}`;
      }
    } else {
      return `${new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(usdValue)} USD`;
    }
  } else {
    throw Error(`Invalid Currency ${cur}`);
  }
};

export type DataItemValue = number | null;
export type SimpleDataset = { [key: string]: DataItemValue };
export type DatasetMetadata = {
  title: string;
  titleShort: string;
  sourceFile: string;
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
