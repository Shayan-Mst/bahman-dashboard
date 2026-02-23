"use client";
import { VStack, Icon, Button, Input, Textarea, Field, Stack } from "@chakra-ui/react";
import { HelpCircle, Send } from "lucide-react";
import { 
  PopoverRoot, PopoverTrigger, PopoverContent, 
  PopoverBody, PopoverPositioner, PopoverHeader
} from "@chakra-ui/react";

export const SupportPopover = () => {
  return (
    <PopoverRoot 
      positioning={{ placement: "right-start", gutter: 20 }} // Increased gutter to clear the sidebar
     
    >
           
      <PopoverTrigger asChild>
        <VStack p="3" borderRadius="md" cursor="pointer" color="gray.500" _hover={{ bg: "gray.50" }}>
          <Icon as={HelpCircle} boxSize="5" />
          
        </VStack>
      
      </PopoverTrigger>
        
      <PopoverPositioner>
      <PopoverContent bg="brand.dashboard" w="320px" borderRadius="xl" shadow="2xl" zIndex="popover">
        
        <PopoverHeader borderBottomWidth="1px" borderColor="gray.200" pt="4" px="4" pb="3" fontWeight="bold">
          Help & Support
        </PopoverHeader>
        <PopoverBody p="4">
          <Stack gap="4">
            <Field.Root required>
              <Field.Label fontSize="xs" >Name</Field.Label>
              <Input placeholder="Enter subject" size="sm" />
            </Field.Root>
            
            <Field.Root required>
              <Field.Label fontSize="xs">Description</Field.Label>
              <Textarea 
                placeholder="How can we help?" 
                size="sm" 
                rows={4}
                resize="none"
              />
            </Field.Root>

            <Button bg="blue.600" color="white" size="sm" w="full">
              Submit
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
      </PopoverPositioner>
    </PopoverRoot>
  );
};