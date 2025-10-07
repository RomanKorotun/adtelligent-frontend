import type { Column, Row } from "@shared-types/statistics";

export const renderValue = (row: Row, column: Column) => {
  const value = row[column.key];

  if (typeof value === "number") {
    const isInteger = Number.isInteger(value);
    return isInteger ? value.toString() : value.toFixed(2);
  }

  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value, null, 0);

  return String(value);
};
