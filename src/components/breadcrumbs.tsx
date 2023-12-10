import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function BreadCrumbs({
	posts,
}: {
	posts: {
		string: string
		path?: string
	}[]
}) {
	if (!posts) {
		return null
	}

	return (
		<div
			className="flex font-bold overflow-x-auto whitespace-nowrap"
			aria-label="breadcrumb"
		>
			{posts.map(({ string, path }, index) => (
				<div className="flex items-center" key={`breadcrumb-${index}`}>
					{posts.length - 1 !== index ? (
						<>
							{path && (
								<Link href={path} passHref>
									{string}
								</Link>
							)}
							<ChevronRight aria-hidden="true" className="text-xs mx-2" />
						</>
					) : (
						<span className="text-sm md:text-base" aria-current="page">
							{string}
						</span>
					)}
				</div>
			))}
		</div>
	)
}
