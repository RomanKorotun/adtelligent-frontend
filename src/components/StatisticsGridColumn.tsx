import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Column, Row } from "@shared-types/statistics";
import { renderValue } from "@utils/formatStatisticsValue";

type Props = {
  column: Column;
  index: number;
  columnWidths: number[];
  setColumnWidths: React.Dispatch<React.SetStateAction<number[]>>;
  data: Row[];
};

export const StatisticsGridColumn: React.FC<Props> = ({
  column,
  index,
  columnWidths,
  setColumnWidths,
  data,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.key });

  const isFirst = index === 0;

  const startResize = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = columnWidths[index];

    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX;
      setColumnWidths((prev) => {
        const newWidths = [...prev];
        newWidths[index] = Math.max(50, startWidth + delta);
        return newWidths;
      });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        width: columnWidths[index],
        minWidth: columnWidths[index],
      }}
      className={`flex-shrink-0 border border-gray-300 relative ${
        isFirst ? "sticky left-0 z-30 bg-white" : ""
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className={`px-2 py-2 text-xs font-semibold text-center border-b border-gray-300 bg-gray-200 cursor-pointer sticky top-0 ${
          isFirst ? "z-40" : "z-10"
        }`}
      >
        {column.label}
      </div>

      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`px-2 py-1 text-center border-b border-gray-200 ${
            rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
          } ${isFirst ? "sticky left-0 bg-white z-20" : ""}`}
        >
          {renderValue(row, column)}
        </div>
      ))}

      <div
        onMouseDown={startResize}
        className="absolute top-0 right-0 h-full w-1 cursor-col-resize"
      />
    </div>
  );
};
