import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  const supabaseToken = request.cookies.get("sb-luxima-auth-token")?.value;
  const redirectTo = request.nextUrl.searchParams.get("redirectTo");

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
          "app.luxima.id",
          "admin.luxima.id",
          "dash.luxima.id",
          "billing.luxima.id",
          "api.luxima.id",
          "payment.luxima.id",
          "studio.luxima.id",
          "luxima.id",
        ];
        if (allowedHosts.includes(url.host)) {
          return NextResponse.redirect(url.href);
        }
      } catch {
        console.warn("Invalid redirectTo param");
      }
    }

    // Tanpa redirectTo → langsung ke app
    return NextResponse.redirect(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://app.luxima.id"
    );
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
