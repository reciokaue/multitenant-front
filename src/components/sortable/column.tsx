import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { GripHorizontal, GripVertical } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import type { Column } from "@/api/column/list";
import { SortableTask } from "./task";
import { Task } from "@/api/task/list";
import { AddTask } from "./add-task";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { useColumns } from "@/hooks/use-columns";

const variants = cva(
  "border rounded-md w-[250px] h-[80vh] flex-shrink-0 snap-center bg-primary-foreground",
  {
    variants: {
      dragging: {
        default: "border-2",
        over: "opacity-30 bg-gray-300",
        overlay: "ring-2 ring-primary rotate-2",
      },
    },
  }
);

interface SortableColumnProps {
  column: Column;
  tasks: Task[]
  isOverlay?: boolean;
}

export function SortableColumn({column, tasks, isOverlay }: SortableColumnProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,

  } = useSortable({
    id: `c-${column.id}`,
    data: {
      type: "column",
      ...column
    }
  } as any);
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { deleteMutation } = useColumns()
  const taskIds = tasks?.map(t => `t-${t.id}`)
  
  return (
    <div ref={setNodeRef} style={style} 
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      {!isDragging && <>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div className="flex justify-between group p-4 border-b"  {...attributes} {...listeners}>
              {column.name} 
              <GripHorizontal />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Editar Coluna</ContextMenuItem>
            <ContextMenuItem
              variant="destructive"
              onClick={() => deleteMutation.mutateAsync(column.id)}
            >
                Deletar Coluna
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        <SortableContext items={taskIds}>
          <div className="space-y-2 py-4 px-2 flex-1">
            {tasks?.map((task: Task) => (
              <SortableTask task={task} key={`t-${task.id}`}/>
            ))}
            <AddTask
              columnId={column.id}
              index={tasks?.length || 0}
              teamId={column.teamId}
            />
          </div>
        </SortableContext>
      </>}
    </div>
  );
}

