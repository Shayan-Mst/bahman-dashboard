"use client";
import { Box, VStack, Icon, Text } from "@chakra-ui/react";
import { LayoutDashboard, Users, Package, Plus } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { AccountPopover } from "@/src/components/popover/AccountPopover";
import { SupportPopover } from "@/src/components/popover/SupportPopover";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Users", icon: Users, path: "/users" },
  { name: "Products", icon: Package, path: "/products" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Box
      as="nav"
      w="80px"
      h="100vh"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.100"
      py="4"
      position="sticky"
      top="0"
    >
      <VStack gap="6" h="full">
        {/* Logo Section */}
        <Box mb="2">
          <Box 
            bg="blue.600" 
            w="40px" 
            h="40px" 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            borderRadius="xl"
          >
             <Text color="white" fontWeight="bold" fontSize="lg">P</Text>
          </Box>
        </Box>

        {/* Action Button */}
        <Box 
          cursor="pointer" 
          p="2" 
          borderRadius="full" 
          border="1px solid" 
          borderColor="gray.200"
          _hover={{ bg: "gray.50", borderColor: "blue.500", color: "blue.600" }}
          transition="all 0.2s"
        >
          <Icon as={Plus} boxSize="5" />
        </Box>

        {/* Navigation Links (Routing) */}
        <VStack gap="2" w="full" px="2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <NextLink 
      key={item.name} 
      href={item.path} 
      style={{ width: '100%', textDecoration: 'none' }}
    >
                <VStack
                  p="3"
                  borderRadius="lg"
                  bg={isActive ? "blue.50" : "transparent"}
                  color={isActive ? "blue.600" : "gray.400"}
                  _hover={!isActive ? { bg: "gray.50", color: "gray.600" } : {}}
                  transition="all 0.2s"
                  gap="1"
                >
                  <Icon as={item.icon} boxSize="5" />
                  <Text fontSize="10px" fontWeight="bold">
                    {item.name}
                  </Text>
                </VStack>
              </NextLink>
            );
          })}
        </VStack>

        {/* Bottom Section (Popovers) */}
        <VStack gap="2" w="full" px="2" mt="auto">
          {/* Account Popover */}
          <AccountPopover />
          
          {/* Support Popover */}
          <SupportPopover />
        </VStack>
      </VStack>
    </Box>
  );
};