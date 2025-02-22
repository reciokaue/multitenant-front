import { api } from "@/lib/axios";

export interface UserRole {
  userId: number
  teamId: number
  roleId: number
  role: Role
}

export interface Role {
  id: number
  name: string
  permissions: string[]
  teamId: number
}

export async function getUserRoles() {
  return await api.get('/roles') as {userRole: UserRole}
}