"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "./animate-ui/icons/log-out";
import { AnimateIcon } from "./animate-ui/icons/icon";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <AnimateIcon animateOnHover>
      <Button onClick={logout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </AnimateIcon>
  );
}
