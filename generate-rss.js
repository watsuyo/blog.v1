const fs = require('fs')
const matter = require('gray-matter')
const path = require('path')

function walk(dir, fileList = []) {
	const files = fs.readdirSync(dir)
	let newFilelist = fileList
	for (const file of files) {
		const filePath = path.join(dir, file)
		if (fs.statSync(filePath).isDirectory()) {
			newFilelist = walk(filePath, fileList)
		} else if (file.endsWith('.mdx')) {
			newFilelist.push(filePath)
		}
	}
	return fileList
}

function generateRssFeed() {
	const pages = walk('src/pages/blog')
	let rssItemsXml = ''
	for (const page of pages) {
		const content = fs.readFileSync(page, 'utf8')
		const frontMatter = matter(content)
		const title = frontMatter.data.title
		const pubDate = new Date(frontMatter.data.date).toUTCString()
		const description = frontMatter.data.description
		const urlPath = `https://posts.watsuyo.dev/blog/${page
			.replace('src/pages/blog/', '')
			.replace('.mdx', '')
			.replace('/index', '')}`

		rssItemsXml += `
			<item>
				<title>${title}</title>
				<link>${urlPath}</link>
				<guid>${urlPath}</guid>
				<pubDate>${pubDate}</pubDate>
				<description>${description}</description>
			</item>`
	}

	const feedUrl = 'https://posts.watsuyo.dev/feed.xml'
	const rssFeedXml = `<?xml version="1.0" ?>
		<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
			<channel>
				<title>watsuyo's blog</title>
				<link>https://posts.watsuyo.dev/blog</link>
				<atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
				<description>This is watsuyo's blog.</description>
				${rssItemsXml}
			</channel>
		</rss>`

	fs.writeFileSync('public/feed.xml', rssFeedXml)
}

generateRssFeed()
