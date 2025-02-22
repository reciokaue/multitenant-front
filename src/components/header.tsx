import { CheckCheck, Home, Search, UtensilsCrossed } from 'lucide-react'

// import { AccountMenu } from './account-menu'
// import { ModeToggle } from './theme/mode-toggle'
import { Separator } from './ui/separator'
import { Navlink } from './navlink'
import { AccountMenu } from './account-menu'

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <CheckCheck className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Navlink to="/">
            <Home className="h-4 w-4" />
            Times
          </Navlink>
          <Navlink to="/orders">
            <UtensilsCrossed className="h-4 w-4" />
            Tarefas
          </Navlink>
          <Navlink to="/orders">
            <Search className="h-4 w-4" />
            Buscar
          </Navlink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {/* <ModeToggle /> */}
          <AccountMenu />
        </div>
      </div>
    </header>
  )
}
