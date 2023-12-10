import BreadCrumbs from 'components/breadcrumbs'
import { DOMAIN } from 'global'
import { blogDirPath, getAllPosts } from 'logic/getAllPosts'
import { BookmarkCheck, LucideTwitter } from 'lucide-react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Prism from 'prismjs'
import { useEffect } from 'react'
import { PostData } from 'type'

export const getStaticPaths: GetStaticPaths = () => {
	const allPosts = getAllPosts()
	return {
		paths: allPosts.map((m) => {
			return {
				params: {
					title: m.data.path,
					path: m.data.path,
					description: m.data.path,
				},
			}
		}),
		fallback: false,
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
}: {
	source: { data: PostData }
	mdxSource: MDXRemoteSerializeResult
}) {
	useEffect(() => {
		Prism.highlightAll()
	})

	return (
		<>
			<BreadCrumbs
				posts={[
					{
						string: 'Home',
						path: '/',
					},
					{
						string: source.data.title,
					},
				]}
			/>
			<div className="mt-10">
				<time>{source.data.date}</time>
				<MDXRemote {...mdxSource} />
				{source.data.path && (
					<div className="mt-6">
						<a
							target="_blank"
							href={`https://github.com/watsuyo/blog/edit/main/src/pages/blog/${source.data.path}/index.mdx`}
							rel="noopener noreferrer"
							aria-label="GitHub"
						>
							Edit on GitHub
						</a>{' '}
						<div className="flex mt-6 items-center">
							<span>Share With </span>
							<a
								href={`https://b.hatena.ne.jp/entry/s/${DOMAIN}/blog/${source.data.path}`}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Hatena"
								className="mx-1"
							>
								<BookmarkCheck size={20} />
							</a>{' '}
							<a
								href={`https://twitter.com/intent/tweet?text=${source.data.title}%20%7C%20&url=${DOMAIN}/blog/${source.data.path}`}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="X"
								className="mx-1"
							>
								{' '}
								<LucideTwitter size={20} />
							</a>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
