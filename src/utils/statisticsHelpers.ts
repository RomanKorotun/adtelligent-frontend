import axiosInstance from "@lib/axios";

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

    const blob = new Blob([response.data], {
      type:
        format === "csv"
          ? "text/csv"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const filename = `statistics_${date}.${format === "csv" ? "csv" : "xlsx"}`;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download file", error);
  }
};
