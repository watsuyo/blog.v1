import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { blogDirPath, getAllPosts } from 'logic/getAllPosts'
import Head from 'Head'
import { SITE_NAME, PAGE_DESCRIPTION, PAGE_IMAGE, PAGE_KEYWORD, DOMAIN } from 'global'
import { StyledAnchorLink } from 'components/styled/StyledAnchorLink'
import { SiHatenabookmark, SiTwitter } from 'react-icons/si'
import styled from '@emotion/styled'
import { PostData } from 'type'

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getAllPosts().map((m) => ({
      params: {
        title: m.data.path as PostData['path']
      }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const source = getAllPosts().find((m) => m.data.path === params?.title)
  const mdxSource = await serialize(source ? source.content : '')
  return { props: { source: mdxSource, params, dirPath: blogDirPath } }
}

export default function Post({
  source,
  params,
  dirPath
}: {
  source: MDXRemoteSerializeResult
  params?: PostData
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
      {params?.title && (
        <>
          <StyledAnchorLink
            target="_blank"
            href={`https://twitter.com/search?q=watsuyo.dev/blog/${params?.title}&src=typed_query`}
          >
            Discuss on Twitter
          </StyledAnchorLink>{' '}
          •{' '}
          <StyledAnchorLink
            target="_blank"
            href={`https://github.com/watsuyo/blog/edit/main/src/pages/blog/${params?.title}/index.md`}
          >
            Edit on GitHub
          </StyledAnchorLink>{' '}
          <ShareWithIconContainer>
            <span>Share With </span>
            <StyledAnchorLink
              href={`https://b.hatena.ne.jp/entry/s/watsuyo.dev/blog/${params?.title}`}
              target="_blank"
            >
              <IconWrapper>
                <SiHatenabookmark size={28} />
              </IconWrapper>
            </StyledAnchorLink>{' '}
            <StyledAnchorLink
              href={`https://twitter.com/intent/tweet?text=${params?.title}%20%7C%20&url=https://watsuyo.dev/blog/${params?.title}`}
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
