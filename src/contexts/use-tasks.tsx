import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { createTask, CreateTaskProps } from "@/api/task/create";
import { listTasks, ListTasksResponse } from "@/api/task/list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editTask, EditTaskProps } from "@/api/task/edit";
import { editTaskPosition } from "@/api/task/position";
import { useParams, useSearchParams } from "react-router-dom";
import { addDays, addMonths, addWeeks, isAfter, isBefore } from "date-fns";

interface TasksProviderProps {
  children: ReactNode;
}

interface TasksContextData {
  tasks: ListTasksResponse["tasks"];
  createTask: (task: CreateTaskProps) => void;
  updateTask: (task: EditTaskProps) => void;
  changeTaskPosition: (data: any) => void;
  setTasks: (updater: (tasks: ListTasksResponse["tasks"]) => ListTasksResponse["tasks"]) => void;
}

const TasksContext = createContext({} as TasksContextData);

export function TasksProvider({ children }: TasksProviderProps) {
  const { teamId } = useParams();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [filteredTasks, setFilteredTasks] = useState<ListTasksResponse["tasks"]>([]);

  const search = searchParams.get("search") || "";
  const completed = searchParams.get("completed") === "true";
  const overdue = searchParams.get("overdue") === "true";
  const noDue = searchParams.get("noDue") === "true";
  const dueIn = searchParams.get("dueIn");
  const categories = searchParams.getAll("categories").map(Number);
  const archived = searchParams.get("archived") === "true";

  const queryKey = [`tasks-${teamId}`];
  const query = useQuery({
    queryKey,
    queryFn: () => listTasks({ teamId: teamId || "" }),
    staleTime: Infinity,
    enabled: !!teamId,
  });

  function filterTasks() {
    if (!query.data) return;

    const now = new Date();
    const filtered = query.data.tasks.filter((task) => {
      const matchesSearch = !search ||
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task?.description?.toLowerCase().includes(search.toLowerCase());

      const matchesCompleted = searchParams.has("completed") ? task.completed === completed : true;
      const matchesArchived = searchParams.has("archived") ? task.archived === archived : true;

      const matchesOverdue = overdue ? task.dueDate && isBefore(new Date(task.dueDate), now): true;
      const matchesNoDue = noDue ? task.dueDate === null : true;
      const dueInDate = dueIn && {
        day: addDays(now, 1),
        week: addWeeks(now, 1),
        month: addMonths(now, 1),
      }[dueIn || '']

      const matchesDueIn = dueInDate
      ? task.dueDate && 
        isBefore(new Date(task.dueDate), dueInDate)&&
        isAfter(new Date(task.dueDate), now)
      : true;
      

      const matchesCategories =
        categories.length > 0 ? categories.includes(task.categoryId || 0) : true;

      return (
        matchesSearch &&
        matchesCompleted &&
        matchesArchived &&
        matchesOverdue &&
        matchesNoDue &&
        matchesDueIn &&
        matchesCategories
        );
    });
    setFilteredTasks(filtered)
  }

  useEffect(() => {
    filterTasks()
  }, [query.data, searchParams]);

  const setTasks = (updater: (tasks: ListTasksResponse["tasks"]) => ListTasksResponse["tasks"]) => {
    queryClient.setQueryData(queryKey, (prev: ListTasksResponse | undefined) => ({
      tasks: prev ? updater(prev.tasks) : [],
    }));
  };

  const createMutation = useMutation({
    mutationFn: ({ task }: CreateTaskProps) => createTask({ task }),
    onMutate: async ({ task }) => {
      setTasks((prev) => [...prev, { id: -1, ...task }] as any);
      return { previousData: query.data };
    },
    onSuccess: ({ task }) => {
      setTasks((prev) => prev.map((t) => (t.id === -1 ? task : t)));
      filterTasks()
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) queryClient.setQueryData(queryKey, context.previousData);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ task }: EditTaskProps) => editTask({ task }),
    onMutate: ({ task }) => {
      const prev = queryClient.getQueryData([`task-${task.id}`]);
      queryClient.setQueryData([`task-${task.id}`], () => ({ task }));
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
      return { previousData: prev };
    },
    onSuccess: () => {
      filterTasks()
    },
    onError: (_err, _variables, context: any) => {
      const task = context?.previousData;
      if (!task) return;

      queryClient.setQueryData([`task-${task.id}`], context.previousData);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    },
  });

  const positionMutation = useMutation({
    mutationFn: editTaskPosition,
  });

  return (
    <TasksContext.Provider
      value={{
        tasks: filteredTasks,
        createTask: createMutation.mutate,
        updateTask: updateMutation.mutate,
        changeTaskPosition: positionMutation.mutate,
        setTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => useContext(TasksContext);
