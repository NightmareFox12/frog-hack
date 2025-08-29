import { usePathname } from "next/dist/client/components/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/shadcn/button";
import { useSidebar } from "./ui/shadcn/sidebar";
import { AlignJustify, Files, Signal } from "lucide-react";

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
    icon: <Files />,
  },
  {
    label: "Ranking",
    href: "/rank",
    icon: <Signal />,
  },
  // {
  //   label: "Debug Contracts",
  //   href: "/debug",
  //   icon: <BugIcon className="h-4 w-4" />,
  // },
];

export const ScaffoldHeader = () => {
  // const { targetNetwork } = useTargetNetwork();
  // const isLocalNetwork = targetNetwork.id === hardhat.id;
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <header className="w-full bg-green-50 dark:bg-green-950 dark:text-white">
      <div className="mx-4 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 justify-center">
          <Link href="/" passHref className="flex items-center gap-2 ml-4 mr-6 shrink-0">
            <div className="flex relative w-10 h-10">
              <Image src="/favicon.png" alt="FrogHack logo" className="cursor-pointer" fill />
            </div>
            <div className="flex flex-col">
              <span className="font-bold leading-tight tracking-[1px]">FrogHack</span>
              {/* <span className="text-xs">Ethereum dev stack</span> */}
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-4 flex-1 justify-center">
          {menuLinks.map(({ label, href, icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={
                    !isActive
                      ? "border-[0.5px]"
                      : "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                  }
                >
                  {icon}
                  <span>{label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
        <Button onClick={toggleSidebar} size="sm" className="md:hidden bg-green-700 hover:bg-green-800">
          <AlignJustify className="w-4 h-4" />
        </Button>
        {/* 
        <RainbowKitCustomConnectButton />
        {isLocalNetwork && <FaucetButton />} */}
      </div>
    </header>
  );
};
