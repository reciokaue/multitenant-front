import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { Task } from "@/api/task/list";

const variants = cva("p-2 border rounded-md group hover:border-primary group bg-background", {
  variants: {
    dragging: {
      over: "opacity-30",
      overlay: "ring-2 ring-primary rotate-2",
    },
  },
});

interface SortableTaskProps {
  task: Task;
  isOverlay?: boolean;
}

export function SortableTask({ task, isOverlay }: SortableTaskProps) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: `t-${task.id}`,
    data: {
      type: 'task',
      ...task
    }
  } as any);
  
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} 
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      {task.title}
      {task.category?.label}
    </div>
  );
}
