import { getPosts } from './getAllPosts'
import { StyledLink } from '@/components/styled/StyledLink'
import { StyledCard } from '@/components/styled/StyledCard'

type Post = { data: { title: string; excerpt: string; date: string } }

const BlogIndex = ({ posts }: { posts: Post[] }) => (
  <div>
    {posts.map((p, key: number) => (
      <StyledLink href={`/blog/${p.data.title}`} key={key}>
        <StyledCard sx={{ opacity: 1, mt: 2, p: 2 }}>
          <span>{p.data.title}</span>
          <span>{p.data.date}</span>
          <div>{p.data.excerpt}</div>
        </StyledCard>
      </StyledLink>
    ))}
  </div>
)

export const getServerSideProps = () => {
  return {
    props: {
      posts: getPosts()
    }
  }
}

export default BlogIndex
