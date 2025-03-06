import { getTeamRoles } from "@/api/role/team-roles";
import { Card, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface RolesProps {
   
}

export function Roles() {
  const { teamId } = useParams()

  const { data } = useQuery({
    queryKey: [`roles-${teamId}`],
    queryFn: () => getTeamRoles({ teamId }),
    enabled: teamId != undefined,
  });

  return (
    <div className='flex flex-col space-y-2'>
       {data?.roles.map((role) => (
          <Card className="flex flex-row p-2" key={role.id}>
            <CardTitle>{role?.name}</CardTitle>
            <Label>{role?.permissions}</Label>
          </Card>
       ))}
     </div>
  );
};