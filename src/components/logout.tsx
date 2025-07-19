"use client";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export function Logout() {
  const handleLogout = async () => {
    await authClient.signOut();
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
