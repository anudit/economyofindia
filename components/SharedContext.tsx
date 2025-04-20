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

interface SharedType {
	usdInrRate: number | null;
	activeCurrency: SupportedCurrencies;
	setActiveCurrency: (currency: SupportedCurrencies) => void;
	// Optional: isNewVersionAvailable: boolean;
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
	const initialBuildIdRef = useRef<string | null>(null); // Store the initial ID
	const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false);

	// --- Fetch Currency Rate (Keep separate or combine as needed) ---
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

	// --- Check for New App Version ---
	useEffect(() => {
		let intervalId: NodeJS.Timeout | null = null;

		// 1. Get the initial build ID using your API route
		const getInitialBuildId = async () => {
			try {
				const req = await fetch("/api/version"); // Use your API route here
				if (!req.ok) {
					throw new Error(`Failed to fetch initial version: ${req.statusText}`);
				}
				const resp = (await req.json()) as { buildId: string | undefined };
				if (typeof resp.buildId === "string" && resp.buildId !== "unknown") {
					initialBuildIdRef.current = resp.buildId.trim();
					console.log(
						"Initial Build ID fetched from API:",
						initialBuildIdRef.current,
					);
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

		// 2. Function to check the latest version by fetching the static file
		const checkVersion = async () => {
			if (!initialBuildIdRef.current) {
				console.log("Initial build ID not available, skipping version check.");
				return; // Don't check if we couldn't get the initial ID
			}

			try {
				// Fetch the static version.txt file
				// Add cache-busting
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
					// Handle case where the file might not exist in older versions if just added
					if (response.status === 404) {
						console.warn(
							"version.txt not found (maybe old deployment?), skipping check.",
						);
						return;
					}
					throw new Error(
						`Failed to fetch latest version.txt: ${response.statusText}`,
					);
				}

				const { buildId: latestBuildId } = (await response.json()) as {
					buildId: string;
				};

				if (!latestBuildId) {
					console.warn("Fetched latest version.txt was empty or 'unknown'.");
					return;
				}

				console.log(
					"Checking version - Initial (from API):",
					initialBuildIdRef.current,
					"Latest (from version.txt):",
					latestBuildId,
				);

				// Compare the latest fetched ID with the initial one
				if (
					initialBuildIdRef.current.toLowerCase() !==
					latestBuildId.toLowerCase()
				) {
					console.log("New version detected via version.txt!");
					setIsNewVersionAvailable(true);
					if (intervalId) clearInterval(intervalId); // Optional: Stop checking once detected
				}
			} catch (error) {
				console.error(
					"Failed to check for new version via version.txt:",
					error,
				);
			}
		};

		// --- Setup ---
		getInitialBuildId().then(() => {
			// Start polling only after attempting to get the initial ID
			if (!initialBuildIdRef.current) return; // Don't poll if initial fetch failed

			checkVersion(); // Check immediately once
			intervalId = setInterval(checkVersion, 60_000); // Check every 60 seconds
		});

		// Cleanup interval on component unmount
		return () => {
			if (intervalId) {
				console.log("Clearing version check interval");
				clearInterval(intervalId);
			}
		};
	}, []); // Runs once on mount

	// --- Effect to Show Alert ---
	useEffect(() => {
		if (isNewVersionAvailable) {
			alert(
				"A new version of the app is available. Please refresh the page to update.",
			);
			// Reset state if needed for dismissible notifications
			// setIsNewVersionAvailable(false);
		}
	}, [isNewVersionAvailable]);

	return (
		<SharedContext.Provider
			value={{
				usdInrRate,
				activeCurrency,
				setActiveCurrency,
				// isNewVersionAvailable // expose if needed
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
