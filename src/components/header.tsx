import { OrganizationSwitcher } from "@/components/organization-switcher";
import { getOrganization } from "@/server/organizations";
import { Logout } from "@/components/logout";
import { isAdmin } from "@/server/users";
import Link from "next/link";

export async function Header() {
  const organizations = await getOrganization();
  const isAdministrator = await isAdmin();

  return (
    <header className="px-4 lg:px-8 mx-auto flex h-[60px] items-center justify-between mb-4">
      <OrganizationSwitcher organizations={organizations} />
      {isAdministrator && <Link href="/admin">Admin</Link>}
      <Logout />
    </header>
  );
}
