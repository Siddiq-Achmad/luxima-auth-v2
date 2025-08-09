"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LogIn } from "./animate-ui/icons/log-in";
import { AnimateIcon } from "./animate-ui/icons/icon";
import { HouseWifi } from "./animate-ui/icons/house-wifi";
import { Separator } from "@/components/ui/separator";
import { AiOutlineGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleGithubLogin = async () => {
    toast.error("Coming soon!", {
      description: "Under development.",
    });
  };

  const handleGoogleLogin = async () => {
    // const supabase = createClient();
    // await supabase.auth.signInWithOAuth({
    //   provider: "google",
    //   options: {
    //     redirectTo: `${window.location.origin}/protected`,
    //   },
    // });
    toast.error("Coming soon!", {
      description: "Under development.",
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      // Ambil parameter redirectTo
      const redirectTo = searchParams.get("redirectTo");

      // Validasi redirect agar hanya ke *.luxima.id (prevent open redirect)

      const safeRedirect =
        redirectTo &&
        redirectTo.startsWith("https://") &&
        redirectTo.includes(".luxima.id")
          ? redirectTo
          : "https://dash.luxima.id";

      // Redirect ke asal
      if (process.env.NODE_ENV === "development") {
        router.push(redirectTo || "/account");
      } else {
        router.push(safeRedirect || "/account");
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <AnimateIcon animateOnHover>
              <Button asChild size="icon" variant={"ghost"}>
                <Link href="/">
                  <HouseWifi />
                </Link>
              </Button>
            </AnimateIcon>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@luxima.id"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Link
                  href="/auth/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <AnimateIcon animateOnHover>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  <LogIn />
                  {isLoading ? "Logging in..." : " Login"}
                </Button>
              </AnimateIcon>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <AnimateIcon animateOnHover>
              <Button
                size="sm"
                variant={"secondary"}
                onClick={() => {
                  handleGithubLogin();
                }}
              >
                <AiOutlineGithub />
                Login with GitHub
              </Button>
            </AnimateIcon>
            <Separator orientation="vertical" />
            <AnimateIcon animateOnHover>
              <Button
                size="sm"
                variant={"secondary"}
                onClick={() => {
                  handleGoogleLogin();
                }}
              >
                <FcGoogle />
                Login with Google
              </Button>
            </AnimateIcon>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
