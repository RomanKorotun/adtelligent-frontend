import { useLocation } from "react-router-dom";
import FormTitle from "@components/FormTitle";
import { AuthForm } from "@components/AuthForm";
import { AuthType } from "@shared-types/auth";

const AuthPage = () => {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  return (
    <div className="w-full max-w-md p-6 rounded-lg shadow space-y-6 border border-primary">
      <FormTitle>{isSignup ? "Реєстрація" : "Логін"}</FormTitle>
      <AuthForm type={isSignup ? AuthType.SIGNUP : AuthType.SIGNIN} />
    </div>
  );
};

export default AuthPage;
