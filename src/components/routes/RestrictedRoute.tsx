import { useAuthStore } from "@/store/authStore";
import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

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
