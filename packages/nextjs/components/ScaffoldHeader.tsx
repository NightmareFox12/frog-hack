import Image from "next/image";
import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FaucetButton } from "./scaffold-eth/FaucetButton";
// import { RainbowKitCustomConnectButton } from "./scaffold-eth/RainbowKitCustomConnectButton";
// import { Button } from "./ui/shadcn/button";
import { BugIcon, File } from "lucide-react";

// import { hardhat } from "viem/chains";
// import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  // {
  //   label: "Home",
  //   href: "/",
  //   icon: <Home />,
  // },
  {
    label: "Tasks",
    href: "/",
    icon: <File />,
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugIcon className="h-4 w-4" />,
  },
];

export const ScaffoldHeader = () => {
  // const { targetNetwork } = useTargetNetwork();
  // const isLocalNetwork = targetNetwork.id === hardhat.id;
  // const pathname = usePathname();

  return (
    <header className="w-full bg-green-50">
      <div className="mx-4 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 justify-center">
          <Link href="/" passHref className="flex items-center gap-2 ml-4 mr-6 shrink-0">
            <div className="flex relative w-10 h-10">
              <Image src="/favicon.png" alt="FrogHack logo" className="cursor-pointer" fill />
            </div>
            <div className="flex flex-col">
              <span className="font-bold leading-tight">FrogHack</span>
              {/* <span className="text-xs">Ethereum dev stack</span> */}
            </div>
          </Link>
        </div>
        {/* <nav className="hidden md:flex space-x-4 flex-1">
          {menuLinks.map(({ label, href, icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}>
                <Button variant={isActive ? "default" : "ghost"} className={!isActive ? "border-[0.5px]" : ""}>
                  {icon}
                  <span>{label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
        <RainbowKitCustomConnectButton />
        {isLocalNetwork && <FaucetButton />} */}
      </div>
    </header>
  );
};
