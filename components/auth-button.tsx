import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

import { UserRound } from "./animate-ui/icons/user-round";
import { AnimateIcon } from "./animate-ui/icons/icon";
import { LogInIcon } from "./animate-ui/icons/log-in";

export async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <p className="hidden md:block">Hey, {user.email}!</p>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <AnimateIcon animateOnHover>
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/auth/login">
            <LogInIcon />
            Sign in
          </Link>
        </Button>
      </AnimateIcon>
      <AnimateIcon animateOnHover>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/auth/sign-up">
            <UserRound />
            Sign up
          </Link>
        </Button>
      </AnimateIcon>
    </div>
  );
}
