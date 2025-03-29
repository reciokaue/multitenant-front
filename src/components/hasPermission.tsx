import { permissions } from "@/config/permissions";
import { useTeam } from "@/contexts/use-team";
import { ReactNode } from "react";

export type PermissionKeys = keyof typeof permissions;
export type PermissionAction<T extends PermissionKeys = PermissionKeys> = `${T}:${(typeof permissions)[T][number]}`;

interface HasPermissionProps {
  action: PermissionAction;
  children?: ReactNode;
}

export function HasPermission({ action, children }: HasPermissionProps): ReactNode {
  const { hasPermission } = useTeam()

  if(hasPermission(action))
    return children
}
