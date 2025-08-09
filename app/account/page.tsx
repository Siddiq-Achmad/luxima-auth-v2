import { Suspense } from "react";
import AccountForm from "./account-form";
import { createClient } from "@/lib/supabase/server";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { User } from "lucide-react";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Card className="w-full max-w-md m-4">
      <CardHeader>
        <CardTitle>Account Profile</CardTitle>
        <CardDescription>View and update your account details</CardDescription>
        <CardAction>
          <User className="mr-2 text-primary" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <AccountForm user={user} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
