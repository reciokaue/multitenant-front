import { getTeam } from "@/api/team/get-team";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function SelectedTeam() {
  const { teamId } = useParams()

  const { data } = useQuery({
    queryKey: [`team-${teamId}`],
    queryFn: () => getTeam({teamId}),
    staleTime: Infinity,
  })

  return (
    <div className='flex flex-col space-y-4'>
      <Label>Time {data?.team?.name}</Label>
      {JSON.stringify(data)}
     </div>
  );
};