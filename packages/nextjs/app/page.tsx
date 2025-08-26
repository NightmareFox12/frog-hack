"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Clock, Coins, Loader, Twitter, Wallet } from "lucide-react";
import type { NextPage } from "next";
import { Badge } from "~~/components/ui/shadcn/badge";
import { Button } from "~~/components/ui/shadcn/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~~/components/ui/shadcn/card";
import { ScrollArea } from "~~/components/ui/shadcn/scroll-area";

const TasksPage: NextPage = () => {
  const searchParams = useSearchParams();

  //states
  const [isLoading, setLoading] = useState<boolean>(false);

  //functions
  const handleConnectTwitter = async () => {
    //authorize twitter
    const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=T1J0LXN0dm9jR3YyM2V0c2FsRlc6MTpjaQ&redirect_uri=https%3A%2F%2Fwww.froghack.fun&scope=users.read%20follows.read&state=${Math.random()
      .toString(36)
      .substring(2, 2 + 10)}&code_challenge=ax33039fa&code_challenge_method=plain`;

    console.log(url);
    window.open(url, "_blank");
  };

  const tasksMock = [
    {
      icon: Wallet,
      title: "Connect to wallet",
      coins: 10,
      action: () => {},
    },
    {
      icon: Twitter,
      title: "Connect your account",
      coins: 40,
      action: handleConnectTwitter,
    },
    {
      icon: Twitter,
      title: "Follow @froghacknet",
      coins: 30,
      action: () => {},
    },
  ] as const;

  //effects
  useEffect(() => {
    console.log("me volviste a llamar");

    const state = searchParams.get("state");
    const code = searchParams.get("code");
    if (state !== null && code !== null) {
      console.log("aqui toca bloquear la UI");
      setLoading(true);
    }
  }, [searchParams]);

  return (
    <main className="relative w-full h-full">
      <div className="grid place-items-center">
        <Badge variant="outline" className="py-2 px-4 flex justify-center gap-2 items-center">
          <Clock className="w-4 h-4" />
          Campaign ends in
        </Badge>
      </div>

      <h1 className="text-center text-4xl py-5 font-semibold">Win Up To 10</h1>

      {/* Timer */}
      <article className="flex justify-center items-center gap-6 ">
        <div className="max-w-[50px] max-h-[50px] flex flex-col -space-y-1 justify-center items-center bg-green-200 p-8 rounded-lg border border-green-400">
          <span className="font-semibold text-2xl">05</span>
          <span className="text-sm">days</span>
        </div>

        <div className="max-w-[50px] max-h-[50px] flex flex-col -space-y-1 justify-center items-center bg-green-200 p-8 rounded-lg border border-green-400">
          <span className="font-semibold text-2xl">05</span>
          <span className="text-sm">days</span>
        </div>

        <div className="max-w-[50px] max-h-[50px] flex flex-col -space-y-1 justify-center items-center bg-green-200 p-8 rounded-lg border border-green-400">
          <span className="font-semibold text-2xl">05</span>
          <span className="text-sm">days</span>
        </div>

        <div className="max-w-[50px] max-h-[50px] flex flex-col -space-y-1 justify-center items-center bg-green-200 p-8 rounded-lg border border-green-400">
          <span className="font-semibold text-2xl">05</span>
          <span className="text-sm">days</span>
        </div>
      </article>

      <article className="w-full p-4 grid grid-cols-2 gap-3 mt-10">
        <Card className="w-full bg-green-50">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Tasks</CardTitle>
            <CardDescription>
              Complete tasks, earn points, and leap your way to the top of the Frog Leaderboard.
            </CardDescription>
            {/* <CardAction>C ard Action</CardAction> */}
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] p-1 rounded-md">
              {tasksMock.map((x, y) => (
                <article
                  key={y}
                  className="flex justify-between items-center my-3 px-3 bg-green-700 rounded-sm text-white"
                >
                  <div className="bg-green-500 p-1.5 rounded-sm">
                    <x.icon className="w-4 h-4" />
                  </div>

                  <p>{x.title}</p>

                  <div className="flex flex-col items-end gap-1">
                    <Button
                      onClick={x.action}
                      size="sm"
                      className="bg-gradient-to-r from-green-400 to-green-500 hover:scale-105"
                    >
                      Connect
                      <Badge className="bg-green-800">
                        {x.coins}
                        <Coins />
                      </Badge>
                    </Button>
                  </div>
                </article>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        <div>
          <Card className="w-full bg-green-50">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
              <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </article>

      <section className="w-full h-full flex justify-center items-center mt-5">
        {isLoading && (
          <div className="absolute bg-white/70 w-full h-full z-10 flex justify-center items-center">
            <div className="mt-20">
              <Loader className="animate-spin size-10" />
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default TasksPage;

//  <>
//     <div className="flex items-center flex-col grow pt-10">
//       <div className="px-5">
//         <h1 className="text-center">
//           <span className="block text-2xl mb-2">Welcome to</span>
//           <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
//         </h1>
//         <div className="flex justify-center items-center space-x-2 flex-col">
//           <p className="my-2 font-medium">Connected Address:</p>
//           <Address address={connectedAddress} />
//         </div>
//         <p className="text-center text-lg">
//           Get started by editing{" "}
//           <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//             packages/nextjs/app/page.tsx
//           </code>
//         </p>
//         <p className="text-center text-lg">
//           Edit your smart contract{" "}
//           <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//             YourContract.sol
//           </code>{" "}
//           in{" "}
//           <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//             packages/hardhat/contracts
//           </code>
//         </p>
//       </div>

//       <article className="grow bg-base-300 w-full px-8 py-8">
//         <div className="flex justify-center items-center gap-12 flex-col w-full md:flex-row">
//           <Card className="flex-1 w-full justify-center h-[250px] dark:bg-primary dark:text-white">
//             <CardHeader>
//               <CardTitle className="flex justify-center">
//                 <Bug className="size-12" />
//               </CardTitle>
//               <CardDescription className="text-center">Tinker with your smart contract using the </CardDescription>
//             </CardHeader>
//             <CardContent className="flex justify-center">
//               <Link href="/debug" passHref className="underline">
//                 Debug Contracts
//               </Link>{" "}
//             </CardContent>
//           </Card>

//           <Card className="flex-1 w-full justify-center h-[250px] dark:bg-primary dark:text-white">
//             <CardHeader>
//               <CardTitle className="flex justify-center">
//                 <Search className="size-12" />
//               </CardTitle>
//               <CardDescription className="text-center">Explore your local transactions with the</CardDescription>
//             </CardHeader>
//             <CardContent className="flex justify-center">
//               <Link href="/blockexplorer" passHref className="underline">
//                 Block Explorer
//               </Link>
//             </CardContent>
//           </Card>
//         </div>
//       </article>
//     </div>
//   </>
