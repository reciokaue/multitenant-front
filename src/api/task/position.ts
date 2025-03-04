import { api } from "@/lib/axios"
import { Task } from "./list"

export interface EditTaskProps {
  task: Partial<Task>
}

export async function editTaskPosition({ task }: EditTaskProps){
  await api.patch('/task/position', {
    ...task
  })
}