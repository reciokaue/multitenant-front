import { Check, Plus, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState, useRef } from "react";
import { Input } from "../../../components/ui/input";
import { useTasks } from "@/contexts/use-tasks";

interface AddTaskProps {
  index: number
  columnId: number
  teamId: number
}

export function AddTask({ columnId, index, teamId }: AddTaskProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("")
  const inputRef = useRef<HTMLInputElement>(null);
  const { createTask } = useTasks()

  function startAddNewTask() {
    setIsAdding(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }
  function closeAddingTask(){
    setTitle("")
    setIsAdding(false)
  }

  function handleAddNewTask(e:any){
    e.preventDefault()
    if(title === '')
      return

    createTask({
      title: title,
      columnId, index, teamId
    })
    
    setIsAdding(true)
    setTimeout(() => inputRef.current?.focus(), 0)
    setTitle("")
  }

  if (!isAdding)
    return (
      <Button
        onClick={startAddNewTask}
        className="opacity-40 w-full flex items-center justify-center space-x-2"
        variant="secondary"
      >
        <Plus className="w-4 h-4" />
      </Button>
    );

  return (
    <form onSubmit={handleAddNewTask} className="space-y-2 flex flex-col items-end pt-2 w-full">
      <Input
        ref={inputRef}
        placeholder="Adicione um título"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
        onBlur={closeAddingTask}
      />
      <input type="submit" hidden />
      <footer className="flex space-x-2">
        <Button onClick={closeAddingTask} size="icon" variant="ghost">
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </Button>
        <Button size="icon" className="bg-blue-500 hover:bg-blue-600 text-white">
          <Check className="w-5 h-5" />
        </Button>
      </footer>
    </form>
  );
}
