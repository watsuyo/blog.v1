import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'Head'
import { SITE_NAME, PAGE_DESCRIPTION, PAGE_KEYWORD } from 'global'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import GoogleAnalytics from 'components/GoogleAnalytics'
import usePageView from 'hooks/usePageView'
import { MDXProvider } from '@mdx-js/react'
import MDXComponents from 'components/MDXComponents'
import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import 'prismjs/themes/prism-tomorrow.css'
import { NextComponentType } from 'next'

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
}

export default function App({ Component, pageProps }: MyAppProps) {
  usePageView()

  return (
    <ThemeProvider attribute="class">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col">
        <Head
          title={SITE_NAME}
          description={PAGE_DESCRIPTION}
          keyword={PAGE_KEYWORD}
        />
        <GoogleAnalytics />
        <Header />
        <div className="mt-4 mx-4">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <MDXProvider components={MDXComponents}>
            <Component {...pageProps} />
          </MDXProvider>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
