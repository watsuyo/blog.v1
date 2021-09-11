import * as path from 'path'
import * as fs from 'fs'
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
      const { orig, ...post } = matter(f)
      console.info(orig)
      return post
    }) as Post[]


  return posts
}
