import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";

import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/login-form";
import { RollingText } from "@/components/animate-ui/text/rolling";
import { TypingText } from "@/components/animate-ui/text/typing";
import { RotatingText } from "@/components/animate-ui/text/rotating";
import { Suspense } from "react";

import { createClient } from "@/lib/supabase/server";

import ProfileCard from "@/app/account/profile-card";

import { LuximaLogo } from "@/components/luxima-logo";
import { redirect } from "next/navigation";
export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (user && process.env.NODE_ENV === "development") {
  //   redirect("http://localhost:3000");
  // }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  const role = profile?.system_role;

  if (error) {
    console.error("Error fetching profile:", error.message);
  } else {
    //console.log("User profile:", profile);
    if (role === "admin" || role === "superadmin") {
      redirect("https://admin.luxima.id");
    } else if (role === "user") {
      redirect("https://app.luxima.id");
    } else {
      redirect("https://dash.luxima.id");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>
                <RollingText text="LUXIMA AUTH" />
              </Link>
              <div className="hidden lg:flex items-center gap-2">
                {user ? (
                  <Button size="sm">
                    <Link href="/account" className="button">
                      Account
                    </Link>
                  </Button>
                ) : (
                  <Button size="sm">
                    <Link href="/auth/login" className="button">
                      Get Started
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-28rem)] gap-24 max-w-5xl p-4 justify-center items-center">
          <div className="flex md:hidden justify-center items-center">
            <Link
              href="https://luxima.id"
              className="flex gap-4 items-end justify-between"
            >
              <LuximaLogo />{" "}
              <span className="text-2xl lg:text-3xl font-semibold">AUTH</span>
            </Link>
          </div>
          <main className="flex flex-col h-full w-full gap-4 px-4 justify-center items-center">
            <div className="w-full max-w-sm h-fit gap-4 flex flex-col justify-between">
              <Suspense fallback={<div>Loading...</div>}>
                {/* {user ? <AccountForm user={user} /> : <LoginForm />} */}
                {user ? <ProfileCard user={user} /> : <LoginForm />}
              </Suspense>

              {user && (
                <div className="m-4 gap-2 flex flex-col">
                  {role === "admin" ||
                    (role === "superadmin" && (
                      <>
                        <Link
                          href="https://admin.luxima.id"
                          rel="noreferrer"
                          className="flex gap-2 items-center justify-center font-bold text-xl"
                        >
                          <Button className="w-sm">Admin Panel</Button>
                        </Link>
                        <Link
                          href="https://billing.luxima.id"
                          rel="noreferrer"
                          className="flex gap-2 items-center justify-center font-bold text-xl"
                        >
                          <Button className="w-sm">Billing Dashboard</Button>
                        </Link>
                        <Link
                          href="https://payment.luxima.id"
                          rel="noreferrer"
                          className="flex gap-2 items-center justify-center font-bold text-xl"
                        >
                          <Button className="w-sm">Payment Dashboard</Button>
                        </Link>
                      </>
                    ))}

                  <Link
                    href="https://dash.luxima.id"
                    rel="noreferrer"
                    className="flex gap-2 items-center justify-center font-bold text-xl"
                  >
                    <Button className="w-sm">Dashboard</Button>
                  </Link>
                  <Link
                    href="https://app.luxima.id"
                    rel="noreferrer"
                    className="flex gap-2 items-center justify-center font-bold text-xl"
                  >
                    <Button className="w-sm">Apps Listing & Directory</Button>
                  </Link>
                </div>
              )}
            </div>
          </main>
          <Hero />
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-sm text-muted-foreground text-center">
            <TypingText text="Authentication for LUXIMA" />
          </div>
          <div className="text-lg font-bold text-primary text-center uppercase tracking-widest">
            <RotatingText text={["LUXIMA", "Creative", "Studio"]} />
          </div>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs py-12">
          <p>
            Powered by{" "}
            <a
              href="https://luxima.id"
              target="_blank"
              className="font-bold hover:underline text-primary"
              rel="noreferrer"
            >
              LUXIMA.ID
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
