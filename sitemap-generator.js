const fs = require('fs')
const path = require('path')

const SITEMAP_HEADER = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`
const SITEMAP_FOOTER = '</urlset>'

function formatDate(dateString) {
	const [year, month, day] = dateString.split('/')
	return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function walk(dir, filelist = []) {
	const files = fs.readdirSync(dir)
	let newFilelist = filelist
	for (const file of files) {
		if (fs.statSync(path.join(dir, file)).isDirectory()) {
			newFilelist = walk(path.join(dir, file), newFilelist)
		} else if (
			(file.endsWith('.tsx') || file.endsWith('.mdx')) &&
			!file.startsWith('_') &&
			!file.includes('[')
		) {
			newFilelist.push(path.join(dir, file))
		}
	}
	return newFilelist
}

const pages = walk('src/pages')
	.map((page) => {
		const content = fs.readFileSync(page, 'utf-8')
		const dateMatch = content.match(/date: '(.*)'/)
		if (dateMatch) {
			const lastmod = formatDate(dateMatch[1])
			const route = page
				.replace('src/pages/blog', '') // ここを変更
				.replace('.tsx', '')
				.replace('.mdx', '')
				.replace('/index', '')
				.replace(/^\/+/, '')
			const url = `https://posts.watsuyo.dev/blog/${route}`
			return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
		}
		return null
	})
	.filter(Boolean)

const sitemap = SITEMAP_HEADER + pages.join('\n') + SITEMAP_FOOTER

fs.writeFileSync('public/sitemap.xml', sitemap)
