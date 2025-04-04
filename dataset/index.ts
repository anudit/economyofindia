import { DatasetMetadata } from "@/utils/shared";
import { metadata as metadata1 } from "./afs-2025-2026";
import { metadata as metadata2 } from "./receipt-heads";

// export const testfile: DatasetMetadata = {
//   title: "All the data there is",
//   titleShort: "SOON 25-26",
//   fileName: "soon.pdf",
//   localLink: "/soon",
//   sourceFile: "https://www.indiabudget.gov.in/soon.pdf",
//   ipfsHash: "bafybeibngqfz5n7cxeze2klrw6bblxqwd3ptoqa5y5zl54lcxwiplgd5em",
//   md5: "sdkcjnskjdcnksnckjsdnkjncds",
//   sha256: "liehnvkrnuvksfnvksjvsf",
// };

export const completeMetadata: Array<DatasetMetadata> = [metadata1, metadata2];
