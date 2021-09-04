import styled from "@emotion/styled"
import { ThemeProvider } from "@theme-ui/theme-provider"
import { AppProps } from "next/app"
import Head from 'next/head'
import { Header } from "@/components/header"
import { BLOG_TITLE } from "@/global"
import { theme } from "@/logic/style"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Head>
					<title>{BLOG_TITLE}</title>
					<link rel="icon" href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/298/beaming-face-with-smiling-eyes_1f601.png" />
			</Head>
			<Container>
				<Header />
				<main>
					<Component {...pageProps} />
			</main>
			</Container>
		</ThemeProvider>
	)
}


const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
