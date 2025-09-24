import { useAuthStore } from "@/store/authStore";
import { AuthNav } from "@/components/AuthNav";
import { UserMenu } from "@/components/UserMenu";

export const Header = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <header className="bg-primary text-light py-[22px] shadow-md">
      <div className="container flex items-center justify-between">
        <div>{!isLoggedIn && <AuthNav />}</div>
        <div>{isLoggedIn && <UserMenu />}</div>
      </div>
    </header>
  );
};
