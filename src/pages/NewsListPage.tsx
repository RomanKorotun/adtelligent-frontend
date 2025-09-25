import NewsCard from "@components/NewsCard";
import { useNewsList } from "@api/news";
import type { NewsItem } from "@shared-types/news";
import StatusMessage from "@components/StatusMessage";

const NewsListPage = () => {
  const { data, isLoading, error } = useNewsList();

  const isEmpty = Array.isArray(data) && data.length === 0;
  const hasNews = Array.isArray(data) && data.length > 0;

  return (
    <div className="container py-8 relative">
      <StatusMessage
        isLoading={isLoading}
        error={error}
        isEmpty={isEmpty}
        messages={{
          loading: "Завантаження новин...",
          error: "Помилка! Спробуйте перезавантажити сторінку...",
          empty: "Новини не знайдено.",
        }}
      />

      {hasNews && (
        <>
          <h1 className="text-2xl font-bold text-primary mb-6">
            Останні новини
          </h1>

          <ul className="flex flex-wrap gap-6 justify-start list-none p-0 m-0">
            {data.map((news: NewsItem) => (
              <li key={news.id} className="w-full sm:w-[48%] lg:w-[23%]">
                <NewsCard news={news} />
              </li>
            ))}
          </ul>

          <iframe
            id="ad-frame-newslist"
            title="Реклама"
            className="fixed top-[120px] left-0 z-50 block w-[300px] h-[250px] m-0 p-0 border-none overflow-hidden bg-transparent"
          />
        </>
      )}
    </div>
  );
};

export default NewsListPage;
