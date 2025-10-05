import { FilterButton } from "@components/FilterButton";
import type { FilterItem } from "@shared-types/statistics";

type Props = {
  filters: FilterItem[];
  selectedFilters: Record<string, string[]>;
  onToggle: (name: string, value: string) => void;
};

export const FilterGroup = ({ filters, selectedFilters, onToggle }: Props) => {
  return (
    <div className="flex gap-3 flex-wrap">
      {filters.map((filter, i) => (
        <FilterButton
          key={`${filter.name}-${filter.value}-${i}`}
          filter={filter}
          isActive={selectedFilters[filter.name]?.includes(filter.value)}
          onClick={() => onToggle(filter.name, filter.value)}
        />
      ))}
    </div>
  );
};
