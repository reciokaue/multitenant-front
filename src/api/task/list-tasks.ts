import { api } from "@/lib/axios";

interface listTaskProps {
  teamId: number
}

export async function listTasks({teamId}: listTaskProps) {
  return await api.get(`/task/team/${teamId}`)
}
