import React, { useState, useEffect } from "react";
import type { Column, Row } from "@shared-types/statistics";
import { StatisticsGridColumn } from "@components/StatisticsGridColumn";

type Props = {
  data: Row[];
};

const currencyKeys = ["maxCpm", "revenue", "revenuePerSlot", "ECPM"];
const percentKeys = ["noBid", "fillRate"];

export const StatisticsGrid: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-secondary p-4">Немає даних</p>;
  }

  const columns: Column[] = Object.keys(data[0]).map((key) => {
    const label = /^[A-Z]+$/.test(key)
      ? key
      : key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());

    let finalLabel = label;
    if (currencyKeys.includes(key)) {
      finalLabel += " ($)";
    } else if (percentKeys.includes(key)) {
      finalLabel += " (%)";
    }

    return { key, label: finalLabel };
  });

  const [columnWidths, setColumnWidths] = useState<number[]>(
    columns.map(() => 150)
  );

  useEffect(() => {
    setColumnWidths(columns.map(() => 150));
  }, [data]);

  return (
    <div className="overflow-y-auto max-h-[500px] relative">
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
    </div>
  );
};
