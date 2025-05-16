import ChartCard from "@/components/ChartCard";
import StatCard from "@/components/StatCard";
import type { Dataset3 } from "@/utils/shared";
import {
	CRORE,
	type SimpleDataset,
	chartDataFormat,
	titleCase,
} from "@/utils/shared";
import { Text } from "@chakra-ui/react";

export default function ChartGrid({
	dataset,
	palette = "green",
	section,
	convert = false
}: {
	dataset: Dataset3;
	palette?: "green" | "red" | string[];
	section?: string;
	convert?: boolean
}) {
	if (!dataset) {
		return <Text>Data not available</Text>;
	}
	return (
		<>
			{Object.entries(dataset).map(([level2Key, level2Val]) => {
				if (
					level2Val != null &&
					typeof level2Val === "object" &&
					typeof Object.values(level2Val)[0] === "number"
				) {
					return (
						<ChartCard
							palette={palette}
							data={chartDataFormat(level2Val as SimpleDataset, convert)}
							title={level2Key}
							key={level2Key}
							route={`${section !== undefined ? `${titleCase(section)} > ` : ""}${titleCase(level2Key)}`}
						/>
					);
				} else if (
					level2Val != null &&
					typeof level2Val === "object" &&
					typeof Object.values(level2Val)[0] === "object"
				) {
					return Object.entries(level2Val).map(([level3Key, level3Val]) => {
						if (
							level3Val != null &&
							typeof level3Val === "object" &&
							(typeof Object.values(level3Val)[0] !== "object" ||
								Object.values(level3Val)[0] == null)
						) {
							return (
								<ChartCard
									palette={palette}
									data={chartDataFormat(level3Val as SimpleDataset, convert)}
									title={level3Key}
									key={level3Key}
									route={`${section !== undefined ? `${titleCase(section)} > ` : ""}${titleCase(level2Key)}`}
								/>
							);
						} else if (
							level3Val != null &&
							typeof level3Val === "object" &&
							typeof Object.values(level3Val)[0] === "object" &&
							Object.values(level3Val)[0] != null
						) {
							return Object.entries(level3Val).map(([level4Key, level4Val]) => {
								if (level4Val != null && typeof level4Val === "object") {
									return (
										<ChartCard
											palette={palette}
											data={chartDataFormat(
												level4Val as {
													[key: string]: number | null;
												}, convert
											)}
											title={level4Key}
											key={level4Key}
											route={`${section !== undefined ? `${titleCase(section)} > ` : ""}${titleCase(level2Key)} > ${titleCase(level3Key)}`}
										/>
									);
								} else if (typeof level4Val === "number") {
									return (
										<StatCard
											stat={level4Val * CRORE}
											title={level4Key}
											key={level4Key}
											route={`${section !== undefined ? `${titleCase(section)} > ` : ""}${titleCase(level2Key)} > ${titleCase(level3Key)} > ${titleCase(level4Key)}`}
											palette={palette}
										/>
									);
								} else {
									return null;
								}
							});
						} else if (typeof level3Val === "number") {
							return (
								<StatCard
									stat={level3Val * CRORE}
									title={level3Key}
									key={level3Key}
									route={`${section !== undefined ? `${titleCase(section)} > ` : ""}${titleCase(level2Key)} > ${titleCase(level3Key)}`}
									palette={palette}
								/>
							);
						} else {
							return null;
						}
					});
				} else if (level2Val != null && typeof level2Val === "number") {
					return (
						<StatCard
							stat={level2Val * CRORE}
							title={level2Key}
							key={level2Key}
							route={`${section !== undefined ? titleCase(section) : ""}`}
							palette={palette}
						/>
					);
				}
			})}
		</>
	);
}
