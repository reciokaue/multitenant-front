import { SortableColumn } from "@/components/sortable/column";
import { ActiveItem, Overlay } from "@/components/sortable/overlay";
import { useColumns } from "@/hooks/use-columns";
import { useTasks } from "@/hooks/use-task";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import { ScrollContainer } from "./scroll";
import { AddColumn } from "./add-column";

export function Board() {
  const [active, setActive] = useState<ActiveItem | null>(null)

  const { columns, setColumns } = useColumns()
  const { tasks, setTasks, positionMutation } = useTasks()

  const sensors = useSensors(
    useSensor(PointerSensor),
  )

  const columnsIds = columns?.map(c => `c-${c.id}`)

  return (
   <DndContext
    sensors={sensors}
    onDragStart={({ active }) => {
      if(!active) return
      setActive(active.data.current as ActiveItem)
    }}
    onDragEnd={({ active, over }) => {
      if (!over) return;
      if (active.id === over.id) return;

      const activeData = active.data.current
      const overData = over.data.current

      if (activeData?.type == 'task') {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t.id === activeData.id);
          const overIndex = tasks.findIndex((t) => t.id === overData?.id);

          const activeTask = tasks[activeIndex];

          activeTask.columnId = overData?.columnId || overData?.id
          if(overData?.type == 'column')
            activeTask.index = 0
          else
            activeTask.index = overData?.sortable.index + 1

          positionMutation.mutateAsync({task: activeTask})
          return arrayMove(tasks, activeIndex, overIndex);
        })
      }
      if(activeData?.type == 'column'){
        setColumns((columns) => {
          const activeIndex = columns.findIndex((col) => col.id === activeData.id);
          const overIndex = columns.findIndex((col) => col.id === overData?.id);
          const activeColumn = columns[activeIndex];

          activeColumn.index = overData?.sortable.index
          // update column on database
    
          return arrayMove(columns, activeIndex, overIndex);
        });
      }
      setActive(null)
    }}
   >
    {columns && columnsIds &&
      <ScrollContainer>
        <SortableContext items={columnsIds} >
          <div className="flex gap-2">
            {tasks && columns?.map(col => (
              <SortableColumn
                column={col}
                key={`c-${col.id}`}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
            <AddColumn index={columns.length || 0}/>
          </div>
        </SortableContext>
      </ScrollContainer>
    }
    <Overlay active={active}/>
   </DndContext>
  );
};