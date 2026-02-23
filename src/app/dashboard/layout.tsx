// src/app/dashboard/layout.tsx
import { Flex, Box } from "@chakra-ui/react";
import {Sidebar} from "@/src/components/ui/sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Box flex="1" bg="gray.50" overflowY="auto" p="8">
        {children}
      </Box>
    </Flex>
  );
}