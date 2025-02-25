import { api } from "@/lib/axios"
import { Task } from "./list-tasks"

export interface CreateTaskParams {
  task: Omit<Task, "id">
}

export async function createTask({ task }: CreateTaskParams) {
  const response = await api.post('/task/create', {
    ...task
  })

  return response.data as Task
}