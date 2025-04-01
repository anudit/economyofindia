import { useState } from "react";
import {
  Box,
  VStack,
  IconButton,
  Text,
  Flex,
  useBreakpointValue,
  Tooltip,
  Icon,
  Divider,
  Heading,
} from "@chakra-ui/react";
import {
  ChevronsLeft,
  ChevronsRight,
  FileText as FileTextIcon, // Alias to avoid conflict with Text component
} from "lucide-react";

// Example list of filenames
const fileNames = [
  "document_report.pdf",
  "project_proposal.docx",
  "data_analysis.xlsx",
  "presentation_slides.pptx",
  "meeting_notes.txt",
  "image_asset.png",
];

// Helper component for Sidebar items
const SidebarItem = ({
  fileName,
  isCollapsed,
}: {
  fileName: string;
  isCollapsed: boolean;
}) => {
  return (
    <Tooltip label={fileName} placement="right" isDisabled={!isCollapsed}>
      <Flex
        align="center"
        p={2}
        mx={2}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        width="full" // Ensure Flex takes full width for background hover
        overflow="hidden" // Hide text when collapsed
        whiteSpace="nowrap" // Prevent text wrapping
      >
        <Icon as={FileTextIcon} mr={isCollapsed ? 0 : 4} boxSize={5} />
        {!isCollapsed && (
          <Text fontSize="sm" isTruncated>
            {fileName}
          </Text>
        )}
      </Flex>
    </Tooltip>
  );
};

export const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  // Adjust sidebar width based on collapsed state
  const sidebarWidth = isCollapsed ? "50px" : "250px";

  return (
    <Box
      as="nav"
      background="#23222570"
      w={sidebarWidth}
      h="100vh" // Full viewport height
      position="sticky" // Or 'sticky' if preferred within a layout
      top={0}
      left={0}
      zIndex={1}
      overflowX="hidden" // Hide horizontal overflow
      transition="width 0.3s ease" // Smooth transition for width change
      pt={4} // Add some padding at the top
      display="flex"
      flexDirection="column"
    >
      {/* Toggle Button */}
      <Flex
        justify={"center"} // Center icon when collapsed
        align="center"
      >
        <Heading
          as="h1"
          fontSize="lg"
          h="45px"
          display="flex"
          alignItems="center"
        >
          {isCollapsed ? "$" : "EconomyOfIndia.com"}
        </Heading>
      </Flex>

      <VStack align="stretch" spacing={1} flexGrow={1}>
        {fileNames.map((name) => (
          <SidebarItem key={name} fileName={name} isCollapsed={isCollapsed} />
        ))}
      </VStack>
    </Box>
  );
};
