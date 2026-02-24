import { Box, Text, HStack, Icon, Heading } from "@chakra-ui/react";

interface StatProps {
  label: string;
  value: string;
  icon: any;
  description: string;
  color?: string;
}

export const StatCard = ({ label, value, icon, description, color = "blue.600" }: StatProps) => (
  <Box p="6" bg="white" borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
    <HStack justify="space-between" mb="4">
      <Box p="2" bg={`${color.split('.')[0]}.50`} borderRadius="lg">
        <Icon as={icon} color={color} boxSize="5" />
      </Box>
      <Text fontSize="xs" fontWeight="bold" color="gray.400">{label.toUpperCase()}</Text>
    </HStack>
    <Heading size="lg" mb="1">{value}</Heading>
    <Text fontSize="xs" color="gray.500">{description}</Text>
  </Box>
);