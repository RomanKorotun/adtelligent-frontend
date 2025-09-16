import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { signupSchema } from "../schemas/signup.schema";
import { FormField } from "../components/FormField";
import { FormButton } from "../components/FormButton";

export type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Дані реєстрації:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField
        label="Ім’я користувача"
        name="username"
        type="text"
        register={register}
        error={errors.username?.message}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
      />

      <FormField
        label="Пароль"
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
      />

      <FormButton>Submit</FormButton>
    </form>
  );
};
