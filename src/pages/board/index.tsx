import { Board } from "@/components/sortable/board";
import { Header } from "./header";
import { EditTaskDialog } from "./edit-task-dialog";

export function SelectedTeam() {

  return (
    <div className='flex flex-col flex-1 -m-8 -mt-6 '>
      <Header/>
      <section className="p-2">
        <Board/>
      </section>
      <EditTaskDialog/>
     </div>
  );
};