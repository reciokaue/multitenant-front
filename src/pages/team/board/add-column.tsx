import { Check, Plus, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState, useRef } from "react";
import { Input } from "../../../components/ui/input";
import { useColumns } from "@/contexts/use-columns";
import { useParams } from "react-router-dom";

interface AddColumnProps {
  index: number
}

export function AddColumn({ index }: AddColumnProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null);
  const { createMutation } = useColumns()
  const { teamId } = useParams();

  function startAddNewColumn() {
    setIsAdding(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }
  function closeAdding(){
    setIsAdding(false)
    setName("")
  }

  function handleAddNewColumn(e: any){
    console.log("AAAAAAAA") 
    e.preventDefault()
    if(name === '')
      return

    createMutation.mutateAsync({
      column: { name, index, teamId }
    })
    
    // setTimeout(() => inputRef.current?.focus(), 0)
    setIsAdding(false)
    setName("")
  }

  if (!isAdding)
    return (
      <Button
        onClick={startAddNewColumn}
        className="opacity-40 flex items-center justify-center space-x-2 w-[232px]"
        variant="secondary"
      >
        <Plus className="w-4 h-4" />
      </Button>
    );

  return (
    <form onSubmit={(e) => handleAddNewColumn(e)} className="space-y-2 flex flex-col items-end pt-2 w-[232px]">
      <Input
        ref={inputRef}
        placeholder="Adicione um título"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
      />
      <input type="submit" hidden />
      <footer className="flex space-x-2">
        <Button onClick={closeAdding} size="icon" variant="ghost">
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </Button>
        <Button type="submit" size="icon" className="bg-blue-500 hover:bg-blue-600 text-white">
          <Check className="w-5 h-5" />
        </Button>
      </footer>
    </form>
  );
}
