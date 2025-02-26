import { createColumn, CreateColumnProps } from "@/api/column/create";
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
    mutationFn: ({ column }: CreateColumnProps) => createColumn({ column }),
    onMutate: async ({ column }) => {
      const previousData = data
      const newColumn = { id: -1, ...column };
      
      queryClient.setQueryData(queryKey, () => {
        if (!data) return data;
        return { columns: [...data.columns, newColumn] };
      });
      
      return { previousData };
    },
    onSuccess: (newColumn) => {
      queryClient.setQueryData(queryKey, () => {
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