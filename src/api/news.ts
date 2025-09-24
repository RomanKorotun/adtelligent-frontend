import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@src/lib/axios";

const NEWS_FEED_URL = "https://rss.unian.net/site/news_ukr.rss?force=1";

export const useNewsList = () =>
  useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/feed?url=${NEWS_FEED_URL}`);
      return data;
    },
    retry: 0,
  });

export const useSingleNews = (id: string | undefined) =>
  useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/article/${id}/parse`);
      return data;
    },
    retry: 0,
  });
