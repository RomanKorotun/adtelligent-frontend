import { useNavigate } from "react-router-dom";
import { useSignout } from "@api/auth";
import { useAuthStore } from "@store/authStore";

export const UserMenu = () => {
  const userName = useAuthStore((state) => state.userName);
  const { mutateAsync: signout } = useSignout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signout();
    navigate("/signin");
  };

  return (
    <div className="flex items-center gap-4">
      {userName && (
        <span className="text-sm text-light">Welcome, {userName}</span>
      )}
      <button
        onClick={() => navigate("/form")}
        className="px-3 py-1 rounded-md bg-primary text-light text-sm font-medium hover:bg-secondary transition-colors shadow-cardHover"
      >
        Створити рекламу
      </button>

      <button
        onClick={() => navigate("/statistics")}
        className="px-3 py-1 rounded-md bg-primary text-light text-sm font-medium hover:bg-secondary transition-colors shadow-cardHover"
      >
        Статистика
      </button>

      <button
        onClick={handleLogout}
        className="px-3 py-1 rounded-md bg-focus text-light text-sm font-medium hover:bg-secondary transition-colors shadow-cardHover"
      >
        Вийти
      </button>
    </div>
  );
};
