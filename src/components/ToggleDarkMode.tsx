import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

export const ToggleDarkMode = () => {
	const { theme, setTheme } = useTheme()

	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	return (
		<button
			aria-label="Dark Mode Toggle"
			type="button"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			{mounted &&
				(theme === 'dark' ? (
					<Sun size={28} />
				) : theme === 'light' ? (
					<Moon size={28} />
				) : null)}
		</button>
	)
}
