/**
 * Storybook Preview Configuration
 * Global configuration for Storybook stories
 */

import type { Preview } from '@storybook/react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { defaultTheme } from '../src/styles/theme'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#121212',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },
  },
  decorators: [
    Story => (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
