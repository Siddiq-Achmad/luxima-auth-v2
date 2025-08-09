import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon, User } from "lucide-react";
import AccountForm from "../account/account-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const profile = await supabase
    .from("profiles")
    .select(`full_name, username, website, status, system_role`)
    .eq("id", data.user.id)
    .single();

  return (
    <div className="w-ful h-full flex flex-col justify-center items-center gap-8 max-w-sm lg:max-w-lg m-2 lg:m-4">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <Card className="w-full m-2 lg:m-4">
        <CardHeader>
          <CardTitle>Account Profile</CardTitle>
          <CardDescription>
            View and update your account details
          </CardDescription>
          <CardAction>
            <User className="mr-2 text-primary" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <AccountForm user={data.user} />
        </CardContent>
      </Card>
      <div className="flex flex-col gap-2 items-start w-full m-2 lg:m-4">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 w-full overflow-auto">
          {JSON.stringify(data.user, null, 2)}
        </pre>
        <Separator />
        <h2 className="font-bold text-2xl mb-4">Your user Profile</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 w-full overflow-auto">
          {JSON.stringify(profile.data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
