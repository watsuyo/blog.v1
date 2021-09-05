import { GetStaticPaths, GetStaticProps } from 'next'
import * as path from 'path'
import * as fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import styled from '@emotion/styled'
import { Card } from '@theme-ui/components'

type Params = { title: string }

const blogDirPath = path.join('pages', 'blog')

const getPostAll = () => {
  return fs
    .readdirSync(blogDirPath, { withFileTypes: true })
    .filter((dirEnt) => dirEnt.isDirectory())
    .flatMap((dirEnt) => {
      const dirPath = path.join(blogDirPath, dirEnt.name)
      return fs
        .readdirSync(dirPath)
        .map((fileName) => fs.readFileSync(path.join(dirPath, fileName)))
    })
    .map((f) => {
      const { ...post } = matter(f)
      return post
    })
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getPostAll().map((m) => ({
      params: {
        title: m.data.title as Params['title']
      }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const source = getPostAll().find((m) => m.data.title === params?.title)
  const mdxSource = await serialize(source ? source.content : '')
  return { props: { source: mdxSource } }
}

const StyledCard = styled(Card)`
  border: 4px solid;
  borderradius: 4;
  boxshadow: 0 0 8px rgba(0, 0, 0, 0.125);
`

export default function Post({ source }: { source: MDXRemoteSerializeResult }) {
  return (
    <StyledCard>
      <MDXRemote {...source} />
    </StyledCard>
  )
}
