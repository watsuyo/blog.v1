import { getAllPosts } from 'logic/getAllPosts'
import { DOMAIN, ICON, PAGE_DESCRIPTION, SITE_NAME } from 'global'
import { Feed } from 'feed'
import * as fs from 'fs'

function generateRssFeed() {
  const baseUrl = DOMAIN
  const date = new Date()
  const author = {
    name: 'watsuyo',
    email: 'watsuyo.dev@gmail.com',
    link: 'https://twitter.com/watsuyo_2'
  }

  const feed = new Feed({
    title: SITE_NAME,
    description: PAGE_DESCRIPTION,
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    image: ICON,
    favicon: ICON,
    copyright: `© 2023 watsuyo`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`
    },
    author
  })

  const posts = getAllPosts()

  posts.forEach((post) => {
    const url = `${baseUrl}/blog/${post.data.path}`
    feed.addItem({
      title: post.data.title,
      id: url,
      link: url,
      description: post.data.description,
      content: post.content,
      author: [author],
      contributor: [author],
      date: new Date(post.data.date)
    })
  })

  fs.mkdirSync('../public/rss', { recursive: true })
  fs.writeFileSync('../public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('../public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('../public/rss/feed.json', feed.json1())
}

export default generateRssFeed
