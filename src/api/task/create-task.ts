import { api } from "@/lib/axios"

export interface CreateTaskParams {
  title: string
  description: string
  dueDate?: Date
  teamId: number
  categoryId?: number
}

export async function createTask(task: CreateTaskParams) {
  return await api.post('/tasks/create', task)
}