import { api } from '@/lib/axios'

export interface LoginParams {
  email: string
  password: string
}

interface User {
  id: number
  name: string
  email: string
}

export interface LoginResponse {
  message: string
  token: string
  user: User
}

export async function login({ email, password }: LoginParams) {
  return await api.post('/auth/login', { email, password }) as Response
}