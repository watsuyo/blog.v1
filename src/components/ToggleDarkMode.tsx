import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'

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
			{mounted && (
				<>
					{theme === 'dark' ? <IoMdSunny size={28} /> : <IoMdMoon size={28} />}
				</>
			)}
		</button>
	)
}
