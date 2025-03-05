import { getUserTeams } from "@/api/user/teams";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function Teams() {
  const { data, isLoading: isLoadingTeams } = useQuery({
    queryKey: ['user-teams'],
    queryFn: getUserTeams,
    staleTime: Infinity,
  })

  return (
    <div className='flex flex-col space-y-4'>
      <Label>Seus times</Label>
      <div className="flex gap-3">
        {data && !isLoadingTeams &&
            data.teams.map((team) => (
              <Link to={`/team/${team.id}`}>
                <Card
                  className="p-2 aspect-square w-20"
                  key={team.id}
                >
                  {team.name}
                </Card>
              </Link>
        ))}
        {isLoadingTeams && [0,1,2].map((i) => (
          <Skeleton key={i}/>
        ))}
      </div>
     </div>
  );
};