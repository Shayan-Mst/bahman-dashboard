import useAddProduct from "@/src/features/auth/hooks/useAddProduct";
import { addProductInput } from "@/src/features/auth/types/product.types";
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
import { ImageIcon, Upload, PlusCircle , Check} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export const AddProductDialog = () => {
   
const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  // All the logic is hidden inside this hook
    const { mutate } = useAddProduct();


const { register, handleSubmit, reset, setValue } = useForm<addProductInput>({});

  // Watch the image field to show a preview or filename
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }

  };
   const onSubmit = (data:addProductInput) => {
    // data.image[0] contains the actual File object
    mutate(data)
    reset();
  };
  return (
    <DialogRoot size="lg" placement="center">
        <DialogTrigger asChild>
            <Button bg="blue.600" color="white" size="sm" _hover={{ bg: "blue.700" }}>
            <Icon as={PlusCircle} mr="2" /> Add Product
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
                <Field.Label>title</Field.Label>
                <Input {...register("title", { required: true })} name="title" placeholder="Enter product title" />
              </Field.Root>

              <Field.Root required>
                <Field.Label>Description</Field.Label>
                <Input {...register("description", { required: true })} name="description" placeholder="Enter product description" />
              </Field.Root>
            </HStack>
<HStack gap="4">
            <Field.Root required>
              <Field.Label>Stock</Field.Label>
              <Input {...register("stock", { required: true })} name="stock" type="number" placeholder="Enter stock quantity" />
            </Field.Root>
               <Field.Root required>
              <Field.Label>Category</Field.Label>
              <Input {...register("category", { required: true })} name="category" placeholder="Enter product category" />
            </Field.Root>
</HStack>
            <HStack gap="4">
                 <Field.Root required>
              <Field.Label>Discount Percentage</Field.Label>
              <Input {...register("discountPercentage", { required: true })} name="discountPercentage" type="number" placeholder="Enter discount percentage" />
            </Field.Root>
              
              <Field.Root required>
                <Field.Label>tags</Field.Label>
                <Input {...register("tags", { required: true })} name="tags" placeholder="Enter tags separated by commas" />
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
                  {...register("images", { onChange: handleFileChange })}
                  ref={(e) => {
                    register("images").ref(e);
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
                          setValue("images", {} as FileList[]); // Clear the form state
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