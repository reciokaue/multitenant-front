import { api } from "@/lib/axios";

interface listColumnProps {
  teamId: number | string
}
export interface listColumnResponse {
  columns: Column[]
}

export interface Column {
  id: number
  name: string
  teamId: number
}

export async function listColumns({ teamId }: listColumnProps) {
  const response = await api.get(`/column/list/team/${teamId}`)
  return response.data as listColumnResponse
}
