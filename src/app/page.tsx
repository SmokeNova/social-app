import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container">
      <h1 className="text-2xl text-indigo-600 font-bold">
        Hello {session?.user?.name ?? "unknown user"}. 👋👋
        </h1>
    </div>
  )
}
