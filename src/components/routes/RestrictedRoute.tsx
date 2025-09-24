import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@src/store/authStore";

interface IRestrictedRouteProps {
  redirectTo: string;
  page: ReactNode;
}

export const RestrictedRoute: FC<IRestrictedRouteProps> = ({
  redirectTo,
  page,
}) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : page;
};
