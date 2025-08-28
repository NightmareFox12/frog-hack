"use client";

import { useEffect, useState } from "react";
import { Coins, Copy, Heart, Loader, MessageCircle, Twitter, UserPlus, Users } from "lucide-react";
import { NextPage } from "next";
import { toast } from "sonner";
import { Badge } from "~~/components/ui/shadcn/badge";
import { Button } from "~~/components/ui/shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/shadcn/card";
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
      icon: Twitter,
      completed: false,
      action: getUrlAuthTwitter,
    },
    {
      title: "Follow @FrogHackXYZ on Twitter",
      reward: "+50 FROG",
      icon: Users,
      completed: false,
      action: () => {},
    },
    {
      title: "Retweet our announcement post",
      reward: "+70 FROG",
      icon: Twitter,
      completed: false,
      action: () => {},
    },
    {
      title: "Like our pinned tweet",
      reward: "+75 FROG",
      icon: Heart,
      completed: false,
      action: () => {},
    },
    {
      title: 'Comment "🐸 To the moon!" on our latest post',
      reward: "+200 FROG",
      icon: MessageCircle,
      completed: false,
      action: () => {},
    },
    {
      title: "Tag 3 friends in our giveaway post",
      reward: "+300 FROG",
      icon: UserPlus,
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
      else toast.error("Authentication with X was denied.");
    }
  }, []);

  return (
    <section className="h-full bg-gradient-to-br from-green-100 bg-green-100 to-green-200 p-2">
      {isLoading && (
        <div className="w-full h-full fixed bg-black/60 -top-0.5 z-30 flex justify-center items-center">
          <div className="">
            <Loader className="animate-spin size-10" />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Twitter className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Social Media Tasks</h1>
          </div>

          <div className="space-y-4">
            {tasks.map(task => (
              <Card
                key={task.id}
                className="bg-green-900 border-green-700/50 backdrop-blur-sm hover:bg-green-800/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-green-400">{task.icon}</div>
                      <div>
                        <h3 className="text-white font-medium text-balance">{task.title}</h3>
                        <p className="text-green-300 text-sm">Reward: {task.reward}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-400 hover:text-green-300 hover:bg-green-800/50"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center">
                        {task.completed && <div className="w-3 h-3 bg-green-500 rounded-full" />}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-green-900/30 border-green-600/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <p className="text-green-200 mb-4">Connect your wallet to start completing tasks and earning rewards</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-2">Connect Wallet</Button>
            </CardContent>
          </Card>
        </div> */}

        {/* Main Tasks Section */}
        <Card className="lg:col-span-2 space-y-6 w-full bg-green-900">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-white">
              {/* <Twitter className="w-4 h-4" /> */}
              Social Media Tasks
            </CardTitle>
            <CardDescription>
              Complete tasks, earn points, and leap your way to the top of the Frog Leaderboard.
            </CardDescription>
            {/* <CardAction>C ard Action</CardAction> */}
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] p-1 rounded-md">
              {tasks.map((x, y) => (
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
                        {x.reward}
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
// "use client";

// import { useEffect, useState } from "react";
// import { Clock, Coins, Loader, Twitter, Wallet } from "lucide-react";
// import type { NextPage } from "next";
// import { Badge } from "~~/components/ui/shadcn/badge";
// import { Button } from "~~/components/ui/shadcn/button";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "~~/components/ui/shadcn/card";
// import { ScrollArea } from "~~/components/ui/shadcn/scroll-area";
// import { LOCAL_STORAGE_KEYS } from "~~/constants/localStorageKeys";

// const TasksPage: NextPage = () => {
//   //states
//   const [isLoading, setLoading] = useState<boolean>(false);

//   //functions
//   const handleConnectTwitter = async () => {
//     //authorize twitter
//     const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=T1J0LXN0dm9jR3YyM2V0c2FsRlc6MTpjaQ&redirect_uri=https%3A%2F%2Fwww.froghack.fun&scope=users.read%20follows.read&state=${Math.random()
//       .toString(36)
//       .substring(2, 2 + 10)}&code_challenge=ax33039fa&code_challenge_method=plain`;

//     console.log(url);
//     window.open(url, "_blank");
//   };

//   //effects
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const state = params.get("state");
//     const code = params.get("code");
//     console.log(state);
//     console.log(code);
//     if (state && code) {
//       setLoading(true);
//     }
//   }, []);

//   return (
//     <main className="relative w-full h-full">
//       {isLoading && (
//         <div className="w-full h-full fixed bg-black/60 -top-0.5 z-30 flex justify-center items-center">
//           <div className="">
//             <Loader className="animate-spin size-10" />
//           </div>
//         </div>
//       )}

//       <Button
//         onClick={() => {
//           localStorage.removeItem(LOCAL_STORAGE_KEYS.IS_LOGIN);
//         }}
//       >
//         delete
//       </Button>
//       <div className="grid place-items-center">
//         <Badge variant="outline" className="py-2 px-4 flex justify-center gap-2 items-center">
//           <Clock className="w-4 h-4" />
//           Campaign ends in
//         </Badge>
//       </div>

//       <h1 className="text-center text-4xl py-5 font-semibold">Win Up To 10</h1>

//       {/* Timer */}
//       <article className="flex justify-center items-center gap-6 ">
//         <div className="max-w-[50px] max-h-[50px] flex flex-col -space-y-1 justify-center items-center bg-green-200 p-8 rounded-lg border border-green-400">
//           <span className="font-semibold text-2xl">05</span>
//           <span className="text-sm">days</span>
//         </div>

//         <div className="max-w-[50px] max-h-[50px] flex flex-col -space-y-1 justify-center items-center bg-green-200 p-8 rounded-lg border border-green-400">
//           <span className="font-semibold text-2xl">05</span>
//           <span className="text-sm">days</span>
//         </div>

//         <div className="max-w-[50px] max-h-[50px] flex flex-col -space-y-1 justify-center items-center bg-green-200 p-8 rounded-lg border border-green-400">
//           <span className="font-semibold text-2xl">05</span>
//           <span className="text-sm">days</span>
//         </div>

//         <div className="max-w-[50px] max-h-[50px] flex flex-col -space-y-1 justify-center items-center bg-green-200 p-8 rounded-lg border border-green-400">
//           <span className="font-semibold text-2xl">05</span>
//           <span className="text-sm">days</span>
//         </div>
//       </article>

//       <article className="w-full p-4 grid grid-cols-2 gap-3 mt-10">
//         <Card className="w-full bg-green-50">
//           <CardHeader>
//             <CardTitle className="text-center text-3xl">Tasks</CardTitle>
//             <CardDescription>
//               Complete tasks, earn points, and leap your way to the top of the Frog Leaderboard.
//             </CardDescription>
//             {/* <CardAction>C ard Action</CardAction> */}
//           </CardHeader>
//           <CardContent>
//             <ScrollArea className="h-[500px] p-1 rounded-md">
//               {tasksMock.map((x, y) => (
//                 <article
//                   key={y}
//                   className="flex justify-between items-center my-3 px-3 bg-green-700 rounded-sm text-white"
//                 >
//                   <div className="bg-green-500 p-1.5 rounded-sm">
//                     <x.icon className="w-4 h-4" />
//                   </div>

//                   <p>{x.title}</p>

//                   <div className="flex flex-col items-end gap-1">
//                     <Button
//                       onClick={x.action}
//                       size="sm"
//                       className="bg-gradient-to-r from-green-400 to-green-500 hover:scale-105"
//                     >
//                       Connect
//                       <Badge className="bg-green-800">
//                         {x.coins}
//                         <Coins />
//                       </Badge>
//                     </Button>
//                   </div>
//                 </article>
//               ))}
//             </ScrollArea>
//           </CardContent>
//           <CardFooter>
//             <p>Card Footer</p>
//           </CardFooter>
//         </Card>

//         <div>
//           <Card className="w-full bg-green-50">
//             <CardHeader>
//               <CardTitle>Card Title</CardTitle>
//               <CardDescription>Card Description</CardDescription>
//               <CardAction>Card Action</CardAction>
//             </CardHeader>
//             <CardContent>
//               <p>Card Content</p>
//             </CardContent>
//             <CardFooter>
//               <p>Card Footer</p>
//             </CardFooter>
//           </Card>
//         </div>
//       </article>
//     </main>
//   );
// };

// /**
//  * TODO: tengo que crear una function para llamar al backend y asi cumplir con esa parte
//  Captura el code y state
// Ya lo estás haciendo con useSearchParams() o window.location.search. Ejemplo:

// ts
// const code = searchParams.get("code");
// const state = searchParams.get("state");
// 2. Intercambia el code por un access token
// Debes hacer una petición POST al endpoint de Twitter:

// Código
// https://api.twitter.com/2/oauth2/token
// Con estos datos en el body (form-urlencoded):

// ts
// const data = {
//   grant_type: "authorization_code",
//   code,
//   redirect_uri: "http://localhost:3000", // debe coincidir con el que usaste antes
//   client_id: "TU_CLIENT_ID",
//   code_verifier: "ax33039fa", // el mismo que usaste en el `code_challenge`
// };
// Y en los headers:

// ts
// {
//   "Content-Type": "application/x-www-form-urlencoded",
//   Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
// }
// ⚠️ Twitter requiere que el code_verifier sea el mismo que usaste en el code_challenge_method=plain.

// 3. Recibes el access token
// Si todo sale bien, Twitter te responde con algo como:

// json
// {
//   "token_type": "bearer",
//   "access_token": "AAAA...",
//   "expires_in": 7200,
//   "scope": "users.read follows.read",
//   "refresh_token": "BBBB..."
// }
// 4. Usa el token para hacer peticiones
// Ahora puedes hacer peticiones autenticadas a la API de Twitter, por ejemplo:

// http
// GET https://api.twitter.com/2/users/me
// Authorization: Bearer TU_ACCESS_TOKEN
// 🧠 ¿Y el state?
// El state es para proteger contra ataques CSRF. Lo ideal es que lo hayas guardado antes de redirigir al usuario a Twitter, y ahora lo compares con el que recibes para asegurarte de que coincide.

// 🚨 Consejo de seguridad
// No hagas el intercambio del code por el token directamente en el frontend. Lo ideal es que tengas un backend que lo maneje, para no exponer tu client_secret.

// ¿Quieres que te ayude a escribir el código para hacer ese POST a Twitter desde Node.js o desde tu backend? Te lo puedo dejar listo para copiar y pegar.
//  */
