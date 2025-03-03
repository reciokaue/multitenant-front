import { createColumn, CreateColumnProps } from "@/api/column/create";
import { listColumns, ListColumnsResponse } from "@/api/column/list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editColumn, EditColumnProps } from "@/api/column/edit";
import { useParams } from "react-router-dom";


export function useColumns(){
  const { teamId } = useParams();
  const queryClient = useQueryClient();
  const queryKey = [`columns-${teamId}`]

  const query = useQuery({
    queryKey,
    queryFn: () => listColumns({ teamId: teamId || '' }),
    staleTime: Infinity,
    enabled: teamId != undefined
  })
  const { data } = query

  const setColumns = (updater: (columns: ListColumnsResponse["columns"]) => ListColumnsResponse["columns"]) => {
    queryClient.setQueryData(queryKey, (prev: ListColumnsResponse | undefined) => ({
      columns: prev ? updater(prev.columns) : [],
    }));
  };

  const createMutation = useMutation({
    mutationFn: ({ column }: CreateColumnProps) => createColumn({ column }),
    onMutate: async ({ column }) => {
      setColumns((prev) => [...prev, { id: -1, ...column }]);
      return { previousData: data };
    },
    onSuccess: ({ column }) => {
      setColumns((prev) => prev.map(t => t.id === -1 ? column : t));
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData)
        queryClient.setQueryData(queryKey, context.previousData);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ column }: EditColumnProps) => editColumn({ column }),
  })

  return {
    ...query,
    columns: data?.columns,
    createMutation,
    updateMutation,
    setColumns
  }
}
