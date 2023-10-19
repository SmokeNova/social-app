import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container">
      <h1 className="text-2xl text-indigo-600 font-bold">
        Hello {session?.user?.name}
      </h1>
      <Image src={session?.user?.image ?? ""} alt="user" width={48} height={48} className="rounded-full" />
      <p className="text-lg text-indigo-600 font-semibold">
        your email: {session?.user?.email}
      </p>
    </div>
  )
}
