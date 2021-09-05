import styled from '@emotion/styled'
import { ThemeProvider } from '@theme-ui/theme-provider'
import { AppProps } from 'next/app'
import { theme } from 'logic/style'
import { isMobile } from 'react-device-detect'
import { useEffect, useState } from 'react'
import { Header } from 'components/header'
import Head from 'Head'
import { SITE_NAME, PAGE_DESCRIPTION, PAGE_IMAGE, PAGE_KEYWORD, DOMAIN } from 'global'

export default function App({ Component, pageProps }: AppProps) {
  const [mobile, setMobile] = useState<boolean>()

  useEffect(() => setMobile(isMobile), [setMobile])

  return (
    <ThemeProvider theme={theme}>
      <Head
        title={SITE_NAME}
        description={PAGE_DESCRIPTION}
        keyword={PAGE_KEYWORD}
        image={PAGE_IMAGE(SITE_NAME)}
        url={DOMAIN}
      />
      <Header />
      {mobile ? (
        <MobileMain>
          <Component {...pageProps} />
        </MobileMain>
      ) : (
        <Main>
          <Component {...pageProps} />
        </Main>
      )}
    </ThemeProvider>
  )
}

const MobileMain = styled.main`
  margin: 0 1rem;
`

const Main = styled.main`
  margin: 0 30%;
`
