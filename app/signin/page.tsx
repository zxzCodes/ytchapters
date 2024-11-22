import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignInStuff from "@/components/signInStuff";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  // Redirect to dashboard if the user is logged in
  if (session) {
    redirect("/dashboard");
  }

  // Render the SignInStuff component for unauthenticated users
  return <SignInStuff />;
}
