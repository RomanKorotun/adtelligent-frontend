import type { NewsItem } from "@/types/news";
import { useQuery } from "@tanstack/react-query";

export const useNewsList = () =>
  useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await fetch("/news.json");
      if (!res.ok) throw new Error("Помилка завантаження новин");
      return res.json();
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
      const res = await fetch("/news.json");
      if (!res.ok) throw new Error("Помилка завантаження новин");
      const data: NewsItem[] = await res.json();

      const item = data.find((news) => news.id === id);
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
