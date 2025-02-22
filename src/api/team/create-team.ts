import { api } from "@/lib/axios"

export interface CreateTeamParams {
  name: string
}

export async function createTeam({ name }: CreateTeamParams) {
  return await api.post('/team/create', { name })
}