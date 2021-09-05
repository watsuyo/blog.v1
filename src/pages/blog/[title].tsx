import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { blogDirPath, getAllPosts } from 'logic/getAllPosts'
import Head from 'Head'
import { SITE_NAME, PAGE_DESCRIPTION, PAGE_IMAGE, PAGE_KEYWORD, DOMAIN } from 'global'

type Params = { title: string; description: string }

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
  return { props: { source: mdxSource, params, dirPath: blogDirPath } }
}

export default function Post({
  source,
  params,
  dirPath
}: {
  source: MDXRemoteSerializeResult
  params?: Params
  dirPath: string
}) {
  return (
    <>
      <Head
        title={params?.title || SITE_NAME}
        description={params?.description || PAGE_DESCRIPTION}
        keyword={PAGE_KEYWORD}
        image={PAGE_IMAGE(params?.title || SITE_NAME)}
        url={`${DOMAIN}${dirPath}`}
      />
      <MDXRemote {...source} />
    </>
  )
}
