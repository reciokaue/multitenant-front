import { api } from "@/lib/axios"
import { Column } from "./list"

export interface EditColumnProps{
  column: Column
}

export async function editColumn({ column }: EditColumnProps){
  const response = await api.put('/column/edit', {
    ...column
  })
  return response.data as {column: Column}
}