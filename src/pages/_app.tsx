import { AppProps } from 'next/app'
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

export default function App({ Component, pageProps }: AppProps) {
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
            <Component {...pageProps} />
          </MDXProvider>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
