import { createTask, CreateTaskParams } from "@/api/task/create-task";
import { listTasks } from "@/api/task/list-tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UseTaskProps {
  teamId: number | string
}

export function useTask({ teamId }: UseTaskProps){
  const queryClient = useQueryClient();
  const queryKey = [`tasks-${teamId}`]

  const { data } = useQuery({
    queryKey,
    queryFn: () => listTasks({ teamId }),
    staleTime: Infinity,
  })

  const createMutation = useMutation({
    mutationFn: ({ task }: CreateTaskParams) => createTask({ task }),
    onMutate: async ({ task }) => {
      const previousData = data
      const newTask = { id: -1, ...task };
      
      queryClient.setQueryData(queryKey, () => {
        if (!data) return data;
        return { tasks: [...data.tasks, newTask] };
      });
      
      return { previousData };
    },
    onSuccess: ({ task }) => {
      queryClient.setQueryData(queryKey, () => {
        if (!data) return data;
        return {
          columns: data.tasks.map(t => t.id === -1 ? task : t)
        };
      });
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([`columns-${teamId}`], context.previousData);
      }
    }
  });

  return {
    createMutation
  }
}
