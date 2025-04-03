import { SupportedCurrencies } from "@/utils/shared";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";

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

  const fetchRate = async () => {
    let req = await fetch(
      "https://api.frankfurter.dev/v1/latest?symbols=INR&base=USD",
    );
    let resp = (await req.json()) as { rates: { INR: number } };
    if (Object.keys(resp).includes("rates")) {
      setUsdInrRate(resp["rates"]["INR"]);
    } else {
      console.log("Unable to fetch live USDINR rate.");
      setUsdInrRate(85.56);
    }
  };

  useEffect(() => {
    fetchRate();
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
