import { Category, listCategories } from "@/api/category/list";
import { useQuery } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { PopoverClose } from "@radix-ui/react-popover";

interface CategorySelectorProps {
  teamId: number | string
  setCategory: (category: Category) => void
  category: Category | undefined
}

export function CategorySelector({ teamId, setCategory, category }: CategorySelectorProps) {
  const { data } = useQuery({
    queryKey: [`categories-${teamId}`],
    queryFn: () => listCategories({ teamId }),
    staleTime: Infinity,
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className="text-muted-foreground">
          {category?.label || 'Categorias'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col p-0 ">
        {data?.categories.map((cat) => (
          <PopoverClose asChild>
            <Button
              key={cat.id}
              onClick={() => setCategory(cat)}
              className="rounded-none border-0 flex items-start border-l-8"
              variant='list'
              aria-selected={cat.id === category?.id}
              style={{borderLeftColor: cat.colorHex || '#0000'}}
            >
              {cat.label}
            </Button>
          </PopoverClose>
        ))}
      </PopoverContent>
    </Popover>
  );
};