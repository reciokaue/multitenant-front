import { api } from "@/lib/axios";

interface GetTeamProps {
  teamId: number
}
interface GetTeamResponse {
  team: {
    id: number
    name: string
  }
}

export async function getTeam({teamId}: GetTeamProps) {
  return await api.get(`/team/${teamId}`) as GetTeamResponse
}