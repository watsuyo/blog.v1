import styled from '@emotion/styled'
import { Text } from '@theme-ui/components'
import { IoLogoGithub, IoLogoTwitter } from 'react-icons/io'
import { StyledAnchorLink } from './styled/StyledAnchorLink'

export function Footer() {
  return (
    <StyledFooter>
      <TextContainer>
        <Text>© 2021 watsuyo</Text>
      </TextContainer>
      <LinksContainer>
        <LinkContainer>
          <StyledAnchorLink target="_blank" href="https://github.com/watsuyo" rel="noopener">
            <IoLogoGithub size={28} />
          </StyledAnchorLink>
        </LinkContainer>
        <LinkContainer>
          <StyledAnchorLink target="_blank" href="https://twitter.com/watsuyo_2" rel="noopener">
            <IoLogoTwitter size={28} />
          </StyledAnchorLink>
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
