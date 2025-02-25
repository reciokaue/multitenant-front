import { createColumn } from "@/api/column/create";
import { listColumns } from "@/api/column/list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddTaskButton } from "./add-task-button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ColumnsProps {
  teamId: number | string
}

export function Columns({ teamId }: ColumnsProps) {
  const [columnName, setColumnName] = useState("")
  const queryClient = useQueryClient()

  

  const { mutateAsync: addColumn } = useMutation({
    mutationFn: () => createColumn({
      column: {
        name: columnName,
        teamId: +teamId,
      }
    }),
    onMutate: () => {
      queryClient.setQueryData([`columns-${teamId}`], {
        columns: [
          ...data?.columns || [],
          {
            id: data?.columns?.length || 0 + 1,
            name: columnName,
            teamId,
          }
        ]
      })
    }
  })

  function handleAddColumn(e: any){
    e.preventDefault()

    if(columnName == ''){
      const input = document.getElementById("newColumnInput")
      input?.focus()
      return
    }
    addColumn()  
  }

  return (
    <div className='flex flex-col flex-1'>
      <div className="flex space-x-4 justify-between">
        <div className="flex space-x-2">
          {data?.columns.map((column) => (
            <Button variant='outline' key={column.id} className="w-48">
              {column.name}
            </Button>
          ))}

        </div>
        <form onSubmit={handleAddColumn} className="gap-2 flex">
          <Input
            id="newColumnInput"
            placeholder="nova coluna"
            onChange={e => setColumnName(e.target.value)}
            value={columnName}
            className="max-w-32"
            min={3}
          />
          <Button size="icon">
            <Plus/>
          </Button>
        </form>
      </div>
      <section className="flex space-x-2 pt-3 h-full flex-1">
        {data?.columns.map((column) => (
          <div key={`tasks-${column.id}`} className="w-48 p-2 space-y-2 bg-gray-100 rounded-md">
            <AddTaskButton columnId={column.id}/>
            {column.tasks.map((task) => (
              <Card key={task.id} className="p-2 gap-2">
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
                {task?.dueDate && <Badge>{format(task.dueDate, "dd/MM/yyyy")}</Badge>}
                {task?.category && <Badge>{task.category.label}</Badge>}
              </Card>
            ))}
            {/* {JSON.stringify(column.tasks)} */}
          </div>
        ))}
      </section>
    </div>
  );
};