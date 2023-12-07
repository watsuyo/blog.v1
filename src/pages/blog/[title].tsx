import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { blogDirPath, getAllPosts } from 'logic/getAllPosts'
import Head from 'Head'
import { PAGE_KEYWORD, DOMAIN } from 'global'
import { SiHatenabookmark, SiTwitter } from 'react-icons/si'
import { PostData } from 'type'
import generateRssFeed from 'rss'
import BreadCrumbs from 'components/breadcrumbs'
import Prism from 'prismjs'
import { useEffect } from 'react'

export const getStaticPaths: GetStaticPaths = () => {
  generateRssFeed()
  return {
    paths: getAllPosts().map((m) => {
      return {
        params: {
          title: m.data.path,
          path: m.data.path,
          description: m.data.path
        }
      }
    }),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const source = getAllPosts().find((m) => m.data.path === params?.title)
  const mdxSource = await serialize(source ? source.content : '')
  return { props: { source, mdxSource, dirPath: blogDirPath } }
}

export default function Post({
  source,
  mdxSource,
  dirPath
}: {
  source: { data: PostData }
  mdxSource: MDXRemoteSerializeResult
  params?: Pick<PostData, 'title'>
  dirPath: string
}) {
  useEffect(() => {
    Prism.highlightAll()
  })

  return (
    <>
      <Head
        title={source.data.title}
        description={source.data.description}
        keyword={PAGE_KEYWORD}
        url={`${DOMAIN}${dirPath}`}
      />
      <BreadCrumbs
        posts={[
          {
            string: 'Home',
            path: '/'
          },
          {
            string: source.data.title
          }
        ]}
      />
      <div className="mt-10">
        <time>{source.data.date}</time>
        <MDXRemote {...mdxSource} />
        {source.data.path && (
          <div className="mt-6">
            <a
              target="_blank"
              href={`https://twitter.com/search?q=${DOMAIN}/blog/${source.data.path}&src=typed_query`}
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              Discuss on Twitter
            </a>{' '}
            •{' '}
            <a
              target="_blank"
              href={`https://github.com/watsuyo/blog/edit/main/src/pages/blog/${source.data.path}/index.mdx`}
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              Edit on GitHub
            </a>{' '}
            <div className="flex mt-6">
              <span>Share With </span>
              <a
                href={`https://b.hatena.ne.jp/entry/s/${DOMAIN}/blog/${source.data.path}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hatena"
              >
                <div className="ml-1">
                  <SiHatenabookmark size={28} />
                </div>
              </a>{' '}
              <a
                href={`https://twitter.com/intent/tweet?text=${source.data.title}%20%7C%20&url=${DOMAIN}/blog/${source.data.path}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                {' '}
                <div className="ml-1">
                  <SiTwitter size={28} />
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
