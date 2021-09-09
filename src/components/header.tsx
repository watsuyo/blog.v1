import styled from '@emotion/styled'
import { IoMdSunny, IoMdMoon, IoLogoGithub } from 'react-icons/io'
import { SITE_NAME } from 'global'
import { ColorMode, useToggleColorMode } from 'logic/style'
import { useColorMode } from '@theme-ui/color-modes'
import { StyledLink } from './styled/StyledLink'
import { IconButton } from '@theme-ui/components'
import { StyledAnkerLink } from './styled/StyledAnkerLink'

export function Header() {
  const toggleColorMode = useToggleColorMode()
  const [mode] = useColorMode()

  return (
    <HeaderContainer>
      <h3>
        <StyledLink href="/">{SITE_NAME}</StyledLink>
      </h3>
      <IconContainer>
        <StyledAnkerLink target="_blank" href="https://github.com/watsuyo" rel="noreferrer">
          <IoLogoGithub size={32} />
        </StyledAnkerLink>
        <IconButton aria-label="toggle color mode">
          {mode === ColorMode.Dark ? (
            <IoMdSunny size={32} onClick={toggleColorMode} />
          ) : (
            <IoMdMoon size={32} onClick={toggleColorMode} />
          )}
        </IconButton>
      </IconContainer>
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

const IconContainer = styled.div`
  display: flex;
`
