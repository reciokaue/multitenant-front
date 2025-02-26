import { api } from "@/lib/axios"
import { Task } from "./list"

export interface EditTaskProps {
  task: Task
}

export async function editTask({ task }: EditTaskProps){
  const response = await api.put('/task/edit', {
    ...task
  })
  return response.data as {task: Task}
}