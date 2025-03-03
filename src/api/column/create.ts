import { api } from "@/lib/axios"
import { Column } from "./list"

export interface CreateColumnProps {
  column: CreateColumn
}

interface CreateColumn {
  name: string
  teamId: string | number | undefined
  index: number
}
  
export async function createColumn({ column }: CreateColumnProps){
  const response = await api.post('/column/create', {
    ...column
  })
  return response.data as {column: Column}
}