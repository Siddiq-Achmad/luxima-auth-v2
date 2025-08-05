import AccountForm from "./account-form";
import { createClient } from "@/lib/supabase/server";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-[calc(40vh-3.5rem)] min-w-lg w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <AccountForm user={user} />
      </div>
    </div>
  );
}
