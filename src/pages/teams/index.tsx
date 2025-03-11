import { getUserTeams } from "@/api/user/teams";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function Teams() {
  const { data, isLoading: isLoadingTeams } = useQuery({
    queryKey: ['user-teams'],
    queryFn: getUserTeams,
    staleTime: Infinity,
  })

  return (
    <div className='flex flex-col space-y-4'>
      <header className="flex py-4 justify-between items-center">
        <Label className="text-2xl">Seus times</Label>

        <Button>Novo time <Plus/></Button>
      </header>
      <div className="grid grid-cols-4 gap-4">
        {data && !isLoadingTeams &&
            data.teams.map((team) => (
              <Link to={`/team/${team.id}`}>
                <Card
                  className="p-4 h-40 text-2xl bg-primary-foreground hover:brightness-75"
                  key={team.id}
                  style={team?.colorHex ? {background: team.colorHex}: {}}
                >
                  {team.name}
                </Card>
              </Link>
        ))}
        {!data && isLoadingTeams && [0,1,2,3].map((i) => (
          <Skeleton key={i} className="h-40"/>
        ))}
      </div>
     </div>
  );
};