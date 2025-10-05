import { useState } from "react";
import { FilterGroup } from "@components/FilterGroup";
import { ExportButtons } from "@components/ExportButtons";
import { ViewControls } from "@components/ViewControls";
import { downloadStatisticsFile } from "@utils/statisticsHelpers";
import {
  useFilterQuery,
  useSavedViewsQuery,
  useSavedViewDetail,
} from "@api/statistics";
import { useToggleFilter } from "@hooks/useToggleFilter";
import { useViewSelection } from "@hooks/useViewSelection";
import { useSaveView } from "@hooks/useSaveView";

type Props = {
  onApply: (data: { date: string; filters: Record<string, string[]> }) => void;
  filterName: string | null;
};

export const FiltersPanel = ({ onApply, filterName }: Props) => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [initialViewFilters, setInitialViewFilters] = useState<
    Record<string, string[]>
  >({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [activeViewId, setActiveViewId] = useState("");
  const [activeViewName, setActiveViewName] = useState<string | null>(null);
  const [newViewName, setNewViewName] = useState("");

  const { data: filtersData } = useFilterQuery(filterName);
  const { data: savedViews } = useSavedViewsQuery();
  const { data: selectedViewDetail } = useSavedViewDetail(
    activeViewName && activeViewName !== "default" ? activeViewName : null
  );

  const resetView = () => {
    setActiveViewId("");
    setActiveViewName("default");
  };

  const toggleFilter = useToggleFilter(
    selectedFilters,
    setSelectedFilters,
    initialViewFilters,
    resetView
  );

  const { handleSelectView } = useViewSelection(
    selectedViewDetail,
    savedViews,
    setSelectedFilters,
    setInitialViewFilters,
    setActiveViewId,
    setActiveViewName
  );

  const { saveView } = useSaveView();

  const handleSaveView = () => {
    saveView(newViewName, selectedFilters, () => setNewViewName(""));
  };

  if (!filtersData) return <p>Фільтри не знайдено</p>;

  const disabled = Object.keys(selectedFilters).length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        />
        <ExportButtons
          onDownload={(format) =>
            downloadStatisticsFile(format, date, selectedFilters)
          }
        />
      </div>

      <FilterGroup
        filters={filtersData.filters}
        selectedFilters={selectedFilters}
        onToggle={toggleFilter}
      />

      <div className="flex justify-between items-center mt-4">
        <ViewControls
          newViewName={newViewName}
          onChangeViewName={setNewViewName}
          onSaveView={handleSaveView}
          disabled={disabled}
          activeViewId={activeViewId}
          savedViews={savedViews}
          onSelectView={handleSelectView}
        />
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
