import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "./lib/supabase/server";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  const supabaseToken = request.cookies.get("sb-luxima-auth-token")?.value;
  const redirectTo = request.nextUrl.searchParams.get("redirectTo");

  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (user) {
    const { data: profile } = await (await supabase)
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const system_role = profile?.system_role;

    // ✅ Jika sudah login
    if (supabaseToken) {
      if (redirectTo) {
        try {
          const url = new URL(decodeURIComponent(redirectTo));
          const allowedHosts = [
            "localhost:3000",
            "localhost:3001",
            "localhost:3002",
            "localhost:3003",
            "localhost:3004",
            "localhost:3005",
            "luxima.id",
            "app.luxima.id",
            "admin.luxima.id",
            "dash.luxima.id",
            "billing.luxima.id",
            "api.luxima.id",
            "payment.luxima.id",
          ];
          if (allowedHosts.includes(url.host)) {
            return NextResponse.redirect(url.href);
          }
        } catch {
          console.warn("Invalid redirectTo param");
        }
      }

      // ✅ redirectTo → langsung ke app
      // if (process.env.NODE_ENV === "development") {
      //   return NextResponse.redirect("http://localhost:3000");
      // }

      if (system_role === "superadmin" || system_role === "admin") {
        return NextResponse.redirect("https://admin.luxima.id");
      } else if (
        system_role === "user" ||
        system_role === "manager" ||
        system_role === "organization"
      ) {
        return NextResponse.redirect("https://dash.luxima.id");
      } else {
        return NextResponse.redirect("https://app.luxima.id");
      }

      // return NextResponse.redirect(
      //   process.env.NODE_ENV === "development" && !redirectTo
      //     ? "http://localhost:3000"
      //     : "https://dash.luxima.id"
      // );
    }
  }

  // ✅ Jika belum login, tetap di halaman login
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/auth/login",
    "/",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
