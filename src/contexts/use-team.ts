import { getTeam } from "@/api/team/get-team";
import { PermissionAction } from "@/components/hasPermission";
import {useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useTeam(){
  const { teamId } = useParams();
  const queryKey = [`team-${teamId}`]

  const query = useQuery({
    queryKey,
    queryFn: () => getTeam({ teamId: teamId || '' }),
    staleTime: Infinity,
    enabled: teamId !== undefined
  })

  function hasPermission(action: PermissionAction): boolean {
    if(!query) return false

    return query.data?.userRole.role.permissions?.includes(action) ?? false;
  }

  return {
    ...query,
    permissions: query.data?.userRole.role.permissions,
    queryKey,
    hasPermission
  }
}
