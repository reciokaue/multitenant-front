import { ColumnSkeleton, SortableColumn } from "@/components/sortable/column";
import { ActiveItem, Overlay } from "@/components/sortable/overlay";
import { ScrollContainer } from "@/components/sortable/scroll";
import { useColumns } from "@/hooks/use-columns";
import { useTasks } from "@/hooks/use-task";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import { AddColumn } from "./add-column";
import { EditTaskDialog } from "./edit-task-dialog";
import { HasPermission } from "@/components/hasPermission";
import { Skeleton } from "@/components/ui/skeleton";

export function Board() {
  const [active, setActive] = useState<ActiveItem | null>(null)

  const { columns, setColumns, positionMutation: columnPosition, isLoading: columnLoading } = useColumns()
  const { tasks, setTasks, positionMutation: taskPosition, isLoading: taskLoading } = useTasks()

  const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: {delay: 100, tolerance: 150}}),
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

      if (activeData?.type == 'task' && overData) {
        setTasks((tasks) => {
          // column order
          const activeColumnTasks = tasks.filter(t => t.columnId === activeData.columnId)
          const overColumnTasks = overData.type === 'column'?
            tasks.filter(t => t.columnId === overData.id):
            tasks.filter(t => t.columnId === overColumnId)
            
          const activeColumnIndex = activeColumnTasks.findIndex(t => t.id === activeData.id)
          const overColumnIndex = overData.type === 'column'?
            overColumnTasks.length:
            overColumnTasks.findIndex(t => t.id === overData.id)
            
          // list order
          const activeListIndex = tasks.findIndex(t => t.id === activeData.id)
          const overListIndex = overData.type === 'column'?
          tasks.map(t => t.columnId).lastIndexOf(overData.id) + 1:
          tasks.findIndex(t => t.id === overData.id)
          
          const sameColumn = activeData.columnId === overData.columnId
          const overColumnId = overData.columnId || overData.id
          if(!sameColumn)
            tasks[activeListIndex].columnId = overColumnId
          
          taskPosition.mutateAsync({
            activeIndex: activeColumnIndex,
            overIndex: overColumnIndex,
            activeColumnId: activeData.columnId,
            overColumnId: overData?.columnId || overData.id,
            taskId: activeData.id,
          })

          return arrayMove(tasks, activeListIndex, overListIndex);
        })
      }
      if(activeData?.type == 'column'){
        setColumns((columns) => {
          const activeIndex = columns.findIndex((col) => col.id === activeData.id);
          const overIndex = columns.findIndex((col) => col.id === overData?.id);
          const activeColumn = columns[activeIndex];

          activeColumn.index = overData?.sortable.index
          columnPosition.mutateAsync({
            activeIndex: activeData?.sortable.index,
            overIndex: overData?.sortable.index,
            columnId: activeData.id
          })

          return arrayMove(columns, activeIndex, overIndex);
        });
      }
      setActive(null)
    }}
   >
    <ScrollContainer>
      {columns && columnsIds &&
        <SortableContext items={columnsIds} >
          <div className="flex gap-2">
            {tasks && !taskLoading?
              columns?.map(col => (
                <SortableColumn
                  column={col}
                  key={`c-${col.id}`}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              )):
              <>
                <ColumnSkeleton/>
                <ColumnSkeleton/>
                <ColumnSkeleton/>
              </>
            }
            <HasPermission action="column:create">
              <AddColumn index={columns.length || 0}/>
            </HasPermission>
          </div>
        </SortableContext>
      }
      {columnLoading && [0,1,2].map((i) => (
        <Skeleton key={i} className="border rounded-md w-[250px] h-[80vh] flex-shrink-0 snap-center"/>
      ))}
    </ScrollContainer>
    
    <Overlay active={active}/>
    <EditTaskDialog/>
   </DndContext>
  );
};