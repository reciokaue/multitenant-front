import { permissions } from "@/config/permissions";
import { useTeam } from "@/hooks/use-team";

type PermissionKeys = keyof typeof permissions;
type PermissionValues<T extends PermissionKeys> = `${T}:${(typeof permissions)[T][number]}`;

export function hasPermission(permission: PermissionValues<PermissionKeys>): boolean {
  const { data } = useTeam()
  const role = data?.userRole.role

  if(!role)
    return false

  return role.permissions.includes(permission);
}