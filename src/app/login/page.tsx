"use client";
import { Box, Flex, VStack, Heading, Text, Input, Button, Link, Stack, Center } from "@chakra-ui/react";
import AnimatedCanvas from "@/src/components/ui/dot-travel-animation/dot-travel-animation";

const page = () => {
    const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 1.56-1.56 2.73-3.21 2.73-2.11 0-3.81-1.7-3.81-3.81s1.7-3.81 3.81-3.81c.91 0 1.74.32 2.39.85l2.03-2.03C18.66 6.64 16.5 5.5 14.18 5.5 9.4 5.5 5.5 9.4 5.5 14.18s3.9 8.68 8.68 8.68c4.54 0 8.44-3.1 8.44-8.68 0-.58-.05-1.15-.15-1.68z"/>
  </svg>
);
  return (
    <Center minH="100vh">
<Flex h="80vh" direction={{ base: "column", md: "row" }} >
      
      {/* LEFT: Visual Section */}
      <Box 
        flex="1.2" 
        bg="white" 
        position="relative" 
        display={{ base: "none", md: "flex" }} 
        alignItems="center" 
        justifyContent="center"
        overflow="hidden"
      >
        <Box position="absolute" inset="0" zIndex="0">
          <AnimatedCanvas />
        </Box>

        <VStack zIndex="1" gap="6" px="12" textAlign="center">
          <Heading size="4xl" color="white" fontWeight="bold" letterSpacing="tight">
            Design your <Text as="span" color="blue.500">Future</Text>
          </Heading>
          <Text color="whiteAlpha.700" fontSize="xl" maxW="md">
            The next generation of AI-driven recruitment platforms. 
            Connect, prepare, and succeed.
          </Text>
        </VStack>
      </Box>

      {/* RIGHT: Form Section */}
      <Flex 
        flex="1" 
        align="center" 
        justify="center" 
        px={{ base: "6", md: "12" }}
        bg={{ base: "white" }}
      >
        <VStack gap="10" w="full" maxW="md" align="start">
          <Box>
            <Heading size="2xl" mb="2">Welcome back</Heading>
            <Text color="fg.muted">Enter your credentials to access your account.</Text>
          </Box>

          <Stack gap="5" w="full">
            {/* Input Group 1 */}
            <Box w="full">
              <Text textStyle="sm" fontWeight="medium" mb="2" color="fg.emphasized">
                Email Address
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

            <Flex justify="space-between" w="full" textStyle="sm">
              <Link color="blue.600" fontWeight="semibold" href="#">Forgot password?</Link>
            </Flex>

            <Button colorPalette="blue" size="xl" fontSize="md" w="full">
              Sign In
            </Button>

            <Button variant="outline" size="xl" w="full" gap="3">
              <GoogleIcon /> Sign in with Google
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