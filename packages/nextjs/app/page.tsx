"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Coins, Copy, Loader, Twitter } from "lucide-react";
import { NextPage } from "next";
import { toast } from "sonner";
import { Badge } from "~~/components/ui/shadcn/badge";
import { Button } from "~~/components/ui/shadcn/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "~~/components/ui/shadcn/card";
import { Progress } from "~~/components/ui/shadcn/progress";
import { ScrollArea } from "~~/components/ui/shadcn/scroll-area";
import { LOCAL_STORAGE_KEYS } from "~~/constants/localStorageKeys";
import { CLEAR_X_URL } from "~~/utils/uiHelpers";

const topContributors = [
  { rank: 1, address: "0x1234...5678", rewards: "8500 FROG" },
  { rank: 2, address: "0x9876...4321", rewards: "7200 FROG" },
  { rank: 3, address: "0x5555...9999", rewards: "6800 FROG" },
] as const;

const referralLink = "https://froghack.xyz/ref/abc123";

const TasksPage: NextPage = () => {
  // states
  const [isLoading, setLoading] = useState<boolean>(false);

  //functions
  const getUrlAuthTwitter = async () => {
    try {
      const email = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_EMAIL);

      const req = await fetch("api/twitter", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const res: { message: string; url: string } = await req.json();
      if (!req.ok) return toast.error(res.message);

      console.log(res.url);
      window.open(res.url, "_blank");
    } catch (err) {
      console.log(err);
    }
  };

  const tasks = [
    {
      title: "Connect your Twitter account",
      reward: "+150 FROG",
      completed: false,
      action: getUrlAuthTwitter,
    },
    {
      title: "Follow @FrogHackXYZ on Twitter",
      reward: "+50 FROG",
      completed: false,
      action: () => {},
    },
    {
      title: "Retweet our announcement post",
      reward: "+70 FROG",
      completed: false,
      action: () => {},
    },
    {
      title: "Like our pinned tweet",
      reward: "+75 FROG",
      completed: false,
      action: () => {},
    },
    {
      title: 'Comment "🐸 To the moon!" on our latest post',
      reward: "+200 FROG",
      completed: false,
      action: () => {},
    },
    {
      title: "Tag 3 friends in our giveaway post",
      reward: "+300 FROG",
      completed: false,
      action: () => {},
    },
  ] as const;

  const verifyData = async (state: string, code: string) => {
    try {
      setLoading(true);
      const email = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_EMAIL);

      console.log(email);
      const req = await fetch("api/callback", {
        method: "POST",
        body: JSON.stringify({ email, state, code }),
      });

      const res: { message: string } = await req.json();

      if (!req.ok) return toast.error(res.message);

      toast.success(res.message);
    } catch (err) {
      console.log(err);
      CLEAR_X_URL();
    } finally {
      setLoading(false);
    }
  };

  //effects
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get("state");
    const code = params.get("code");
    const error = params.get("error");

    if (error !== null) {
      CLEAR_X_URL();
      toast.error("Authentication with X was denied.");
    } else {
      if (state !== null && code !== null) verifyData(state, code);
    }
  }, []);

  return (
    <section className="relative h-full p-2">
      {/* background image */}
      <div className="w-full h-full absolute pointer-events-none inset-0 -z-10">
        <Image src="/image-bg.png" alt="frog background" fill={true} className="object-cover" />
      </div>

      {isLoading && (
        <div className="w-full h-full fixed bg-black/60 -top-0.5 z-30 flex justify-center items-center">
          <div className="">
            <Loader className="animate-spin size-10" />
          </div>
        </div>
      )}

      <div className="w-full grid place-items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center py-4">Froghack Campaign</h1>
        <p className="text-xl text-white text-center max-w-2xl">
          Our chance to join the Froghack elite within LineaBuild has begun!
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Main Tasks Section */}
        <Card className="lg:col-span-2 space-y-6 w-full bg-green-50 dark:bg-green-900">
          <CardHeader>
            <CardTitle className="text-center text-3xl dark:text-white">Social Media Tasks</CardTitle>
            <CardDescription className="text-center dark:text-white/90">
              The Froghack social campaign is now live🐸💻 Join in and secure exclusive rewards: from free Frogboxes, to
              a GTD spot, or even a whitelist slot for the Froghack NFT collection A unique collection of 4,242 Froggers
              ready to launch into digital missions 🚀
            </CardDescription>
            <CardAction>
              <Button className="bg-green-700 hover:bg-green-600">Rules</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] p-1 rounded-md">
              {tasks.map((x, y) => (
                <article
                  key={y}
                  className="flex justify-between items-center my-3 px-3 bg-green-700 rounded-sm text-white"
                >
                  <div className="bg-green-500 p-1.5 rounded-sm">
                    <Twitter className="w-4 h-4" />
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
                        {x.reward}
                        <Coins />
                      </Badge>
                    </Button>
                  </div>
                </article>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card className="bg-green-900 border-green-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-300">Tasks Completed</span>
                  <span className="text-white">0/5</span>
                </div>
                <Progress value={0} className="h-2 bg-green-800">
                  <div className="h-full bg-green-500 rounded-full transition-all" />
                </Progress>
              </div>

              <div className="pt-4 border-t border-green-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-green-300">Total Rewards</span>
                  <span className="text-2xl font-bold text-green-400">0 FROG</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refer Friends Card */}
          <Card className="bg-green-900 border-green-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Refer Friends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-green-300 text-sm text-balance">
                Earn 50 FROG for each friend who joins using your referral link
              </p>

              <div className="flex items-center gap-2 p-3 bg-green-800/50 rounded-lg">
                <code className="text-green-200 text-sm flex-1 truncate">{referralLink}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-400 hover:text-green-300 hover:bg-green-700/50 shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Contributors Card */}
          <Card className="bg-green-900 border-green-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topContributors.map(contributor => (
                <div key={contributor.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center p-0"
                    >
                      {contributor.rank}
                    </Badge>
                    <code className="text-green-200 text-sm">{contributor.address}</code>
                  </div>
                  <span className="text-green-400 font-medium">{contributor.rewards}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TasksPage;
