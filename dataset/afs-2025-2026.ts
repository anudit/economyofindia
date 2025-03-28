import { DataItemValue, DatasetMetadata } from "@/utils/stringUtils";

export type Dataset4 = {
  [key: string]: {
    // section
    [key: string]: {
      // l1
      [key: string]: // l2
      | {
            [key: string]: //l3
            { [key: string]: DataItemValue } | DataItemValue; // l4
          }
        | DataItemValue;
    };
  };
};

export const metadata: DatasetMetadata = {
  title: "ANNUAL FINANCIAL STATEMENT OF THE CENTRAL GOVERNMENT FOR 2025-2026",
  titleShort: "AFS CG 25-26",
  sourceFile: "https://www.indiabudget.gov.in/doc/AFS/allafs.pdf",
};

export const dataset: Dataset4 = {
  "Actuals 2023-2024": {
    // section
    "TAX REVENUE": {
      // l1
      "Goods and Services Tax": {
        // l2
        "Central Goods and Services Tax (CGST)": 826022.98,
        "Union Territory Goods and Services Tax (UTGST)": 5497.16,
        "Integrated Goods and Services Tax (IGST)": -4850.43,
        "Goods and Services Tax Compensation Cess": 141436.16,
      },
      "Taxes on Income and Expenditure": {
        "Corporation Tax": 910551.01,
        "Taxes on Income Other Than Corporation Tax": 1010947.77,
        "Hotel Receipts Tax": 0.34,
        "Interest Tax": 19.93,
        "Fringe Benefit Tax": -4.46,
        "Other Taxes on Income and Expenditure": 14.89,
      },
      "Taxes on Property and Capital Transactions": {
        "Stamps and Registration Fees": 0.31,
        "Estate Duty": 1.31,
        "Taxes on Wealth": 6.12,
        "Securities Transaction Tax": 33777.78,
      },
      "Taxes on Commodities and Services other than Goods and Services Tax": {
        "Banking Cash Transaction Tax": 414.32,
        Customs: 233181.97,
        "Union Excise Duties": 305362.18,
        "Sales Tax": null,
        "Service Tax": 424.96,
        "Other Taxes and Duties on Commodities and Services": 3929.08,
      },
      "Taxes of Union Territories without Legislature": 3745.09,
    },
    "NON-TAX REVENUE": {
      // l1
      "Fiscal Services": {
        "Currency, Coinage and Mint": 178.28,
        "Other Fiscal Services": 1679.84,
      },
      "Interest Receipts, Dividends and Profits": {
        "Interest Receipts": 78652.02,
        "Interest from State and Union Territory Governments": 13641.26,
        "Other Interest Receipts": 65010.76,
        "Dividends and Profits": 170876.97,
      },
      "Other NonTax Revenue": {
        //l2
        "General Services": {
          // l3
          "Public Service Commission": 111.94,
          Police: 13190.97,
          Jails: null,
          "Supplies and Disposals": null,
          "Stationery and Printing": 9.26,
          "Public Works": 704.07,
          "Other Administrative Services": 6787.94,
          "Contributions and Recoveries Towards Pension and Other Retirement Benefits": 2608.86,
          "Miscellaneous General Services": 32589.28,
        },
        "Defence Services": {
          Army: 4460.93,
          Navy: 886.27,
          "Air Force": 1717.41,
          "Coordination & Services (Directorate of Ordnance)": 7.14,
          "Research and Development": 283.2,
        },
        "Social and Community Services": {
          "Education, Sports, Art and Culture": 1065.47,
          "Medical and Public Health": 2618.88,
          "Family Welfare": 36.19,
          "Water Supply and Sanitation": 601.94,
          Housing: 531.43,
          "Urban Development": 0.59,
          "Information and Publicity": 37.77,
          Broadcasting: 972.93,
          "Labour and Employment": 115.51,
          "Social Security and Welfare": 600.0,
          "Other Social Services": 1089.09,
        },
        "Economic Services": {
          "Crop Husbandry": 563.75,
          "Animal Husbandry": 100.22,
          "Dairy Development": 170.64,
          Fisheries: 22.79,
          "Forestry and Wild Life": 65.18,
          "Food, Storage and Warehousing": 4353.2,
          "Agricultural Research and Education": 3.99,
          "Co-Operation": 22.53,
          "Other Agricultural Programmes": 21.95,
          "Land Reforms": 40.68,
          "Other Rural Development Programmes": 35.39,
          "North Eastern Areas": 23.49,
          "Major and Medium Irrigation": 57.52,
          "Minor Irrigation": 441.17,
          Power: 3782.11,
          Petroleum: 173522.35,
          "Coal and Lignite": 46.26,
          "Non-Conventional Sources of Energy": 16.57,
          "Village and Small Industries": 7.0,
          Industries: 3686.41,
          "Non-Ferrous Mining and Metallurgical Industries": 1010.47,
          "Other Industries": 226.31,
          "Indian Railways - Miscellaneous Receipts": 820.78,
          "Indian Railways - Commercial Lines": 252540.84,
          "Indian Railways - Strategic Lines": 2731.79,
          "Ports and Light Houses": 441.84,
          Shipping: 107.92,
          "Civil Aviation": 2728.12,
          "Roads and Bridges": 28373.88,
          "Road Transport": 7.47,
          "Inland Water Transport": 13.97,
          "Postal Receipts": 11321.36,
          "Other Communication Services": 90659.26,
          "Atomic Energy Research": 125.48,
          "Other Scientific Research": 2927.83,
          Tourism: 29.24,
          "Foreign Trade and Export Promotion": 471.44,
          "Civil Supplies": 0.35,
          "Other General Economic Services": 6629.36,
        },
        "Non-Tax Revenue of Union Territories": 3065.66,
      },
    },
    "GRANTS-IN-AID AND CONTRIBUTIONS": {
      "External Grant Assistance": 801.43,
      "Aid Material and Equipment": 211.31,
    },
  },
  "Budget Estimates 2024-2025": {
    "TAX REVENUE": {
      "Goods and Services Tax": {
        "Central Goods and Services Tax (CGST)": 910890.0,
        "Union Territory Goods and Services Tax (UTGST)": 4940.0,
        "Integrated Goods and Services Tax (IGST)": null,
        "Goods and Services Tax Compensation Cess": 151009.0,
      },
      "Taxes on Income and Expenditure": {
        "Corporation Tax": 1020000.0,
        "Taxes on Income Other Than Corporation Tax": 1150000.0,
        "Hotel Receipts Tax": null,
        "Interest Tax": null,
        "Fringe Benefit Tax": null,
        "Other Taxes on Income and Expenditure": 2700.0,
      },
      "Taxes on Property and Capital Transactions": {
        "Stamps and Registration Fees": null,
        "Estate Duty": null,
        "Taxes on Wealth": null,
        "Securities Transaction Tax": 37000.0,
      },
      "Taxes on Commodities and Services other than Goods and Services Tax": {
        "Banking Cash Transaction Tax": null,
        Customs: 237745.0,
        "Union Excise Duties": 319000.0,
        "Sales Tax": null,
        "Service Tax": 100.0,
        "Other Taxes and Duties on Commodities and Services": 5000.0,
      },
      "Taxes of Union Territories without Legislature": 4526.4,
    },
    "NON-TAX REVENUE": {
      "Fiscal Services": {
        "Currency, Coinage and Mint": 180.0,
        "Other Fiscal Services": 1654.41,
      },
      "Interest Receipts, Dividends and Profits": {
        "Interest Receipts": 70224.0,
        "Interest from State and Union Territory Governments": 14575.0,
        "Other Interest Receipts": 55649.0,
        "Dividends and Profits": 289134.0,
      },
      "Other NonTax Revenue": {
        "General Services": {
          "Public Service Commission": 122.0,
          Police: 12673.1,
          Jails: null,
          "Supplies and Disposals": null,
          "Stationery and Printing": 10.99,
          "Public Works": 536.73,
          "Other Administrative Services": 5882.76,
          "Contributions and Recoveries Towards Pension and Other Retirement Benefits": 2689.57,
          "Miscellaneous General Services": 29337.13,
        },
        "Defence Services": {
          Army: 4415.47,
          Navy: 750.0,
          "Air Force": 1300.0,
          "Coordination & Services (Directorate of Ordnance)": null,
          "Research and Development": null,
        },
        "Social and Community Services": {
          "Education, Sports, Art and Culture": 997.84,
          "Medical and Public Health": 2246.18,
          "Family Welfare": 39.0,
          "Water Supply and Sanitation": 576.0,
          Housing: 500.0,
          "Urban Development": 0.59,
          "Information and Publicity": 35.0,
          Broadcasting: 900.0,
          "Labour and Employment": 100.0,
          "Social Security and Welfare": 600.0,
          "Other Social Services": 1000.0,
        },
        "Economic Services": {
          "Crop Husbandry": 540.0,
          "Animal Husbandry": 100.0,
          "Dairy Development": 170.0,
          Fisheries: 22.0,
          "Forestry and Wild Life": 60.0,
          "Food, Storage and Warehousing": 4300.0,
          "Agricultural Research and Education": 4.0,
          "Co-Operation": 22.0,
          "Other Agricultural Programmes": 22.0,
          "Land Reforms": 40.0,
          "Other Rural Development Programmes": 35.0,
          "North Eastern Areas": 23.0,
          "Major and Medium Irrigation": 57.0,
          "Minor Irrigation": 440.0,
          Power: 3780.0,
          Petroleum: 173522.0,
          "Coal and Lignite": 46.0,
          "Non-Conventional Sources of Energy": 17.0,
          "Village and Small Industries": 7.0,
          Industries: 3686.0,
          "Non-Ferrous Mining and Metallurgical Industries": 1010.0,
          "Other Industries": 226.0,
          "Indian Railways - Miscellaneous Receipts": 821.0,
          "Indian Railways - Commercial Lines": 252541.0,
          "Indian Railways - Strategic Lines": 2732.0,
          "Ports and Light Houses": 442.0,
          Shipping: 108.0,
          "Civil Aviation": 2728.0,
          "Roads and Bridges": 28374.0,
          "Road Transport": 7.0,
          "Inland Water Transport": 14.0,
          "Postal Receipts": 11321.0,
          "Other Communication Services": 90659.0,
          "Atomic Energy Research": 125.0,
          "Other Scientific Research": 2928.0,
          Tourism: 29.0,
          "Foreign Trade and Export Promotion": 471.0,
          "Civil Supplies": 0.0,
          "Other General Economic Services": 6629.0,
        },
        "Non-Tax Revenue of Union Territories": 3066.0,
      },
    },
    "GRANTS-IN-AID AND CONTRIBUTIONS": {
      "External Grant Assistance": 801.0,
      "Aid Material and Equipment": 211.0,
    },
  },
  "Revised Estimates 2024-2025": {
    "TAX REVENUE": {
      "Goods and Services Tax": {
        "Central Goods and Services Tax (CGST)": 908459.0,
        "Union Territory Goods and Services Tax (UTGST)": 5355.0,
        "Integrated Goods and Services Tax (IGST)": null,
        "Goods and Services Tax Compensation Cess": 153440.0,
      },
      "Taxes on Income and Expenditure": {
        "Corporation Tax": 980000.0,
        "Taxes on Income Other Than Corporation Tax": 1199300.0,
        "Hotel Receipts Tax": null,
        "Interest Tax": null,
        "Fringe Benefit Tax": null,
        "Other Taxes on Income and Expenditure": 3000.0,
      },
      "Taxes on Property and Capital Transactions": {
        "Stamps and Registration Fees": null,
        "Estate Duty": null,
        "Taxes on Wealth": null,
        "Securities Transaction Tax": 55000.0,
      },
      "Taxes on Commodities and Services other than Goods and Services Tax": {
        "Banking Cash Transaction Tax": null,
        Customs: 235000.0,
        "Union Excise Duties": 305000.0,
        "Sales Tax": null,
        "Service Tax": 100.0,
        "Other Taxes and Duties on Commodities and Services": 5000.0,
      },
      "Taxes of Union Territories without Legislature": 4516.01,
    },
    "NON-TAX REVENUE": {
      "Fiscal Services": {
        "Currency, Coinage and Mint": 133.4,
        "Other Fiscal Services": 1340.42,
      },
      "Interest Receipts, Dividends and Profits": {
        "Interest Receipts": 83272.49,
        "Interest from State and Union Territory Governments": 14041.86,
        "Other Interest Receipts": 69230.63,
        "Dividends and Profits": 289284.6,
      },
      "Other NonTax Revenue": {
        "General Services": {
          "Public Service Commission": 110.06,
          Police: 12079.44,
          Jails: null,
          "Supplies and Disposals": null,
          "Stationery and Printing": 11.78,
          "Public Works": 174.29,
          "Other Administrative Services": 5370.66,
          "Contributions and Recoveries Towards Pension and Other Retirement Benefits": 2734.68,
          "Miscellaneous General Services": 33245.93,
        },
        "Defence Services": {
          Army: 4961.56,
          Navy: 870.0,
          "Air Force": 1500.0,
          "Coordination & Services (Directorate of Ordnance)": null,
          "Research and Development": null,
        },
        "Social and Community Services": {
          "Education, Sports, Art and Culture": 1015.0,
          "Medical and Public Health": 2350.0,
          "Family Welfare": 37.0,
          "Water Supply and Sanitation": 580.0,
          Housing: 510.0,
          "Urban Development": 0.6,
          "Information and Publicity": 36.0,
          Broadcasting: 930.0,
          "Labour and Employment": 105.0,
          "Social Security and Welfare": 600.0,
          "Other Social Services": 1050.0,
        },
        "Economic Services": {
          "Crop Husbandry": 550.0,
          "Animal Husbandry": 100.0,
          "Dairy Development": 170.0,
          Fisheries: 22.0,
          "Forestry and Wild Life": 60.0,
          "Food, Storage and Warehousing": 4300.0,
          "Agricultural Research and Education": 4.0,
          "Co-Operation": 22.0,
          "Other Agricultural Programmes": 22.0,
          "Land Reforms": 40.0,
          "Other Rural Development Programmes": 35.0,
          "North Eastern Areas": 23.0,
          "Major and Medium Irrigation": 57.0,
          "Minor Irrigation": 440.0,
          Power: 3780.0,
          Petroleum: 173522.0,
          "Coal and Lignite": 46.0,
          "Non-Conventional Sources of Energy": 17.0,
          "Village and Small Industries": 7.0,
          Industries: 3686.0,
          "Non-Ferrous Mining and Metallurgical Industries": 1010.0,
          "Other Industries": 226.0,
          "Indian Railways - Miscellaneous Receipts": 821.0,
          "Indian Railways - Commercial Lines": 252541.0,
          "Indian Railways - Strategic Lines": 2732.0,
          "Ports and Light Houses": 442.0,
          Shipping: 108.0,
          "Civil Aviation": 2728.0,
          "Roads and Bridges": 28374.0,
          "Road Transport": 7.0,
          "Inland Water Transport": 14.0,
          "Postal Receipts": 11321.0,
          "Other Communication Services": 90659.0,
          "Atomic Energy Research": 125.0,
          "Other Scientific Research": 2928.0,
          Tourism: 29.0,
          "Foreign Trade and Export Promotion": 471.0,
          "Civil Supplies": 0.0,
          "Other General Economic Services": 6629.0,
        },
        "Non-Tax Revenue of Union Territories": 3066.0,
      },
    },
    "GRANTS-IN-AID AND CONTRIBUTIONS": {
      "External Grant Assistance": 801.0,
      "Aid Material and Equipment": 211.0,
    },
  },
  "Budget Estimates 2025-2026": {
    "TAX REVENUE": {
      "Goods and Services Tax": {
        "Central Goods and Services Tax (CGST)": 1010890.0,
        "Union Territory Goods and Services Tax (UTGST)": 5355.0,
        "Integrated Goods and Services Tax (IGST)": null,
        "Goods and Services Tax Compensation Cess": 167110.0,
      },
      "Taxes on Income and Expenditure": {
        "Corporation Tax": 1082000.0,
        "Taxes on Income Other Than Corporation Tax": 1357000.0,
        "Hotel Receipts Tax": null,
        "Interest Tax": null,
        "Fringe Benefit Tax": null,
        "Other Taxes on Income and Expenditure": 3000.0,
      },
      "Taxes on Property and Capital Transactions": {
        "Stamps and Registration Fees": null,
        "Estate Duty": null,
        "Taxes on Wealth": null,
        "Securities Transaction Tax": 78000.0,
      },
      "Taxes on Commodities and Services other than Goods and Services Tax": {
        "Banking Cash Transaction Tax": null,
        Customs: 240000.0,
        "Union Excise Duties": 317000.0,
        "Sales Tax": null,
        "Service Tax": 100.0,
        "Other Taxes and Duties on Commodities and Services": 5000.0,
      },
      "Taxes of Union Territories without Legislature": 4778.0,
    },
    "NON-TAX REVENUE": {
      "Fiscal Services": {
        "Currency, Coinage and Mint": 212.98,
        "Other Fiscal Services": 2105.7,
      },
      "Interest Receipts, Dividends and Profits": {
        "Interest Receipts": 90237.98,
        "Interest from State and Union Territory Governments": 17580.82,
        "Other Interest Receipts": 72657.16,
        "Dividends and Profits": 325000.0,
      },
      "Other NonTax Revenue": {
        "General Services": {
          "Public Service Commission": 209.06,
          Police: 16953.24,
          Jails: null,
          "Supplies and Disposals": null,
          "Public Works": 1080.99,
          "Other Administrative Services": 8053.75,
          "Stationery and Printing": 11.5,
          "Contributions and Recoveries Towards Pension and Other Retirement Benefits": 3929.11,
          "Miscellaneous General Services": 35028.1,
        },
        "Defence Services": {
          Army: 4510.78,
          Navy: 870.0,
          "Air Force": 1300.0,
          "Coordination & Services (Directorate of Ordnance)": null,
          "Research and Development": null,
        },
        "Social and Community Services": {
          "Education, Sports, Art and Culture": 1070.0,
          "Medical and Public Health": 2700.0,
          "Family Welfare": 40.0,
          "Water Supply and Sanitation": 620.0,
          Housing: 550.0,
          "Urban Development": 0.6,
          "Information and Publicity": 40.0,
          Broadcasting: 1000.0,
          "Labour and Employment": 120.0,
          "Social Security and Welfare": 600.0,
          "Other Social Services": 1100.0,
        },
        "Economic Services": {
          "Crop Husbandry": 570.0,
          "Animal Husbandry": 100.0,
          "Dairy Development": 170.0,
          Fisheries: 23.0,
          "Forestry and Wild Life": 65.0,
          "Food, Storage and Warehousing": 4350.0,
          "Agricultural Research and Education": 4.0,
          "Co-Operation": 23.0,
          "Other Agricultural Programmes": 22.0,
          "Land Reforms": 41.0,
          "Other Rural Development Programmes": 35.0,
          "North Eastern Areas": 24.0,
          "Major and Medium Irrigation": 58.0,
          "Minor Irrigation": 440.0,
          Power: 3780.0,
          Petroleum: 173522.0,
          "Coal and Lignite": 46.0,
          "Non-Conventional Sources of Energy": 17.0,
          "Village and Small Industries": 7.0,
          Industries: 3686.0,
          "Non-Ferrous Mining and Metallurgical Industries": 1010.0,
          "Other Industries": 226.0,
          "Indian Railways - Miscellaneous Receipts": 821.0,
          "Indian Railways - Commercial Lines": 252541.0,
          "Indian Railways - Strategic Lines": 2732.0,
          "Ports and Light Houses": 442.0,
          Shipping: 108.0,
          "Civil Aviation": 2728.0,
          "Roads and Bridges": 28374.0,
          "Road Transport": 7.0,
          "Inland Water Transport": 14.0,
          "Postal Receipts": 11321.0,
          "Other Communication Services": 90659.0,
          "Atomic Energy Research": 125.0,
          "Other Scientific Research": 2928.0,
          Tourism: 29.0,
          "Foreign Trade and Export Promotion": 471.0,
          "Civil Supplies": 0.0,
          "Other General Economic Services": 6629.0,
        },
        "Non-Tax Revenue of Union Territories": 3066.0,
      },
    },
    "GRANTS-IN-AID AND CONTRIBUTIONS": {
      "External Grant Assistance": 801.0,
      "Aid Material and Equipment": 211.0,
    },
  },
};
