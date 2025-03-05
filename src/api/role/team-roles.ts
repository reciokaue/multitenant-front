import { api } from "@/lib/axios";
import { Role } from "./get-user-roles";

interface getTeamRolesProps {
  teamId: string | number | undefined
}

interface getTeamRolesResponse {
  roles: Role[]
}

export async function getTeamRoles({ teamId }: getTeamRolesProps) {
  if(!teamId) return
  const response = await api.get(`/role/team/${teamId}`)
  return response.data as getTeamRolesResponse
}