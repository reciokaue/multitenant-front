import { getTeamRoles } from "@/api/role/team-roles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { permissionsDetail } from "@/config/permissions";
import { useQuery } from "@tanstack/react-query";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface RolesProps {
   
}

export function Roles() {
  const [state, setState] = useState("")
  const { teamId } = useParams()

  const { data } = useQuery({
    queryKey: [`roles-${teamId}`],
    queryFn: () => getTeamRoles({ teamId }),
    enabled: teamId != undefined,
  });

  return (
    <div className='flex flex-col space-y-2'>
      <header className="pl-2 flex items-center">
        <Label>Nome</Label>
        <Label className="ml-18">Permissões</Label>
        <Button size='sm' className="ml-auto">Novo cargo <Plus size={20}/></Button>
      </header>
       {data?.roles.map((role) => (
          <Card className="flex-row p-0 gap-0" key={role.id}>
            <div className="p-4 border-r w-28 justify-start flex items-center">
              <CardTitle>{role?.name}</CardTitle>
            </div>
            <div className="p-4 flex gap-2 flex-1">
              {role?.permissions.map((permission) => (
                <Badge variant='secondary'>{permission}</Badge>
              ))}
            </div>
            <div className="p-4 flex gap-2">
              <Button size='icon' variant='secondary' className="hover:bg-red-200 hover:text-red-600">
                <Trash2 className="text-red-400"/>
              </Button>
              <Button size='icon' variant='secondary'> 
                <Edit/>
              </Button>
            </div>
          </Card>
       ))}
      
      {/* <div className="flex flex-col pt-2 space-y-2">
        <DialogTitle>Crie um novo cargo</DialogTitle>
        <DialogDescription>Crie um cargo customizado e estabeleça permissões para os membros do seu time</DialogDescription>

        <Label>Nome do cargo</Label>
        <Input placeholder="ex: Desenvolvedor" />

        <div className="rounded-t-2xl overflow-hidden">
          <table className="min-w-full table-fixed border-collapse border border-border">
            <thead>
              <tr className="bg-primary/10 text-left">
                <th className="px-4 py-2 w-1/2">Permissão</th>
                <th className="px-4 py-2">Chave</th>
              </tr>
            </thead>
            <tbody>
              {permissionsDetail.map((permission) => (
                <>
                  <tr key={permission.prefix} className="bg-primary-200">
                    <td colSpan={2} className="px-4 py-2 font-semibold flex items-center gap-3">
                      {permission.title} 
                      <Checkbox id={`${permission.prefix}`} />
                    </td>
                  </tr>
                  {permission.options.map((option) => (
                    <tr key={option.key} className="border-t">
                      <td className="px-4 py-2 flex items-center gap-2">
                        <Checkbox id={`${permission.prefix}:${option.key}`} />
                        <Label htmlFor={`${permission.prefix}:${option.key}`}>
                          {option.label}
                        </Label>
                      </td>
                      <td className="px-4 py-2 font-mono text-sm text-gray-600">
                        {permission.prefix}:{option.key}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}


     </div>
  );
};