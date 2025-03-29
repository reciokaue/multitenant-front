import { getTask } from "@/api/task/get";
import { CategorySelector } from "@/components/category-selector";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTasks } from "@/contexts/use-tasks";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTeam } from "@/contexts/use-team";
import { HasPermission } from "@/components/hasPermission";

export function EditTaskDialog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { updateTask } = useTasks();
  const { hasPermission } = useTeam()
  
  const taskId = searchParams.get("task");
  const isOpen = !!taskId;
  const canEdit = hasPermission("task:edit")

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

      updateTask({
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
            <Input placeholder="Nome da tarefa" {...register("title")} readOnly={!canEdit}/>
            <Label>Descrição</Label>
            <Textarea placeholder="Descrição" className="h-24 resize-none" {...register("description")} readOnly={!canEdit} />
            <section className="flex gap-3">
              <DatePicker
                setDate={(date) => setValue("dueDate", date, {shouldDirty: true})}
                date={watch("dueDate")}
                disabled={!canEdit}
              />
              <CategorySelector
                teamId={task.teamId}
                setCategory={(cat) => setValue("category", cat, {shouldDirty: true})}
                category={watch("category")}
                disabled={!canEdit}
              />
            </section>

            <HasPermission action="task:delete">
              {/* TODO delete task */}
              <button className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-12 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                <Trash2/>
              </button>
            </HasPermission>
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
