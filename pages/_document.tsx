import NextDocument, { Head, Html, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en" className="dark">
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
				</Head>
				<Main />
				<NextScript />
			</Html>
		);
	}
}
