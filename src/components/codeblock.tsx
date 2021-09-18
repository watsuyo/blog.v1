import { ThemeProvider } from 'theme-ui'
import Prism from '@theme-ui/prism'

import duotoneDark from '@theme-ui/prism/presets/duotone-dark.json'

const components = {
  pre: ({ children }: { children: string }) => <>{children}</>,
  code: Prism
}

export default function CodeBlock({ children }: { children: string }) {
  return (
    <ThemeProvider
      theme={{
        styles: {
          code: {
            ...duotoneDark
          }
        }
      }}
      components={components}
    >
      {children}
    </ThemeProvider>
  )
}
