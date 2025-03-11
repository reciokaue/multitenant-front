import { api } from "@/lib/axios"
import { Role } from "./get-user-roles"

export interface CreateRoleParams {
  name: string
  teamId: number
  permissions: string[]
}
interface CreateRoleResponse {
  role: Role
}

export async function createRole({ ...rest }: CreateRoleParams) {
  const response = await api.post('/role/create', { ...rest })

  return response.data as CreateRoleResponse
}