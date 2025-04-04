import { DatasetMetadata, DatasetTable } from "@/utils/shared";

export const metadata: DatasetMetadata = {
  title: "REVENUE RECEIPT HEADS",
  titleShort: "RECEIPT HEADS",
  fileName: "receipt_heads.pdf",
  localLink: "/receipt-heads",
  sourceFile: "https://cga.nic.in/DownloadPDF.aspx?filenameid=1894",
  ipfsHash: "bafybeihjn2ce3tt5qfdhxhqivo42phhefdux3hu5exqgkiqo6y3u6kx2wi",
  md5: "bc7ce1f2ff238d44349bd61795032628",
  sha256: "d847d25b2621a012636d077d24b1b3fd24eab4f0d4038bda5393fc2734521ff6",
};

export const dataset: DatasetTable = [
  {
    id: "0005",
    name: "Central Goods and Services Tax ( CGST )",
  },
  {
    id: "0006",
    name: "State Goods and Services Tax ( SGST )",
  },
  {
    id: "0007",
    name: "Union Territory Goods and Services Tax ( UTGST )",
  },
  {
    id: "0008",
    name: "Integrated Goods and Services Tax ( IGST )",
  },
  {
    id: "0009",
    name: "Goods and Services Tax Compensation Cess",
  },
  {
    id: "0020",
    name: "Corporation Tax",
  },
  {
    id: "0021",
    name: "Taxes on Income other than Corporation Tax",
  },
  {
    id: "0022",
    name: "Taxes on Agricultural Income",
  },
  {
    id: "0023",
    name: "Hotel Receipts Tax",
  },
  {
    id: "0024",
    name: "Interest Tax",
  },
  {
    id: "0026",
    name: "Fringe Benefit Tax",
  },
  {
    id: "0028",
    name: "Other Taxes on Income and Expenditure",
  },
  {
    id: "0029",
    name: "Land Revenue",
  },
  {
    id: "0030",
    name: "Stamps and Registration Fees",
  },
  {
    id: "0031",
    name: "Miscellaneous Tax Receipts",
  },
  {
    id: "0032",
    name: "Taxes on Wealth",
  },
  {
    id: "0034",
    name: "Securities Transaction Tax",
  },
  {
    id: "0035",
    name: "Taxes on Immovable Property other than Agricultural Land",
  },
  {
    id: "0036",
    name: "Commodities Transaction Tax",
  },
  {
    id: "0037",
    name: "Customs",
  },
  {
    id: "0038",
    name: "Union Excise Duties",
  },
  {
    id: "0039",
    name: "State Excise",
  },
  {
    id: "0040",
    name: "Taxes on Sales , Trade etc.",
  },
  {
    id: "0041",
    name: "Taxes on Vehicles",
  },
  {
    id: "0042",
    name: "Taxes on Goods and Passengers",
  },
  {
    id: "0043",
    name: "Taxes and Duties on Electricity",
  },
];
