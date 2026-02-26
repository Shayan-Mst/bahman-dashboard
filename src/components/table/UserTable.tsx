import { IconButton, Text, Box, HStack, Icon, Center, VStack, Spinner, Button, TableCell, AvatarRoot, AvatarImage, AvatarFallback, TableRow, TableColumnHeader, TableHeader, TableBody, TableRoot } from "@chakra-ui/react";
import { Pencil, ShieldCheck, Trash2 } from "lucide-react";
import { useGetAllUser } from "@/src/features/auth/hooks/useGetAllUser";
import  DeleteUserDialog  from "@/src/components/dialogue/DeleteUserDialog"; // Ensure this is a named import if you exported as const
import { useState } from "react";
import { EditUserDialog } from "../dialogue/EditUserDialog";
import { EditUserInputs, User } from "@/src/features/auth/types/user.types";

export const UserTable = () => {
  const { data, isLoading, error, refetch } = useGetAllUser();
  
  // --- NEW STATE FOR SINGLE DIALOG ---
  const [open, setIsOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User>();
   const [openEdit, setIsOpenEdit] = useState<boolean>(false);
  if (isLoading) {
    return (
      <Center h="60vh">
        <VStack gap="4">
          <Spinner size="xl" color="blue.500" />
          <Text color="gray.500" fontWeight="medium">Loading users...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="60vh">
        <VStack gap="4">
          <Text color="red.500">Could not load users.</Text>
          <Button onClick={() => refetch()} border="2px solid" borderColor="brand.dark" size="lg">
            Try Again
          </Button>
        </VStack>
      </Center>
    );
  }


  // --- TRIGGER FOR DELETE ---
  const openDeleteDialog = (id: number) => {
    setSelectedUserId(id);
    setIsOpen(true);
  };
  const openEditDialog = (user:User) => {
    const extractUser = {...user}
     setSelectedUser(extractUser);
     setIsOpenEdit(true);
  }

  return (
    <Box borderRadius="xl" border="1px solid" borderColor="gray.200" shadow="sm" overflow="hidden">
      <TableRoot variant="line" tableLayout="fixed" size="md" interactive>
        <TableHeader bg="gray.50">
          <TableRow bg="brand.dashboard">
            <TableColumnHeader color="brand.dark" px="6" py="4">Name and Email</TableColumnHeader>
            <TableColumnHeader textAlign="center" color="brand.dark">Role</TableColumnHeader>
            <TableColumnHeader textAlign="center" color="brand.dark">Gender</TableColumnHeader>
            <TableColumnHeader textAlign="center" color="brand.dark">Birthday</TableColumnHeader>
            <TableColumnHeader textAlign="center" color="brand.dark">Phone</TableColumnHeader>
            <TableColumnHeader textAlign="end" color="brand.dark" px="6">Modify Users</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.users.map((user) => (
            <TableRow key={user.id} bg={user.id % 2 ? "gray.100" : "brand.dashboard"} borderTop="2px solid" borderColor="gray.200" transition="background 0.2s">
              <TableCell textAlign="start" px="6" py="4">
                <HStack gap="3">
                  <AvatarRoot zIndex="0" size="sm">
                    <AvatarImage src={user.image} />
                    <AvatarFallback name={user.firstName} />
                  </AvatarRoot>
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">{user.firstName} {user.lastName}</Text>
                    <Text fontSize="xs" color="gray.500">{user.email}</Text>
                  </Box>
                </HStack>
              </TableCell>
              <TableCell textAlign="center">
                <VStack gap="1">
                  {user.role === "Admin" && <Icon as={ShieldCheck} color="blue.500" boxSize="3" />}
                  <Text fontSize="sm">{user.role}</Text>
                </VStack>
              </TableCell>
              <TableCell textAlign="center"><Text fontSize="sm">{user.gender}</Text></TableCell>
              <TableCell textAlign="center"><Text fontSize="sm">{user.birthDate}</Text></TableCell>
              <TableCell textAlign="center"><Text fontSize="sm">{user.phone}</Text></TableCell>
              
              <TableCell textAlign="right" px="6">
                <HStack gap="2" justify="flex-end">
                  <IconButton 
                    variant="ghost" 
                    size="sm" 
                    aria-label="Edit user"
                    onClick={() => openEditDialog(user)}
                    color="gray.600"
                    _hover={{ color: "blue.600", bg: "blue.50" }}
                  >
                    <Pencil size={16} />
                  </IconButton>

                  {/* The actual button that triggers the state change */}
                  <IconButton 
                     
                     size="sm" 
                    aria-label="Delete user"
                    color="gray.600"
                    _hover={{ color: "red.600", bg: "red.50" }}
                    onClick={() => openDeleteDialog(user.id)}
                  >
               
                    <Trash2 size={16} />
                  </IconButton>
                </HStack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>

      {/* --- RENDER DIALOG ONLY ONCE OUTSIDE THE LOOP --- */}
      {selectedUserId && (
        <DeleteUserDialog 
          id={selectedUserId} 
          open={open} 
          setIsOpen={(val) => {
            setIsOpen(val);
            if (!val) setSelectedUserId(null); // Cleanup on close
          }}
        />
         
      )}
        {selectedUser && (
        <EditUserDialog 
          user={selectedUser} 
          openEdit={openEdit} 
          setIsOpenEdit={(val) => {
            setIsOpenEdit(val);
            if (!val) setSelectedUser(undefined); // Cleanup on close
          }}
        />
         
      )}
    </Box>
  );
};