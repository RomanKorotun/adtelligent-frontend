import newsData from "@/news.json";
import NewsCard from "@/components/NewsCard";

const NewsListPage = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-primary mb-6">Останні новини</h1>

      <ul className="flex flex-wrap gap-6 justify-start list-none p-0 m-0">
        {newsData.map((news) => (
          <li key={news.id} className="w-full sm:w-[48%] lg:w-[23%]">
            <NewsCard
              title={news.title}
              thumbnailImage={news.thumbnailImage}
              description={news.description}
              publishedAt={news.publishedAt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsListPage;
