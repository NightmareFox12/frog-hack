import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { ScaffoldFooter } from "./ScaffoldFooter";
import { Button } from "./ui/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/shadcn/card";
import { Input } from "./ui/shadcn/input";
import { Label } from "./ui/shadcn/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { LOCAL_STORAGE_KEYS } from "~~/constants/localStorageKeys";
import { useIsLogin } from "~~/services/store/login.store";

type LoginFormProps = {
  setShowSignUp: Dispatch<SetStateAction<boolean>>;
};

export const LoginForm: React.FC<LoginFormProps> = ({ setShowSignUp }) => {
  const { setIsLogin } = useIsLogin();

  //states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const req = await fetch("api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const res: { message: string } = await req.json();

      if (!req.ok) return toast.error(res.message);

      localStorage.setItem(LOCAL_STORAGE_KEYS.IS_LOGIN, "true");
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_EMAIL, email);

      setEmail("");
      setPassword("");
      setIsLogin(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4">
      {/* background image */}
      <div className="w-full h-full absolute pointer-events-none inset-0 -z-10">
        <Image src="/image-bg.png" alt="frog background" fill={true} className="object-cover" />
      </div>
      <div className="w-full max-w-md">
        {/* title */}
        <div className="text-center mb-6">
          <div className="relative w-full grid place-items-center mb-2">
            <Image width={80} height={80} src={"/favicon.png"} alt="frog hack logo" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-wider mb-2">FrogHack</h1>
          <p className="text-white/90">Log in to continue</p>
        </div>

        <Card className="w-full shadow-lg border-green-200 z-10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-green-600">Log In</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access FrogHack</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="pl-10 border-green-200 focus:border-green-400 dark:border-green-800 dark:focus:border-green-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-green-200 focus:border-green-400 dark:border-green-800 dark:focus:border-green-600"
                    required
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Log in...
                  </div>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Button
                  onClick={() => setShowSignUp(true)}
                  variant="link"
                  size="sm"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Register here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <ScaffoldFooter />
    </main>
  );
};
