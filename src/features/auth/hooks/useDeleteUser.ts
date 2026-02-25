import { useMutation } from '@tanstack/react-query'
import { deleteUser } from '../services/userApi';
import { toaster } from '@/src/components/ui/toaster';


const useDeleteUser = () => {
  
 return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
  
      // 2. Show Success Toast
      toaster.create({
        title: `User deleted successfully !`,
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