import Link from "next/link";
import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";
import { ResendLogo } from "./resend-logo";
import { HighlightText } from "./animate-ui/text/highlight";
import { WritingText } from "./animate-ui/text/writing";

import { TypingText } from "./animate-ui/text/typing";

export function Hero() {
  return (
    <div className="flex flex-col gap-12 justify-center items-center w-full h-full py-8">
      <div className="flex gap-2 md:gap-8 justify-center items-center">
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
      <h1 className="text-xl lg:text-2xl font-semibold leading-tight! mx-auto max-w-xl text-center">
        <TypingText text="Welcome back" /> <HighlightText text="LUXIMA AUTH" />
      </h1>
      <p className="text-2xl lg:text-3xl leading-tight! mx-auto max-w-xl text-center">
        <WritingText text="Authentication for LUXIMA using" />{" "}
        <a
          href="https://supabase.com/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          <TypingText text="Supabase" />
        </a>{" "}
        <WritingText text="and" />{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          <TypingText text="Next.js" />
        </a>
      </p>
      <div className="w-full p-px bg-linear-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
