import {
	type FC,
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

import { SupportedCurrencies } from "@/utils/shared";

interface SharedType {
	usdInrRate: number | null;
	activeCurrency: SupportedCurrencies;
	setActiveCurrency: (currency: SupportedCurrencies) => void;
}
export const SharedContext = createContext<SharedType | undefined>(undefined);

interface SharedProviderProps {
	children: ReactNode;
}
export const SharedProvider: FC<SharedProviderProps> = ({ children }) => {
	const [usdInrRate, setUsdInrRate] = useState<number | null>(null);
	const [buildId, setBuildId] = useState<string | null>(null);
	const [activeCurrency, setActiveCurrency] = useState<SupportedCurrencies>(
		SupportedCurrencies.INR,
	);

	const fetchRate = async () => {
		const req = await fetch(
			"https://api.frankfurter.dev/v1/latest?symbols=USD,EUR&base=INR",
		);
		const resp = (await req.json()) as { rates: { EUR: number; USD: number } };
		if (Object.keys(resp).includes("rates")) {
			setUsdInrRate(1 / resp.rates.USD);
		} else {
			console.log("Unable to fetch live USDINR rate.");
			setUsdInrRate(85.56);
		}
	};

	const updateVersion = async () => {
		const req = await fetch("/api/version");
		const resp = (await req.json()) as { buildId: string | undefined };
		if (typeof resp.buildId === "string") {
			console.log(
				typeof buildId === "string",
				resp.buildId.toLowerCase(),
				buildId?.toLowerCase(),
				resp.buildId.toLowerCase() !== buildId?.toLowerCase(),
			);
			if (
				typeof buildId === "string" &&
				resp.buildId.toLowerCase() !== buildId.toLowerCase()
			) {
				alert("New version of app available, please refresh.");
			}
			setBuildId(resp.buildId);
		} else {
			console.log("Failed to get latest version", resp);
		}
	};

	useEffect(() => {
		console.log("buildId now", buildId);
	}, [buildId]);

	useEffect(() => {
		fetchRate();
		updateVersion();
		setInterval(updateVersion, 60_000);
	}, []);

	return (
		<SharedContext.Provider
			value={{ usdInrRate, activeCurrency, setActiveCurrency }}
		>
			{children}
		</SharedContext.Provider>
	);
};

export const useSharedContext = (): SharedType => {
	const context = useContext(SharedContext);
	if (!context) {
		throw new Error("useSharedContext must be used within a SharedProvider");
	}
	return context;
};
