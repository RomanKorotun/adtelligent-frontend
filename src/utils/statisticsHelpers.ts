import axiosInstance from "@lib/axios";

const MIME_TYPES = {
  csv: "text/csv",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export const downloadStatisticsFile = async (
  format: "csv" | "xlsx",
  date: string,
  filters: Record<string, string[]>
) => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await axiosInstance.post(
      "/statExport",
      { date, filters, format, timezone },
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], { type: MIME_TYPES[format] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `statistics_${date}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download file", error);
  }
};
