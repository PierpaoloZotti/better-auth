"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Organization } from "@/db/schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface OrganizationSwitcherProps {
  organizations: Organization[];
}

export function OrganizationSwitcher({
  organizations,
}: OrganizationSwitcherProps) {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const handleOrganizationChange = async (organizationId: string) => {
    try {
      const { error } = await authClient.organization.setActive({
        organizationId,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Organização atualizada com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar organização");
    }
  };
  return (
    <Select
      onValueChange={handleOrganizationChange}
      value={activeOrganization?.id ?? ""}
    >
      <SelectTrigger className="w-[230px]">
        <SelectValue placeholder="Selecione uma organização" />
      </SelectTrigger>
      <SelectContent>
        {organizations.map((organization) => (
          <SelectItem key={organization.id} value={organization.id}>
            {organization.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
