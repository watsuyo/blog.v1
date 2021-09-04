import Documents, { Html, Head, Main, NextScript } from "next/document"
import { InitializeColorMode } from "theme-ui"

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Documents {
	render() {
		return (
			<Html>
					<Head />
				<body>
							<InitializeColorMode />
							<Main />
							<NextScript/>
					</body>
			</Html>
		)
	}
}
