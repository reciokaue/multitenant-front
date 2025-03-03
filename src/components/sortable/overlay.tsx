import { DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { Task } from "@/api/task/list";
import { SortableColumn } from "./column";
import { SortableTask } from "./task";
import { Column } from "@/api/column/list";
import { SortableContext } from "@dnd-kit/sortable";
import { useTasks } from "@/hooks/use-task";

interface OverlayProps {
  active: ActiveItem | null 
}

export interface ActiveItem extends Task, Column {
  type: "task" | "column"
}

export function Overlay({ active }: OverlayProps) {
  const { tasks } = useTasks()

  return (
    <>
      {"document" in window &&
        createPortal(
          <DragOverlay>
            {active?.type === 'column' && tasks && (
              <SortableContext items={[`c-${active.id}`]} >
                <SortableColumn
                  column={active}
                  tasks={tasks?.filter(
                    (task) => task.columnId === active.id
                  )}
                />
              </SortableContext>
            )}
            {active?.type === 'task' && 
              <SortableTask
                task={active}
                isOverlay
              />
            }
          </DragOverlay>,
          document.body
        )}  
    </>
  );
};