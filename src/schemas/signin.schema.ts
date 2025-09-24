import { z } from "zod";
import { passwordRegex } from "@constants/regex";

export const signinSchema = z.object({
  email: z.email({ message: "Введіть коректний email" }),
  password: z
    .string()
    .min(6, "Пароль має бути не менше 6 символів")
    .regex(passwordRegex, "Пароль повинен містити цифру та велику літеру"),
});
