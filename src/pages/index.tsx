import { getAllPosts } from 'logic/getAllPosts'
import Link from 'next/link'
import { PostData } from 'type'
import generateRssFeed from 'rss'

type Post = { data: PostData }

const Index = ({ posts }: { posts: Post[] }) => (
  <>
    <h1 className="font-bold text-2xl">All Posts</h1>

    <div className="mt-4">
      {posts.map((p, key: number) => (
        <div className="mb-1" key={key}>
          <Link href={`/blog/${p.data.path}`} passHref>
            <div className="pb-4">
              <div className="pb-1">
                <p className="text-xs text-gray-400" aria-label="Date">
                  {p.data.date}
                </p>
              </div>
              <div className="pb-1 min-w-400">
                <p className="font-bold text-xl" aria-label="Title">
                  {p.data.title}
                </p>
              </div>
              <p className="text-gray-400" aria-label="Description">
                {p.data.description}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </>
)

export const getStaticProps = () => {
  generateRssFeed()
  const posts = getAllPosts()
  return {
    props: {
      posts
    }
  }
}

export default Index
