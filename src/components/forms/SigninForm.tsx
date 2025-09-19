import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { FormField } from "@/components/FormField";
import { FormButton } from "@/components/FormButton";
import { signinSchema } from "@/schemas/signin.schema";
import { useLogin } from "@/api/auth";

export type SigninFormData = z.infer<typeof signinSchema>;

export const SigninForm = () => {
  const { mutate } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: SigninFormData) => {
    console.log("Дані логіну:", data);
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
