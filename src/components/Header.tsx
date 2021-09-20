import styled from '@emotion/styled'
import { IoMdSunny, IoMdMoon, IoLogoRss } from 'react-icons/io'
import { SITE_NAME } from 'global'
import { ColorMode, useToggleColorMode } from 'logic/style'
import { useColorMode } from '@theme-ui/color-modes'
import { StyledLink } from './styled/StyledLink'
import { IconButton } from '@theme-ui/components'

export function Header() {
  const toggleColorMode = useToggleColorMode()
  const [mode] = useColorMode()

  return (
    <HeaderContainer>
      <h3>
        <StyledLink href="/">{SITE_NAME}</StyledLink>
      </h3>
      <LogoContainer>
        <IoLogoRssContainer>
          <StyledLink aria-label="RSS Link" href="/rss/feed.xml">
            <IoLogoRss size={28} />
          </StyledLink>
        </IoLogoRssContainer>
        <IconButton aria-label="toggle color mode">
          {mode === ColorMode.Dark ? (
            <IoMdSunny size={28} onClick={toggleColorMode} />
          ) : (
            <IoMdMoon size={28} onClick={toggleColorMode} />
          )}
        </IconButton>
      </LogoContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  padding: 0 1rem;
`

const IoLogoRssContainer = styled.span`
  padding-right: 0.4rem;
`

const LogoContainer = styled.div`
  display: flex;
`
