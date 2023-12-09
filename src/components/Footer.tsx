import { IoLogoGithub, IoLogoTwitter } from 'react-icons/io'

export function Footer() {
	return (
		<div className="flex justify-between flex-wrap px-4 pt-10 pb-4 mt-auto">
			<div>
				<span>© 2022 watsuyo </span>
				<span>/ This site uses Google Analytics.</span>
			</div>
			<div className="flex">
				<div className="p-1">
					<a
						target="_blank"
						href="https://github.com/watsuyo"
						rel="noopener noreferrer"
						aria-label="GitHub"
					>
						<IoLogoGithub size={28} />
					</a>
				</div>
				<div className="p-1">
					<a
						target="_blank"
						href="https://twitter.com/watsuyo_2"
						rel="noopener noreferrer"
						aria-label="Twitter"
					>
						<IoLogoTwitter size={28} />
					</a>
				</div>
			</div>
		</div>
	)
}
