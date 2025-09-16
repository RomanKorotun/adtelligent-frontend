import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Suspense } from "react";

export const Layout = () => {
  return (
    <>
      <Header />
      <Suspense>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};
