import { GetStaticProps } from 'next'
import styled from "@emotion/styled"
import { Theme } from 'theme-ui'

export default function Home(theme: Theme) {
  return (
    <Container>
      <H2 theme={theme}>Home</H2>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}

const Container = styled.div`
  background: yellow;
  width: 100vw;
  max-width: 60rem;
  align-items: center;
`

const H2 = styled.h2<{ theme: Theme }>`
  text-align: center;
  text-decoration: underline ${({theme}) => theme.colors?.primary};
`
