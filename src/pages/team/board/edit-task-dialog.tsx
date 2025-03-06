import { getTask } from "@/api/task/get";
import { CategorySelector } from "@/components/category-selector";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTasks } from "@/hooks/use-task";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export function EditTaskDialog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { updateMutation } = useTasks();
  
  const taskId = searchParams.get("task");
  const isOpen = !!taskId;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isDirty },
  } = useForm({});

  const { data: task } = useQuery({
    queryKey: [`task-${taskId}`],
    queryFn: async () => {
      const { task } = await getTask({ taskId: taskId || "" });
      reset(task, { keepDirty: false })
      return task;
    },
    enabled: isOpen,
  });

  async function handleSave(data: any) {
    if (task && isDirty) {
      reset(data, { keepDirty: false })

      await updateMutation.mutateAsync({
        task: {
          ...task,
          title: data.title,
          description: data.description,
          categoryId: data.category?.id,
          dueDate: data.dueDate ? data.dueDate : undefined,
        },
      });
    }
  }

  function closeDialog() {
    if (isDirty) {
      handleSubmit(handleSave)();
    }
    setSearchParams((url) => {
      url.delete("task");
      return url;
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      {task ? (
        <DialogContent>
          <DialogTitle>Tarefa</DialogTitle>
          <form className="flex gap-2 flex-col" onSubmit={handleSubmit(handleSave)}>
            <Label>Título</Label>
            <Input placeholder="Nome da tarefa" {...register("title")} />
            <Label>Descrição</Label>
            <Textarea placeholder="Descrição" className="h-24 resize-none" {...register("description")} />
            <section className="flex gap-3">
              <DatePicker
                setDate={(date) => setValue("dueDate", date, {shouldDirty: true})}
                date={watch("dueDate")}
              />
              <CategorySelector
                teamId={task.teamId}
                setCategory={(cat) => setValue("category", cat, {shouldDirty: true})}
                category={watch("category")}
              />
            </section>
          </form>
        </DialogContent>
      ) : (
        <DialogContent>
          <Loader2 className="animate-spin" />
        </DialogContent>
      )}
    </Dialog>
  );
}
