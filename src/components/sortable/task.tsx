import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { Task } from "@/api/task/list";
import { useSearchParams } from "react-router-dom";

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
  const [_, setSearchParams] = useSearchParams();
  const [isDraggingStarted, setIsDraggingStarted] = useState(false);
  let dragTimeout: NodeJS.Timeout;

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

  function openEditTask() {
    if (!isDraggingStarted) {
      setSearchParams((url) => {
        url.set('task', String(task.id));
        return url;
      });
    }
  }

  function handlePointerDown() {
    dragTimeout = setTimeout(() => {
      setIsDraggingStarted(true);
    }, 150); // Pequeno delay para distinguir entre clique e arrasto
  }

  function handlePointerUp() {
    clearTimeout(dragTimeout);
    setIsDraggingStarted(false);
  }
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
      // onPointerDown={handlePointerDown}
      // onPointerUp={handlePointerUp}
      onClick={openEditTask}
    >
      {task.title}
      {task.category?.label}
    </div>
  );
}
