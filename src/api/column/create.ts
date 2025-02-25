import { api } from "@/lib/axios"
import { Column } from "./list"

interface ColumnProps {
  column: Omit<Column, "id" | "tasks">
}

export async function createColumn({ column }: ColumnProps){
  const response = await api.post('/column/create', {
    ...column
  })
  return response.data as {column: Column}
}