"use client";
import { Box, SimpleGrid, Heading, Text, VStack, Button, Icon, Stack, GridItem } from "@chakra-ui/react";
import { Briefcase, MessageSquare, PlayCircle, TrendingUp, Users } from "lucide-react";
import { StatCard } from "../../components/cards/StatCard";
import { RecentActivity } from "../../components/table/RecentActivity";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter()
  useEffect(() => {
    const fetchInterviews = async () => {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      console.log(data);
    };
    fetchInterviews();
  },[])

  function goToUserManagement() {
   
    router.push('/users'); // user route, adjust as needed
  }
  return (
    <Box p={{ base: "4", md: "8" }} maxW="1400px" mx="auto">
      {/* Header Section */}
      <Stack direction={{ base: "column", md: "row" }} justify="space-between" align={{ md: "flex-end" }} mb="8">
        <Box>
          <Heading size="xl" mb="2" fontWeight="bold">Welcome back, Error Fixer! 👋</Heading>
          <Text color="gray.500">Here’s an overview of your AI interview progress and job hunts.</Text>
        </Box>
        <Button bg="blue.600" color="white" _hover={{ bg: "blue.700" }} px="6" borderRadius="lg">
          <Icon as={PlayCircle} mr="2" /> Products
        </Button>
      </Stack>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="6" mb="10">
        <StatCard 
          label="Total Users" 
          value="208" 
          icon={Users} 
          description="+15% since last month" 
          color="red.500" 
        />
        <StatCard 
          label="Visited Today" 
          value="79" 
          icon={MessageSquare} 
          description="+7 since yesterday" 
        />
        <StatCard 
          label="Total Products" 
          value="194" 
          icon={Briefcase} 
          description="In progress" 
        />
        <StatCard 
          label="Total Sales today" 
          value="$1,200" 
          icon={TrendingUp} 
          description="Keep it up!" 
          color="green.500"
        />
      </SimpleGrid>

      {/* Main Content Layout */}
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap="8">
        {/* Left Column: Recent Activity */}
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <RecentActivity />
        </GridItem>

        {/* Right Column: Upgrade / Quick Links */}
        <VStack align="stretch" gap="6">
          <Box p="6" borderRadius="2xl" bg="blue.600" color="white" shadow="md">
            <Heading size="md" mb="3">Upgrade to Pro</Heading>
            <Text fontSize="sm" mb="5" opacity="0.9">
              Unlock unlimited AI interviews and advanced job hunt analytics.
            </Text>
            <Button w="full" bg="white" color="blue.600" fontWeight="bold" variant="solid">
              See Pricing
            </Button>
          </Box>

          <Box p="6" borderRadius="2xl" border="1px solid" borderColor="gray.200" bg="white">
            <Heading size="sm" mb="4">Quick Actions</Heading>
            <VStack align="stretch" gap="3">
              <Button onClick={goToUserManagement} justifyContent="start" size="sm" fontWeight="normal">
                <Icon as={Users} mr="2" /> Manage Team
              </Button>
              <Button  justifyContent="start" size="sm" fontWeight="normal">
                <Icon as={MessageSquare} mr="2" /> Feedback Survey
              </Button>
            </VStack>
          </Box>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}