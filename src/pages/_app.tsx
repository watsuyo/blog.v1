import { MDXProvider } from '@mdx-js/react'
import Head from 'Head'
import { Footer } from 'components/Footer'
import GoogleAnalytics from 'components/GoogleAnalytics'
import { Header } from 'components/Header'
import MDXComponents from 'components/MDXComponents'
import { DOMAIN, PAGE_DESCRIPTION, PAGE_KEYWORD, SITE_NAME } from 'global'
import usePageView from 'hooks/usePageView'
import { NextComponentType } from 'next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import 'prismjs/themes/prism-tomorrow.css'
import React from 'react'
import 'tailwindcss/tailwind.css'
import { PostData } from 'type'

// any は使わない
type ReactElementFixed =
	| React.ReactElement
	| React.ReactNodeArray
	| React.ReactPortal
	| boolean
	| null
	| undefined
interface MyAppProps extends AppProps {
	Component: NextComponentType & {
		layout?: (children: ReactElementFixed) => ReactElementFixed
	}
	pageProps: {
		dirPath: string
		mdxSource: MDXRemoteSerializeResult
		source: {
			data: PostData
		}
	}
}

export default function App({ Component, pageProps }: MyAppProps) {
	usePageView()

	return (
		<ThemeProvider attribute="class">
			<div className="mx-auto flex min-h-screen max-w-4xl flex-col">
				<Head
					title={pageProps?.source?.data.title || SITE_NAME}
					description={pageProps?.source?.data.description || PAGE_DESCRIPTION}
					keyword={PAGE_KEYWORD}
					url={
						pageProps?.source?.data.path
							? `${DOMAIN}/${pageProps?.dirPath}/${pageProps?.source?.data.path}`
							: DOMAIN
					}
				/>
				<GoogleAnalytics />
				<Header />
				<div className="mt-4 mx-4">
					{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
					{/* @ts-ignore */}
					<MDXProvider components={MDXComponents}>
						{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
						{/* @ts-ignore */}
						<Component {...pageProps} />
					</MDXProvider>
				</div>
				<Footer />
			</div>
		</ThemeProvider>
	)
}
