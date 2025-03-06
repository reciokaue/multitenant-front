import { getTeamMembers } from "@/api/team/members";
import { Card, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function Members() {
  const { teamId } = useParams()

  const { data } = useQuery({
    queryKey: [`members-${teamId}`],
    queryFn: () => getTeamMembers({ teamId }),
    enabled: teamId != undefined,
  });

  return (
    <div className='flex flex-col space-y-2'>
       {data?.members.map((member) => (
          <Card className="flex flex-row p-2">
            <CardTitle>{member?.user.name}</CardTitle>
            <Label>{member?.role.name}</Label>
            
            {/* {JSON.stringify(member)} */}
          </Card>
       ))}
     </div>
  );
};