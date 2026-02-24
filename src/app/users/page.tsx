"use client";
import { Box, Heading, Text, Stack, HStack, Button, Input, Icon } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { UserTable } from "./../../components/table/UserTable";
import { AddUserDialog } from "@/src/components/dialogue/AddUserDialog";

export default function UsersPage() {
  return (
    <Box p="8">
      {/* 1. Header Area */}
      <Stack direction={{ base: "column", md: "row" }} justify="space-between" align={{ md: "center" }} mb="8">
        <Box>
          <Heading size="lg" fontWeight="bold" letterSpacing="tight">User Directory</Heading>
          <Text color="gray.500" fontSize="sm">Manage your team members and their account permissions.</Text>
        </Box>
       <AddUserDialog />
      </Stack>

      {/* 2. Search & Filter Bar */}
      <Box bg="white" p="4" borderRadius="xl" border="1px solid" borderColor="gray.200" mb="6" shadow="sm">
        <HStack gap="4">
          <Box position="relative" flex="1">
            <Input 
              placeholder="Search users..." 
              pl="10" 
              bg="gray.50" 
              border="none" 
              _focus={{ bg: "white", ring: "1px", ringColor: "blue.500" }}
            />
            <Box position="absolute" left="3" top="50%" transform="translateY(-50%)">
              <Icon as={Search} color="gray.400" />
            </Box>
          </Box>
          
        </HStack>
      </Box>

      {/* 3. The Data Table */}
      <UserTable />
    </Box>
  );
}