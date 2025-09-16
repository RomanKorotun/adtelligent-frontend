interface NewsCardProps {
  title: string;
  thumbnailImage: string;
  description: string;
  publishedAt: string;
}

const NewsCard = ({
  title,
  thumbnailImage,
  description,
  publishedAt,
}: NewsCardProps) => {
  return (
    <div className="bg-light rounded-lg shadow-card hover:shadow-cardHover transition-shadow duration-300 h-full flex flex-col cursor-pointer">
      <img
        src={thumbnailImage}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-primary mb-2">{title}</h2>
          <p className="text-secondary text-sm line-clamp-3">{description}</p>
        </div>
        <p className="text-xs text-secondary mt-4 italic">{publishedAt}</p>
      </div>
    </div>
  );
};

export default NewsCard;
