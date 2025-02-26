import { createTask, CreateTaskProps } from "@/api/task/create";
import { listTasks } from "@/api/task/list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editTask, EditTaskProps } from "@/api/task/edit";

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

  if(!data)
    return

  const createMutation = useMutation({
    mutationFn: ({ task }: CreateTaskProps) => createTask({ task }),
    onMutate: async ({ task }) => {
      queryClient.setQueryData(queryKey, () => ({
        tasks: [...data.tasks, { id: -1, ...task }]
      }));
      return { previousData: data };
    },
    onSuccess: ({ task }) => {
      queryClient.setQueryData(queryKey, () => ({
        tasks: data.tasks.map(t => t.id === -1 ? task : t)
      }));
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData)
        queryClient.setQueryData(queryKey, context.previousData);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ task }: EditTaskProps) => editTask({ task }),
    onMutate: async ({ task }) => {
      queryClient.setQueryData(queryKey, () => ({
        tasks: data.tasks.map((t) => t.id !== task.id? t: task)
      }));
      return { previousData: data };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData)
        queryClient.setQueryData(queryKey, context.previousData);
    }
  })

  return {
    createMutation,
    updateMutation
  }
}
