import styled from "@emotion/styled"
import {  IconButton } from "@theme-ui/components"
import { IoMdSunny } from "react-icons/io"
import { BLOG_TITLE } from "@/global"
import { useToggleColorMode } from "@/logic/style"

export function Header() {
	const toggleColorMode = useToggleColorMode()

	return (
		<Container>
				<h1>{BLOG_TITLE}</h1>
				<IconButton aria-label="Toggle dark mode" onClick={toggleColorMode}>
						<IoMdSunny size={28}/>
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
