import { useColorMode } from '@theme-ui/color-modes'
import { base, dark } from '@theme-ui/presets'
import { useCallback } from 'react'
import { merge } from 'theme-ui'
import codeTheme from '@theme-ui/prism/presets/shades-of-purple.json'


export const theme = merge(base, {
  styles: {
    root: {
      button: {
        background: 'none',
        color: 'inherit',
        border: 'none',
        padding: 0,
        font: 'inherit',
        cursor: 'pointer',
        outline: 'inherit'
      },
      '.prism-code': {
        padding: '24px'
      }
    },
    code: {
      ...codeTheme
    }
  },
  colors: {
    ...base.colors,
    modes: {
      dark: dark.colors
    }
  },

})

export enum ColorMode {
  Default = 'default',
  Dark = 'dark'
}

export function useToggleColorMode() {
  const [mode, setColorMode] = useColorMode()

  return useCallback(() => {
    const newMode = mode === ColorMode.Default ? ColorMode.Dark : ColorMode.Default
    setColorMode(newMode)
  }, [mode, setColorMode])
}
