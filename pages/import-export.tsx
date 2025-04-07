import { Sankey } from "@/components/ChartComponents";
import PageShell from "@/components/PageShell";
import { dataset1, dataset2, metadata } from "@/dataset/import-export";
import { Flex, Heading, Select, ToastId } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const ReactInfiniteCanvas = dynamic(
  () => import("react-infinite-canvas").then((mod) => mod.ReactInfiniteCanvas),
  {
    ssr: false,
  },
);

import type { ReactInfiniteCanvasHandle } from "react-infinite-canvas";

const totalSections = ["2023-2024", "2024-2025"] as const;
type totalSections = (typeof totalSections)[number];

export default function Home() {
  const canvasRef = useRef<ReactInfiniteCanvasHandle>(null);
  const [section, setSection] = useState<totalSections>(totalSections[1]);

  return (
    <PageShell
      metadata={metadata}
      topBarChildren={
        <Select
          defaultValue={3}
          borderRadius="md"
          onChange={(e) => {
            setSection(totalSections[e.currentTarget.selectedIndex]);
          }}
          w={{ base: "70px", sm: "120px", md: "250px" }}
          size="sm"
        >
          {totalSections.map((k, ind) => (
            <option value={ind} key={ind} defaultChecked={ind === 3}>
              {k}
            </option>
          ))}
        </Select>
      }
    >
      <Heading as="h3" size="sm" mb={4}>
        Import/Export :: Commodity-wise
      </Heading>
      <Flex maxW={{ base: "100%", md: "80%" }} height="700px" width="1000px">
        <ReactInfiniteCanvas
          ref={canvasRef}
          onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
            mountFunc.fitContentToView({ scale: 0.2 });
          }}
        >
          <Sankey data={section === "2023-2024" ? dataset1 : dataset2} />
        </ReactInfiniteCanvas>
      </Flex>
      <br />
      <Heading as="h3" size="sm" mb={4}>
        Import/Export :: Country-wise
      </Heading>
      <br />
      <Heading as="h3" size="sm" mb={4}>
        Import/Export :: Region-wise
      </Heading>
    </PageShell>
  );
}
