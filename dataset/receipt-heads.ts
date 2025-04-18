import type { DatasetMetadata, DatasetTable } from "@/utils/shared";

export const metadata: DatasetMetadata = {
	id: "receipt_heads",
	title: "REVENUE RECEIPT HEADS",
	titleShort: "RECEIPT HEADS",
	fileName: "receipt_heads.pdf",
	localLink: "/receipt-heads",
	isLive: false,
	sourceFiles: [
		{
			sourceFile: "https://cga.nic.in/DownloadPDF.aspx?filenameid=1894",
			ipfsHash: "bafybeihjn2ce3tt5qfdhxhqivo42phhefdux3hu5exqgkiqo6y3u6kx2wi",
			md5: "bc7ce1f2ff238d44349bd61795032628",
			sha256:
				"d847d25b2621a012636d077d24b1b3fd24eab4f0d4038bda5393fc2734521ff6",
		},
	],

	api: "https://economyofindia.com/api/dataset/receipt_heads",
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
	{
		id: "0044",
		name: "Service Tax",
	},
	{
		id: "0045",
		name: "Other Taxes and Duties on Commodities and Services",
	},
	{
		id: "0046",
		name: "Currency, Coinage and Mint",
	},
	{
		id: "0047",
		name: "Other Fiscal Services",
	},
	{
		id: "0049",
		name: "Interest Receipts",
	},
	{
		id: "0050",
		name: "Dividends and Profits",
	},
	{
		id: "0051",
		name: "Public Service Commission",
	},
	{
		id: "0055",
		name: "Police",
	},
	{
		id: "0056",
		name: "Jails",
	},
	{
		id: "0057",
		name: "Supplies and Disposals",
	},
	{
		id: "0058",
		name: "Stationery and Printing",
	},
	{
		id: "0059",
		name: "Public Works",
	},
	{
		id: "0070",
		name: "Other Administrative Services",
	},
	{
		id: "0071",
		name: "Contributions and Recoveries towards Pension and Other Retirement benefits",
	},
	{
		id: "0075",
		name: "Miscellaneous General Services",
	},
	{
		id: "0076",
		name: "Defence Services - Army",
	},
	{
		id: "0077",
		name: "Defence Services - Navy",
	},
	{
		id: "0078",
		name: "Defence Services - Air Force",
	},
	{
		id: "0079",
		name: "Defence Services Coordination & Services (Directorate of Ordnance)",
	},
	{
		id: "0080",
		name: "Defence Services- Research & Devlopment",
	},
	{
		id: "0202",
		name: "Education, Sports, Art and Culture",
	},
	{
		id: "0210",
		name: "Medical and Public Health",
	},
	{
		id: "0211",
		name: "Family Welfare",
	},
	{
		id: "0215",
		name: "Water Supply and Sanitation",
	},
	{
		id: "0216",
		name: "Housing",
	},
	{
		id: "0217",
		name: "Urban Development",
	},
	{
		id: "0220",
		name: "Information and Publicity",
	},
	{
		id: "0221",
		name: "Broadcasting",
	},
	{
		id: "0230",
		name: "Labour and Employment",
	},
	{
		id: "0235",
		name: "Social Security and Welfare",
	},
	{
		id: "0250",
		name: "Other Social Services",
	},
	{
		id: "0401",
		name: "Crop Husbandry",
	},
	{
		id: "0403",
		name: "Animal Husbandry",
	},
	{
		id: "0404",
		name: "Dairy Development",
	},
	{
		id: "0405",
		name: "Fisheries",
	},
	{
		id: "0406",
		name: "Forestry and Wild Life",
	},
	{
		id: "0407",
		name: "Plantations",
	},
	{
		id: "0408",
		name: "Food Storage and Warehousing",
	},
	{
		id: "0415",
		name: "Agricultural Research and Education",
	},
	{
		id: "0425",
		name: "Co-operation",
	},
	{
		id: "0435",
		name: "Other Agricultural Programmes",
	},
	{
		id: "0506",
		name: "Land Reforms",
	},
	{
		id: "0515",
		name: "Other Rural Development Programmes",
	},
	{
		id: "0551",
		name: "Hill Areas",
	},
	{
		id: "0552",
		name: "North Eastern Areas",
	},
	{
		id: "0575",
		name: "Other Special Areas Programmes",
	},
	{
		id: "0700",
		name: "Major Irrigation",
	},
	{
		id: "0701",
		name: "Medium Irrigation",
	},
	{
		id: "0702",
		name: "Minor Irrigation",
	},
	{
		id: "0801",
		name: "Power",
	},
	{
		id: "0802",
		name: "Petroleum",
	},
	{
		id: "0803",
		name: "Coal and Lignite",
	},
	{
		id: "0810",
		name: "Non Conventional Sources of Energy",
	},
	{
		id: "0851",
		name: "Village and Small Industries",
	},
	{
		id: "0852",
		name: "Industries",
	},
	{
		id: "0853",
		name: "Non-ferrous Mining and Metallurgical Industries",
	},
	{
		id: "0875",
		name: "Other Industries",
	},
	{
		id: "1001",
		name: "Indian Railways-Miscellaneous Receipts",
	},
	{
		id: "1002",
		name: "Indian Railways-Commercial Lines-Revenue Receipts",
	},
	{
		id: "1003",
		name: "Indian Railways-Strategic Lines-Revenue Receipts",
	},
	{
		id: "1051",
		name: "Ports and Light Houses",
	},
	{
		id: "1052",
		name: "Shipping",
	},
	{
		id: "1053",
		name: "Civil Aviation",
	},
	{
		id: "1054",
		name: "Roads and Bridges",
	},
	{
		id: "1055",
		name: "Road Transport",
	},
	{
		id: "1056",
		name: "Inland Water Transport",
	},
	{
		id: "1075",
		name: "Other Transport Services",
	},
	{
		id: "1201",
		name: "Postal Receipts",
	},
	{
		id: "1225",
		name: "Telecommunication Receipts",
	},
	{
		id: "1275",
		name: "Other Communication Services",
	},
	{
		id: "1401",
		name: "Atomic Energy Research",
	},
	{
		id: "1425",
		name: "Other Scientific Research",
	},
	{
		id: "1452",
		name: "Tourism",
	},
	{
		id: "1453",
		name: "Foreign Trade and Export Promotion",
	},
	{
		id: "1456",
		name: "Civil Supplies",
	},
	{
		id: "1475",
		name: "Other General Economic Services",
	},
	{
		id: "1601",
		name: "Grants-in-aid from Central Government",
	},
	{
		id: "1605",
		name: "External Grant Assistance",
	},
	{
		id: "1606",
		name: "Aid Material and Equipment",
	},
	{
		id: "2011",
		name: "Parliament, State/Union Territory Legislatures",
	},
	{
		id: "2012",
		name: "President, Vice-President, Governor/Administrator of Union Territories",
	},
	{
		id: "2013",
		name: "Council of Ministers",
	},
	{
		id: "2014",
		name: "Administration of Justice",
	},
	{
		id: "2015",
		name: "Elections",
	},
	{
		id: "2016",
		name: "Audit",
	},
	{
		id: "2020",
		name: "Collection of Taxes on Income and Expenditure",
	},
	{
		id: "2029",
		name: "Land Revenue",
	},
	{
		id: "2030",
		name: "Stamps and Registration",
	},
	{
		id: "2031",
		name: "Collection of Taxes on Wealth, Securities Transaction Tax and Other Taxes",
	},
	{
		id: "2035",
		name: "Collection of Other Taxes on Property and Capital Transactions",
	},
	{
		id: "2037",
		name: "Customs",
	},
	{
		id: "2038",
		name: "Union Excise Duties",
	},
	{
		id: "2039",
		name: "State Excise",
	},
	{
		id: "2040",
		name: "Taxes on Sales, Trade etc.",
	},
	{
		id: "2041",
		name: "Taxes on Vehicles",
	},
	{
		id: "2042",
		name: "Collection Charges under Central Goods and Services Tax & Integrated Goods and Services Tax",
	},
	{
		id: "2043",
		name: "Collection Charges under State Goods and Services Tax",
	},
	{
		id: "2044",
		name: "Collection Charges under Union Territory Goods and Services Tax",
	},
	{
		id: "2045",
		name: "Other Taxes and Duties on Commodities and Services",
	},
	{
		id: "2046",
		name: "Currency, Coinage and Mint",
	},
	{
		id: "2047",
		name: "Other Fiscal Services",
	},
	{
		id: "2048",
		name: "Appropriation for reduction or avoidance of Debt",
	},
	{
		id: "2049",
		name: "Interest Payments",
	},
	{
		id: "2051",
		name: "Public Service Commission",
	},
	{
		id: "2052",
		name: "Secretariat-General Services",
	},
	{
		id: "2053",
		name: "District Administration",
	},
	{
		id: "2054",
		name: "Treasury and Accounts Administration",
	},
	{
		id: "2055",
		name: "Police",
	},
	{
		id: "2056",
		name: "Jails",
	},
	{
		id: "2057",
		name: "Supplies and Disposals",
	},
	{
		id: "2058",
		name: "Stationery and Printing",
	},
	{
		id: "2059",
		name: "Public Works",
	},
	{
		id: "2061",
		name: "External Affairs",
	},
	{
		id: "2062",
		name: "Vigilance",
	},
	{
		id: "2070",
		name: "Other Administrative Services",
	},
	{
		id: "2071",
		name: "Pensions and Other Retirement benefits",
	},
	{
		id: "2075",
		name: "Miscellaneous General Services",
	},
	{
		id: "2076",
		name: "Defence Services-Army",
	},
	{
		id: "2077",
		name: "Defence Services-Navy",
	},
	{
		id: "2078",
		name: "Defence Services-Air Force",
	},
	{
		id: "2079",
		name: "Defence Services-Coordination & Services (Directorate of Ordnance)",
	},
	{
		id: "2080",
		name: "Defence Services-Research & Development",
	},
	{
		id: "2202",
		name: "General Education",
	},
	{
		id: "2203",
		name: "Technical Education",
	},
	{
		id: "2204",
		name: "Sports and Youth Services",
	},
	{
		id: "2205",
		name: "Art and Culture",
	},
	{
		id: "2210",
		name: "Medical and Public Health",
	},
	{
		id: "2211",
		name: "Family Welfare",
	},
	{
		id: "2215",
		name: "Water Supply and Sanitation",
	},
	{
		id: "2216",
		name: "Housing",
	},
	{
		id: "2217",
		name: "Urban Development",
	},
	{
		id: "2220",
		name: "Information and Publicity",
	},
	{
		id: "2221",
		name: "Broadcasting",
	},
	{
		id: "2225",
		name: "Welfare of Scheduled Castes, Scheduled Tribes and Other Backward Classes and Minorities",
	},
	{
		id: "2230",
		name: "Labour, Employment and Skill Development",
	},
	{
		id: "2235",
		name: "Social Security and Welfare",
	},
	{
		id: "2236",
		name: "Nutrition",
	},
	{
		id: "2245",
		name: "Relief on account of Natural Calamities",
	},
	{
		id: "2250",
		name: "Other Social Services",
	},
	{
		id: "2251",
		name: "Secretariat - Social Services",
	},
	{
		id: "2401",
		name: "Crop Husbandry",
	},
	{
		id: "2402",
		name: "Soil and Water Conservation",
	},
	{
		id: "2403",
		name: "Animal Husbandry",
	},
	{
		id: "2404",
		name: "Dairy Development",
	},
	{
		id: "2405",
		name: "Fisheries",
	},
	{
		id: "2406",
		name: "Forestry and Wild Life",
	},
	{
		id: "2407",
		name: "Plantations",
	},
	{
		id: "2408",
		name: "Food Storage and Warehousing",
	},
	{
		id: "2416",
		name: "Agricultural Research and Education",
	},
	{
		id: "2424",
		name: "Agricultural Financial Institutions",
	},
	{
		id: "2425",
		name: "Co-operation",
	},
	{
		id: "2435",
		name: "Other Agricultural Programmes",
	},
	{
		id: "2501",
		name: "Special Programmes for Rural Development",
	},
	{
		id: "2505",
		name: "Rural Employment",
	},
	{
		id: "2506",
		name: "Land Reforms",
	},
	{
		id: "2515",
		name: "Other Rural Development Programmes",
	},
	{
		id: "2551",
		name: "Hill Areas",
	},
	{
		id: "2552",
		name: "North Eastern Areas",
	},
	{
		id: "2553",
		name: "MP's Local Area Development Scheme",
	},
	{
		id: "2575",
		name: "Other Special Areas Programmes",
	},
	{
		id: "2700",
		name: "Major Irrigation",
	},
	{
		id: "2701",
		name: "Medium Irrigation",
	},
	{
		id: "2702",
		name: "Minor Irrigation",
	},
	{
		id: "2705",
		name: "Command Area Development",
	},
	{
		id: "2711",
		name: "Flood Control and Drainage",
	},
	{
		id: "2801",
		name: "Power",
	},
	{
		id: "2802",
		name: "Petroleum",
	},
	{
		id: "2803",
		name: "Coal and Lignite",
	},
	{
		id: "2810",
		name: "New and Renewable Energy",
	},
	{
		id: "2851",
		name: "Village and Small Industries",
	},
	{
		id: "2852",
		name: "Industries",
	},
	{
		id: "2853",
		name: "Non-ferrous Mining and Metallurgical Industries",
	},
	{
		id: "2875",
		name: "Other Industries",
	},
	{
		id: "2885",
		name: "Other Outlays on Industries and Minerals",
	},
	{
		id: "3001",
		name: "Indian Railways-Policy Formulation, Direction, Research and other Miscellaneous Organisation",
	},
	{
		id: "3002",
		name: "Indian Railways-Commercial Lines-Working Expenses",
	},
	{
		id: "3003",
		name: "Indian Railways-Strategic Lines-Working Expenses",
	},
	{
		id: "3004",
		name: "Indian Railways-Open Line Works (Revenue)",
	},
	{
		id: "3005",
		name: "Payments to General Revenues",
	},
	{
		id: "3006",
		name: "Appropriation from Railway Surplus",
	},
	{
		id: "3007",
		name: "Repayment of Loans taken from General Revenues",
	},
	{
		id: "3051",
		name: "Ports and Light Houses",
	},
	{
		id: "3052",
		name: "Shipping",
	},
	{
		id: "3053",
		name: "Civil Aviation",
	},
	{
		id: "3054",
		name: "Roads and Bridges",
	},
	{
		id: "3055",
		name: "Road Transport",
	},
	{
		id: "3056",
		name: "Inland Water Transport",
	},
	{
		id: "3075",
		name: "Other Transport Services",
	},
	{
		id: "3201",
		name: "Postal Services",
	},
	{
		id: "3225",
		name: "Telecommunication Services",
	},
	{
		id: "3230",
		name: "Dividends to General Revenues",
	},
	{
		id: "3231",
		name: "Appropriations from Telecommunications Surplus",
	},
	{
		id: "3232",
		name: "Repayment of Loans taken from General Revenues by Telecommunications",
	},
	{
		id: "3235",
		name: "Satellite Systems",
	},
	{
		id: "3275",
		name: "Other Communication Services",
	},
	{
		id: "3401",
		name: "Atomic Energy Research",
	},
	{
		id: "3402",
		name: "Space Research",
	},
	{
		id: "3403",
		name: "Earth System Science",
	},
	{
		id: "3435",
		name: "Other Scientific Research",
	},
	{
		id: "3455",
		name: "Civil Supplies",
	},
	{
		id: "3465",
		name: "General Financial and Trading Institutions",
	},
	{
		id: "3466",
		name: "International Financial Institutions",
	},
	{
		id: "3475",
		name: "Other General Economic Services",
	},
	{
		id: "3601",
		name: "Grants-in-aid to State Governments",
	},
	{
		id: "3602",
		name: "Grants-in-aid to Union Territory Governments with Legislature",
	},
	{
		id: "3604",
		name: "Compensation and Assignments to Local Bodies and Panchayati Raj Institutions",
	},
	{
		id: "3605",
		name: "Technical and Economic Co-operation with other countries",
	},
	{
		id: "3606",
		name: "Aid Materials and Equipments",
	},
	{
		id: "4000",
		name: "Miscellaneous Capital Receipts",
	},
	{
		id: "4016",
		name: "Capital Outlay on Currency, Coinage and Mint",
	},
	{
		id: "4046",
		name: "Capital Outlay on Audit ",
	},
	{
		id: "4047",
		name: "Capital Outlay on other Fiscal Services",
	},
	{
		id: "4052",
		name: "Capital Outlay on Police",
	},
	{
		id: "4058",
		name: "Capital Outlay on Stationery and Printing",
	},
	{
		id: "4059",
		name: "Capital Outlay in Public Works",
	},
	{
		id: "4070",
		name: "Capital Outlay on other Administrative Services",
	},
	{
		id: "4075",
		name: "Capital Outlay on Miscellaneous General Services",
	},
	{
		id: "4076",
		name: "Capital Outlay on Defence Services",
	},
	{
		id: "4202",
		name: "Capital Outlay on Education , Sports, Art and Culture",
	},
	{
		id: "4210",
		name: "Capital Outlay on Medical and Public Helath",
	},
	{
		id: "4211",
		name: "Capital Outlay on Family Welfare",
	},
	{
		id: "4215",
		name: "Capital Outlay on Water Supply and Sanitation",
	},
	{
		id: "4216",
		name: "Capital Outlay on Housing",
	},
	{
		id: "4217",
		name: "Capital Outlay on Urban Development",
	},
	{
		id: "4220",
		name: "Capital Outlay on Information and Publicity",
	},
	{
		id: "4221",
		name: "Capital Outlay on Broadcasting",
	},
	{
		id: "4225",
		name: "Capital Outlay on Welfare of Scheduled Castes, Scheduled Tribes and Other Backward Classes",
	},
	{
		id: "4235",
		name: "Capital Outlay on Social Security and Welfare",
	},
	{
		id: "4236",
		name: "Capital Outlay on Nutrition",
	},
	{
		id: "4250",
		name: "Capital Outlay on other Social Services",
	},
	{
		id: "4401",
		name: "Capital Outlay on Crop Husbandry",
	},
	{
		id: "4402",
		name: "Capital Outlay on Soil and Water Conservation",
	},
	{
		id: "4403",
		name: "Capital Outlay on Animal Husbandry",
	},
	{
		id: "4404",
		name: "Capital Outlay on Dairy Development",
	},
	{
		id: "4405",
		name: "Capital Outlay on Fisheries",
	},
	{
		id: "4406",
		name: "Capital Outlay on Forestry and Wild Life",
	},
	{
		id: "4407",
		name: "Capital Outlay on Plantations",
	},
	{
		id: "4408",
		name: "Capital Outlay on Food Storage and Warehousing",
	},
	{
		id: "4415",
		name: "Capital Outlay on Agricultural Research and Education",
	},
	{
		id: "4416",
		name: "Investment in Agricultural Financial Institutions",
	},
	{
		id: "4425",
		name: "Capital Outlay on Co-operation",
	},
	{
		id: "4435",
		name: "Capital Outlay on other Agricultural Programmes",
	},
	{
		id: "4515",
		name: "Capital Outlay on other Rural Development Programmes",
	},
	{
		id: "4551",
		name: "Capital Outlay on Hill Areas",
	},
	{
		id: "4552",
		name: "Capital Outlay on North Eastern Areas",
	},
	{
		id: "4575",
		name: "Capital Outlay on other Special Areas Programmes",
	},
	{
		id: "4700",
		name: "Capital Outlay on Major Irrigation",
	},
	{
		id: "4701",
		name: "Capital Outlay on Medium Irrigation",
	},
	{
		id: "4702",
		name: "Capital Outlay on Minor Irrigation",
	},
	{
		id: "4705",
		name: "Capital Outlay on Command Area Development",
	},
	{
		id: "4711",
		name: "Capital Outlay on Flood Control Projects",
	},
	{
		id: "4801",
		name: "Capital Outlay on Power Projects",
	},
	{
		id: "4802",
		name: "Capital Outlay on Petroleum",
	},
	{
		id: "4803",
		name: "Capital Outlay on Coal and Lignite",
	},
	{
		id: "4810",
		name: "Capital Outlay on New and Renewable Energy",
	},
	{
		id: "4851",
		name: "Capital Outlay on Village and Small Industries",
	},
	{
		id: "4852",
		name: "Capital Outlay on Iron Steel Industries",
	},
	{
		id: "4853",
		name: "Capital Outlay on Non-ferrous Mining and Metallurgical Industries",
	},
	{
		id: "4854",
		name: "Capital Outlay on Cement and Non-metallic Mineral Industries",
	},
	{
		id: "4855",
		name: "Capital Outlay on Fertilizer Industries",
	},
	{
		id: "4856",
		name: "Capital Outlay on Petro-Chemical Industries",
	},
	{
		id: "4857",
		name: "Capital Outlay on Chemical and Pharmaceutical Industries",
	},
	{
		id: "4858",
		name: "Capital Outlay on Engineering Industries",
	},
	{
		id: "4859",
		name: "Capital Outlay on Telecommunication and Electronic Industries",
	},
	{
		id: "4860",
		name: "Capital Outlay on Consumer Industries",
	},
	{
		id: "4865",
		name: "Capital Outlay on Atomic Energy Industries",
	},
	{
		id: "4875",
		name: "Capital Outlay on other Industries",
	},
	{
		id: "4885",
		name: "Other Capital Outlay on Industries and Minerals",
	},
	{
		id: "5002",
		name: "Capital Outlay on Indian Railways-Commercial Lines",
	},
	{
		id: "5003",
		name: "Capital Outlay on Indian Railways-Strategic Lines",
	},
	{
		id: "5051",
		name: "Capital Outlay on Ports and Light Houses",
	},
	{
		id: "5052",
		name: "Capital Outlay on Shipping",
	},
	{
		id: "5053",
		name: "Capital Outlay on Civil Aviation",
	},
	{
		id: "5054",
		name: "Capital Outlay on Roads and Bridges",
	},
	{
		id: "5055",
		name: "Capital Outlay on Road Transport",
	},
	{
		id: "5056",
		name: "Capital Outlay on Inland and Water Transport",
	},
	{
		id: "5075",
		name: "Capital Outlay on other Transport Services",
	},
	{
		id: "5201",
		name: "Capital Outlay on Postal Services",
	},
	{
		id: "5202",
		name: "Capital Outlay on Telecommunication Services",
	},
	{
		id: "5222",
		name: "Capital Outlay on Satellite Systems",
	},
	{
		id: "5275",
		name: "Capital Outlay on other Communication Services",
	},
	{
		id: "5401",
		name: "Capital Outlay on Atomic Energy Research",
	},
	{
		id: "5402",
		name: "Capital Outlay on Space Research",
	},
	{
		id: "5403",
		name: "Capital Outlay on Earth System Science",
	},
	{
		id: "5425",
		name: "Capital Outlay on other Scientific and Environmental Research",
	},
	{
		id: "5452",
		name: "Capital Outlay on Tourism",
	},
	{
		id: "5453",
		name: "Capital Outlay on Foreign Trade and Export Promotion",
	},
	{
		id: "5455",
		name: "Capital Outlay on Meteorology",
	},
	{
		id: "5465",
		name: "Investments in General Financial and Trading Institutions",
	},
	{
		id: "5466",
		name: "Investment in International Financial Institutions",
	},
	{
		id: "5467",
		name: "Capital Outlay on Investment of National Investment Fund",
	},
	{
		id: "5475",
		name: "Capital Outlay on other General Economic Services",
	},
	{
		id: "6001",
		name: "Internal Debt of Central Government",
	},
	{
		id: "6002",
		name: "External Debt",
	},
	{
		id: "6003",
		name: "Internal Debt of the State Government",
	},
	{
		id: "6004",
		name: "Loans and Advances from the Central Government",
	},
	{
		id: "6005",
		name: "External Debt Suspense",
	},
	{
		id: "6075",
		name: "Loans for Miscellaneous General Services",
	},
	{
		id: "6202",
		name: "Loans for Education, Sports, Art and Culture",
	},
	{
		id: "6210",
		name: "Loans for Medical and Public Health",
	},
	{
		id: "6211",
		name: "Loans for Family Welfare",
	},
	{
		id: "6215",
		name: "Loans for Water Supply and Sanitation",
	},
	{
		id: "6216",
		name: "Loans for Housing",
	},
	{
		id: "6217",
		name: "Loans for Urban Development",
	},
	{
		id: "6220",
		name: "Loans for Information and Publicity",
	},
	{
		id: "6221",
		name: "Loans for Broadcasting",
	},
	{
		id: "6225",
		name: "Loans for Welfare of Scheduled Castes, Scheduled Tribes, other Backward Classes and Minorities",
	},
	{
		id: "6235",
		name: "Loans for Social Security and Welfare",
	},
	{
		id: "6245",
		name: "Loans for Relief on account of Natural Calamities",
	},
	{
		id: "6250",
		name: "Loans for other Social Services",
	},
	{
		id: "6401",
		name: "Loans for Crop Husbandry",
	},
	{
		id: "6402",
		name: "Loans for Soil and Water Conservation",
	},
	{
		id: "6403",
		name: "Loans for Animal Husbandry",
	},
	{
		id: "6404",
		name: "Loans for Dairy Development",
	},
	{
		id: "6405",
		name: "Loans for Fisheries",
	},
	{
		id: "6406",
		name: "Loans for Forestry and Wild Life",
	},
	{
		id: "6407",
		name: "Loans for Plantations",
	},
	{
		id: "6408",
		name: "Loans for Food Storage and Warehousing",
	},
	{
		id: "6415",
		name: "Loans for Agricultural Research and Education",
	},
	{
		id: "6425",
		name: "Loans for Co-operation",
	},
	{
		id: "6435",
		name: "Loans for other Agricultural Programmes",
	},
	{
		id: "6501",
		name: "Loans for Special Programmes for Rural Development",
	},
	{
		id: "6505",
		name: "Loans for Rural Employment",
	},
	{
		id: "6506",
		name: "Loans for Land Reforms",
	},
	{
		id: "6515",
		name: "Loans for other Rural Development Programmes",
	},
	{
		id: "6551",
		name: "Loans for Hill Areas",
	},
	{
		id: "6552",
		name: "Loans for North Eastern Areas",
	},
	{
		id: "6575",
		name: "Loans for other Special Areas Programmes",
	},
	{
		id: "6700",
		name: "Loans for Major Irrigation",
	},
	{
		id: "6701",
		name: "Loans for Medium Irrigation",
	},
	{
		id: "6702",
		name: "Loans for Minor Irrigation",
	},
	{
		id: "6705",
		name: "Loans for Command Area Development",
	},
	{
		id: "6711",
		name: "Loans for Flood Control Projects",
	},
	{
		id: "6801",
		name: "Loans for Power Projects",
	},
	{
		id: "6802",
		name: "Loans for Petroleum",
	},
	{
		id: "6803",
		name: "Loans for Coal and Lignite",
	},
	{
		id: "6810",
		name: "Loans for New and Renewable Energy",
	},
	{
		id: "6851",
		name: "Loans for Village and Small Industries",
	},
	{
		id: "6852",
		name: "Loans for Industries",
	},
	{
		id: "6853",
		name: "Loans for Non-ferrous Mining and Metallurgical Industries",
	},
	{
		id: "6875",
		name: "Loans for Other Industries",
	},
	{
		id: "6885",
		name: "Other Loans on Industries and Minerals",
	},
	{
		id: "7051",
		name: "Loans for Ports and Light Houses",
	},
	{
		id: "7052",
		name: "Loans for Shipping",
	},
	{
		id: "7053",
		name: "Loans for Civil Aviation",
	},
	{
		id: "7054",
		name: "Loans for Roads and Bridges",
	},
	{
		id: "7055",
		name: "Loans for Road Transport",
	},
	{
		id: "7056",
		name: "Loans for Inland Water Transport",
	},
	{
		id: "7075",
		name: "Other Loans for Transport Services",
	},
	{
		id: "7225",
		name: "Loans for Telecommunication Services",
	},
	{
		id: "7235",
		name: "Loans for Satellite Systems",
	},
	{
		id: "7275",
		name: "Loans for other Communication Services",
	},
	{
		id: "7401",
		name: "Loans for Atomic Energy Research",
	},
	{
		id: "7402",
		name: "Loans for Space Research",
	},
	{
		id: "7425",
		name: "Loans for other Science and Technology",
	},
	{
		id: "7465",
		name: "Loans to General Financial and Trading Institutions",
	},
	{
		id: "7475",
		name: "Loans for other General Economic Services",
	},
	{
		id: "7601",
		name: "Loans to State Governments",
	},
	{
		id: "7602",
		name: "Loans to Union Territories Governments with legislature",
	},
	{
		id: "7603",
		name: "Ways and Means Advances to State Governments",
	},
	{
		id: "7604",
		name: "Short Term Loans to State Governments",
	},
	{
		id: "7605",
		name: "Loans under Technical and Economic Co-operation Programme",
	},
	{
		id: "8001",
		name: "National Savings Deposits",
	},
	{
		id: "8002",
		name: "National Savings Certificates",
	},
	{
		id: "8006",
		name: "Public Provident Funds",
	},
	{
		id: "8007",
		name: "Investments of National Small Savings Fund",
	},
	{
		id: "8008",
		name: "Income and Expenditure of National Small Savings Fund",
	},
	{
		id: "8009",
		name: "State Provident Fund",
	},
	{
		id: "8010",
		name: "Trusts and Endowments",
	},
	{
		id: "8011",
		name: "Insurance and Pension Funds",
	},
	{
		id: "8012",
		name: "Special Deposits and Accounts",
	},
	{
		id: "8013",
		name: "Other Deposits and Accounts",
	},
	{
		id: "8014",
		name: "Postal Life Insurance Schemes",
	},
	{
		id: "8015",
		name: "Investments of Post Office Insurance Fund",
	},
	{
		id: "8016",
		name: "Income & Expenditure of Post Office Insurance Fund",
	},
	{
		id: "8031",
		name: "Other Savings Deposits",
	},
	{
		id: "8032",
		name: "Other Savings Certificates",
	},
	{
		id: "8115",
		name: "Depreciation/Renewal Reserve Fund",
	},
	{
		id: "8116",
		name: "Revenue Reserve Funds",
	},
	{
		id: "8117",
		name: "Development Funds",
	},
	{
		id: "8118",
		name: "Capital Reserve Funds",
	},
	{
		id: "8121",
		name: "General and Other Reserve Funds",
	},
	{
		id: "8222",
		name: "Sinking Funds",
	},
	{
		id: "8223",
		name: "Famine Relief Fund",
	},
	{
		id: "8224",
		name: "Central Road and Infrastructure Fund",
	},
	{
		id: "8225",
		name: "Roads and Bridges Fund",
	},
	{
		id: "8226",
		name: "Depreciation/Renewal Reserve Fund",
	},
	{
		id: "8229",
		name: "Revenue Reserve Funds",
	},
	{
		id: "8230",
		name: "Development and Welfare Funds",
	},
	{
		id: "8231",
		name: "Railway Safety Fund",
	},
	{
		id: "8232",
		name: "Rural Employment Guarantee Funds",
	},
	{
		id: "8235",
		name: "General and Other Reserve Funds",
	},
];
