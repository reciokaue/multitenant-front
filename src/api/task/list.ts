import { api } from "@/lib/axios";
import { Category } from "../category/list";

interface listTaskProps {
  teamId: number | string
  completed?: boolean,
  overdue?: boolean
  noDue?: boolean
  dueIn?: 'day' | 'week' | 'month'
  search?: string
  categories?: number[]
}

export interface Task {
  id: number
  title: string 
  description: string | null
  teamId: number
  columnId: number
  index: number
  dueDate?: string | null
  categoryId?: number | null
  category?: Category
}

export interface ListTasksResponse {
  tasks: Task[]
}

export async function listTasks({ teamId, ...rest }: listTaskProps) {
  const response = await api.get(`/task/team/${teamId}`, {
    params: {
      ...rest
    }
  })

  return response.data as ListTasksResponse
}
