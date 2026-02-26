
import useEditUser from "@/src/features/auth/hooks/useEditUser";
import { EditUserInputs, User } from "@/src/features/auth/types/user.types";
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
import { ImageIcon, Upload, Check} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface EditUserDialogProps {
  user?: User;
  openEdit: boolean;
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditUserDialog = ({user,openEdit,setIsOpenEdit}:EditUserDialogProps) => {
   
const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
 
  const formatDateForInput = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  
  // Check if date is valid to avoid "Invalid Date" errors
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`; // Returns "YYYY-MM-DD"
};

const { control, register, handleSubmit, reset, setValue , formState: { dirtyFields } } = useForm<EditUserInputs>({
    defaultValues: { 
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
      gender: user?.gender,
      phone : user?.phone,
      birthDate: formatDateForInput(user?.birthDate || "")
    }
  });

  useEffect(() => {
    // If the user already has an image URL, show a placeholder filename
    if (user?.image) setFileName("Existing image");
  }, [user?.image]);
  // All the logic is hidden inside this hook
    const { mutate } = useEditUser();
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


  // Watch the image field to show a preview or filename
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }

  };
   const onSubmit = (data: EditUserInputs) => {
    // data.image[0] contains the actual File object
     
     const filteredData = Object.keys(dirtyFields).reduce((acc, key) => {
    // We cast the key as a keyof our inputs to keep TypeScript happy
    const fieldName = key as keyof EditUserInputs;
    
    // Assign the value from the form data to our "changes" object
    (acc as any)[fieldName] = data[fieldName];
    
    return acc;
  }, {} as Partial<EditUserInputs>);


  const payload = {id:user?.id,...filteredData} as EditUserInputs

     mutate(payload)
     setIsOpenEdit(false)
     reset();
  };
  return (
    <DialogRoot open={openEdit} onOpenChange={() => setIsOpenEdit(openEdit)} size="md" placement="center">
        <DialogTrigger asChild>
            
        </DialogTrigger>
          <Portal>
                     <DialogBackdrop />
                <DialogPositioner>
      <DialogContent bg="brand.dashboard" borderRadius="xl"  overflow="hidden">
         <form onSubmit={handleSubmit(onSubmit)}>
            
        
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
       
        <DialogBody>
          <Stack gap="4">
            <HStack gap="4">
              {/* FIXED: Moved label to Field.Label */}
              <Field.Root required>
                <Field.Label>First Name</Field.Label>
                <Input  {...register("firstName")} name="firstName" placeholder="John" />
              </Field.Root>

              <Field.Root required>
                <Field.Label>Last Name</Field.Label>
                <Input  {...register("lastName")} name="lastName" placeholder="Doe" />
              </Field.Root>
            </HStack>
               <Field.Root required>
                <Field.Label>Phone</Field.Label>
                <Input  {...register("phone")} name="phone" placeholder="98 5251 654" />
              </Field.Root>
<HStack gap="4">
            <Field.Root required>
              <Field.Label>Email</Field.Label>
              <Input  {...register("email")} name="email" type="email" placeholder="john@example.com" />
            </Field.Root>
               <Field.Root required>
              <Field.Label>Role</Field.Label>
             <Controller name="role" control={control}
             render={({field})=>(
               <SelectRoot {...field} value={[field.value]} 
               onValueChange={(details) => {
        // This notifies React Hook Form that the field is now "dirty"
        field.onChange(details.value[0]); 
      }}
      onBlur={field.onBlur}
               collection={roles} size="sm">
                <SelectTrigger>
                  <SelectValueText  placeholder="Select a role" />
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
              </SelectRoot>)}
             
             />
            
            </Field.Root>
</HStack>
            <HStack gap="4">
                 <Field.Root required>
              <Field.Label>Gender</Field.Label>
             <Controller name="gender" control={control}
             render={({field})=>(
               <SelectRoot {...field} value={[field.value]} 
               onValueChange={(details) => {
        field.onChange(details.value[0]); 
      }}
      onBlur={field.onBlur}
               collection={genders} size="sm">
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
              </SelectRoot>)}
             />
            </Field.Root>
              
              <Field.Root required>
                <Field.Label>Birth Day</Field.Label>
                <Controller control={control} name="birthDate" render={({ field }) => 
                <Input  {...field} onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value || ""}  type="date" />} />
                
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
            <Button onClick={()=>setIsOpenEdit(false)} variant="outline" color="brand.dark" _hover={{ color: "brand.dashboard" }}>Cancel</Button>
          </DialogActionTrigger>
          <Button disabled={Object.keys(dirtyFields).length == 0} type="submit" colorPalette="blue">
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