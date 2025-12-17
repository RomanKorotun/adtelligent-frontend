import { useNavigate, useLocation } from "react-router-dom";
import { useSignout } from "@api/auth";
import { useAuthStore } from "@store/authStore";

export const UserMenu = () => {
  const userName = useAuthStore((state) => state.userName);
  const { mutateAsync: signout } = useSignout();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signout();
    navigate("/signin");
  };

  const isStatisticsPage = location.pathname.includes("/statistics");

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => navigate("/form")}
        className="px-3 py-1 rounded-md bg-primary text-light text-sm font-medium hover:bg-secondary transition-colors shadow-cardHover"
      >
        Створити рекламу
      </button>

      {isStatisticsPage && (
        <button
          onClick={() => navigate("/news")}
          className="px-3 py-1 rounded-md bg-primary text-light text-sm font-medium hover:bg-secondary transition-colors shadow-cardHover"
        >
          Всі новини
        </button>
      )}

      {/* <button
        onClick={() => navigate("/statistics")}
        className="px-3 py-1 rounded-md bg-primary text-light text-sm font-medium hover:bg-secondary transition-colors shadow-cardHover"
      >
        Статистика
      </button> */}

      {userName && (
        <span className="text-sm text-light">Welcome, {userName}</span>
      )}

      <button
        onClick={handleLogout}
        className="px-3 py-1 rounded-md bg-focus text-light text-sm font-medium hover:bg-secondary transition-colors shadow-cardHover"
      >
        Вийти
      </button>
    </div>
  );
};
