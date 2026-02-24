import { useMutation } from '@tanstack/react-query'
import React, { use } from 'react'
import { addUser } from '../services/userApi';
import { toaster } from '@/src/components/ui/toaster';
import { Dialog } from '@chakra-ui/react';

const useAddUser = () => {
  
 return useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
  
      // 2. Show Success Toast
      toaster.create({
        title: `User ${data.firstName} ${data.lastName} added successfully`,
        
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

export default useAddUser