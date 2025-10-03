import { useState } from "react";
import { FiltersPanel } from "@components/FiltersPanel";
import { useStatisticsQuery } from "@api/statistics";
import { StatisticsGrid } from "@components/StatisticsGrid";

export type FiltersPayload = {
  date: string;
  filters: Record<string, string[]>;
};

const StatisticsPage = () => {
  const [filtersPayload, setFiltersPayload] = useState<FiltersPayload | null>(
    null
  );
  const { data, isLoading, isError } = useStatisticsQuery(filtersPayload);

  const handleApplyFilters = (payload: FiltersPayload) =>
    setFiltersPayload(payload);

  return (
    <div className="container py-10 space-y-10">
      <h1 className="text-3xl font-bold text-primary">Статистика</h1>

      <div className="bg-light rounded-lg shadow-card p-6">
        <FiltersPanel onApply={handleApplyFilters} />
      </div>

      <div className="shadow-card max-h-[500px]">
        {!filtersPayload ? (
          <p className="text-secondary p-6">
            Виберіть фільтри та натисніть "Застосувати"
          </p>
        ) : isLoading ? (
          <p className="text-secondary mt-4 p-6">Завантаження...</p>
        ) : isError ? (
          <p className="text-error mt-4 p-6">Помилка при завантаженні даних</p>
        ) : (
          <StatisticsGrid data={data || []} />
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;
