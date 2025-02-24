import { api } from "@/lib/axios"

interface CategoryProps{
  categoryId: number
}

export async function deleteCategory({ categoryId }: CategoryProps){
  return await api.delete(`/category/delete/${categoryId}`)
}