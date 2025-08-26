"use client";

import { useEffect, useState } from "react";
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
    const params = new URLSearchParams(window.location.search);
    const state = params.get("state");
    const code = params.get("code");
    console.log(state);
    console.log(code);
    if (state && code) {
      setLoading(true);
    }
  }, []);

  return (
    <main className="relative w-full h-full">
      {isLoading && (
        <div className="w-full h-full fixed bg-black/60 -top-0.5 z-30 flex justify-center items-center">
          <div className="">
            <Loader className="animate-spin size-10" />
          </div>
        </div>
      )}

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
    </main>
  );
};

export default TasksPage;

/**
 * TODO: tengo que crear una function para llamar al backend y asi cumplir con esa parte
 Captura el code y state
Ya lo estás haciendo con useSearchParams() o window.location.search. Ejemplo:

ts
const code = searchParams.get("code");
const state = searchParams.get("state");
2. Intercambia el code por un access token
Debes hacer una petición POST al endpoint de Twitter:

Código
https://api.twitter.com/2/oauth2/token
Con estos datos en el body (form-urlencoded):

ts
const data = {
  grant_type: "authorization_code",
  code,
  redirect_uri: "http://localhost:3000", // debe coincidir con el que usaste antes
  client_id: "TU_CLIENT_ID",
  code_verifier: "ax33039fa", // el mismo que usaste en el `code_challenge`
};
Y en los headers:

ts
{
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
}
⚠️ Twitter requiere que el code_verifier sea el mismo que usaste en el code_challenge_method=plain.

3. Recibes el access token
Si todo sale bien, Twitter te responde con algo como:

json
{
  "token_type": "bearer",
  "access_token": "AAAA...",
  "expires_in": 7200,
  "scope": "users.read follows.read",
  "refresh_token": "BBBB..."
}
4. Usa el token para hacer peticiones
Ahora puedes hacer peticiones autenticadas a la API de Twitter, por ejemplo:

http
GET https://api.twitter.com/2/users/me
Authorization: Bearer TU_ACCESS_TOKEN
🧠 ¿Y el state?
El state es para proteger contra ataques CSRF. Lo ideal es que lo hayas guardado antes de redirigir al usuario a Twitter, y ahora lo compares con el que recibes para asegurarte de que coincide.

🚨 Consejo de seguridad
No hagas el intercambio del code por el token directamente en el frontend. Lo ideal es que tengas un backend que lo maneje, para no exponer tu client_secret.

¿Quieres que te ayude a escribir el código para hacer ese POST a Twitter desde Node.js o desde tu backend? Te lo puedo dejar listo para copiar y pegar.
 */
