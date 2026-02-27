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
    var inThirty = new Date(new Date().getTime() + 30 * 60 * 1000);
    var inSixty = new Date(new Date().getTime() + 60 * 60 * 1000);
    Cookies.set('acc-tk', data.accessToken, { 
        expires: inThirty, // 30 mins
        secure: false, 
        sameSite: 'strict' 
      });
        Cookies.set('ref-tk', data.refreshToken, { 
        expires: inSixty, // days
        secure: false, 
        sameSite: 'strict' 
      });
      const {firstName,lastName,gender,username,image,email} = data
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("gender", gender);
      localStorage.setItem("username", username);
      localStorage.setItem("image", image);
      localStorage.setItem("email", email);
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