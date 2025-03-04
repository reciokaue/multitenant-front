import { api } from "@/lib/axios"

interface ColumnProps{
  columnId: number | string
}

export async function deleteColumn({ columnId }: ColumnProps){
  return await api.delete(`/column/delete/${columnId}`)
}