import { Table, Badge, Avatar, IconButton, Text, Box, HStack, Icon, Center, VStack, Spinner, Button } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Pencil, Trash2, ShieldCheck } from "lucide-react";
import { toaster } from "../ui/toaster";
import { useGetAllUser } from "@/src/features/auth/hooks/useGetAllUser";

const USERS = [
  { id: 1, name: "Arthur Morgan", email: "arthur@van-der-linde.com", role: "Admin", status: "Active", img: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Sadie Adler", email: "sadie@bounty-hunt.com", role: "Editor", status: "Active", img: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "John Marston", email: "john@beechers-hope.com", role: "User", status: "Inactive", img: "https://i.pravatar.cc/150?u=3" },
];



export const UserTable = () => {
    const { data, isLoading, error, refetch, isRefetching } = useGetAllUser();
    console.log(data)
  // 2. Handle Loading State
  if (isLoading) {
    return (
      <Center h="60vh">
        <VStack gap="4">
          <Spinner size="xl" color="blue.500"  />
          <Text color="gray.500" fontWeight="medium">Loading users...</Text>
        </VStack>
      </Center>
    );
  }

  // 3. Handle Error State (Manual fallback even though hook has a toaster)
  if (error) {
    return (
      <Center h="60vh">
        <VStack gap="4">
          <Text color="red.500">Could not load users.</Text>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            Try Again
          </Button>
        </VStack>
      </Center>
    );
  }
  const handleEdit = (id: number) => {
    console.log("Opening edit modal for user:", id);
    // You would typically open a Modal here
  };

  const handleDelete = (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      console.log("Deleting user:", id);
      // Call your API delete mutation here
    }
  };

  return (
    <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200" shadow="sm" overflow="hidden">
      <Table.Root  size="md">
        <Table.Header bg="gray.50">
          <Table.Row bg="brand.dashboard">
            <Table.ColumnHeader  color="brand.dark" px="6" py="4">Name</Table.ColumnHeader>
            <Table.ColumnHeader  color="brand.dark">Role</Table.ColumnHeader>
            <Table.ColumnHeader  color="brand.dark">Status</Table.ColumnHeader>
            <Table.ColumnHeader  color="brand.dark" textAlign="right" px="6">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.users.map((user) => (
            <Table.Row key={user.id} bg="brand.dashboard" borderTop="2px solid" borderColor="gray.200" _hover={{ bg: "gray.50/50" }} transition="background 0.2s">
              <Table.Cell px="6" py="4">
                <HStack gap="3">
                  <Avatar.Root size="sm">
                    <Avatar.Image src={user.image} />
                    <Avatar.Fallback name={user.firstName} />
                  </Avatar.Root>
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">{user.firstName} {user.lastName}</Text>
                    <Text fontSize="xs" color="gray.500">{user.email}</Text>
                  </Box>
                </HStack>
              </Table.Cell>
              <Table.Cell>
                <HStack gap="1">
                  {user.role === "Admin" && <Icon as={ShieldCheck} color="blue.500" boxSize="3" />}
                  <Text fontSize="sm">{user.role}</Text>
                </HStack>
              </Table.Cell>
              <Table.Cell>
               
              </Table.Cell>
              
              {/* --- ACTION BUTTONS --- */}
              <Table.Cell textAlign="right" px="6">
                <HStack gap="2" justify="flex-end">
                  <IconButton 
                    variant="ghost" 
                    size="sm" 
                    aria-label="Edit user"
                    onClick={() => handleEdit(user.id)}
                    color="gray.600"
                    _hover={{ color: "blue.600", bg: "blue.50" }}
                  >
                    <Pencil size={16} />
                  </IconButton>

                  <IconButton 
                    variant="ghost" 
                    size="sm" 
                    aria-label="Delete user"
                    onClick={() => handleDelete(user.id)}
                    color="gray.600"
                    _hover={{ color: "red.600", bg: "red.50" }}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};