import axios from "axios";

export const getAuthErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return "Невідома помилка. Спробуйте пізніше.";
  }

  const status = error.response?.status;

  switch (status) {
    case 401:
      return "Невірний email або пароль.";
    case 409:
      return "Користувач з таким email вже зареєстрований.";
    default:
      return "Сталася помилка. Будь ласка, спробуйте ще раз.";
  }
};
