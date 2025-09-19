import { useParams } from "react-router-dom";
import { useSingleNews } from "@/api/news";

const NewsDetailsPage = () => {
  const { id } = useParams();
  const { data: newsItem, isLoading, error } = useSingleNews(Number(id));

  if (isLoading) {
    return (
      <div className="container py-8">
        <p className="text-lg text-secondary">Завантаження новини...</p>
      </div>
    );
  }

  if (error) {
    if (error.message === "Новину не знайдено") {
      return (
        <div className="container py-8">
          <p className="text-lg text-warning">
            Новину не знайдено або вона була видалена.
          </p>
        </div>
      );
    }

    return (
      <div className="container py-8">
        <p className="text-lg text-error">
          Помилка! Спробуйте перезавантажити сторінку...
        </p>
      </div>
    );
  }

  return (
    <>
      {newsItem && (
        <div className="container py-8">
          <div className="bg-light rounded-lg shadow-card overflow-hidden p-6 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="sm:w-1/2 w-full">
                <img
                  src={newsItem.mainImage}
                  alt={newsItem.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              <div className="sm:w-1/2 w-full flex flex-col justify-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                  {newsItem.title}
                </h1>
                <p className="text-secondary text-sm italic">
                  {newsItem.publishedAt}
                </p>
              </div>
            </div>

            <div>
              <p className="text-primary text-base leading-relaxed whitespace-pre-line">
                {newsItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsDetailsPage;
