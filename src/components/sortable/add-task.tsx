import { Check, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useRef } from "react";
import { Input } from "../ui/input";
import { useTasks } from "@/hooks/use-task";

interface AddTaskProps {
  index: number
  columnId: number
  teamId: number
}

export function AddTask({ columnId, index, teamId }: AddTaskProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("")
  const inputRef = useRef<HTMLInputElement>(null);
  const { createMutation } = useTasks()

  function startAddNewTask() {
    setIsAdding(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function handleAddNewTask(){
    if(title === '')
      return

    createMutation.mutateAsync({
      task: {
        title: title,
        columnId, index, teamId
      }
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
    <div className="space-y-2 flex flex-col items-end pt-2 w-full">
      <Input
        ref={inputRef}
        placeholder="Adicione um título"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
      />
      <footer className="flex space-x-2">
        <Button onClick={() => setIsAdding(false)} size="icon" variant="ghost">
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </Button>
        <Button onClick={handleAddNewTask} size="icon" className="bg-blue-500 hover:bg-blue-600 text-white">
          <Check className="w-5 h-5" />
        </Button>
      </footer>
    </div>
  );
}
