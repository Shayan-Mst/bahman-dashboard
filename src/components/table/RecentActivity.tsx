import { Box, Table, Heading, Badge, Text } from "@chakra-ui/react";

const activities = [
  { id: 1, position: "Frontend Engineer", name: "Lily", status: "Interviewed", date: "2 hours ago" },
  { id: 2, position: "Product Manager", name: "Alex", status: "Applied", date: "Yesterday" },
  { id: 3, position: "UI Designer", name: "Gustav", status: "Rejected", date: "3 days ago" },
];

export const RecentActivity = () => (
  <Box bg="brand.dashboard" borderRadius="2xl" border="1px solid" borderColor="gray.200" overflow="hidden">
    <Box p="6" borderBottom="1px solid" borderColor="gray.100">
      <Heading size="md">Recent Job</Heading>
    </Box>
    <Table.Root bg="brand.dashboard" size="sm" variant="line">
      <Table.Header bg="brand.dashboard">
        <Table.Row bg="brand.dashboard">
          <Table.ColumnHeader color="brand.dark" p="4">Role</Table.ColumnHeader>
          <Table.ColumnHeader color="brand.dark">Name</Table.ColumnHeader>
          <Table.ColumnHeader color="brand.dark">Status</Table.ColumnHeader>
          <Table.ColumnHeader color="brand.dark" textAlign="end" p="4">Time</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body bg="brand.dashboard">
        {activities.map((item) => (
          <Table.Row bg="brand.dashboard" key={item.id} _hover={{ bg: "gray.50/30" }}>
            <Table.Cell p="4" fontWeight="medium">{item.position}</Table.Cell>
            <Table.Cell color="gray.600">{item.name}</Table.Cell>
            <Table.Cell>
              <Badge colorPalette={item.status === "Rejected" ? "red" : item.status === "Applied" ? "green" : "blue"} variant="subtle">
                {item.status}
              </Badge>
            </Table.Cell>
            <Table.Cell textAlign="end" p="4" color="gray.400" fontSize="xs">
              {item.date}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  </Box>
);