import { Column, listColumnResponse } from "@/api/column/list";
import { createTask, CreateTaskParams } from "@/api/task/create-task";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddTask(teamId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ task }: CreateTaskParams) => createTask({ task }),
    onMutate: async ({ task }) => {
      // await queryClient.cancelQueries(`columns-${task.teamId}`]);
      
      const previousData = queryClient.getQueryData([`columns-${task.teamId}`]) as listColumnResponse;
      
      queryClient.setQueryData([`columns-${task.teamId}`], (old: listColumnResponse) => {
        if (!old) return old;
        
        return {
          columns: old.columns.map(column => 
            column.id === task.columnId
              ? { ...column, tasks: [...column.tasks, { ...task, id: -1 }] }
              : column
          )
        };
      });

      return { previousData };
    },
    onSuccess: (newTask, { task }) => {
      queryClient.setQueryData([`columns-${task.teamId}`], (old: listColumnResponse) => {
        if (!old) return old;
        
        return {
          columns: old.columns.map(column => 
            column.id === task.columnId
              ? { 
                  ...column, 
                  tasks: column.tasks.map(t => t.id === -1 ? newTask : t) 
                }
              : column
          )
        };
      });
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([`columns-${_variables.task.teamId}`], context.previousData);
      }
    }
  });
}
