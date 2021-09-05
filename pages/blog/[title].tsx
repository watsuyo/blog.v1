import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getAllPosts } from '../../src/logic/getAllPosts'

type Params = { title: string }

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getAllPosts().map((m) => ({
      params: {
        title: m.data.title as Params['title']
      }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const source = getAllPosts().find((m) => m.data.title === params?.title)
  const mdxSource = await serialize(source ? source.content : '')
  return { props: { source: mdxSource } }
}

export default function Post({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} />
}
