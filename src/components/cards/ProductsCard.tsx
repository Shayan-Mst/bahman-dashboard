import { useGetAllProduct } from "@/src/features/auth/hooks/useGetAllProduct";
import { Box, Text, Image, VStack, HStack, SimpleGrid, Center, Spinner, Button } from "@chakra-ui/react";
// Import icons (Lucide or Chakra Icons)
import { PercentCircle,Star , DollarSign } from "lucide-react";

export const ProductsCard = () => {

     const {data,isLoading, error, refetch} = useGetAllProduct();
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
  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} gap={6} p={4}>
    {data?.products.map((product) => (
         <Box
      key={product.id}
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
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        p={4}
      >
        <Box 
          p={3} 
          w="150px"
          h="150px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src={product.images[0]} alt="image" objectFit="contain" />
        </Box>
      </Box>

      {/* Content Section */}
      <VStack align="start" p={5} gap={2}>
        <Text fontWeight="bold" fontSize="md" >
          {product.title}
        </Text>
        
        <Text color="gray.500" fontSize="sm">
          at {product.category} category
        </Text>

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
   </SimpleGrid>
  );
};