import { sendInvite } from "@/api/invite/send";
import { searchUsers } from "@/api/user/search";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function Invites() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || ''

  const setSearch = (value: string) =>  setSearchParams((url) => {
    url.set('search', value);
    return url;
  });

  const { data } = useQuery({
    queryKey: [`search-${search}`],
    queryFn: () => searchUsers({ email: search || '' }),
    enabled: search !== ''
  });

  const { mutate: handleSendInvite } = useMutation({
    mutationFn: () => sendInvite({email: search}),
    onMutate: () => setSearch(''),
    onError: console.log
  })
  
  return (
    <div className='flex flex-col space-y-4'>
      <CardTitle className="mt-3 text-2xl">Convidar membros</CardTitle>
      <Popover open={search !== ''}>
        <PopoverTrigger className="flex flex-row gap-2">
          <Input
            placeholder="Email"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <Button onClick={handleSendInvite}>Enviar</Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="p-2"
        >
          {data?.emails?.map((mail) => (
            <Button
              key={mail.id}
              className="w-full justify-start"
              variant='ghost'
              onClick={() => setSearch(mail.email)}
            >
              {mail.email}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

// */
// trapFocus?: FocusScopeProps['trapped'];
// /**
//  * Event handler called when auto-focusing on open.
//  * Can be prevented.
//  */
// onOpenAutoFocus?: FocusScopeProps['onMountAutoFocus'];
// /**
//  * Event handler called when auto-focusing on close.
//  * Can be prevented.
//  */
// onCloseAutoFocus?: FocusScopeProps['onUnmountAutoFocus'];