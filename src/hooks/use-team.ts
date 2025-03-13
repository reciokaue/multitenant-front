import { getTeam } from "@/api/team/get-team";
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

  return {
    ...query,
    permissions: query.data?.userRole.role.permissions
  }
}
