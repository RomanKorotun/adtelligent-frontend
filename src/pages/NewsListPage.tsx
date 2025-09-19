import { Link } from "react-router-dom";
import NewsCard from "@/components/NewsCard";
import { useNewsList } from "@/api/news";
import type { NewsItem } from "@/types/news";

const NewsListPage = () => {
  const { data, isLoading, error } = useNewsList();

  if (isLoading) {
    return (
      <div className="container py-8">
        <p className="text-lg text-secondary">Завантаження новин...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <p className="text-lg text-error">
          Помилка! Спробуйте перезавантажити сторінку...
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="container py-8">
        <p className="text-lg text-gray-500">Новини не знайдено.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-primary mb-6">Останні новини</h1>

      <ul className="flex flex-wrap gap-6 justify-start list-none p-0 m-0">
        {data.map((news: NewsItem) => (
          <li key={news.id} className="w-full sm:w-[48%] lg:w-[23%]">
            <Link to={`/news/${news.id}`}>
              <NewsCard
                title={news.title}
                thumbnailImage={news.thumbnailImage}
                description={news.description}
                publishedAt={news.publishedAt}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsListPage;
