import { api } from "@/lib/axios";
import { Team } from "../team/get-team";

interface GetTeamResponse {
  teams: Team[]
}

export async function getUserTeams() {
  const response = await api.get(`/user/teams`)
  return response.data as GetTeamResponse
}