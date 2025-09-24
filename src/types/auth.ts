export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const AuthType = {
  SIGNUP: "signup",
  SIGNIN: "signin",
} as const;
