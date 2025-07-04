import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";

import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>LUXIMA AUTH</Link>
              <div className="flex items-center gap-2">
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
            <div className="w-full flex items-center justify-center">
              <LoginForm />
            </div>
          </main>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm text-muted-foreground text-center">
            Authentication for LUXIMA
          </p>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs py-12">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
