"use client";
import {
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogCloseTrigger,
  DialogTrigger,
  Icon,
  Portal,
  Dialog,
  DialogBackdrop,
  DialogPositioner,
  CloseButton,
} from "@chakra-ui/react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Avatar,
  Button,
  Badge,
  Switch,
  Separator,
} from "@chakra-ui/react";
import { Settings } from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountDialog = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <DialogRoot  size="lg" placement="center">
        <DialogTrigger asChild>
            <Button outline="none" opacity="0.7" justifyContent="start" size="sm" _hover={{bg:"gray.100", color:"blue.600"}}>
                         <Icon as={Settings} mr="2" /> Manage Account
                       </Button>
        </DialogTrigger>
        <Portal>
             <DialogBackdrop />
        <DialogPositioner>
      <DialogContent 
        maxW="900px" 
        h="700px" 
        borderRadius="xl" 
        overflow="hidden" 
        bg="white"
      >
        {/* Header */}
        <Flex justify="space-between" align="center" px="6" py="4">
          <Text fontWeight="bold" fontSize="lg">Settings</Text>
           <DialogCloseTrigger asChild>
              <CloseButton variant="solid" outline="none" size="md" />
            </DialogCloseTrigger>
        </Flex>

        <DialogBody p="0" display="flex" h="full">
          {/* Left Sidebar */}
          <Box w="220px" bg="gray.100" p="4">
            <Text fontSize="xs" fontWeight="bold" color="gray.400" mb="4" letterSpacing="wider">
              GENERAL
            </Text>
            <VStack align="stretch" gap="1">
              {["Profile", "Onboarding"].map((tab) => (
                <Box
                  key={tab}
                  px="3"
                  py="2"
                  borderRadius="md"
                  cursor="pointer"
                  bg={activeTab === tab ? "white" : "transparent"}
                  color={activeTab === tab ? "blue.600" : "gray.600"}
                  onClick={() => setActiveTab(tab)}
                  transition="all 0.2s"
                >
                  <Text fontSize="sm" fontWeight={activeTab === tab ? "medium" : "normal"}>
                    {tab}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Right Content Area */}
          <Box flex="1" p="8" overflowY="auto">
            <VStack align="stretch" gap="8">
              {/* Profile Details Section */}
              <Box>
                <Text fontSize="xl" fontWeight="bold" mb="6">Profile details</Text>
                <Flex justify="space-between" align="center">
                  <HStack gap="4">
                    <Avatar.Root size="lg" bg="blue.600">
                      <Avatar.Fallback name="Error Fixer" />
                      <Avatar.Image src="/path-to-your-lock-icon.png" />
                    </Avatar.Root>
                    <Text fontWeight="medium" fontSize="md">Error Fixer</Text>
                  </HStack>
                  <Button outline="solid" size="sm" borderRadius="md" px="4" _hover={{outline:"blue.600", color:"blue.600"}}>
                    Update profile
                  </Button>
                </Flex>
              </Box>

              <Box mt="4">
                <Text fontSize="sm" color="gray.500" mb="2">Email addresses</Text>
                <Flex justify="space-between" align="center">
                  <Text fontSize="md">dispersion00712@gmail.com</Text>
                  <Badge color="blue.600" bg="blue.100"  borderRadius="full" px="3" py="1" fontSize="xs">
                    PRIMARY
                  </Badge>
                </Flex>
              </Box>

              <Separator />

              {/* Subscription Details Section */}
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb="4">Account Details</Text>
                <VStack align="stretch" gap="3">
                  <Flex justify="space-between">
                    <Text color="gray.600">Username:</Text>
                    <Text fontWeight="bold" color="blue.600">Free</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color="gray.600">Gender:</Text>
                    <Text fontWeight="bold" color="blue.600">0</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color="gray.600">Phone:</Text>
                    <Text fontWeight="bold" color="blue.600">3</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color="gray.600">Birthdate:</Text>
                    <Text fontWeight="bold" color="blue.600">3</Text>
                  </Flex>
                </VStack>
                <Flex justify="flex-end" mt="6">
                  <Button bg="blue.600" color="white" _hover={{ bg: "blue.700" }} px="6">
                    Upgrade Subscription
                  </Button>
                </Flex>
              </Box>

              <Separator />

              {/* Notifications Section */}
              <Box pb="10">
                <Text fontSize="lg" fontWeight="bold" mb="4">Notifications</Text>
                <Flex justify="space-between" align="center">
                  <Text color="gray.600">Email newsletters</Text>
                  <Switch.Root colorPalette="blue" size="md">
                    <Switch.HiddenInput />
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                  </Switch.Root>
                </Flex>
              </Box>
            </VStack>
          </Box>
        </DialogBody>
        
      </DialogContent>
      </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
};