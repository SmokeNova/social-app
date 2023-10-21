import { GoogleSignInButton } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-screen h-full flex items-center justify-center">
      <section className="p-5 rounded bg-gradient-to-r from-blue-500 to-blue-700">
        <GoogleSignInButton />
      </section>
    </div>
  );
}
