import Documents, { Head, Html, Main, NextScript } from 'next/document'
export default class extends Documents {
	render() {
		return (
			<Html className="dark">
				<Head />
				<body className="bg-white dark:bg-black">
					<div className="text-black dark:text-white">
						<Main />
						<NextScript />
					</div>
				</body>
			</Html>
		)
	}
}
