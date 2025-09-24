import { useParams, NavLink } from "react-router-dom";
import { useSingleNews } from "@api/news";
import StatusMessage from "@components/StatusMessage";
import { formatDateTime } from "@utils/formatDate";

const NewsDetailsPage = () => {
  const { id } = useParams();
  const { data: newsItem, isLoading, error } = useSingleNews(id);

  const formattedDate = newsItem && formatDateTime(newsItem.isoDate);

  return (
    <div className="container py-8">
      <StatusMessage
        isLoading={isLoading}
        error={error}
        messages={{
          loading: "Завантаження новини...",
          error: "Помилка! Спробуйте перезавантажити сторінку...",
          notFound: "Новину не знайдено або вона була видалена.",
        }}
      />

      {newsItem && (
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
              <p className="text-secondary text-sm italic">{formattedDate}</p>
            </div>
          </div>

          <div>
            <p className="text-primary text-base leading-relaxed whitespace-pre-line">
              {newsItem.description}
            </p>
          </div>

          <div className="flex justify-end mt-4">
            <NavLink
              to="/news"
              className="text-lg font-medium text-primary hover:text-secondary hover:underline focus:text-focus focus:underline"
            >
              Всі статті
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetailsPage;
