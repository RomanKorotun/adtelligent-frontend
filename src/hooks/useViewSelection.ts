import { useEffect } from "react";
import type {
  SavedViewDetail,
  SavedViewSummary,
} from "@shared-types/statistics";

export const useViewSelection = (
  selectedViewDetail: SavedViewDetail | undefined,
  savedViews: SavedViewSummary[] | undefined,
  setSelectedFilters: (filters: Record<string, string[]>) => void,
  setInitialViewFilters: (filters: Record<string, string[]>) => void,
  setActiveViewId: (id: string) => void,
  setActiveViewName: (name: string | null) => void
) => {
  const handleSelectView = (id: string) => {
    if (id === "default") {
      setSelectedFilters({});
      setInitialViewFilters({});
      setActiveViewId("");
      setActiveViewName("default");
      return;
    }

    const view = savedViews?.find((v) => v.id === id);
    if (!view) return;

    setActiveViewId(id);
    setActiveViewName(view.name);
  };

  useEffect(() => {
    if (!selectedViewDetail) return;

    const newSelected: Record<string, string[]> = {};
    selectedViewDetail.filters.forEach((f) => {
      if (!newSelected[f.name]) newSelected[f.name] = [];
      newSelected[f.name].push(f.value);
    });

    setSelectedFilters(newSelected);
    setInitialViewFilters(newSelected);
  }, [selectedViewDetail]);

  return { handleSelectView };
};
