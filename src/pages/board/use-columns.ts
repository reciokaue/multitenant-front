import { createColumn, CreateColumnProps } from "@/api/column/create";
import { listColumns } from "@/api/column/list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editColumn, EditColumnProps } from "@/api/column/edit";

interface UseColumnProps {
  teamId: number | string
}

export function useColumn({ teamId }: UseColumnProps){
  const queryClient = useQueryClient();
  const queryKey = [`columns-${teamId}`]

  const { data } = useQuery({
    queryKey,
    queryFn: () => listColumns({ teamId }),
    staleTime: Infinity,
  })

  if(!data)
    return

  const createMutation = useMutation({
    mutationFn: ({ column }: CreateColumnProps) => createColumn({ column }),
    onMutate: async ({ column }) => {
      queryClient.setQueryData(queryKey, () => ({
        columns: [...data.columns, { id: -1, ...column }]
      }));
      return { previousData: data };
    },
    onSuccess: ({ column }) => {
      queryClient.setQueryData(queryKey, () => ({
        columns: data.columns.map(t => t.id === -1 ? column : t)
      }));
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData)
        queryClient.setQueryData(queryKey, context.previousData);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ column }: EditColumnProps) => editColumn({ column }),
    onMutate: async ({ column }) => {
      queryClient.setQueryData(queryKey, () => ({
        columns: data.columns.map((t) => t.id !== column.id? t: column)
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
