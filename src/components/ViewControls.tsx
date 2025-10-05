import type { SavedViewSummary } from "@shared-types/statistics";

type Props = {
  newViewName: string;
  onChangeViewName: (value: string) => void;
  onSaveView: () => void;
  disabled: boolean;
  activeViewId: string;
  savedViews: SavedViewSummary[] | undefined;
  onSelectView: (id: string) => void;
};

export const ViewControls = ({
  newViewName,
  onChangeViewName,
  onSaveView,
  disabled,
  activeViewId,
  savedViews,
  onSelectView,
}: Props) => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Назва перегляду"
        value={newViewName}
        onChange={(e) => onChangeViewName(e.target.value)}
        disabled={disabled}
        className="border rounded px-2 py-2 text-sm"
      />
      <button
        onClick={onSaveView}
        disabled={disabled}
        className="px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 transition font-medium"
      >
        Зберегти перегляд
      </button>
      <select
        value={activeViewId || ""}
        onChange={(e) => onSelectView(e.target.value)}
        className="border rounded px-2 py-2 text-sm"
      >
        <option key="placeholder" value="" disabled>
          Виберіть перегляд
        </option>
        <option key="default" value="default">
          default
        </option>
        {savedViews
          ?.filter((v) => typeof v.id === "string" && v.id.trim() !== "")
          .map((v) => (
            <option key={`view-${v.id}`} value={v.id}>
              {v.name || "Без назви"}
            </option>
          ))}
      </select>
    </div>
  );
};
