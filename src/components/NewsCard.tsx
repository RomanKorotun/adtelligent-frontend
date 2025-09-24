import { Link } from "react-router-dom";
import type { NewsItem } from "@shared-types/news";
import { formatDateTime } from "@/utils/formatDate";

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  const { id, title, description, isoDate } = news;

  const formattedDate = formatDateTime(isoDate);

  return (
    <Link to={`/news/${id}`}>
      <div className="bg-light rounded-lg shadow-card hover:shadow-cardHover transition-shadow duration-300 h-full flex flex-col cursor-pointer">
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-primary mb-2">{title}</h2>
            <p className="text-secondary text-sm line-clamp-3">{description}</p>
          </div>
          <p className="text-xs text-secondary mt-4 italic text-right self-end">
            {formattedDate}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
