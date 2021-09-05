import { getAllPosts } from '../src/logic/getAllPosts'
import { StyledLink } from '@/components/styled/StyledLink'
import { PostContainer } from '@/components/styled/PostContainer'
import { Text } from '@theme-ui/components'
import styled from '@emotion/styled'

type Post = { data: { title: string; excerpt: string; date: string } }

const BlogIndex = ({ posts }: { posts: Post[] }) => (
  <>
    <H1Container>
      <Text
        sx={{
          fontSize: 5,
          fontWeight: 'bold'
        }}
      >
        All Posts
      </Text>
    </H1Container>

    {posts.map((p, key: number) => (
      <PostContainer key={key}>
        <StyledLink href={`/blog/${p.data.title}`}>
          <PostTopAreaContainer>
            <TitleContainer>
              <Text
                sx={{
                  fontSize: 4
                }}
              >
                {p.data.title}
              </Text>
            </TitleContainer>

            <DateContainer>
              <DateText
                sx={{
                  fontSize: 2
                }}
              >
                {p.data.date}
              </DateText>
            </DateContainer>
          </PostTopAreaContainer>
          <Text
            sx={{
              color: 'gray',
              fontSize: 3
            }}
          >
            {p.data.excerpt}
          </Text>
        </StyledLink>
      </PostContainer>
    ))}
  </>
)

const TitleContainer = styled.div`
  min-width: 200px;
`

const DateContainer = styled.div`
  margin: auto 0;
`

const DateText = styled(Text)`
  white-space: nowrap;
`

const PostTopAreaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`

const H1Container = styled.h1`
  margin: 0 0 16px 0;
`

export const getServerSideProps = () => {
  return {
    props: {
      posts: getAllPosts().reverse()
    }
  }
}

export default BlogIndex
