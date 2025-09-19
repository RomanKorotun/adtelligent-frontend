import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { NewsItem } from "@/types/news";

export const useNewsList = () =>
  useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await axios.get("/news.json");
      return data;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    gcTime: 0,
    retry: 0,
  });

export const useSingleNews = (id: number) =>
  useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      const { data } = await axios.get("/news.json");
      const item = (data as NewsItem[]).find((news) => news.id === id);
      if (!item) throw new Error("Новину не знайдено");
      return item;
    },
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    gcTime: 0,
    retry: 0,
  });
