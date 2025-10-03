import { useState } from "react";
import { FilterButton } from "@components/FilterButton";
import { filtersConfig, type Filter } from "@config/filtersConfig";
import { downloadStatisticsFile } from "@utils/statisticsHelpers";

type Props = {
  onApply: (data: { date: string; filters: Record<string, string[]> }) => void;
};

export const FiltersPanel = ({ onApply }: Props) => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const toggleFilter = (name: string, value: string) => {
    setSelectedFilters((prev) => {
      const prevValues = prev[name] || [];
      if (prevValues.includes(value)) {
        const newValues = prevValues.filter((v) => v !== value);
        if (!newValues.length) {
          const { [name]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [name]: newValues };
      }
      return { ...prev, [name]: [...prevValues, value] };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        />
        <div className="ml-auto flex gap-3">
          <button
            onClick={() => downloadStatisticsFile("csv", date, selectedFilters)}
            className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition font-medium"
          >
            Завантажити CSV
          </button>
          <button
            onClick={() =>
              downloadStatisticsFile("xlsx", date, selectedFilters)
            }
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition font-medium"
          >
            Завантажити Excel
          </button>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {filtersConfig.map((f: Filter) => (
          <FilterButton
            key={f.name}
            filter={f}
            isActive={selectedFilters[f.name]?.includes(f.value)}
            onClick={() => toggleFilter(f.name, f.value)}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onApply({ date, filters: selectedFilters })}
          className="px-6 py-3 bg-primary text-light rounded shadow hover:bg-primary/90 transition font-medium"
        >
          Застосувати
        </button>
      </div>
    </div>
  );
};
