import { api } from "@/lib/axios";

interface Mail {
  id: number
  email: string
}

interface searchUsersResponse {
  emails: Mail[]
}

interface searchUserProps {
  email: string
}

export async function searchUsers({ email }: searchUserProps) {
  const response = await api.get(`/user/search/${email}`)
  return response.data as searchUsersResponse
}