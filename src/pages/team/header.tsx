import { Config } from "./config";
import { useTeam } from "@/hooks/use-team";
import { PermissionTester } from "@/components/permission-tester";
import { TaskFilters } from "./task-filters";

export function Header() {
  const { data } = useTeam()

  return (
    <div className="bg-foreground/5 0 px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">{data?.team.name}</h2>
      <div className="flex gap-3 items-center justify-center">
        <TaskFilters/>
        {data &&
          <PermissionTester/>
        }
        <Config/>
      </div>
    </div>
  );
};