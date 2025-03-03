import { useDndContext } from "@dnd-kit/core";
import { cva } from "class-variance-authority";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function ScrollContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("flex items-start", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex gap-4 items-start flex-row justify-start p-2">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}