"use client";
import { Box, VStack, Text, Icon, Button, Separator, Input, Field, Flex } from "@chakra-ui/react";
import { UserCircle, Settings, LogOut } from "lucide-react";
import { 
  PopoverRoot, PopoverTrigger, PopoverContent, 
  PopoverBody ,PopoverPositioner
} from "@chakra-ui/react";
import { useLogout } from "@/src/features/auth/hooks/useLogout";

export const AccountPopover = () => {
    const { mutate: logout, isPending: isLoggingOut } = useLogout();
  return (
    <PopoverRoot 
      positioning={{ placement: "right-start", gutter: 20 }}
      
    >
      <PopoverTrigger asChild>
        <VStack p="3" borderRadius="md" cursor="pointer" color="gray.500" _hover={{ bg: "gray.50" }}>
          <Icon as={UserCircle} boxSize="5" />
          <Text fontSize="10px">Account</Text>
        </VStack>
      </PopoverTrigger>
      <PopoverPositioner>
      <PopoverContent bg="brand.dashboard" w="260px" p="0" borderRadius="xl" shadow="xl">
        
        <PopoverBody p="0">
          <Flex p="4" bg="gray.100" align="center" gap="3">
             <Box bg="blue.600" p="2" borderRadius="full" color="white">
                <Icon as={UserCircle} boxSize="4" />
             </Box>
             <Box overflow="hidden">
                <Text fontWeight="bold" fontSize="sm" truncate>Error Fixer</Text>
                <Text fontSize="xs" color="gray.500" truncate>dispersion00712@gmail.com</Text>
             </Box>
          </Flex>
          
          <VStack gap="0" p="1" align="stretch">
            <Button outline="none" opacity="0.7" justifyContent="start" size="sm" _hover={{bg:"gray.100", color:"blue.600"}}>
              <Icon as={Settings} mr="2" /> Manage Account
            </Button>
            <Button onClick={()=>logout()} loading={isLoggingOut} opacity="0.7"  justifyContent="start" size="sm" _hover={{bg:"red.100", color:"red.600"}}>
              <Icon as={LogOut} mr="2" /> Sign Out
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
      </PopoverPositioner>
    </PopoverRoot>
  );
};