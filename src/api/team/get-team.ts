import { api } from "@/lib/axios";

interface GetTeamProps {
  teamId: number | string | undefined
}

export interface Team {
  id: number
  name: string
}

interface GetTeamResponse {
  team: Team
}

export async function getTeam({teamId}: GetTeamProps) {
  if(!teamId)
    return
  
  const response = await api.get(`/team/details/${teamId}`)
  return response.data as GetTeamResponse
}