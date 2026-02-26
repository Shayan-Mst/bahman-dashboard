import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../services/productApi";
import { toaster } from "@/src/components/ui/toaster";
import { useEffect } from "react";

export const useGetAllProduct = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
    // Keep data fresh for 5 minutes to avoid constant re-fetching
    staleTime: 5 * 60 * 1000,
  });

  // Effect to show toast on error, matching your useLogin behavior
  useEffect(() => {
    if (query.isError) {
      toaster.create({
        title: "Fetch Failed",
        description: (query.error as Error).message,
        type: "error",
      });
    }
  }, [query.isError, query.error]);

  return query;
};