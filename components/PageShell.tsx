import { Flex, useColorModeValue } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Head from "next/head";

import { Sidebar } from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { type DatasetMetadata, titleCase } from "@/utils/shared";

export default function PageShell({
	children,
	metadata,
	topBarChildren,
}: {
	children: React.ReactNode;
	metadata: DatasetMetadata;
	topBarChildren?: React.ReactNode;
}) {
	return (
		<>
			<Head>
				<title>Economy of India</title>
				<meta name="description" content="The Economy of India at a glance." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/rupee.svg" />
			</Head>
			<NextSeo
				title={titleCase(metadata.title) + " - EconomyOfIndia.com"}
				description={titleCase(metadata.title) + " - EconomyOfIndia.com"}
				canonical={`https://economyofindia.com${metadata.localLink}`}
				openGraph={{
					url: `https://economyofindia.com${metadata.localLink}`,
					title: metadata.title,
					description: metadata.title,
					images: [
						{
							url: `https://og-setup.vercel.app/api/og?title=${encodeURIComponent(
								metadata.title,
							)}&subtitle=${"economyofindia.com"}`,
							width: 800,
							height: 600,
							alt: metadata.title,
							type: "image/jpeg",
						},
					],
					siteName: "EcnonomyOfIndia.com",
					type: "article",
					article: {
						authors: ["EcnonomyOfIndia.com"],
						tags: ["Economy", "India", "Details"],
					},
				}}
				twitter={{
					handle: "@ProjectOmnid",
					site: "@ProjectOmnid",
					cardType: "summary_large_image",
				}}
				robotsProps={{
					maxSnippet: -1,
					maxImagePreview: "large",
					maxVideoPreview: -1,
				}}
				additionalMetaTags={[
					{
						name: "keywords",
						content: "Economy,India,Details",
					},
					{
						name: "author",
						content: "EcnonomyOfIndia.com",
					},
					{
						httpEquiv: "content-type",
						content: "text/html; charset=utf-8",
					},
				]}
				additionalLinkTags={[
					{
						rel: "icon",
						href: "/favicon.svg",
					},
					{
						rel: "manifest",
						href: "/manifest.json",
					},
					{
						rel: "apple-touch-icon",
						href: "/apple-touch-icon.png",
						sizes: "180x180",
					},
				]}
				themeColor="#000000"
			/>
			<Flex direction="row" w="100vw" minH="100vh">
				<Sidebar />
				<Flex direction="column" w={{ base: "94vw", md: "100%" }} minH="100vh">
					<TopBar metadata={metadata}>{topBarChildren}</TopBar>
					<Flex
						w="100%"
						h="100%"
						flexDir="column"
						backgroundColor={useColorModeValue("black", "#2E2E31")}
						p="20px"
						m="5px"
						borderRadius="10px"
					>
						{children}
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
