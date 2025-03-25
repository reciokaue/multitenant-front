import axios from 'axios'
import { env } from './env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

api.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW4gVXNlciIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWQiOjYsImlhdCI6MTc0Mjg2NTMzNywiZXhwIjoxNzc0NDAxMzM3fQ.XG2LqKHjkrTSlvK22Xp4J7vna7t1k1ktEfXG6oPRbWY`


api.interceptors.request.use(async (config) => {
  console.log(config.url)
  return config
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )
    return config
  })
}
