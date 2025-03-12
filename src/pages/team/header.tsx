import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Config } from "./config";
import { useTeam } from "@/hooks/use-team";

export function Header() {
  const { data } = useTeam()

  return (
    <div className="bg-foreground/5 0 px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">{data?.team.name}</h2>
      <div className="flex gap-3 items-center justify-center">
        <Button variant='ghost'>
          <Filter/>
          Filtros
        </Button>
        <div className="size-7 bg-accent-foreground rounded-full shrink-0"/>
        <Config/>
      </div>
    </div>
  );
};