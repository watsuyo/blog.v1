import * as fs from 'fs'
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as path from 'path'
import matter from 'gray-matter'
import { PostData } from 'type'

export const blogDirPath = path.join('src', 'pages', 'blog')
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
		.readdirSync(blogDirPath, { withFileTypes: true })
		.filter((dirEnt) => dirEnt.isDirectory())
		.flatMap((dirEnt) => {
			const dirPath = path.join(blogDirPath, dirEnt.name)
			return fs
				.readdirSync(dirPath)
				.map((fileName) => fs.readFileSync(path.join(dirPath, fileName)))
		})
		.map((f) => {
			return matter(f)
		}) as unknown as Post[]

	return posts.sort(
		(a, b) =>
			Number(b.data.date.replace(/\//g, '')) -
			Number(a.data.date.replace(/\//g, '')),
	)
}
