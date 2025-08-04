import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        name: "sb-luxima-auth-token",
        domain:
          process.env.NODE_ENV === "development" ? ".localhost" : ".luxima.id",
        secure: true,
        path: "/",
        sameSite: "lax",
      },
    }
  );
}
