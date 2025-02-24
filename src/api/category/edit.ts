import { api } from "@/lib/axios"
import { Category } from "./list"

interface CategoryProps{
  category: EditingCategory
}

interface EditingCategory {
  text: string
}

export async function createCategory({ category }: CategoryProps){
  const response = await api.put('/category/edit', {
    ...category
  })
  return response.data as {category: Category}
}