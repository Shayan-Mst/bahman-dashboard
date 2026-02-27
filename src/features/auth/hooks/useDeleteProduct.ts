import { useMutation } from '@tanstack/react-query'

import { toaster } from '@/src/components/ui/toaster';
import { deleteProduct } from '../services/productApi';


const useDeleteUser = () => {
  
 return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
  
      // 2. Show Success Toast
      toaster.create({
        title: `Product deleted successfully !`,
        type: "success",
      });


    },
    onError: (error: Error) => {
      toaster.create({
        title: "Delete operation failed !",
        description: error.message,
        type: "error",
      });
      console.log("delete failed")
    },
  });
}

export default useDeleteUser