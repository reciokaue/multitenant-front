import { api } from "@/lib/axios";

interface GetTeamProps {
  teamId: number
}

export interface Team {
  id: number
  name: string
}

interface GetTeamResponse {
  team: Team
}

export async function getTeam({teamId}: GetTeamProps) {
  return await api.get(`/team/${teamId}`) as GetTeamResponse
}