import { DatasetMetadata } from "@/utils/shared";
import { metadata as metadata1 } from "./afs-2025-2026";

export const testfile: DatasetMetadata = {
  title: "ANNUAL FINANCIAL STATEMENT OF THE CENTRAL GOVERNMENT FOR 2025-2026",
  titleShort: "AFS CG 25-26",
  fileName: "soon.pdf",
  localLink: "/soon",
  sourceFile: "https://www.indiabudget.gov.in/doc/AFS/allafs.pdf",
  ipfsHash: "bafybeibngqfz5n7cxeze2klrw6bblxqwd3ptoqa5y5zl54lcxwiplgd5em",
  md5: "8b7ca6d0db4fa1ff49c0dc63d9ee6e07",
  sha256: "e554c5683d8f9a7e97b10052f5e7b4b02278e68c9fe8dcef3b5e0c1b400012bd",
};

export const completeMetadata: Array<DatasetMetadata> = [metadata1, testfile];
