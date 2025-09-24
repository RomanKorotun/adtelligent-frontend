import { z } from "zod";
import { passwordRegex } from "@constants/regex";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Ім’я користувача має містити щонайменше 3 символи")
    .max(20, "Ім’я користувача не може бути довшим за 20 символів"),
  email: z.email({ message: "Введіть коректний email" }),
  password: z
    .string()
    .min(6, "Пароль має бути не менше 6 символів")
    .regex(passwordRegex, "Пароль повинен містити цифру та велику літеру"),
});
