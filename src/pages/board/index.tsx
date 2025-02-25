import { getTeam } from "@/api/team/get-team";
import { Columns } from "@/pages/board/columns";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AddTaskDrawer } from "./add-task-drawer";

export function SelectedTeam() {
  const { teamId } = useParams()

  const { data } = useQuery({
    queryKey: [`team-${teamId}`],
    queryFn: () => getTeam({teamId}),
    staleTime: Infinity,
  })

  return (
    <div className='flex flex-col space-y-4 flex-1'>
      <Label>Time {data?.team?.name}</Label>
      <Columns teamId={teamId || ''}/>
      {/* {JSON.stringify(data)} */}
      <AddTaskDrawer teamId={teamId || ''}/>
     </div>
  );
};