import { Eraser, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/contexts/use-tasks";
import { Badge } from "@/components/ui/badge";

export function TaskFilters() {
  const [searchParams, setSearchParams,] = useSearchParams();
  const { tasks } = useTasks()

  const hasFilters = searchParams.toString() !== ""

  function clearUrlParams(){
    setSearchParams(() => {
      return ""
    })
  }

  function setSearch(e: any){
    setSearchParams((params) => {
      if (e.target.value)
        params.set("search", e.target.value);
      else 
        params.delete("search");
      
      return params;
    });
  }

  function toggleFilter(type: string, value: string) {
    setSearchParams((params) => {
      if (params.get(type) === value)
        params.delete(type);
      else 
        params.set(type, value);
      
      return params;
    });
  }

  return (
    <Popover>
      {hasFilters && <>
        <Badge>{tasks.length} tarefas</Badge>
        <Button onClick={clearUrlParams} variant="ghost" >
          <Eraser/> Limpar
        </Button>
      </>}
      <PopoverTrigger asChild>
        <Button variant="outline" >
          <Filter />
          Filtros
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="space-y-3">
        <h2 className="font-light">Filtros</h2>

        <div className="space-y-2">
          <h3 className="font-medium">Texto</h3>
          <Input
            placeholder="Ex: documentação"
            value={searchParams.get("search") || ""}
            onChange={setSearch}
          />
        </div>

        {FILTERS.map(({ label, options }) => (
          <div key={label} className="space-y-2">
            <h3 className="font-medium">{label}</h3>
            <div className="space-y-1">
              {options.map(({ label, type, value }) => (
                <label key={value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={searchParams.get(type) === value}
                    onCheckedChange={() => toggleFilter(type, value)}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

const FILTERS = [
  {
    label: "Data de entrega",
    options: [
      { label: "Sem data", type: "noDue", value: "true" },
      { label: "Entregue em 1 dia", type: "dueIn", value: "day" },
      { label: "Entregue em 1 semana", type: "dueIn", value: "week" },
      { label: "Entregue em 1 mês", type: "dueIn", value: "month" },
      { label: "Atrasado", type: "overdue", value: "true" },
    ],
  },
  {
    label: "Status",
    options: [
      { label: "Concluído", type: "completed", value: "true" },
      { label: "Não concluído", type: "completed", value: "false" },
      { label: "Arquivado", type: "archived", value: "true" },
    ],
  },
];
