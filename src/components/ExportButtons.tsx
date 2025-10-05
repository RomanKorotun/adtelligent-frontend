type Props = {
  onDownload: (format: "csv" | "xlsx") => void;
};

export const ExportButtons = ({ onDownload }: Props) => {
  return (
    <div className="ml-auto flex gap-3">
      <button
        onClick={() => onDownload("csv")}
        className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition font-medium"
      >
        Завантажити CSV
      </button>
      <button
        onClick={() => onDownload("xlsx")}
        className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition font-medium"
      >
        Завантажити Excel
      </button>
    </div>
  );
};
