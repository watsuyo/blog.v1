import { ToggleDarkMode } from 'components/ToggleDarkMode'
// import { IoLogoRss } from 'react-icons/io'
import { SITE_NAME } from 'global'
import Link from 'next/link'

export function Header() {
	return (
		<div className="my-2 flex justify-between px-4">
			<Link href="/">{SITE_NAME}</Link>
			<div className="flex">
				{/* <div className="pr-1">
          <Link aria-label="RSS Link" href="/rss/feed.xml" passHref>
            <a>
              <IoLogoRss size={28} />
            </a>
          </Link>
        </div> */}
				<ToggleDarkMode />
			</div>
		</div>
	)
}
