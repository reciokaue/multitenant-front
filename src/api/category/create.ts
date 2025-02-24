import { api } from "@/lib/axios"
import { Category } from "./list"

interface CategoryProps{
  category: Omit<Category, "id">
}

export async function createCategory({ category }: CategoryProps){
  const response = await api.post('/category/create', {
    ...category
  })
  return response.data as {category: Category}
}