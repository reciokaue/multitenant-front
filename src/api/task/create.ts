import { api } from "@/lib/axios"
import { Task } from "./list"

export interface CreateTaskProps {
  task: Omit<Task, "id" | "description">
}

export interface CreateTaskResponse {
  task: Task
}

export async function createTask({ task }: CreateTaskProps) {
  const response = await api.post('/task/create', {
    ...task
  })

  return response.data as CreateTaskResponse
}