import { api } from "@/lib/axios"

export interface EditColumnProps {
  activeIndex: number
  overIndex: number
  columnId: number
}

export async function editColumnPosition({ ...rest }: EditColumnProps){
  await api.patch('/column/position', {
    ...rest
  })
}