import { useCallback } from "react";

export const useToggleFilter = (
  selectedFilters: Record<string, string[]>,
  setSelectedFilters: (filters: Record<string, string[]>) => void,
  initialFilters: Record<string, string[]>,
  resetView: () => void
) => {
  return useCallback(
    (name: string, value: string) => {
      const prevValues = selectedFilters[name] || [];
      let updated: Record<string, string[]>;

      if (prevValues.includes(value)) {
        const newValues = prevValues.filter((v) => v !== value);
        updated = newValues.length
          ? { ...selectedFilters, [name]: newValues }
          : Object.fromEntries(
              Object.entries(selectedFilters).filter(([k]) => k !== name)
            );
      } else {
        updated = { ...selectedFilters, [name]: [...prevValues, value] };
      }

      const isDifferent =
        JSON.stringify(updated) !== JSON.stringify(initialFilters);
      if (isDifferent) resetView();

      setSelectedFilters(updated);
    },
    [selectedFilters, initialFilters, resetView, setSelectedFilters]
  );
};
