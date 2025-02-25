import { Column, listColumnResponse } from "@/api/column/list";
import { createTask, CreateTaskParams } from "@/api/task/create-task";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseTaskProps {
  teamId: number | string
}

export function useTask({ teamId }: UseTaskProps){
  const queryClient = useQueryClient();
  const columnsQueryKey = [`columns-${teamId}`]
  const previousData = queryClient.getQueryData(columnsQueryKey) as listColumnResponse

  const mutation = useMutation({
    mutationFn: ({ task }: CreateTaskParams) => createTask({ task }),
    onMutate: async ({ task }) => {
      const newTask = { id: -1, ...task};
      
      queryClient.setQueryData(columnsQueryKey, () => {
        if (!previousData) return previousData;
        return { columns: [
          ...previousData.columns.map((col) => {
            if(col.id === newTask.columnId)
              return {...col, tasks: [...col.tasks, newTask]}
            else return col
          })
        ] };
      });
      
      return { previousData };
    },
    onSuccess: ({ task }) => {
      queryClient.setQueryData(columnsQueryKey, () => {
        if (!previousData) return previousData;
        return { columns: [
          ...previousData.columns.map((col) => {
            if(col.id === task.columnId)
              return {...col, tasks: [...col.tasks, task]}
            else return col
          })
        ] };
      });
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([`columns-${teamId}`], context.previousData);
      }
    }
  });

  return {
    ...mutation
  }
}
