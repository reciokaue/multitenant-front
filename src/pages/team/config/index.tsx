import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EllipsisVertical } from "lucide-react";
import { Members } from "./members";
import { Roles } from "./roles";
import { Invites } from "./invites";

export function Config() {
  return (
    <Dialog>
      <DialogTrigger>
        <EllipsisVertical/>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-start !w-[800px] !max-w-[800px] min-h-[400px]">
        <Tabs defaultValue="members" className="w-full">
        <DialogHeader className="flex-row items-center gap-4">
          <DialogTitle>Configurações</DialogTitle>
          <TabsList>
            <TabsTrigger value="members">Membros</TabsTrigger>
            <TabsTrigger value="roles">Cargos</TabsTrigger>
            <TabsTrigger value="invites">Convites</TabsTrigger>
          </TabsList>
        </DialogHeader>
          <TabsContent value="members">
            <Members/>
          </TabsContent>
          <TabsContent value="roles">
            <Roles/>
          </TabsContent>
          <TabsContent value="invites">
            <Invites/>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};