import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, {
                ...options,
                //domain: ".luxima.id", // ⬅️ Penting untuk lintas subdomain
                domain: process.env.NODE_ENV === 'production' ? '.luxima.id' : '.localhost',
                secure: true,         // ⬅️ Wajib jika pakai HTTPS
                path: "/",
                sameSite: "lax",
              }),
            );
          } catch {
            // Ignore silently when called from server components
          }
        },
      },
    },
  );
}
