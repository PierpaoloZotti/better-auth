import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen px-5 text-center">
      <Image
        src="/logo.png"
        alt="Better Auth"
        width={100}
        height={100}
        className=" dark:invert"
      />

      <h1 className="text-4xl font-bold">Better Auth Starter</h1>

      <p className="text-lg">Projeto para testar o Better Auth.</p>

      <div className="flex gap-2">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/signup">
          <Button>Signup</Button>
        </Link>
      </div>
    </div>
  );
}
