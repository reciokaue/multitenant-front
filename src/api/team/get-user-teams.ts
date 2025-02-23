import { api } from "@/lib/axios";
import { Team } from "./get-team";

interface GetTeamResponse {
  teams: Team[]
}

export async function getUserTeams() {
  const response = await api.get(`/team/user`)
  return response.data as GetTeamResponse
}
// export async function getProfile() {
//   const response = await api.get('/user/profile')
//   console.log(response.data)
//   return response.data as GetProfileResponse
// }