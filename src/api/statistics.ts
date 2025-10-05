import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@src/lib/axios";
import type {
  Filter,
  SavedViewDetail,
  SavedViewSummary,
  SaveFilterInput,
} from "@shared-types/statistics";

export const useStatisticsQuery = (
  payload: { date: string; filters: Record<string, string[]> } | null
) =>
  useQuery<any[], unknown>({
    queryKey: ["statistics", payload],
    queryFn: async () => {
      if (!payload) return [];
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const { data } = await axiosInstance.post("/statQuery", {
        ...payload,
        timezone,
      });
      return data;
    },
    enabled: !!payload,
    retry: 0,
  });

export const useFilterQuery = (name: string | null) =>
  useQuery<Filter | null, unknown>({
    queryKey: ["filter", name],
    queryFn: async () => {
      if (!name) return null;
      const { data } = await axiosInstance.get(`/filters/${name}`);
      return data;
    },
    enabled: !!name,
    retry: 0,
  });

export const useSavedViewsQuery = () =>
  useQuery<SavedViewSummary[], unknown>({
    queryKey: ["savedViews"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/filters/saved/list");
      return Array.isArray(data) ? data : [];
    },
    retry: 0,
  });

export const useSavedViewDetail = (name: string | null) =>
  useQuery<SavedViewDetail, Error>({
    queryKey: ["savedViewDetail", name],
    queryFn: async () => {
      if (!name) throw new Error("No view name provided");
      const { data } = await axiosInstance.get(`/filters/${name}`);
      return data;
    },
    enabled: !!name,
    retry: 0,
  });

export const useSaveFilter = () => {
  const queryClient = useQueryClient();

  return useMutation<SavedViewDetail, unknown, SaveFilterInput>({
    mutationFn: async (input) => {
      const { data } = await axiosInstance.post("/filters/save", input);
      return data;
    },
    onSuccess: async (newView) => {
      queryClient.setQueryData<SavedViewSummary[]>(
        ["savedViews"],
        (old = []) => {
          const exists = old.some((v) => v.id === newView.id);
          if (exists) return old;
          return [...old, { id: newView.id, name: newView.name }];
        }
      );
      await queryClient.invalidateQueries({ queryKey: ["savedViews"] });
    },
  });
};
