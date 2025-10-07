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
      <iframe
        id="ad-frame-auth"
        title="Реклама"
        className="fixed top-[120px] left-5 z-50 block w-[300px] h-[250px] m-0 p-0 border-none overflow-hidden bg-transparent"
      />
    </div>
  );
};

export default AuthPage;
