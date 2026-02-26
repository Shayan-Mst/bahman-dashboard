"use client"
import { ProductsCard } from '@/src/components/cards/ProductsCard'
import { AddProductDialog } from '@/src/components/dialogue/AddProductDialog'
import { Box, Heading, VStack,Text, HStack, Stack } from '@chakra-ui/react'
import React from 'react'

const page = () => {
   
  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack gap={12} align="stretch">
        
        {/* Section 1: All Products */}
        <Box>
            <Stack direction={{ base: "column", md: "row" }} justify="space-between" align={{ md: "center" }} mb="8">
                  <Box>
                    <Heading size="lg" fontWeight="bold" letterSpacing="tight">Product Directory</Heading>
                    <Text color="gray.500" fontSize="sm">Manage your products.</Text>
                  </Box>
                 <AddProductDialog />
                </Stack>
          
          
          <ProductsCard />
        </Box>

        

      </VStack>
    </Box>
  )
}

export default page