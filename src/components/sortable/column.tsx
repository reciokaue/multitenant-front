import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import type { Column } from "@/api/column/list";
import { SortableTask } from "./task";
import { Task } from "@/api/task/list";

const variants = cva(
  "p-2 border rounded-md w-[200px]",
  {
    variants: {
      dragging: {
        default: "border-2 border-transparent",
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
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

  const taskIds = tasks?.map(t => `t-${t.id}`)
  
  return (
    <div ref={setNodeRef} style={style} 
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <div className="flex justify-between group">
        {column.name} {column.id} {column.index} 
        
        <GripVertical {...attributes} {...listeners} className="group-hover:visible invisible"/>
      </div>

      <SortableContext items={taskIds}>
        <div className="space-y-2 mt-4">
          {tasks?.map((task: Task) => (
            <SortableTask task={task}/>
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
