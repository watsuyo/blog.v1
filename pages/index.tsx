import { GetStaticProps } from 'next'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>NextJS BLOG</title>
        <link rel="icon" href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/298/beaming-face-with-smiling-eyes_1f601.png" />
      </Head>
      <main>Welcome</main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}
