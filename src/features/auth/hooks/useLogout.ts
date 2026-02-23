"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import  Cookies  from "js-cookie";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Logic for calling a /api/logout endpoint if it exists
      return Promise.resolve();
    },
    onSuccess: () => {
     Cookies.remove("ref-tk", { path: "/" });
     Cookies.remove("acc-tk", { path: "/" });   
      
      // Clean up local state
      queryClient.clear();
      
      // Refresh to trigger middleware re-check
      router.push("/login");
      
    },
  });
};