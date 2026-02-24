import { Box, Table, Heading, Badge, Text } from "@chakra-ui/react";

const activities = [
  { id: 1, name: "Frontend Engineer", company: "Google", status: "Interviewed", date: "2 hours ago" },
  { id: 2, name: "Product Manager", company: "Meta", status: "Applied", date: "Yesterday" },
  { id: 3, name: "UI Designer", company: "Linear", status: "Rejected", date: "3 days ago" },
];

export const RecentActivity = () => (
  <Box bg="white" borderRadius="2xl" border="1px solid" borderColor="gray.200" overflow="hidden">
    <Box p="6" borderBottom="1px solid" borderColor="gray.100">
      <Heading size="md">Recent Job Hunts</Heading>
    </Box>
    <Table.Root size="sm" variant="line">
      <Table.Header bg="gray.50/50">
        <Table.Row>
          <Table.ColumnHeader p="4">Role</Table.ColumnHeader>
          <Table.ColumnHeader>Company</Table.ColumnHeader>
          <Table.ColumnHeader>Status</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end" p="4">Time</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {activities.map((item) => (
          <Table.Row key={item.id} _hover={{ bg: "gray.50/30" }}>
            <Table.Cell p="4" fontWeight="medium">{item.name}</Table.Cell>
            <Table.Cell color="gray.600">{item.company}</Table.Cell>
            <Table.Cell>
              <Badge colorPalette={item.status === "Rejected" ? "red" : "blue"} variant="subtle">
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