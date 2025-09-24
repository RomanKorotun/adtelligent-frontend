import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@components/FormField";
import { FormButton } from "@components/FormButton";
import { useLogin, useSignup } from "@api/auth";
import { signinSchema } from "@schemas/signin.schema";
import { signupSchema } from "@schemas/signup.schema";
import { fieldConfig } from "@config/fieldConfig";
import { AuthType } from "@shared-types/auth";

type AuthType = "signup" | "signin";
type SigninFormData = z.infer<typeof signinSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export const AuthForm = ({ type }: { type: AuthType }) => {
  const navigate = useNavigate();

  const isLogin = type === AuthType.SIGNIN;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData | SignupFormData>({
    resolver: zodResolver(isLogin ? signinSchema : signupSchema),
    mode: "onTouched",
  });

  const { mutate: loginMutate } = useLogin();
  const { mutate: signupMutate } = useSignup();

  const onSubmit = (data: SigninFormData | SignupFormData) => {
    if (isLogin) {
      loginMutate(data as SigninFormData, {
        onSuccess: () => navigate("/news"),
      });
    } else {
      signupMutate(data as SignupFormData, {
        onSuccess: () => navigate("/news"),
      });
    }
  };

  const fields = fieldConfig
    .filter((f) => f.visibleIn.includes(type))
    .map((f) => ({
      ...f,
      name: f.name as keyof (SigninFormData | SignupFormData),
    }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {fields.map(({ name, label, type }) => (
        <FormField
          key={name}
          label={label}
          name={name}
          type={type}
          register={register}
          error={errors[name]?.message}
        />
      ))}
      <FormButton>Submit</FormButton>
    </form>
  );
};
