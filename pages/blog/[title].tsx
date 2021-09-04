import { GetStaticPaths, GetStaticProps } from "next"
import * as path from "path"
import * as fs from "fs"
import matter from "gray-matter"
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

type Params = { title: string }

const blogDirPath = path.join('pages', 'blog')

const getPostAll = () => {
	return fs
		.readdirSync(blogDirPath, { withFileTypes: true })
		.filter(dirEnt => dirEnt.isDirectory())
		.flatMap(dirEnt => {
				const dirPath = path.join(blogDirPath, dirEnt.name)
				return fs
					.readdirSync(dirPath)
					.map(fileName => fs.readFileSync(path.join(dirPath, fileName)))
		})
		.map(f => {
		const { orig, ...post } = matter(f)
		return post
	})
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: getPostAll().map(m => ({
			params: {
				title: m.data.title as Params['title']
			}
		})),
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const source = getPostAll().find(m => m.data.title === params?.title)
	const mdxSource = await serialize(source ? source.content : '')
	return { props: { source: mdxSource } }
}

export default function Post({ source }:{ source: MDXRemoteSerializeResult }) {
		return (
			<>
					<MDXRemote {...source} />
			</>
		)
}
