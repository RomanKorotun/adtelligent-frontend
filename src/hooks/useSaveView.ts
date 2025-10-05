import { useCallback } from "react";
import { useSaveFilter } from "@api/statistics";
import { buildFiltersPayload } from "@utils/buildFiltersPayload";

export const useSaveView = () => {
  const saveFilterMutation = useSaveFilter();

  const saveView = useCallback(
    (
      name: string,
      filters: Record<string, string[]>,
      onSuccess?: () => void
    ) => {
      if (!name || Object.keys(filters).length === 0) return;

      const filtersPayload = buildFiltersPayload(filters);
      saveFilterMutation.mutate({ name, filters: filtersPayload });
      onSuccess?.();
    },
    [saveFilterMutation]
  );

  return { saveView };
};
