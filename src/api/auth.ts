import { useMutation, useQuery } from "@tanstack/react-query";
import type { LoginPayload, SignupPayload } from "@shared-types/auth";
import { useAuthStore } from "@/store/authStore";
import axiosInstance from "@lib/axios";
import { useEffect } from "react";

export const useSignup = () => {
  const login = useAuthStore.getState().login;

  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const { data } = await axiosInstance.post("/auth/signup", payload);
      return data;
    },
    onSuccess: (data) => {
      login(data.username);
    },
  });
};

export const useLogin = () => {
  const login = useAuthStore.getState().login;

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await axiosInstance.post("/auth/signin", payload);
      return data;
    },
    onSuccess: (data) => {
      login(data.username);
    },
  });
};

export const useSignout = () => {
  const logout = useAuthStore.getState().logout;

  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/auth/signout");
    },
    onSuccess: () => {
      logout();
    },
  });
};

export const useCurrentUser = () => {
  const current = useAuthStore((state) => state.current);

  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/auth/current");
      return data;
    },
    retry: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data) {
      current(query.data.username);
    }
  }, [query.data, current]);

  return query;
};
