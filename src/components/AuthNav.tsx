import { NavLink } from "react-router-dom";

export const AuthNav = () => {
  return (
    <nav className="flex gap-6 items-center">
      <NavLink
        to="/signup"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors ${
            isActive ? "text-focus" : "text-light hover:text-secondary"
          }`
        }
      >
        Реєстрація
      </NavLink>
      <NavLink
        to="/signin"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors ${
            isActive ? "text-focus" : "text-light hover:text-secondary"
          }`
        }
      >
        Логін
      </NavLink>
    </nav>
  );
};
