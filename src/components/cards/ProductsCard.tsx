import { useGetAllProduct } from "@/src/features/auth/hooks/useGetAllProduct";
import { Product } from "@/src/features/auth/types/product.types";
import { Box, Text, Image, VStack, HStack, SimpleGrid, Center, Spinner, Button, IconButton, Span } from "@chakra-ui/react";
// Import icons (Lucide or Chakra Icons)
import { PercentCircle,Star , DollarSign, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { EditProductDialog } from "../dialogue/EditProductDialog";

export const ProductsCard = () => {

     const {data,isLoading, error, refetch} = useGetAllProduct();
      const [open, setIsOpen] = useState<boolean>(false);
       const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
       const [selectedProduct, setSelectedProduct] = useState<Product>();
        const [openEdit, setIsOpenEdit] = useState<boolean>(false);
     if (isLoading) {
         return (
           <Center h="60vh">
             <VStack gap="4">
               <Spinner size="xl" color="blue.500" />
               <Text color="gray.500" fontWeight="medium">Loading products...</Text>
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

       console.log(data?.products)
       
        // --- TRIGGER FOR DELETE ---
         const openDeleteDialog = (id: number) => {
           setSelectedProductId(id);
           setIsOpen(true);
         };
         const openEditDialog = (product: Product) => {
           
            setSelectedProduct(product);
            setIsOpenEdit(true);
         }
  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} gap={6} p={4}>
    {data?.products.map((product) => (
         <Box
      key={product.id}
      className="product-h"
      position="relative"
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.300"
      _hover={{ transform: "translateY(-6px)" }}
      transition="all 0.2s"
    >
        
      {/* Top Header Section (Greyish Background) */}
      <Box 
        bg="gray.50" 
        height="120px"
        width="100%" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        
        p={4}
      >
       
       
        <Box 
          p={3} 
          w="150px"
          h="150px"
         
       
        >
          <Image src={product.images[0]} alt="image" objectFit="contain" />
          {/* THE HOVER LAYER */}

       <Box
    position="absolute"
    top="0"
    left="0"
    height="120px" // Full height overlay
    width="100%" // Full width overlay
    className="overlay"
   backdropFilter="blur(3px)"
    zIndex={10}
   // Semi-transparent dark background
    display="flex"
    alignItems="center"
    justifyContent="center"
    gap={4}
    // THE ANIMATION LOGIC
    transform="translateY(-100%)" // Start hidden below
    transition="transform 0.4s" // "Bouncy" slide
    
  >
      <HStack gap="2" justify="center">
                     <IconButton 
                       bg="blue.500"
                       color="brand.dashboard"
                       size="xs" 
                       aria-label="Edit product"
                       onClick={() => openEditDialog(product)}
                       
                       _hover={{ color: "blue.600", bg: "blue.50" }}
                     >
                       <Pencil size={16} />
                     </IconButton>
   
                     {/* The actual button that triggers the state change */}
                     <IconButton 
                         bg="red.500"
                         color="brand.dashboard"
                        size="xs" 
                       aria-label="Delete product"
                       
                       _hover={{ color: "red.600", bg: "red.50" }}
                       onClick={() => openDeleteDialog(product.id)}
                     >
                  
                       <Trash2 size="8px" />
                     </IconButton>
                   </HStack>
         </Box>
        </Box>
      </Box>

      {/* Content Section */}
      <VStack align="start" p={5} gap={2}>
        <Text fontWeight="bold" fontSize="sm" >
          {product.title} <Span color="red.500" fontSize="xs">
          {product.category}
        </Span>
        </Text>
        <Text  fontSize="xs" lineClamp={2}>{product.description}</Text>
       
        {/* Stats Row */}
        <HStack gap={4} pt={2} width="full" justifyContent="space-between">
          <HStack gap={1} color="green.500">
            <DollarSign size={14}  />
            <Text fontSize="xs" fontWeight="medium">{product.price}</Text>
          </HStack>
          
          <HStack gap={1} color="gray.500">
            <PercentCircle size={14} />
            <Text fontSize="xs">{product.discountPercentage}</Text>
          </HStack>

          <HStack gap={1} color="yellow.400">
            <Star size={14} />
            <Text fontSize="xs" fontWeight="bold">{product.rating}</Text>
          </HStack>
        </HStack>
        <HStack gap={1} color="blue.400">
        {product.tags.map((tag)=>(
   
            <HStack key={tag} bg="blue.100" p={1} borderRadius={5}>
            <Text fontSize="xx-small" fontWeight="bold">#{tag}</Text>
            </HStack>
          
        ))}
         

       </HStack>
      </VStack>
    </Box>
    
    ))}
    {selectedProduct&&(
      <EditProductDialog
       product={selectedProduct}
        openEdit={openEdit}
        setIsOpenEdit={(val) => {
            setIsOpenEdit(val);
            if (!val) setSelectedProduct(undefined); // Cleanup on close
          }}
        
      />
    )}
   </SimpleGrid>
  );
};