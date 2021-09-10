import styled from '@emotion/styled'
import { Text } from '@theme-ui/components'
import { IoLogoGithub, IoLogoTwitter } from 'react-icons/io'
import { StyledAnkerLink } from './styled/StyledAnkerLink'

export function Footer() {
  return (
    <StyledFooter>
      <TextContainer>
        <Text>© 2021 watsuyo</Text>
      </TextContainer>
      <LinksContainer>
        <LinkContainer>
          <StyledAnkerLink target="_blank" href="https://github.com/watsuyo" rel="noreferrer">
            <IoLogoGithub size={28} />
          </StyledAnkerLink>
        </LinkContainer>
        <LinkContainer>
          <StyledAnkerLink target="_blank" href="https://twitter.com/watsuyo_2" rel="noreferrer">
            <IoLogoTwitter size={28} />
          </StyledAnkerLink>
        </LinkContainer>
      </LinksContainer>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 3rem 1rem;
  margin-top: auto;
`

const LinksContainer = styled.div``
const LinkContainer = styled.span`
  padding: 0.4rem;
`

const TextContainer = styled.div``
