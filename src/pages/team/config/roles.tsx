import { createRole } from "@/api/role/create-role";
import { getTeamRoles } from "@/api/role/team-roles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { permissionsDetail } from "@/config/permissions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface CreateRoleParams {
  name: string;
  teamId: number;
  permissions: string[];
}

export function Roles() {
  const [state, setState] = useState<"list" | "edit" | "new">("list");
  const { teamId } = useParams();

  const queryClient = useQueryClient();
  const rolesQueryKey = [`roles-${teamId}`]
  const { data } = useQuery({
    queryKey: rolesQueryKey,
    queryFn: () => getTeamRoles({ teamId }),
    enabled: !!teamId,
  });

  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleCreateRole = () => {
    if (!roleName.trim() || !teamId) return;

    const newRole: CreateRoleParams = {
      name: roleName,
      teamId: Number(teamId),
      permissions: selectedPermissions,
    };

    createRoleMutation.mutateAsync(newRole)
  };

  const setCreatingNew = () => setState("new");
  const setEditing = () => setState("edit");
  const setListing = () => setState("list");

  const onCheckMain = (checked: boolean, permission: any) => {
    const allPermissions = permission.options.map(
      (option: any) => `${permission.prefix}:${option.key}`
    );
    setSelectedPermissions((prev) =>
      checked ? [...prev, ...allPermissions] : prev.filter((p) => !allPermissions.includes(p))
    );
  }
  const isMainChecked = (permission: any) => permission.options.every((option: any) =>
    selectedPermissions.includes(
      `${permission.prefix}:${option.key}`
    )
  )

  const createRoleMutation = useMutation({
    mutationFn: createRole,
    onSuccess: ({ role }) => {
      queryClient.setQueryData(rolesQueryKey, (prev: any) => ({
        roles: prev ? [...prev.roles, role] : [],
      }));
      setListing()
    },
  })

  return (
    <div className="flex flex-col space-y-2">
      {state === "list" && (
        <>
          <header className="pl-2 flex items-center h-8">
            <Label>Nome</Label>
            <Label className="ml-18">Permissões</Label>
            <Button size="sm" onClick={setCreatingNew} className="ml-auto">
              Novo cargo <Plus size={20} />
            </Button>
          </header>
          {data?.roles.map((role) => (
            <Card className="flex-row p-0 gap-0" key={role.id}>
              <div className="p-4 border-r w-28 justify-start flex items-center">
                <CardTitle>{role?.name}</CardTitle>
              </div>
              <div className="p-4 flex gap-2 flex-1">
                {role?.permissions.map((permission) => (
                  <Badge variant="secondary" key={permission}>
                    {permission}
                  </Badge>
                ))}
              </div>
              <div className="p-4 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="hover:bg-red-200 hover:text-red-600"
                >
                  <Trash2 className="text-red-400" />
                </Button>
                <Button size="icon" variant="secondary">
                  <Edit />
                </Button>
              </div>
            </Card>
          ))}
        </>
      )}
      {state === "new" && (
        <div className="flex flex-col pt-2 space-y-2">
          <div className="flex flex-col space-y-2">
              <DialogTitle>Crie um novo cargo</DialogTitle>
              <DialogDescription>
                Crie um cargo customizado e estabeleça permissões para os
                membros do seu time
              </DialogDescription>
      
              <Label className="mt-4">Nome do cargo</Label>
              <Input
                placeholder="ex: Desenvolvedor"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
          </div>
          <section className="grid grid-cols-2 gap-6 mt-4">
            {permissionsDetail.map((permission) => (
              <div key={permission.prefix} className="col-span-1">
                <div className="flex gap-2 items-center mb-2 ">
                  <Label className="font-medium text-base" htmlFor={permission.prefix}>{permission.title}</Label>
                  <Checkbox
                    id={permission.prefix}
                    checked={isMainChecked(permission)}
                    onCheckedChange={(checked: any) => onCheckMain(checked, permission)}
                  />
                </div>
                {permission.options.map((option) => (
                  <Label
                    htmlFor={`${permission.prefix}:${option.key}`}
                    key={option.key}
                    className="flex items-center justify-between gap-2"
                  >
                    <Checkbox
                      id={`${permission.prefix}:${option.key}`}
                      checked={selectedPermissions.includes(`${permission.prefix}:${option.key}`)}
                      onCheckedChange={() => togglePermission(`${permission.prefix}:${option.key}`)}
                    />
                    <span className="w-full">{option.label}</span>
                    <span className="py-2 font-mono text-sm text-gray-600">
                      {permission.prefix}:{option.key}
                    </span>
                  </Label>
                ))}
              </div>
            ))}
          </section>
          <footer className="flex pt-4 justify-end items-center gap-2">
            <Button onClick={setListing} disabled={createRoleMutation.isPending} variant="secondary">
              Cancelar
            </Button>
            <Button onClick={handleCreateRole}>Adicionar</Button>
          </footer>
        </div>
      )}
    </div>
  );
}
