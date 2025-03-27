import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { Task } from "@/api/task/list";
import { useSearchParams } from "react-router-dom";
import { useTeam } from "@/hooks/use-team";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { format } from "date-fns";

const variants = cva("group p-2 flex flex-col gap-2 border cursor-pointer focus: rounded-md group hover:border-primary group bg-background", {
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
  const { hasPermission } = useTeam()

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
    },
    
  } as any);
  
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  function openEditTask() {
    setSearchParams((url) => {
      url.set('task', String(task.id));
      return url;
    });
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(hasPermission('task:move') && listeners)}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
      onClick={openEditTask}
    >
      <span>{task.title}</span>
      
      <footer className="flex gap-2">
        <Badge show={!!task.category} className='border-0 border-l-8 pl-1.5' style={{borderColor: task.category?.colorHex || ''}} variant='secondary'>
          {task.category?.label}
        </Badge>
        <Badge show={!!task.dueDate} variant='secondary'>
          {task.dueDate && format(new Date(task.dueDate), "dd/MM/yyyy")}
        </Badge>
        {/* <Checkbox className="ml-auto group-hover:visible invisible"/> */}
      </footer>
    </div>
  );
}
