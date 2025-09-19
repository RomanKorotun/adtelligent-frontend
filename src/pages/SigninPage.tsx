import FormTitle from "@/components/FormTitle";
import { SigninForm } from "@/components/forms/SigninForm";

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[500px] p-6 rounded-lg shadow space-y-6 border-2 border-primary">
        <FormTitle>Логін</FormTitle>
        <SigninForm />
      </div>
    </div>
  );
};

export default SignupPage;
