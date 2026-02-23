// src/features/auth/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/authApi";
import { toaster } from "@/src/components/ui/toaster";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // 1. Save Token
    Cookies.set('auth-token', data.accessToken, { 
        expires: 7, // days
        secure: true, 
        sameSite: 'strict' 
      });
      
      // 2. Show Success Toast
      toaster.create({
        title: "Login Successful",
        description: `Welcome back, ${data.firstName}!`,
        type: "success",
      });

      // 3. Redirect to Dashboard
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Login Failed",
        description: error.message,
        type: "error",
      });
    },
  });
};