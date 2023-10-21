import { GoogleSignInButton } from "@/components";

export default function SignIn() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <section className="p-5 rounded bg-gradient-to-r from-blue-500 to-blue-700">
                <GoogleSignInButton />
            </section>
        </div>
    )
}
