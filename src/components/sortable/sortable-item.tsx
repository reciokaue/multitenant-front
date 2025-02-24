import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import type { CSSProperties, HTMLProps, PropsWithChildren } from 'react'
import React, { createContext, useContext, useMemo } from 'react'

interface Props extends HTMLProps<HTMLLIElement> {
  sortableId: UniqueIdentifier
}

interface Context {
  attributes: Record<string, any>
  listeners: DraggableSyntheticListeners
  ref(node: HTMLElement | null): void
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
})

export function SortableItem({
  children,
  sortableId,
  ...rest
}: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: sortableId })
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  )
  const style: CSSProperties = {
    // opacity: isDragging ? 0.8 : undefined,
    zIndex: isDragging ? 1000 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider key={sortableId} value={context}>
      <li
        id={`sortable-${sortableId}`}
        className="flex flex-grow items-center"
        ref={setNodeRef}
        style={style}
        {...rest}
      >
        {children}
        <DragHandle />
      </li>
    </SortableItemContext.Provider>
  )
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <div
      className="x-1 ml-1 rounded-sm py-2 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <GripVertical className="h-5 w-5" />
    </div>
  )
}
