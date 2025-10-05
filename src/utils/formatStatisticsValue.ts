import type { Column, Row } from "@shared-types/statistics";

const currencyKeys = ["revenue", "avgCpm", "maxCpm"];

export const renderValue = (row: Row, column: Column) => {
  const value = row[column.key];

  if (value === undefined || value === null || value === "") return "-";
  if (typeof value === "number" && currencyKeys.includes(column.key))
    return `$${value.toFixed(2)}`;
  if (typeof value === "number") return value.toFixed(2);
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value, null, 0);
  return String(value);
};
