"use client";

import { useEffect } from "react";
import { Coins, Wallet } from "lucide-react";
import { Badge } from "~~/components/ui/shadcn/badge";
import { Button } from "~~/components/ui/shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/shadcn/card";
import { ScrollArea } from "~~/components/ui/shadcn/scroll-area";

export default function TasksPage() {
  //functions
  const authorizeX = () => {
    const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=T1J0LXN0dm9jR3YyM2V0c2FsRlc6MTpjaQ&redirect_uri=https%3A%2F%2Fwww.froghack.fun%2Fapi%2Ftwitter&scope=users.read%20follows.read&state=${Math.random()
      .toString(36)
      .substring(2, 2 + 10)}&code_challenge=ax33039fa&code_challenge_method=plain`;

    console.log(url);
    window.open(url, "_blank");
  };

  //effects
  useEffect(() => {
    console.log("me volviste a llamar");
  }, []);

  return (
    <main className="relative w-full h-full">
      <section className="w-full h-full flex justify-center items-center mt-5">
        <Card className="w-lg max-w-lg bg-green-50">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Tasks</CardTitle>
            <CardDescription>
              Complete tasks, earn points, and leap your way to the top of the Frog Leaderboard.
            </CardDescription>
            {/* <CardAction>C ard Action</CardAction> */}
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] p-1 rounded-md">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => (
                <article key={x} className="flex justify-between items-center py-2 px-3">
                  <div className="bg-green-500 p-1.5 rounded-sm">
                    <Wallet />
                  </div>

                  <p>Connect wallet</p>

                  <div className="flex flex-col items-end gap-1">
                    <Button
                      onClick={authorizeX}
                      size="sm"
                      className="bg-gradient-to-r from-green-700 to-green-500 hover:scale-105"
                    >
                      Connect
                    </Button>
                    <Badge className="bg-green-800">
                      10
                      <Coins />
                    </Badge>
                  </div>
                </article>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
