import { api } from '@/lib/axios'
import { LoginResponse } from './login'

export interface RegisterParams {
  name: string
  email: string
  password: string
}

export async function register({ email, password }: RegisterParams) {
  return await api.post('/auth/login', { email, password }) as LoginResponse
}