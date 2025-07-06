## 🔐 Aplikasi `auth` - Autentikasi LUXIMA

Aplikasi `auth` menangani semua proses autentikasi pengguna, termasuk:

- Login
- Registrasi
- Verifikasi email
- Lupa password / pemulihan akun
- Logout

Aplikasi ini juga bertanggung jawab untuk **mengelola cookie autentikasi lintas subdomain** menggunakan Supabase Auth.

---

### 🏷️ Lokasi

```bash
apps/
└── auth/ # Next.js App Router
├── app/
│ ├── login/ # Halaman login
│ ├── register/ # Halaman registrasi
│ ├── verify/ # Verifikasi email
│ ├── reset/ # Lupa password
│ └── page.tsx # Optional landing/redirect
├── lib/
│ └── supabase.ts # createClient() untuk Supabase
├── middleware.ts # Middleware auth checker
└── layout.tsx / globals.css / ...

```

---

## 🧠 Alur Autentikasi

1. User mengakses subdomain seperti `app.luxima.id`, `admin.luxima.id`, atau `dash.luxima.id`
2. Jika belum login, mereka akan diarahkan ke:
   https://auth.luxima.id/login?redirectTo=https://admin.luxima.id
3. Setelah login berhasil, aplikasi `auth` akan membaca parameter `redirectTo` dan melakukan:

```tsx
router.push(redirectTo ?? "/");
```

4. Supabase akan menyimpan session dalam cookie sb-access-token dan sb-refresh-token di domain .luxima.id, sehingga dapat diakses oleh semua subdomain.

---

## 🍪 Konfigurasi Cookie (Lintas Subdomain)

Supabase client di auth dan subdomain lain menggunakan konfigurasi createClient() yang menyimpan cookie dengan:

```ts

domain: '.luxima.id',
path: '/',
sameSite: 'lax',
secure: true,
```

Pastikan domain Anda menggunakan HTTPS agar cookie secure dapat bekerja.

---

## 🧰 Supabase Client di auth

```ts
// apps/auth/lib/supabase.ts
"use client";

import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

---

## ✨ Login Example Handler

```tsx
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  const redirectTo = searchParams.get("redirectTo") ?? "/";
  router.push(redirectTo);
};
```

---

## 🛡️ Middleware untuk Aplikasi Lain (app, admin, dash)

Setiap aplikasi yang membutuhkan autentikasi user memiliki middleware.ts seperti berikut:

```ts
// apps/app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const redirectUrl = new URL("https://auth.luxima.id/login");
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.href);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|fonts|api|public).*)"],
};
```

---

## 📦 Middleware Config Checklist

- Middleware dipasang di apps/app/middleware.ts, apps/admin/middleware.ts, dll
- Pastikan session dicek menggunakan createMiddlewareClient dari @supabase/ssr
- redirectTo param mengarahkan kembali ke subdomain asal setelah login sukses

---

## 🧪 Testing Lokal

Untuk menjalankan auth.luxima.id dan subdomain lainnya secara lokal:

Tambahkan ke /etc/hosts:

```bash

127.0.0.1 auth.luxima.id
127.0.0.1 app.luxima.id
127.0.0.1 admin.luxima.id
127.0.0.1 dash.luxima.id
```

Gunakan reverse proxy (Traefik, nginx, atau local-ssl-proxy) agar mendukung HTTPS dan domain .luxima.id

Jalankan masing-masing app dengan:

```bash
pnpm --filter auth dev
pnpm --filter app dev
```

---

## ✅ Checklist Fungsionalitas Auth

Fitur Status
Sign in with email/password ✅
Register account ✅
Verify email via link ✅
Redirect back to original URL ✅
Forgot password (reset) ✅
Logout & clear session ✅
Middleware redirect ✅
Session lintas subdomain ✅

---

## 📄 Referensi

Supabase Auth Docs

Next.js App Router Middleware

Cross-subdomain Cookies
