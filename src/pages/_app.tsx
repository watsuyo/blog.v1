import styled from '@emotion/styled'
import { ThemeProvider } from '@theme-ui/theme-provider'
import { AppProps } from 'next/app'
import { theme } from 'logic/style'
import Head from 'Head'
import { SITE_NAME, PAGE_DESCRIPTION, PAGE_IMAGE, PAGE_KEYWORD, DOMAIN } from 'global'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'

import Prism from '@theme-ui/prism'

const components = {
  pre: ({ children }: { children: string }) => <>{children}</>,
  code: Prism
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme} components={components}>
      <BodyContainer>
        <Head
          title={SITE_NAME}
          description={PAGE_DESCRIPTION}
          keyword={PAGE_KEYWORD}
          image={PAGE_IMAGE(SITE_NAME)}
          url={DOMAIN}
        />
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </BodyContainer>
    </ThemeProvider>
  )
}

const BodyContainer = styled.main`
  margin: 0 auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  padding: 0 1rem;
`
