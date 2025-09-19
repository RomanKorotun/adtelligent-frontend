import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container py-8 text-primary text-base">
      На жаль, сторінку, яку ви намагаєтесь відкрити, не знайдено.{" "}
      <Link to="/news" className="text-blue-600 underline hover:text-blue-800">
        Перейти до новин
      </Link>
    </div>
  );
};

export default NotFoundPage;
