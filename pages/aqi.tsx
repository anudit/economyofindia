import PageShell from "@/components/PageShell";
import { metadata } from "@/dataset/aqi";
import { STATES, aqiToDetails } from "@/utils/shared";
import { Flex, Heading, Select, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

async function decompressGzipUint8Array(compressedData: Uint8Array) {
	// Create a DecompressionStream instance with 'gzip' as the format.
	const ds = new DecompressionStream("gzip");

	// Convert the input Uint8Array to a ReadableStream by wrapping it in a Response.
	const compressedStream = new Response(compressedData).body;
	if (!compressedStream)
		throw new Error("Invalid input to decompressGzipUint8Array");

	// Pipe the compressed stream through the DecompressionStream.
	const decompressedStream = compressedStream.pipeThrough(ds);

	// Read the decompressed data into an ArrayBuffer.
	const decompressedArrayBuffer = await new Response(
		decompressedStream,
	).arrayBuffer();

	// Convert the ArrayBuffer into a Uint8Array and return it.
	return new Uint8Array(decompressedArrayBuffer);
}

type AqiResp = Array<{
	aqi: number;
	metrics: Array<{
		name: string;
		avg: string;
		avgDesc: string;
		min: number;
		max: number;
		pollutantName: string;
		data: {
			[key: string]: number | null;
		};
	}>;
	station: {
		id: string;
		name: string;
		longitude: string;
		latitude: string;
		live: boolean;
		avg: string;
		cityID: string;
		stateID: string;
	};
}>;

export const pollutantFormat = (p: string): React.ReactNode => {
	if (p.toLowerCase() === "pm2.5") {
		return (
			<>
				PM<sub>2.5</sub>
			</>
		);
	} else if (p.toLowerCase() === "pm10") {
		return (
			<>
				PM<sub>10</sub>
			</>
		);
	} else if (p.toLowerCase() === "no2") {
		return (
			<>
				NO<sub>2</sub>
			</>
		);
	} else if (p.toLowerCase() === "nh3") {
		return (
			<>
				NH<sub>3</sub>
			</>
		);
	} else if (p.toLowerCase() === "so2") {
		return (
			<>
				SO<sub>2</sub>
			</>
		);
	} else if (p.toLowerCase() === "co") {
		return <>CO</>;
	} else if (p.toLowerCase() === "ozone" || p.toLowerCase() === "o3") {
		return (
			<>
				O<sub>3</sub>
			</>
		);
	} else if (p.toLowerCase() === "no2") {
		return (
			<>
				NO<sub>2</sub>
			</>
		);
	}
};

export default function Home() {
	const [data, setData] = useState<AqiResp | null>(null);
	const [state, setState] = useState<string>("All");

	useEffect(() => {
		async function getData() {
			const req = await fetch("https://aqi.economyofindia.com/aqis");
			const resp = await req.arrayBuffer();
			const decom = await decompressGzipUint8Array(new Uint8Array(resp));
			const final = JSON.parse(new TextDecoder().decode(decom));
			console.log(final);
			setData(final);
		}
		getData();
	}, []);

	return (
		<PageShell
			metadata={metadata}
			topBarChildren={
				<Select
					defaultValue={0}
					borderRadius="md"
					onChange={(e) => {
						const sel = e.currentTarget.selectedIndex;
						if (sel === 0) setState("All");
						else setState(STATES[e.currentTarget.selectedIndex - 1]);
					}}
					w={{ base: "130px", sm: "130px", md: "250px" }}
					size="sm"
				>
					<option value={0} key={0}>
						All States
					</option>
					{STATES.map((k, ind) => (
						<option value={ind + 1} key={ind + 1}>
							{k}
						</option>
					))}
				</Select>
			}
		>
			{data !== null ? (
				<SimpleGrid columns={[1, null, null, 2]} spacing="40px">
					{data
						.filter((e) =>
							state === "All" ? true : e.station.stateID === state,
						)
						.map((e, id) => (
							<Flex key={id} direction="column">
								<Flex direction="row" mb={2} px={2}>
									<Flex direction="column" w="100%">
										<Text fontSize="md" fontWeight={500}>
											{e.station.name}
										</Text>
										<Text fontSize="xs" mt={-1} fontWeight={200}>
											{e.station.cityID}{" "}
											{e.station.cityID !== e.station.stateID
												? `- ${e.station.stateID}`
												: undefined}
										</Text>
									</Flex>
									<Flex direction="row" w="100px" justifyContent="end">
										<Heading color={aqiToDetails(e.aqi).hex}>
											{e.aqi.toFixed(0)}
										</Heading>
									</Flex>
								</Flex>
								{e.metrics.map((st, id2) => {
									return (
										<Flex
											key={id2}
											direction="row"
											w="100%"
											h="50px"
											background="whiteAlpha.100"
											borderRadius="30px"
											my={0.5}
										>
											<Flex
												direction="row"
												w={{
													base: `${Math.max(((Number.parseInt(st.avg) % 500) / 500) * 100, 10)}%`,
													lg: `${Math.max((((Number.parseInt(st.avg) % 500) / 500) * 100) / 2, 3)}%`,
												}}
												h="50px"
												background={aqiToDetails(Number.parseInt(st.avg)).hex}
												borderRadius="30px"
												position="absolute"
											/>
											<Flex
												zIndex={2}
												w="100%"
												justifyContent="space-between"
												alignItems="center"
												px={4}
											>
												<Flex direction="column">
													<Text color="black" fontSize="xs">
														{pollutantFormat(st.pollutantName)}{" "}
													</Text>
													<Text
														color="black"
														fontSize="large"
														mt={-1}
														fontWeight={600}
													>
														{
															Object.values(st.data)
																.filter((e) => typeof e === "number")
																.reverse()[0]
														}
													</Text>
												</Flex>
												<Text
													fontSize="xx-large"
													color={aqiToDetails(Number.parseInt(st.avg)).hex}
												>
													{aqiToDetails(Number.parseInt(st.avg)).title}
												</Text>
											</Flex>
										</Flex>
									);
								})}
							</Flex>
						))}
				</SimpleGrid>
			) : (
				<Text>Loading...</Text>
			)}
		</PageShell>
	);
}
