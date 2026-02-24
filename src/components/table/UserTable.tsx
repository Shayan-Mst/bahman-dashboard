import { Table, Avatar, IconButton, Text, Box, HStack, Icon, Center, VStack, Spinner, Button , TableCell, AvatarRoot, AvatarImage, AvatarFallback, TableRow, TableColumnHeader, TableHeader, TableBody, TableRoot } from "@chakra-ui/react";
import { Pencil, Trash2, ShieldCheck } from "lucide-react";
import { useGetAllUser } from "@/src/features/auth/hooks/useGetAllUser";





export const UserTable = () => {
    const { data, isLoading, error, refetch, isRefetching } = useGetAllUser();
   
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
    <Box borderRadius="xl" border="1px solid" borderColor="gray.200" shadow="sm" overflow="hidden">
      <TableRoot  variant="line" tableLayout="fixed"  size="md" interactive>
        <TableHeader bg="gray.50">
          <TableRow bg="brand.dashboard"  >
            <TableColumnHeader  color="brand.dark" px="6" py="4">Name and Email</TableColumnHeader>
            <TableColumnHeader textAlign="center"  color="brand.dark">Role</TableColumnHeader>
            <TableColumnHeader  textAlign="center"  color="brand.dark">Gender</TableColumnHeader>
            <TableColumnHeader  textAlign="center"  color="brand.dark">Birthday</TableColumnHeader>
            <TableColumnHeader  textAlign="center"  color="brand.dark">Phone</TableColumnHeader>
            <TableColumnHeader  textAlign="end"  color="brand.dark"  px="6">Modify Users</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.users.map((user) => (
            <TableRow key={user.id} bg={user.id%2 ? "gray.100" : "brand.dashboard"}  borderTop="2px solid" borderColor="gray.200"  transition="background 0.2s">
              <TableCell textAlign="start" px="6" py="4">
                <HStack gap="3">
                  <AvatarRoot size="sm">
                    <AvatarImage src={user.image} />
                    <AvatarFallback name={user.firstName} />
                  </AvatarRoot>
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">{user.firstName} {user.lastName}</Text>
                    <Text fontSize="xs" color="gray.500">{user.email}</Text>
                  </Box>
                </HStack>
              </TableCell>
              <TableCell>
               
                <VStack gap="1">
                  {user.role === "Admin" && <Icon as={ShieldCheck} color="blue.500" boxSize="3" />}
                  <Text fontSize="sm">{user.role}</Text>
                </VStack>
                </TableCell>
              <TableCell>
                <VStack gap="1">
                  
                  <Text fontSize="sm">{user.gender}</Text>
                </VStack>
                </TableCell>
                 <TableCell>
                <VStack gap="1">
                  
                  <Text fontSize="sm">{user.birthDate}</Text>
                </VStack>
                </TableCell>
              <TableCell>
                 <VStack gap="1">
                  
                  <Text fontSize="sm">{user.phone}</Text>
                </VStack>
              </TableCell>
              
              
              {/* --- ACTION BUTTONS --- */}
              <TableCell textAlign="right" px="6">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Box>
  );
};