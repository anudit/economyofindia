import {
	type FC,
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

import { SupportedCurrencies } from "@/utils/shared";
import { useToast } from "@chakra-ui/react";

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
	const [activeCurrency, setActiveCurrency] = useState<SupportedCurrencies>(
		SupportedCurrencies.INR,
	);
	const initialBuildIdRef = useRef<string | null>(null);
	const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false);
	const toast = useToast();

	useEffect(() => {
		const fetchRate = async () => {
			try {
				const req = await fetch(
					"https://api.frankfurter.app/latest?to=USD,EUR&from=INR",
				);
				if (!req.ok) throw new Error(`HTTP error! status: ${req.status}`);
				const resp = (await req.json()) as {
					rates?: { EUR: number; USD: number };
				};
				if (resp.rates && typeof resp.rates.USD === "number") {
					setUsdInrRate(1 / resp.rates.USD);
				} else {
					console.warn(
						"Unable to fetch live USDINR rate or invalid format. Using fallback.",
						resp,
					);
					setUsdInrRate(85.56);
				}
			} catch (error) {
				console.error("Failed to fetch USDINR rate:", error);
				setUsdInrRate(85.56);
			}
		};
		fetchRate();
	}, []);

	useEffect(() => {
		let intervalId: NodeJS.Timeout | null = null;

		const getInitialBuildId = async () => {
			try {
				const req = await fetch("https://economyofindia.com/api/version");
				if (!req.ok) {
					throw new Error(`Failed to fetch initial version: ${req.statusText}`);
				}
				const resp = (await req.json()) as { buildId: string | undefined };
				if (typeof resp.buildId === "string" && resp.buildId !== "unknown") {
					initialBuildIdRef.current = resp.buildId.trim();
				} else {
					console.error(
						"Failed to get valid initial buildId from /api/version",
						resp,
					);
				}
			} catch (error) {
				console.error(
					"Error fetching initial build ID from /api/version:",
					error,
				);
			}
		};

		const checkVersion = async () => {
			if (!initialBuildIdRef.current) {
				console.log("Initial build ID not available, skipping version check.");
				return;
			}

			try {
				const response = await fetch(
					`https://economyofindia.com/api/version?t=${Date.now()}`,
					{
						cache: "no-store",
						headers: {
							Pragma: "no-cache",
							"Cache-Control": "no-store, must-revalidate",
						},
					},
				);

				if (!response.ok) {
					if (response.status === 404) {
						console.warn(
							"version not found (maybe old deployment?), skipping check.",
						);
						return;
					}
					throw new Error(
						`Failed to fetch latest version: ${response.statusText}`,
					);
				}

				const { buildId: latestBuildId } = (await response.json()) as {
					buildId: string;
				};

				if (!latestBuildId) {
					console.warn("Fetched latest version was empty or 'unknown'.");
					return;
				}

				if (
					initialBuildIdRef.current.toLowerCase() !==
					latestBuildId.toLowerCase()
				) {
					console.log("New version detected via version!");
					setIsNewVersionAvailable(true);
					if (intervalId) clearInterval(intervalId);
				}
			} catch (error) {
				console.error("Failed to check for new version via version:", error);
			}
		};

		getInitialBuildId().then(() => {
			if (!initialBuildIdRef.current) return;

			checkVersion();
			intervalId = setInterval(checkVersion, 60_000);
		});

		return () => {
			if (intervalId) {
				console.log("Clearing version check interval");
				clearInterval(intervalId);
			}
		};
	}, []);

	useEffect(() => {
		if (isNewVersionAvailable) {
			toast({
				title:
					"A new version of the app is available. Please refresh the page to update.",
				position: "bottom-right",
				isClosable: true,
				colorScheme: "green",
				status: "info",
			});
		}
	}, [isNewVersionAvailable]);

	return (
		<SharedContext.Provider
			value={{
				usdInrRate,
				activeCurrency,
				setActiveCurrency,
			}}
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
