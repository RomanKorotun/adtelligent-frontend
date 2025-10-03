import type { Filter } from "@config/filtersConfig";

type Props = {
  filter: Filter;
  isActive: boolean;
  onClick: () => void;
};

export const FilterButton = ({ filter, isActive, onClick }: Props) => {
  const baseClasses = "px-4 py-2 rounded-lg border font-medium transition";
  const activeClasses = "bg-primary text-light border-primary";
  const inactiveClasses =
    "bg-secondary/10 text-primary border-secondary hover:bg-secondary/20";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {filter.name}
    </button>
  );
};
