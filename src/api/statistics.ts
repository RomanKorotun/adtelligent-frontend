import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/lib/axios";

type FiltersPayload = {
  date: string;
  filters: Record<string, string[]>;
};

export const useStatisticsQuery = (payload: FiltersPayload | null) =>
  useQuery({
    queryKey: ["statistics", payload],
    queryFn: async () => {
      if (!payload) return [];
      const { data } = await axiosInstance.post("/statQuery", payload);
      return data;
    },
    enabled: !!payload,
    retry: 0,
  });
