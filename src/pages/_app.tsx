import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'Head'
import { SITE_NAME, PAGE_DESCRIPTION, PAGE_IMAGE, PAGE_KEYWORD, DOMAIN } from 'global'
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

// eslint-disable-next-line @typescript-eslint/ban-types
type ReactElementFixed = React.ReactElement<any, any> | React.Component<{}, any, any> | null

interface MyAppProps extends AppProps {
  Component: NextComponentType<any, any, Record<string, unknown>> & ReactElementFixed
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
          image={PAGE_IMAGE(SITE_NAME)}
          url={DOMAIN}
        />
        <GoogleAnalytics />
        <Header />
        <div className="mt-4 mx-4">
          <MDXProvider components={MDXComponents}>
            {React.createElement(Component, pageProps)}
          </MDXProvider>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
