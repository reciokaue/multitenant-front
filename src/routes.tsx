import { createBrowserRouter } from 'react-router-dom'

import { NotFound } from './pages/404'
import { Error } from './pages/error'
import { AppLayout } from './pages/layouts/app'
import { AuthLayout } from './pages/layouts/auth'
import { Login } from './pages/auth/login'
import { Register } from './pages/auth/register'
import { Teams } from './pages/teams'
import { Tasks } from './pages/tasks'
import { SelectedTeam } from './pages/selected-team'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Teams /> },
      { path: '/team/:teamId', element: <SelectedTeam /> },
      { path: '/tasks', element: <Tasks /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])