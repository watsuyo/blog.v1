import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { blogDirPath, getAllPosts } from 'logic/getAllPosts'
import Head from 'Head'
import { PAGE_IMAGE, PAGE_KEYWORD, DOMAIN } from 'global'
import { StyledAnchorLink } from 'components/styled/StyledAnchorLink'
import { SiHatenabookmark, SiTwitter } from 'react-icons/si'
import styled from '@emotion/styled'
import { PostData } from 'type'
import generateRssFeed from 'rss'

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
  return (
    <>
      <Head
        title={source.data.title}
        description={source.data.description}
        keyword={PAGE_KEYWORD}
        image={PAGE_IMAGE(source.data.title)}
        url={`${DOMAIN}${dirPath}`}
      />
      <MDXRemote {...mdxSource} />
      {source.data.path && (
        <>
          <StyledAnchorLink
            target="_blank"
            href={`https://twitter.com/search?q=watsuyo.dev/blog/${source.data.path}&src=typed_query`}
          >
            Discuss on Twitter
          </StyledAnchorLink>{' '}
          •{' '}
          <StyledAnchorLink
            target="_blank"
            href={`https://github.com/watsuyo/blog/edit/main/src/pages/blog/${source.data.path}/index.md`}
          >
            Edit on GitHub
          </StyledAnchorLink>{' '}
          <ShareWithIconContainer>
            <span>Share With </span>
            <StyledAnchorLink
              href={`https://b.hatena.ne.jp/entry/s/watsuyo.dev/blog/${source.data.path}`}
              target="_blank"
            >
              <IconWrapper>
                <SiHatenabookmark size={28} />
              </IconWrapper>
            </StyledAnchorLink>{' '}
            <StyledAnchorLink
              href={`https://twitter.com/intent/tweet?text=${source.data.title}%20%7C%20@${source.data.author}&url=https://watsuyo.dev/blog/${source.data.path}`}
              target="_blank"
            >
              {' '}
              <IconWrapper>
                <SiTwitter size={28} />
              </IconWrapper>
            </StyledAnchorLink>
          </ShareWithIconContainer>
        </>
      )}
    </>
  )
}

const IconWrapper = styled.div`
  margin-left: 0.5rem;
`

const ShareWithIconContainer = styled.div`
  display: flex;
  margin-top: 2rem;
`
