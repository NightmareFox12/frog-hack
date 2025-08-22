import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/shadcn/button";
import { CircleDollarSign, Search } from "lucide-react";
import { hardhat } from "viem/chains";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

export const ScaffoldFooter = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  const router = useRouter();

  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {nativeCurrencyPrice > 0 && (
              <div>
                <Button variant="outline" className="cursor-auto">
                  <CircleDollarSign />
                  {nativeCurrencyPrice.toFixed(2)}
                </Button>
              </div>
            )}
            {isLocalNetwork && (
              <>
                <Faucet />
                <Button onClick={() => router.push("/blockexplorer")}>
                  <Search />
                  Block Explorer
                </Button>
              </>
            )}
          </div>
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
      </div>
    </div>
  );
};
