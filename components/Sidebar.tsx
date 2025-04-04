import { useEffect, useMemo, useState } from "react";
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
import { useRouter } from "next/router";
import Fuse, { IFuseOptions } from "fuse.js";
import { completeMetadata } from "@/dataset";
import { PdfIcon } from "@/components/Icons";
import { DatasetMetadata } from "@/utils/shared";

type SidebarDisplayItem = {
  fileName: string;
  link: `/${string}`;
};

// Map the full metadata to the display format just once
const allDisplayFiles: SidebarDisplayItem[] = completeMetadata.map((e) => ({
  fileName: e.fileName,
  link: e.localLink,
}));

// SidebarItem remains mostly the same, just ensure link type matches
const SidebarItem = ({
  fileName,
  link,
  isCollapsed,
}: {
  fileName: string;
  link: `/${string}`; // Match the type
  isCollapsed: boolean;
}) => {
  const router = useRouter(); // Use useRouter hook inside the component
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
          background={router.pathname === link ? "#2E2E31" : "transparent"}
          width="-webkit-fill-available"
          overflow="hidden"
          justifyContent={isCollapsed ? "center" : "flex-start"}
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
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredFiles, setFilteredFiles] =
    useState<SidebarDisplayItem[]>(allDisplayFiles); // State for filtered results

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const sidebarWidth = isCollapsed ? "50px" : "250px";

  const fuse = useMemo(() => {
    const options: IFuseOptions<DatasetMetadata> = {
      keys: [
        "title",
        "titleShort",
        "fileName",
        "sourceFile",
        "ipfsHash",
        "sha256",
        "md5",
      ],
      includeScore: true,
      threshold: 0.4,
      ignoreLocation: true,
      isCaseSensitive: false,
    };
    return new Fuse(completeMetadata, options);
  }, [completeMetadata]);

  useEffect(() => {
    const query = searchQuery.trim();
    if (!query) {
      setFilteredFiles(allDisplayFiles);
      return;
    }

    const results = fuse.search(query);

    const matchedFiles: SidebarDisplayItem[] = results.map(({ item }) => ({
      fileName: item.fileName,
      link: item.localLink,
    }));

    setFilteredFiles(matchedFiles);
  }, [searchQuery, fuse]);

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
      <Flex
        justify={isCollapsed ? "center" : "flex-start"}
        align="center"
        // ml={2}
      >
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
        height="40px"
        display="flex"
        alignItems="center"
        mt={4}
      >
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="white" size={14} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search"
          variant="unstyled"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      <VStack align="stretch" spacing={1} flexGrow={1} mt={4}>
        {filteredFiles.map(({ fileName, link }, i) => (
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
