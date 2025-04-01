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
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { PanelLeftClose, PanelLeftOpen, SearchIcon } from "lucide-react";
import Link from "next/link";
import { completeMetadata } from "@/dataset";
import { PdfIcon } from "./Icons";
import { useRouter } from "next/router";

const fileNames: Array<{ fileName: string; link: string }> =
  completeMetadata.map((e) => {
    return {
      fileName: e.fileName,
      link: e.localLink,
    };
  });

const SidebarItem = ({
  fileName,
  link,
  isCollapsed,
}: {
  fileName: string;
  link: string;
  isCollapsed: boolean;
}) => {
  let router = useRouter();
  return (
    <Tooltip label={fileName} placement="right" isDisabled={!isCollapsed}>
      <Link href={link} prefetch={true}>
        <Flex
          align="center"
          p={2}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "#2E2E31",
            color: "white",
          }}
          background={router.pathname == link ? "#2E2E31" : "transparent"}
          width="-webkit-fill-available"
          overflow="hidden"
          justifyContent={isCollapsed ? "center" : "flex-start"}
          // whiteSpace="nowrap" // Prevent text wrapping
        >
          <Icon as={PdfIcon} mr={isCollapsed ? 0 : 4} boxSize={5} />
          {!isCollapsed && (
            <Text fontSize="sm" isTruncated>
              {fileName}
            </Text>
          )}
        </Flex>
      </Link>
    </Tooltip>
  );
};

export const Sidebar = () => {
  const initialIsCollapsed = useBreakpointValue({ base: true, md: false });
  const [isCollapsed, setIsCollapsed] = useState(initialIsCollapsed);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const sidebarWidth = isCollapsed ? "50px" : "250px";

  return (
    <Box
      as="nav"
      background="#23222570"
      w={sidebarWidth}
      h="100vh"
      position="sticky"
      top={0}
      left={0}
      zIndex={1}
      overflowX="hidden"
      transition="width 0.2s ease"
      px={isCollapsed ? 1 : 3}
      pt={4}
      display="flex"
      flexDirection="column"
    >
      <Flex justify={"start"} align="center" ml={2}>
        <IconButton
          icon={
            isCollapsed ? (
              <PanelLeftOpen strokeWidth={2} size={22} />
            ) : (
              <PanelLeftClose strokeWidth={2} size={22} />
            )
          }
          onClick={toggleSidebar}
          aria-label="Open Sidebar"
          variant="ghost"
          size="sm"
        />
      </Flex>

      <InputGroup
        onClick={() => {
          isCollapsed ? toggleSidebar() : null;
        }}
      >
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="white" size={12} />
        </InputLeftElement>
        <Input type="text" placeholder="Search" variant="unstyled" />
      </InputGroup>

      <VStack align="stretch" spacing={1} flexGrow={1} mt={8}>
        {fileNames.map(({ fileName, link }, i) => (
          <SidebarItem
            key={i}
            fileName={fileName}
            link={link}
            isCollapsed={isCollapsed as boolean}
          />
        ))}
      </VStack>
    </Box>
  );
};
