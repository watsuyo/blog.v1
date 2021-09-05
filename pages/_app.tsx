import styled from '@emotion/styled'
import { ThemeProvider } from '@theme-ui/theme-provider'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Header } from '@/components/header'
import { BLOG_TITLE } from '@/global'
import { theme } from '@/logic/style'
import { isMobile } from 'react-device-detect'
import { useEffect, useState } from 'react'

export const App = ({ Component, pageProps }: AppProps) => {
  const [mobile, setMobile] = useState<boolean>()

  useEffect(() => setMobile(isMobile), [setMobile])

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{BLOG_TITLE}</title>
        <meta
          property="og:image"
          content={`https://og-image-watsuyo.vercel.app/${'Next.js + MDXでJamStackな個人ブログ作った'}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1339430665792626689%2F8cE0aCDB_400x400.jpg`}
        />
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/298/beaming-face-with-smiling-eyes_1f601.png"
        />
      </Head>
      <Header />
      {mobile ? (
        <MoblieMain>
          <Component {...pageProps} />
        </MoblieMain>
      ) : (
        <Main>
          <Component {...pageProps} />
        </Main>
      )}
    </ThemeProvider>
  )
}

const MoblieMain = styled.main`
  margin: 0 20px;
`

const Main = styled.main`
  margin: 0 30%;
`
