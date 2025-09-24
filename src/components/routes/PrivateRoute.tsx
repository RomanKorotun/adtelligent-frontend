import type { ReactNode, FC } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "@src/api/auth";

interface PrivateRouteProps {
  page: ReactNode;
  redirectTo: string;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ page, redirectTo }) => {
  const { data } = useCurrentUser();
  return data ? page : <Navigate to={redirectTo} />;
};
