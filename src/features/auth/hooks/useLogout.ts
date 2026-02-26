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
     Cookies.remove("ref-tk");
     Cookies.remove("acc-tk");   
      // Clean up local state
      queryClient.clear();
      
      // Refresh to trigger middleware re-check
      setTimeout(()=>{
 router.push("/login");
      
      },1000)
     
    },
  });
};