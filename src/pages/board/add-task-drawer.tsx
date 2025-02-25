import { Category } from "@/api/category/list";
import { listColumnResponse } from "@/api/column/list";
import { createTask, CreateTaskParams } from "@/api/task/create-task";
import { CategorySelector } from "@/components/category-selector";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface AddTaskProps {
  teamId: number | string
}

export function AddTaskDrawer({teamId}: AddTaskProps) {
  const [ searchParams, setSearchParams ] = useSearchParams()

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string | null>(null)
  const [category, setCategory] = useState<Category | undefined>()
  const [dueDate, setDueDate] = useState<Date | undefined>()

  const queryClient = useQueryClient()
  const columnId = searchParams.get("add-task")
  const isOpen = !!columnId

  function closeDrawer(){
    setSearchParams((url) => {
      url.delete('add-task')
      return url
    })
  }

  const { mutateAsync: addTask } = useMutation({
    mutationFn: ({ task }: CreateTaskParams) => createTask({ task }),
    onMutate: ({ task }) => {
      let data = queryClient.getQueryData([`columns-${teamId}`]) as listColumnResponse
      data.columns[0].tasks.push({
        id: data.columns[0].tasks.length + 1,
        ...task
      })
      console.log(data)
      queryClient.setQueryData([`columns-${teamId}`], {
        columns: data.columns.map((column) => {
          if(column.id != Number(columnId))
            return column

          return {
            ...column,
            tasks: [
              ...column.tasks,
              { 
                id: column.tasks.length + 1,
                ...task
              }
            ]
          }
        })
      })
    }
  })

  function onAddTask(e: any){
    e.preventDefault()
    const task = {
      title,
      description,
      categoryId: category?.id,
      dueDate,
      teamId: +teamId,
      columnId: Number(columnId)
    }
    addTask({ task })
    closeDrawer()
  }

  return (
    <Drawer open={isOpen} onOpenChange={closeDrawer}>
      <DrawerContent className="max-w-[800px] mx-auto mt-0" >
        <DrawerHeader>
          <DrawerTitle>Nova tarefa</DrawerTitle>
          <form className="flex gap-2 flex-col">
              <Input
                placeholder="Nome da tarefa"
                value={title || ''}
                onChange={e => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Descrição"
                className="h-24 resize-none"
                value={description || ''}
                onChange={e => setDescription(e.target.value)}
              />
            <section className="flex gap-3">
              <DatePicker
                setDate={setDueDate}
                date={dueDate}
              />
              <CategorySelector
                teamId={teamId}
                setCategory={setCategory}
                category={category}
              />
            </section>
            <footer className="flex space-x-2 flex-row justify-end pt-0">
              <DrawerClose onClick={closeDrawer} asChild>
                <Button size='lg' variant="outline">Cancelar</Button>
              </DrawerClose>
              <Button onClick={onAddTask} size='lg'>Adicionar</Button>
            </footer>
          </form>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};