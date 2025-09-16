import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const SignupPage = lazy(() => import("@/pages/SignupPage"));
const SigninPage = lazy(() => import("@/pages/SigninPage"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
    </Routes>
  );
};
