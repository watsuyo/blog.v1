import * as path from 'path'
import * as fs from 'fs'
import matter from 'gray-matter'

const blogDirPath = path.join('pages', 'blog')

export const getPosts = () => {
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
      const { ...post } = matter(f)
      return post
    })
  return posts
}
