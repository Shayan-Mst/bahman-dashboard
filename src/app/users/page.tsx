"use client";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";
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

    
      {/* 3. The Data Table */}
      <UserTable />
    </Box>
  );
}