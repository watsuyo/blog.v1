import styled from '@emotion/styled'
import { IoMdSunny, IoMdMoon } from 'react-icons/io'
import { BLOG_TITLE } from '@/global'
import { ColorMode, useToggleColorMode } from '@/logic/style'
import { useColorMode } from '@theme-ui/color-modes'
import { StyledLink } from './styled/StyledLink'
import { IconButton } from '@theme-ui/components'

export function Header() {
  const toggleColorMode = useToggleColorMode()
  const [mode] = useColorMode()

  return (
    <Container>
      <h3>
        <StyledLink href="/">{BLOG_TITLE}</StyledLink>
      </h3>
      <IconButton>
        {mode === ColorMode.Dark ? (
          <IoMdSunny size={28} onClick={toggleColorMode} />
        ) : (
          <IoMdMoon size={28} onClick={toggleColorMode} />
        )}
      </IconButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  padding: 0 1rem;
`
