"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
      <Button size="lg" onClick={() => signIn("google", { callbackUrl })}>
        <Image
          src="/google-logo.svg"
          alt="google logo"
          width={32}
          height={32}
          className="mr-2"
        />
        Sign In with Google
      </Button>
  );
}
