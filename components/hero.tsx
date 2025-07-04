import Link from "next/link";
import { BetterAuthLogo } from "./betterauth-logo";
import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";
import { ResendLogo } from "./resend-logo";

export function Hero() {
  return (
    <div className="flex flex-col gap-16 justify-center items-center w-full h-full">
      <div className="flex gap-4 md:gap-8 justify-center items-center">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <Link
          href="https://resend.com"
          target="_blank"
          rel="noreferrer"
          className="flex gap-2 items-center justify-center font-bold text-xl"
        >
          <ResendLogo />
        </Link>
      </div>
      <h1 className="sr-only">Selamat datang di LUXIMA AUTH</h1>
      <p className="text-3xl lg:text-4xl leading-tight! mx-auto max-w-xl text-center">
        Authentication for LUXIMA using{" "}
        <a
          href="https://supabase.com/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Next.js
        </a>
      </p>
      <div className="w-full p-px bg-linear-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
