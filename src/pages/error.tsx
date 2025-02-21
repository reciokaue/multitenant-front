import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Whoops, algo aconteceu...</h1>
      <p className="text-accent-foreground">
        Um erro aconteceu na aplicação, abaixo voce encontra mais detalhes
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <Link to="/">
        <p className="text-accent-foreground">
          Voltar para o
          <span className="text-sky-600 dark:text-sky-400"> Dashboard</span>
        </p>
      </Link>
    </div>
  )
}
