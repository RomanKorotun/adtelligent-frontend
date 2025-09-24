import { AuthType } from "@/types/auth";

export const fieldConfig = [
  {
    label: "Ім’я користувача",
    name: "username",
    type: "text",
    visibleIn: [AuthType.SIGNUP],
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    visibleIn: [AuthType.SIGNIN, AuthType.SIGNUP],
  },
  {
    label: "Пароль",
    name: "password",
    type: "password",
    visibleIn: [AuthType.SIGNIN, AuthType.SIGNUP],
  },
];
