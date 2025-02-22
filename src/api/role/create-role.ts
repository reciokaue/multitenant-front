import { api } from "@/lib/axios"

export interface CreateRoleParams {
  name: string
  teamId: number
  permissions: string[]
}

export async function createRole({ name }: CreateRoleParams) {
  return await api.post('/roles', { name })
}