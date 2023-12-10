import { ToggleDarkMode } from 'components/ToggleDarkMode'
import { SITE_NAME } from 'global'
import { Rss } from 'lucide-react'
import Link from 'next/link'

export function Header() {
	return (
		<div className="my-2 flex justify-between px-4">
			<Link href="/">{SITE_NAME}</Link>
			<div className="flex">
				<div className="pr-1">
					<Link aria-label="RSS Link" href="/feed.xml" passHref>
						<Rss size={28} />
					</Link>
				</div>
				<ToggleDarkMode />
			</div>
		</div>
	)
}
