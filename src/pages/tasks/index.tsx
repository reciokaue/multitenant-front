// import { getUserTasks } from "@/api/team/get-user-tasks";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

export function Tasks() {
  // const { data, isLoading: isLoadingTasks } = useQuery({
  //   queryKey: ['user-tasks'],
  //   queryFn: getUserTasks,
  //   staleTime: Infinity,
  // })

  return (
    <div className='flex flex-col space-y-4'>
      <Label>Tasks</Label>
      {/* <div className="flex gap-3">
        {data && !isLoadingTasks &&
            data.tasks.map((team) => (
              <Card
                className="p-2 aspect-square w-20"
                key={team.id}
              >
                {team.name}
              </Card>
        ))}
        {isLoadingTasks && [0,1,2].map((i) => (
          <Skeleton key={i}/>
        ))}
      </div> */}
     </div>
  );
};