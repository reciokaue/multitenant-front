import axios from 'axios'
import { env } from './env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

api.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3NDAzNDg2NjIsImV4cCI6MTc3MTg4NDY2Mn0.p6cjNsIgNeqsy7hESnMa4Un9OL4P9zfrZN6axhduPk0`

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )
    return config
  })
}
