import axios from 'axios'
import { env } from './env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

api.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3NDAyNTE0OTgsImV4cCI6MTc0MDMzNzg5OH0.rfDypTgJMK-woij41F4B2w5kaVqxAQin-7dsgjXN76s`

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )
    return config
  })
}
