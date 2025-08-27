import React, { useState } from "react";
import Image from "next/image";
import { ScaffoldFooter } from "./ScaffoldFooter";
import { Button } from "./ui/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/shadcn/card";
import { Input } from "./ui/shadcn/input";
import { Label } from "./ui/shadcn/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useIsLogin } from "~~/services/store/login.store";

export const FormLogin: React.FC = () => {
  const { setIsLogin } = useIsLogin();

  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLogin(true);

    console.log("Login attempt:", { email, password });
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="relative w-full grid place-items-center mb-2">
            <Image width={80} height={80} src={"/favicon.png"} alt="frog hack logo" />
          </div>
          <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-2">FrogHack</h1>
          <p className="text-muted-foreground">Inicia sesión para continuar</p>
        </div>

        <Card className="w-full shadow-lg border-green-200 dark:border-green-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-green-700 dark:text-green-400">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center">Ingresa tus credenciales para acceder a FrogHack</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Correo electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
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
                ¿No tienes cuenta?{" "}
                <a
                  href="#"
                  className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
                >
                  Regístrate aquí
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <ScaffoldFooter />
    </main>
  );
};
