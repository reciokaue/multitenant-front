import { api } from "@/lib/axios";
import { Task } from "./list";

interface getTaskProps {
  taskId: number | string
}

export interface GetTaskResponse {
  task: Task
}

export async function getTask({ taskId }: getTaskProps) {
  const response = await api.get(`/task/${taskId}`)

  return response.data as GetTaskResponse
}
