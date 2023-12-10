import * as fs from 'fs'
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as path from 'path'
import matter from 'gray-matter'
import { PostData } from 'type'

export const postsDirPath = path.join('src', 'pages', 'posts')
export type Post = {
	data: PostData
	content: string
	excerpt?: string | undefined
	language: string
	matter: string
	stringify(lang: string): string
	img: string
}

export const getAllPosts = () => {
	const posts = fs
		.readdirSync(postsDirPath, { withFileTypes: true })
		.filter((dirEnt) => dirEnt.isDirectory())
		.flatMap((dirEnt) => {
			const dirPath = path.join(postsDirPath, dirEnt.name)
			return fs
				.readdirSync(dirPath)
				.map((fileName) => fs.readFileSync(path.join(dirPath, fileName)))
		})
		.map((f) => {
			// biome-ignore lint/correctness/noUnusedVariables: <explanation>
			const { orig, ...post } = matter(f)
			return post
		}) as unknown as Post[]

	return posts.sort(
		(a, b) =>
			Number(b.data.date.replace(/\//g, '')) -
			Number(a.data.date.replace(/\//g, '')),
	)
}
