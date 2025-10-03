import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Column, Row } from "@shared-types/statistics";
import { StatisticsGridColumn } from "@components/StatisticsGridColumn";

type Props = {
  data: Row[];
};

export const StatisticsGrid: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-secondary p-4">Немає даних</p>;
  }

  const initialColumns: Column[] = Object.keys(data[0]).map((key) => ({
    key,
    label: /^[A-Z]+$/.test(key)
      ? key
      : key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()),
  }));

  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [columnWidths, setColumnWidths] = useState<number[]>(
    initialColumns.map(() => 150)
  );

  useEffect(() => {
    setColumns(initialColumns);
    setColumnWidths(initialColumns.map(() => 150));
  }, [data]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = columns.findIndex((c) => c.key === active.id);
      const newIndex = columns.findIndex((c) => c.key === over.id);
      setColumns((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="overflow-y-auto max-h-[500px] relative">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columns.map((c) => c.key)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex min-w-max relative">
              {columns.map((col, i) => (
                <StatisticsGridColumn
                  key={col.key}
                  column={col}
                  index={i}
                  columnWidths={columnWidths}
                  setColumnWidths={setColumnWidths}
                  data={data}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
