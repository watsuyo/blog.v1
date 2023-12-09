export default function Quote({ children }: { children: string }) {
	return (
		<div className="flex items-center overflow-hidden bg-primary-50 border-solid border-l-4 border-primary-500 w-full pl-4 pr-3">
			<p className="-mt-2 italic">{children}</p>
		</div>
	)
}
