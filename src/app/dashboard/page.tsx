import { CreateOrganization } from "@/components/create-organization";
import { Header } from "@/components/header";
import { Logout } from "@/components/logout";

export default async function DashboardPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="flex justify-between gap-2">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <CreateOrganization />
        </div>
      </div>
    </>
  );
}
