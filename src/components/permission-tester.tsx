import { useTeam } from "@/hooks/use-team";
import { permissionsDetail } from "@/config/permissions";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { Button } from "./ui/button";

export function PermissionTester() {
  const { data, queryKey } = useTeam();
  const queryClient = useQueryClient();

  const [permissions, setPermissions] = useState<string[]>(data?.userRole.role.permissions || []);

  function togglePermission(permission: string) {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission) // Remove permissão se já estiver marcada
        : [...prev, permission] // Adiciona permissão se não estiver
    );
  }

  function applyChanges() {
    queryClient.setQueryData(queryKey, (oldData: any) => ({
      ...oldData,
      userRole: {
        ...oldData.userRole,
        role: {
          ...oldData.userRole.role,
          permissions,
        },
      },
    }));
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className="size-7 bg-accent-foreground rounded-full shrink-0 text-white flex items-center justify-center" >P</div>
      </PopoverTrigger>
      <PopoverContent className="p-4 flex flex-col gap-2">
        <p className="text-lg font-semibold">Testar Permissões</p>

        {permissionsDetail.map((section) => (
          <div key={section.prefix} className="flex flex-col gap-2">
            <p className="font-medium">{section.title}</p>
            {section.options.map((option) => {
              const permissionKey = `${section.prefix}:${option.key}`;
              return (
                <label key={permissionKey} className="flex items-center gap-2">
                  <Checkbox
                    id={permissionKey}
                    checked={permissions.includes(permissionKey)}
                    onCheckedChange={() => togglePermission(permissionKey)}
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        ))}

        <Button className="mt-3" onClick={applyChanges}>
          Aplicar Mudanças
        </Button>
      </PopoverContent>
    </Popover>
  );
}
