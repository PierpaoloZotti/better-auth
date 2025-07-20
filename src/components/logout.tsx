"use client";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Até logo!!");
    router.push("/");
  };
  return (
    <div>
      <Button variant="outline" onClick={handleLogout}>
        <LogOut className="w-4 h-4" />
        Sair
      </Button>
    </div>
  );
}
