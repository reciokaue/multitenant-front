import { api } from "@/lib/axios";
import { Category } from "../category/list";

interface listTaskProps {
  teamId: number
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
  dueDate?: Date | null
  categoryId?: number | null
  category?: Category
}

interface ListTasksResponse {
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
