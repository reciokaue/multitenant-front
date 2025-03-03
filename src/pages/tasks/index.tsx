import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

export function Tasks() {
  const [tasks, setTasks] = useState<any[]>([{id: 5,title: "E",index: 1,columnId: 1},{id: 2,title: "B",index: 2,columnId: 1},{id: 1,title: "A",index: 3,columnId: 1},{id: 3,title: "C",index: 5,columnId: 1},{id: 4,title: "D",index: 5,columnId: 1}])
  const [columns, setColumns] = useState<any[]>([{id: 1,name: "Test Column",index: 0,teamId: 3},{id: 7,name: "teste",index: 1,teamId: 3}, {id: 10,name: "Extra",index: 2,teamId: 3}])
  const [active, setActive] = useState<any | null>()

  const sensors = useSensors(
    useSensor(PointerSensor),
  )
  
  return (
    <div className="flex flex-col flex-1">
      <DndContext
        sensors={sensors}
        onDragStart={({ active }) => {
          if(!active)
            return
          console.log("start")
          setActive(active.data.current)
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

              // update task on database

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
        <SortableContext items={columns.map(c => `c-${c.id}`)} >
          <div className="flex gap-1">
            {columns.map(col => {
              const coltasks = tasks.filter(t => t.columnId === col.id)

              return (
                <SortableCol col={col} tasks={coltasks} key={`c-${col.id}`} />
              )
            })}
          </div>
        </SortableContext>


        
      {"document" in window &&
        createPortal(
          <DragOverlay>
            {active?.type === 'column' && (
              <SortableContext items={columns.map(c => `c-${c.id}`)} >
                <div className="ring-2 ring-primary">
                  <SortableCol
                    col={active}
                    tasks={tasks.filter(t => t.columnId === active.id)}
                    key={`c-${active.id}`}
                  />
                </div>
              </SortableContext>
            )}
            {active?.type === 'task' && 
              <div className="ring-2 ring-primary">
                <SortableTask
                  task={active}
                  prefix={"t"}
                  key={`t-${active.id}`}
                />
              </div>
            }
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
};

function SortableCol({col, tasks}: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: `c-${col.id}`,
    data: {
      type: "column",
      ...col
    }
  } as any);
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} 
        className="p-2 border rounded-md w-[200px]"
    >
      <div className="flex justify-between">
        {col.name} {col.id} {col.index} <GripVertical {...attributes} {...listeners} />
      </div>

      <SortableContext items={tasks.map((t: any) => `t-${t.id}`)}>
        <div className="space-y-2 mt-4">
          {tasks.map((t: any, index: number) => (
            <SortableTask task={t} index={index} prefix={"t"} key={`t-${t.id}`}/>
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableTask({ task, index }: any) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} 
      className={"p-2 border rounded-md"}
    >
      {task.title} {task.id} {task.columnId} {task.index}
    </div>
  );
}
