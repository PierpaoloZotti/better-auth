import { isAdmin } from "@/server/users";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const isAdministrator = await isAdmin();
  if (!isAdministrator) {
    redirect("/dashboard");
  }

  return <div>Admin</div>;
}
