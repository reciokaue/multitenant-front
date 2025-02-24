import type { UniqueIdentifier } from '@dnd-kit/core'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import type { ReactNode } from 'react'
import React from 'react'

import { cn } from '@/lib/utils'

interface BaseItem {
  id: UniqueIdentifier
  index: number
}

interface Props<T extends BaseItem> {
  items: T[] | any
  swap: (from: number, to: number) => void
  renderItem: (item: T, index: number) => ReactNode
  direction?: 'vertical' | 'horizontal'
}

export function SortableList<T extends BaseItem>({
  items,
  renderItem,
  swap,
  direction = 'vertical',
}: Props<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(
            (item: T) => item.id === active.id,
          )
          const overIndex = items.findIndex((item: T) => item.id === over.id)

          swap(activeIndex, overIndex)
        }
      }}
    >
      <SortableContext items={items}>
        <ul
          className={cn(
            'flex w-full list-none gap-3 p-0',
            direction === 'vertical'
              ? 'flex-col'
              : 'flex-row items-center justify-center',
          )}
          role="application"
        >
          {items.map((item: T, index: number) => (
            <React.Fragment key={item.id}>
              {renderItem(item, index)}
            </React.Fragment>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}
