import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient()

import { api } from '@/lib/axios'
import { Header } from '@/components/header'
import { ColumnsProvider } from '@/contexts/use-columns';
import { TasksProvider } from '@/contexts/use-tasks';

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/login', { replace: true })
          }
        }
      },
    )
    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <QueryClientProvider client={queryClient}>
      <ColumnsProvider>
        <TasksProvider>
          <div className="flex min-h-screen flex-col antialiased">
            <Header />

            <div className="flex flex-1 flex-col gap-4 p-8 pt-6 h-full">
              <Outlet />
            </div>
          </div>
        </TasksProvider>
      </ColumnsProvider>
    </QueryClientProvider>
  )
}
