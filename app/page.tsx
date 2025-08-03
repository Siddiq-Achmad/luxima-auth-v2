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

export default function Home() {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const supabase = createClient();

  // useEffect(() => {
  //   const checkSession = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();

  //     const redirectTo = searchParams.get("redirectTo");

  //     // Jika sudah login dan ada redirectTo, arahkan
  //     if (session && redirectTo) {
  //       try {
  //         const url = decodeURIComponent(redirectTo);
  //         const parsed = new URL(url);

  //         // Optional: validasi domain redirect agar aman
  //         const allowedHosts = [
  //           "localhost:3000",
  //           "app.luxima.id",
  //           "admin.luxima.id",
  //           "dash.luxima.id",
  //           "billing.luxima.id",
  //           "api.luxima.id",
  //           "payment.luxima.id",
  //         ];
  //         if (allowedHosts.includes(parsed.host)) {
  //           router.push(url);
  //           return;
  //         }
  //       } catch (e) {
  //         console.error("Invalid redirectTo URL");
  //       }
  //     }

  //     // Jika tidak ada session, tetap tampilkan halaman login (jangan redirect)
  //   };

  //   checkSession();
  // }, [router, searchParams, supabase]);
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
                <Button size="sm">Get Started</Button>
              </div>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-28rem)] gap-20 max-w-5xl p-4 justify-center items-center">
          <Hero />
          <main className="flex flex-col h-full w-full gap-4 px-4 justify-center items-center">
            {/* <h2 className="font-medium text-xl mb-4">Next steps</h2>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
            <div className="w-full max-w-sm h-fit">
              <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
              </Suspense>
            </div>
          </main>
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
