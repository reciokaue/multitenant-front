import { api } from "@/lib/axios"
import { Column } from "./list"

interface ColumnProps{
  column: EditingColumn
}

interface EditingColumn {
  text: string
}

export async function createColumn({ column }: ColumnProps){
  const response = await api.put('/column/edit', {
    ...column
  })
  return response.data as {column: Column}
}