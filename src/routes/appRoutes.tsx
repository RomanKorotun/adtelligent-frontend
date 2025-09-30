import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@components/Layout";
import { PrivateRoute } from "@components/routes/PrivateRoute";
import { RestrictedRoute } from "@components/routes/RestrictedRoute";

const AuthPage = lazy(() => import("@pages/AuthPage"));
const NewsListPage = lazy(() => import("@pages/NewsListPage"));
const NewsDetailsPage = lazy(() => import("@pages/NewsDetailsPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));
const LineItemFormPage = lazy(() => import("@pages/LineItemFormPage"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/signup" replace />} />

        <Route
          path="signup"
          element={<RestrictedRoute redirectTo="/news" page={<AuthPage />} />}
        />
        <Route
          path="signin"
          element={<RestrictedRoute redirectTo="/news" page={<AuthPage />} />}
        />

        <Route
          path="news/:id"
          element={
            <PrivateRoute redirectTo="/signin" page={<NewsDetailsPage />} />
          }
        />
        <Route
          path="news"
          element={
            <PrivateRoute redirectTo="/signin" page={<NewsListPage />} />
          }
        />
      </Route>
      <Route
        path="form"
        element={
          <PrivateRoute redirectTo="/signin" page={<LineItemFormPage />} />
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
