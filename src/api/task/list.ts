import { api } from "@/lib/axios";
import { Category } from "../category/list";

interface listTaskProps {
  teamId: number | string
  completed?: string | null
  overdue?: string | null
  noDue?: string | null
  dueIn?: 'day' | 'week' | 'month' | string | null
  search?: string | null
  categories?: string | null
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
      ...rest,
      completed: rest?.completed ? Boolean(rest.completed): null,
      overdue: rest?.overdue ? Boolean(rest.overdue): null,
      noDue: rest?.noDue ? Boolean(rest.noDue): null,
      categories: rest?.categories ? JSON.parse(rest.categories): null,
    }
  })

  return response.data as ListTasksResponse
}
