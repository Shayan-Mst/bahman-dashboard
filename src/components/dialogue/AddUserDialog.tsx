import useAddUser from "@/src/features/auth/hooks/useAddUser";
import { AddUserInputs } from "@/src/features/auth/types/user.types";
import { 
  Button, 
  DialogRoot, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogBody, 
  DialogFooter, 
  DialogActionTrigger, 
  Input, 
  Stack, 
  HStack,
  Field, // Ensure this is imported
  DialogTrigger,
  Icon,
  DialogBackdrop,
  DialogPositioner,
  Portal,
  createListCollection,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  SelectPositioner,
  IconButton,
  Text,
  Box,
  SelectIndicator
} from "@chakra-ui/react";
import { ImageIcon, Upload, UserPlus , Check} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export const AddUserDialog = () => {
   
const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  // All the logic is hidden inside this hook
    const { mutate } = useAddUser();
const roles = createListCollection({
  items: [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ],
})

const genders = createListCollection({
  items: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ],
})

const { register, handleSubmit, reset, setValue, watch } = useForm<AddUserInputs>({
    defaultValues: { role: "user" }
  });

  // Watch the image field to show a preview or filename
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }

  };
   const onSubmit = (data: AddUserInputs) => {
    // data.image[0] contains the actual File object
    
   
    mutate(data)
    
   
    reset();
  };
  return (
    <DialogRoot size="lg" placement="center">
        <DialogTrigger asChild>
            <Button bg="blue.600" color="white" size="sm" _hover={{ bg: "blue.700" }}>
            <Icon as={UserPlus} mr="2" /> Add User
          </Button>
        </DialogTrigger>
          <Portal>
                     <DialogBackdrop />
                <DialogPositioner>
      <DialogContent bg="brand.dashboard" borderRadius="xl"  overflow="hidden">
         <form onSubmit={handleSubmit(onSubmit)}>
            
        
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
       
        <DialogBody>
          <Stack gap="4">
            <HStack gap="4">
              {/* FIXED: Moved label to Field.Label */}
              <Field.Root required>
                <Field.Label>First Name</Field.Label>
                <Input name="firstName" placeholder="John" />
              </Field.Root>

              <Field.Root required>
                <Field.Label>Last Name</Field.Label>
                <Input name="lastName" placeholder="Doe" />
              </Field.Root>
            </HStack>
<HStack gap="4">
            <Field.Root required>
              <Field.Label>Email</Field.Label>
              <Input name="email" type="email" placeholder="john@example.com" />
            </Field.Root>
               <Field.Root required>
              <Field.Label>Role</Field.Label>
              <SelectRoot collection={roles} size="sm">
                <SelectTrigger>
                  <SelectValueText placeholder="Select a role" />
                  <SelectIndicator />
                </SelectTrigger>
                 
                 <Portal>  
                    <SelectPositioner> 
                <SelectContent bg="brand.dashboard" >
                    
                  {roles.items.map((role) => (
                    <SelectItem  _hover={{ bg: "gray.200" }}  item={role} key={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                 
                </SelectContent>
                </SelectPositioner>
                 </Portal>
              </SelectRoot>
            </Field.Root>
</HStack>
            <HStack gap="4">
                 <Field.Root required>
              <Field.Label>Gender</Field.Label>
              <SelectRoot collection={genders} size="sm">
                <SelectTrigger>
                  <SelectValueText placeholder="Select a gender" />
                  <SelectIndicator />
                </SelectTrigger>
                 
                 <Portal>  
                    <SelectPositioner> 
                <SelectContent bg="brand.dashboard" >
                    
                  {genders.items.map((gender) => (
                    <SelectItem  _hover={{ bg: "gray.200" }}  item={gender} key={gender.value}>
                      {gender.label}
                    </SelectItem>
                  ))}
                 
                </SelectContent>
                </SelectPositioner>
                 </Portal>
              </SelectRoot>
            </Field.Root>
              
              <Field.Root required>
                <Field.Label>Birth Day</Field.Label>
                <Input name="birthDate" type="date" />
              </Field.Root>
            </HStack>
{/* Image Input Section */}
              <Field.Root>
                <Field.Label>
                    
                   
                    {fileName?<Box> Uploaded Successfuly <Icon as={Check} color="green.500"/></Box> : null}
                </Field.Label>
                
                {/* Hidden Native Input */}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  {...register("image", { onChange: handleFileChange })}
                  ref={(e) => {
                    register("image").ref(e);
                    // @ts-ignore - linking ref for the button trigger
                    fileInputRef.current = e;
                  }}
                />

                <HStack gap="3" width="full">
                  <Button 
                    variant="outline" 
                    color="brand.dark"
                    _hover={{ bg:"brand.dashboard" }}
                    onClick={() => fileInputRef.current?.click()}
                    width="full"
                    borderStyle="dashed"
                    height="12"
                  >
                    <Upload size={16} style={{ marginRight: '8px' }} />
                    {fileName ? "Change Image": "Upload Image"}
                  </Button>
                  
                  {fileName && (
                    <HStack bg="gray.50" px="3" py="1" borderRadius="md" border="1px solid" borderColor="gray.200">
                      <ImageIcon size={14} />
                      <Text fontSize="xs" maxW="100px" truncate>{fileName}</Text>
                      <IconButton 
                        variant="ghost" 
                        size="xs" 
                        onClick={() => {
                          setFileName("");
                          setValue("image", {} as FileList); // Clear the form state
                        }}
                      >
                        
                      </IconButton>
                    </HStack>
                  )}
                </HStack>
              </Field.Root>
       
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" color="brand.dark" _hover={{ color: "brand.dashboard" }}>Cancel</Button>
          </DialogActionTrigger>
          <Button type="submit" colorPalette="blue">
            Save User
          </Button>
        </DialogFooter>
             </form>
      </DialogContent>
      </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
};