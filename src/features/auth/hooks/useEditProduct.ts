import { useMutation } from '@tanstack/react-query'
import { editUser } from '../services/userApi';
import { toaster } from '@/src/components/ui/toaster';
import { Dialog } from '@chakra-ui/react';
import { editProduct } from '../services/productApi';

const useEditProduct = () => {
  
 return useMutation({
    mutationFn: editProduct,
    onSuccess: (data) => {
  
      // 2. Show Success Toast
      toaster.create({
        title: `Product [${data.title}] updated successfully`,
        type: "success",
      });


    },
    onError: (error: Error) => {
      toaster.create({
        title: "Update Failed",
        description: error.message,
        type: "error",
      });
    },
  });
}

export default useEditProduct