import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EllipsisVertical } from "lucide-react";
import { Members } from "./members";
import { Roles } from "./roles";

export function Config() {
  return (
    <Dialog>
      <DialogTrigger>
        <EllipsisVertical/>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-start !w-[800px] !max-w-[800px] min-h-[400px]">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="members" className="w-full">
          <TabsList>
            <TabsTrigger value="members">Membros</TabsTrigger>
            <TabsTrigger value="roles">Cargos</TabsTrigger>
            <TabsTrigger value="invites">Convites</TabsTrigger>
          </TabsList>
          <TabsContent value="members">
            <Members/>
          </TabsContent>
          <TabsContent value="roles">
            <Roles/>
          </TabsContent>
          <TabsContent value="invites">Change your password here.</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};