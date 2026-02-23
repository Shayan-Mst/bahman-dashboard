"use client"
import { Box, Flex, Text, Input, Button, Link, Stack } from "@chakra-ui/react";
import { ArrowRight,Eye , EyeOff } from "lucide-react"
import {useForm , Controller , SubmitHandler} from "react-hook-form"
import { useEffect, useRef, useState } from "react";
import { LoginFormValues } from "@/src/features/auth/types/auth.types";
import { loginUser } from "../services/authApi";
import { toaster } from "@/src/components/ui/toaster"

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const lastErrorRef = useRef<string>("");
   // 2. Watch for errors and trigger Toasts
 
      // Inside the component:
    const {
      control,           // Controls the inputs
      handleSubmit,      // The "Bodyguard" function
      formState: { errors, isSubmitting , submitCount }, // The status report
    } = useForm<LoginFormValues>({
      defaultValues: { username: "", password: "" },
    });
   useEffect(() => {
  const errorMessages = Object.values(errors);
  
  if (errorMessages.length > 0) {
    const currentError = errorMessages[0]?.message as string;
    
    // Only toast if it's a new error message or if the user clicked submit again
    if (currentError !== lastErrorRef.current || submitCount > 0) {
     const timer = setTimeout(() => {
        toaster.create({
          description: currentError,
          type: "error",
        });
      }, 0);
      lastErrorRef.current = currentError;
      return () => clearTimeout(timer); // Cleanup
    }
  }
}, [errors, submitCount]);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    
    try {
      const result = await loginUser(data);
     
        toaster.create({
          description: "Login was successful",
          type: "success",
          closable: true,
        })
      // You would usually do: router.push('/dashboard') here
    } catch (err: any) {
      
      toaster.create({
          description: err.message,
          type: "error",
          closable: true,
        })
    }
  };
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Stack gap="5" w="full">
            {/* Input Group 1 */}
          <Controller
  name="username"
  control={control}
  rules={{ required: "Username and password are required"}}
  render={({ field }) => (
    <Box w="full">
      <Text textStyle="sm" fontWeight="medium" mb="2">Username</Text>
      <Input 
        {...field} // This handles value and onChange automatically
        placeholder="Emily" 
        maxLength={50}
        aria-invalid={!!errors.username} // Highlights red if error exists
      />
    
    </Box>
  )}
/>

            {/* Input Group 2 */}
       <Controller
  name="password"
  control={control}
  rules={{ 
    required: "Username and password are required", 
     
  }}
  render={({ field }) => (
    <Box w="full" position="relative">
      <Text textStyle="sm" fontWeight="medium" mb="2">Password</Text>
      <Input 
        {...field} 
        placeholder="*********"
        type={showPassword ? "text" : "password"} 
        aria-invalid={!!errors.password}
      />
     
      <Box onClick={() => setShowPassword(!showPassword)} position="absolute" left="90%" top="55%">
       {showPassword?<EyeOff size={20}/>:<Eye size={20}/>} 
      </Box>
      
    </Box>
  )}
/>

            <Flex justify="flex-end" w="full" textStyle="sm">
              <Link color="brand.greenTeal"  href="#">Forgot password?</Link>
            </Flex>

            <Button type="submit" loading={isSubmitting} bg="brand.yellowBtn"  size="xl" fontWeight="semibold" fontSize="md" w="full"
            rounded="md"
            position="relative"
      overflow="hidden" // Essential to hide the white shine when it's "outside"
      transition="all 0.4s ease"
     
      // 2. The White Shine Effect
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "50%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
        transform: "skewX(-25deg)", // Slants the white bar
        transition: "none"
       
      }}
      // Move the shine on hover
      _hover={{
        //color change
        bg: "#e5ad06",
        // move to top
        transform: "translateY(-4px)",
    //  Add a shadow to emphasize the lift
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
        _before: {
          //shines move left to right
          left: "120%",
          transition: "left 0.6s ease-in-out 0.3s",
        },
      }}
            >
              Sign In
              <ArrowRight/>
            </Button>

           
          </Stack>
</form>

</>
  )
}

export default LoginForm