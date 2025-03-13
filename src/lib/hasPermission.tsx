import { permissions } from "@/config/permissions";
import { useTeam } from "@/hooks/use-team";
import { ReactNode } from "react";

type PermissionKeys = keyof typeof permissions;
type PermissionValues<T extends PermissionKeys = PermissionKeys> = `${T}:${(typeof permissions)[T][number]}`;

interface HasPermissionProps {
  permissions?: string[];
  action: PermissionValues;
  children?: ReactNode;
}

export function HasPermission({ action, children }: HasPermissionProps): ReactNode | boolean {
  const { permissions } = useTeam()

  const hasAccess = permissions?.includes(action) ?? false;

  if (children) {
    return hasAccess ? children : null;
  }

  return hasAccess;
}
