import { getTeam } from "@/api/team/get-team";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { EllipsisVertical, Filter } from "lucide-react";
import { useParams } from "react-router-dom";

interface HeaderProps {
   
}

export function Header() {
  const { teamId } = useParams();

  const { data } = useQuery({
    queryKey: [`team-${teamId}`],
    queryFn: () => getTeam({ teamId: teamId || '' }),
    staleTime: Infinity,
    enabled: teamId !== undefined
  })

  return (
    <div className="bg-foreground/5 0 px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">{data?.team.name}</h2>
      <div className="flex gap-3 items-center justify-center">
        <Button variant='ghost'>
          <Filter/>
          Filtros
        </Button>
        <div className="size-7 bg-accent-foreground rounded-full shrink-0"/>
        <EllipsisVertical/>
      </div>
    </div>
  );
};