import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import type { LoginPayload, SignupPayload } from "@/types/auth";

export const useSignup = () =>
  useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const { data } = await axios.post("/api/auth/signup", payload);
      return data;
    },
  });

export const useLogin = () =>
  useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await axios.post("/api/auth/signin", payload);
      return data;
    },
  });
