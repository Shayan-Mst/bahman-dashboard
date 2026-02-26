import { useMutation } from '@tanstack/react-query'
import { editUser } from '../services/userApi';
import { toaster } from '@/src/components/ui/toaster';
import { Dialog } from '@chakra-ui/react';

const useEditUser = () => {
  
 return useMutation({
    mutationFn: editUser,
    onSuccess: (data) => {
  
      // 2. Show Success Toast
      toaster.create({
        title: `User [${data.firstName} ${data.lastName}] updated successfully`,
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

export default useEditUser