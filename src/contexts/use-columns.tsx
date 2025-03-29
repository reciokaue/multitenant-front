import { createContext, ReactNode, useContext } from "react";
import { createColumn, CreateColumnProps } from "@/api/column/create";
import { listColumns, ListColumnsResponse } from "@/api/column/list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editColumn, EditColumnProps } from "@/api/column/edit";
import { deleteColumn } from "@/api/column/delete";
import { editColumnPosition } from "@/api/column/position";
import { useParams } from "react-router-dom";

interface ColumnsProviderProps {
  children: ReactNode;
}

interface ColumnsContextData {
  columns: ListColumnsResponse["columns"] | undefined;
  createColumn: (column: CreateColumnProps) => void;
  updateColumn: (column: EditColumnProps) => void;
  deleteColumn: (columnId: number | string) => void;
  changeColumnPosition: (data: any) => void;
  setColumns: (updater: (columns: ListColumnsResponse["columns"]) => ListColumnsResponse["columns"]) => void;
}

const ColumnsContext = createContext({} as ColumnsContextData);

export function ColumnsProvider({ children }: ColumnsProviderProps) {
  const { teamId } = useParams();
  const queryClient = useQueryClient();
  const queryKey = [`columns-${teamId}`];

  const query = useQuery({
    queryKey,
    queryFn: () => listColumns({ teamId: teamId || "" }),
    staleTime: Infinity,
    enabled: !!teamId,
  });

  const setColumns = (
    updater: (columns: ListColumnsResponse["columns"]) => ListColumnsResponse["columns"]
  ) => {
    queryClient.setQueryData(queryKey, (prev: ListColumnsResponse | undefined) => ({
      columns: prev ? updater(prev.columns) : [],
    }));
  };

  const createMutation = useMutation({
    mutationFn: ({ column }: CreateColumnProps) => createColumn({ column }),
    onMutate: async ({ column }) => {
      setColumns((prev) => [...prev, { id: -1, ...column }] as any);
      return { previousData: query.data };
    },
    onSuccess: ({ column }) => {
      setColumns((prev) => prev.map((c) => (c.id === -1 ? column : c)));
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) queryClient.setQueryData(queryKey, context.previousData);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ column }: EditColumnProps) => editColumn({ column }),
  });

  const deleteMutation = useMutation({
    mutationFn: (columnId: number | string) => deleteColumn({ columnId }),
    onMutate: (columnId) => {
      setColumns((prev) => prev.filter((c) => c.id !== columnId));
    },
  });

  const positionMutation = useMutation({
    mutationFn: editColumnPosition,
  });

  return (
    <ColumnsContext.Provider
      value={{
        columns: query.data?.columns,
        createColumn: createMutation.mutate,
        updateColumn: updateMutation.mutate,
        deleteColumn: deleteMutation.mutate,
        changeColumnPosition: positionMutation.mutate,
        setColumns,
      }}
    >
      {children}
    </ColumnsContext.Provider>
  );
}

export const useColumns = () => useContext(ColumnsContext);
