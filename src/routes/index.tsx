import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";

const SignupPage = lazy(() => import("@/pages/SignupPage"));
const SigninPage = lazy(() => import("@/pages/SigninPage"));
const NewsListPage = lazy(() => import("@/pages/NewsListPage"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/signup" replace />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="signin" element={<SigninPage />} />
        <Route path="news" element={<NewsListPage />} />
      </Route>
    </Routes>
  );
};
