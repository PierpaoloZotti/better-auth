import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { CreateOrganizationForm } from "@/components/forms/create-organization-form";

export function CreateOrganization() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4 mr-2" />
          Organização
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Organização</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Crie uma organização para gerenciar seus projetos e colaboradores.
        </DialogDescription>
        <CreateOrganizationForm />
      </DialogContent>
    </Dialog>
  );
}
