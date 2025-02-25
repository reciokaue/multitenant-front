import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface AddTaskButtonProps {
  columnId: number
}

export function AddTaskButton({ columnId }: AddTaskButtonProps) {
  const [ _, setSearchParams ] = useSearchParams()

  function openAddTaskDrawer(){
    setSearchParams((url) => {
      url.set('add-task', String(columnId))
      return url
    })
  }

  return (
   <Button
      onClick={openAddTaskDrawer}
      size='icon'
    >
      <Plus/>
  </Button>
  );
};