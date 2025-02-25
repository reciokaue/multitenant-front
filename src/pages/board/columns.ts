import { createColumn } from "@/api/column/create";
import { listColumns } from "@/api/column/list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UseColumnsProps {
  teamId: number | string
}

export function useColumns({ teamId }: UseColumnsProps){
  const queryClient = useQueryClient();
  const queryKey = [`columns-${teamId}`]

  const { data } = useQuery({
    queryKey,
    queryFn: () => listColumns({ teamId }),
    staleTime: Infinity,
  })

  const mutation = useMutation({
    mutationFn: ({ columnName }: { columnName: string }) => createColumn({
      column: { name: columnName, teamId: +teamId }
    }),
    onMutate: async ({ columnName }) => {
      const previousData = data
      const newColumn = { id: -1, name: columnName, teamId: +teamId, tasks: [] };
      
      queryClient.setQueryData([`columns-${teamId}`], () => {
        if (!data) return data;
        return { columns: [...data.columns, newColumn] };
      });
      
      return { previousData };
    },
    onSuccess: (newColumn) => {
      queryClient.setQueryData([`columns-${teamId}`], () => {
        if (!data) return data;
        
        return {
          columns: data.columns.map(col => col.id === -1 ? newColumn : col)
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
    columns: data?.columns,
    ...mutation
  }
}

// // mutations.ts
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createTask, createColumn } from '@/lib/api';
// import { listColumnResponse, CreateTaskParams } from '@/types';

// export function useAddTask(teamId: number) {

//   return useMutation({
//     mutationFn: ({ task }: CreateTaskParams) => createTask({ task }),
//     onMutate: async ({ task }) => {
//       await queryClient.cancelQueries([`columns-${task.teamId}`]);
      
//       const previousData = queryClient.getQueryData([`columns-${task.teamId}`]) as listColumnResponse;
      
//       queryClient.setQueryData([`columns-${task.teamId}`], old => {
//         if (!old) return old;
        
//         return {
//           columns: old.columns.map(column => 
//             column.id === task.columnId
//               ? { ...column, tasks: [...column.tasks, { ...task, id: Date.now() }] }
//               : column
//           )
//         };
//       });

//       return { previousData };
//     },
//     onSuccess: (newTask, { task }) => {
//       queryClient.setQueryData([`columns-${task.teamId}`], old => {
//         if (!old) return old;
        
//         return {
//           columns: old.columns.map(column => 
//             column.id === task.columnId
//               ? { 
//                   ...column, 
//                   tasks: column.tasks.map(t => t.id === task.id ? newTask : t) 
//                 }
//               : column
//           )
//         };
//       });
//     },
//     onError: (_err, _variables, context) => {
//       if (context?.previousData) {
//         queryClient.setQueryData([`columns-${_variables.task.teamId}`], context.previousData);
//       }
//     }
//   });
// }
