import { getTeamMembers } from "@/api/team/members";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
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
        <header className="pl-2 flex items-center h-8">
          <Label>Nome</Label>
          <Label className="ml-18">Cargo</Label>
        </header>
       {data?.members.map((member) => (
          <Card className="flex-row p-0 gap-0" key={`${member.role.id}${member.user.id}`}>
          <div className="p-4 border-r w-28 justify-start flex items-center">
            <CardTitle>{member.user?.name}</CardTitle>
          </div>
          <div className="flex items-center flex-1 p-4">
            {member.role.name}
          </div>
          <div className="p-4 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="hover:bg-red-200 hover:text-red-600"
            >
              <Trash2 className="text-red-400" />
            </Button>
          </div>
        </Card>
       ))}
     </div>
  );
};