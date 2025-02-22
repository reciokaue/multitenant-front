import { api } from "@/lib/axios";

interface UserRole {
  userId: number
  teamId: number
  roleId: number
  role: Role
}

interface Role {
  id: number
  name: string
  permissions: string[]
  teamId: number
}

export async function getUserRoles() {
  return await api.get('/roles') as {userRole: UserRole}
}