"use client";
import { Box, Flex, VStack, Heading, Text, Input, Button, Link, Stack, Center } from "@chakra-ui/react";
import AnimatedCanvas from "@/src/components/ui/dot-travel-animation/dot-travel-animation";

const page = () => {
  
  return (
    <Center bg="brand.login"  backgroundImage="linear-gradient(#e2e4df 1px, transparent 1px),
        linear-gradient(90deg, #e2e4df 1px, transparent 1px) "
      backgroundSize="40px 40px" className="bg-img-login" minH="100vh">

<Flex bg="brand.loginBox" h="80vh" borderRadius="xl"
  border="1px solid"
  borderColor="#e9ece6" // This exact color separates the box from the grid
 boxShadow="0 10px 30px -10px rgba(0, 0, 0, 0.05)" // Very soft, light shadow
  overflow="hidden" rounded="md" direction={{ base: "column", md: "row" }} >
      
      {/* LEFT: Visual Section */}
      <Box 
        flex="1.2" 
        position="relative" 
        display={{ base: "none", md: "flex" }} 
        alignItems="center" 
        justifyContent="center"
        overflow="hidden"
      >
        <Box position="absolute"  inset="0" zIndex="0">
          <AnimatedCanvas />
        </Box>

        <VStack zIndex="1" gap="4" px="12" textAlign="center">
          <Heading size="2xl" fontWeight="bold" letterSpacing="tight">
            <Text as="span" color="blue.500">E</Text>commerce
          </Heading>
          <Text opacity="0.6" fontSize="sm" maxW="md">
           Sign in to access your personal styling platform and curate your next signature look.
          </Text>
        </VStack>
      </Box>

      {/* RIGHT: Form Section */}
      <Flex 
        flex="1" 
        align="center" 
        justify="center" 
        px={{ base: "6", md: "12" }}
        border="1px solid"
        borderColor="brand.grid"
      >
        <VStack gap="10" w="full" maxW="md" align="start">
          <Box>
            <Heading size="3xl" mb="2">Welcome back</Heading>
            <Text color="fg.muted">Enter your credentials to access your account.</Text>
          </Box>

          <Stack gap="5" w="full">
            {/* Input Group 1 */}
            <Box w="full">
              <Text textStyle="sm" fontWeight="medium" mb="2" color="fg.emphasized">
                Email 
              </Text>
              <Input placeholder="you@example.com" size="lg" variant="outline" />
            </Box>

            {/* Input Group 2 */}
            <Box w="full">
              <Text textStyle="sm" fontWeight="medium" mb="2" color="fg.emphasized">
                Password
              </Text>
              <Input type="password" placeholder="••••••••" size="lg" variant="outline" />
            </Box>

            <Flex justify="flex-end" w="full" textStyle="sm">
              <Link color="brand.greenTeal"  href="#">Forgot password?</Link>
            </Flex>

            <Button bg="brand.yellowBtn" size="xl" fontSize="md" w="full">
              Sign In
            </Button>

           
          </Stack>

          <Text textStyle="sm" color="fg.muted" w="full" textAlign="center">
            Don't have an account? <Link color="blue.600" fontWeight="bold" href="#">Sign up</Link>
          </Text>
        </VStack>
      </Flex>
    </Flex>
    </Center>
 
  )
}

export default page