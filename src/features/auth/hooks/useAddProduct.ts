import { useMutation } from '@tanstack/react-query'
import { addUser } from '../services/userApi';
import { toaster } from '@/src/components/ui/toaster';
import { addProduct } from '../services/productApi';


const useAddProduct = () => {
  
 return useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
  
        console.log("Product added successfully:", data);
      // 2. Show Success Toast
      toaster.create({
        title: `Product ${data.title} added successfully`,
        
        type: "success",
      });


    },
    onError: (error: Error) => {
      toaster.create({
        title: "Login Failed",
        description: error.message,
        type: "error",
      });
    },
  });
}

export default useAddProduct