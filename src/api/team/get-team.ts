import { api } from "@/lib/axios";
import { UserRole } from "../role/get-user-roles";

interface GetTeamProps {
  teamId: number | string | undefined
}

export interface Team {
  id: number
  name: string
  colorHex: string | null
}

interface GetTeamResponse {
  team: Team
  userRole: UserRole
}

export async function getTeam({teamId}: GetTeamProps) {
  if(!teamId)
    return
  
  const response = await api.get(`/team/details/${teamId}`)
  return response.data as GetTeamResponse
}