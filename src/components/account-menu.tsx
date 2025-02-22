import { useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

// import { getProfile } from '@/api/get-profile'
// import { signOut } from '@/api/sign-out'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import { Skeleton } from './ui/skeleton'
import { getProfile } from '@/api/user/profile'

export function AccountMenu() {
  // const navigate = useNavigate()

  const { data, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })
  // const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
  //   mutationFn: signOut,
  //   onSuccess: () => {
  //     navigate('sign-in', { replace: true })
  //   },
  // })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex select-none items-center gap-2"
            variant="outline"
          >
            Kaue Recio
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{data?.profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {data?.profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            className="text-rose-500 dark:text-rose-400"
            // disabled={isSigningOut}
            // onClick={() => signOutFn()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}
