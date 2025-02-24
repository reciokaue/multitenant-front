import { api } from "@/lib/axios";

interface listCategoryProps {
  teamId: number | string
} 
interface listCategoryResponse {
  categories: Category[]
}

export interface Category {
  id: number
  label: string
  colorHex: string | null
  teamId: string
} 

export async function listCategories({ teamId }: listCategoryProps) {
  const response = await api.get(`/category/list/team/${teamId}`)
  return response.data as listCategoryResponse
}
