import { createTask, CreateTaskProps } from "@/api/task/create";
import { listTasks, ListTasksResponse } from "@/api/task/list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editTask, EditTaskProps } from "@/api/task/edit";
import { useParams } from "react-router-dom";
import { editTaskPosition } from "@/api/task/position";

export function useTasks(){
  const { teamId } = useParams();
  const queryClient = useQueryClient();
  const queryKey = [`tasks-${teamId}`]

  const query = useQuery({
    queryKey,
    queryFn: () => listTasks({ teamId: teamId || '' }),
    staleTime: Infinity,
    enabled: teamId !== undefined
  })
  const { data } = query

  const setTasks = (updater: (tasks: ListTasksResponse["tasks"]) => ListTasksResponse["tasks"]) => {
    queryClient.setQueryData(queryKey, (prev: ListTasksResponse | undefined) => ({
      tasks: prev ? updater(prev.tasks) : [],
    }));
  };

  const createMutation = useMutation({
    mutationFn: ({ task }: CreateTaskProps) => createTask({ task }),
    onMutate: async ({ task }) => {
      setTasks((prev) => [...prev, { id: -1, ...task }] as any);
      return { previousData: data };
    },
    onSuccess: ({ task }) => {
      setTasks((prev) => prev.map(t => t.id === -1 ? task : t));
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData)
        queryClient.setQueryData(queryKey, context.previousData);
    }
  });
  const updateMutation = useMutation({
    mutationFn: ({ task }: EditTaskProps) => editTask({ task }),
    onMutate: ({ task }) => {
      const prev = queryClient.getQueryData([`task-${task.id}`])
      queryClient.setQueryData([`task-${task.id}`], () => ({ task }))
      setTasks((prev) => prev.map(t => t.id === task.id ? task : t));
      return { previousData: prev };
    },
    onError: (_err, _variables, context: any) => {
      const task = context?.previousData
      if (!task) return

      queryClient.setQueryData([`task-${task.id}`], context.previousData);
      setTasks((prev) => prev.map(t => t.id === task.id ? task : t));
    }
  })
  const positionMutation = useMutation({
    mutationFn: ({ task }: EditTaskProps) => editTaskPosition({ task }),
  })

  return {
    ...query,
    ...query.data,
    createMutation,
    updateMutation,
    positionMutation,
    setTasks
  }
}
