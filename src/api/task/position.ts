import { api } from "@/lib/axios"

export interface EditTaskProps {
  activeIndex: number
  overIndex: number
  activeColumnId: number
  overColumnId: number
  taskId: number
}

export async function editTaskPosition({ ...rest }: EditTaskProps){
  await api.patch('/task/position', {
    ...rest
  })
}