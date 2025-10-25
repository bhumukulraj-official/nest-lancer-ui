/**
 * Button Stories
 * Storybook stories for Button component
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'contained',
    color: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'outlined',
    color: 'secondary',
  },
}

export const Success: Story = {
  args: {
    children: 'Success Button',
    variant: 'contained',
    color: 'success',
  },
}

export const Error: Story = {
  args: {
    children: 'Error Button',
    variant: 'contained',
    color: 'error',
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    variant: 'contained',
    color: 'primary',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'contained',
    color: 'primary',
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'contained',
    color: 'primary',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'contained',
    color: 'primary',
    size: 'large',
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Button with Icon',
    variant: 'contained',
    color: 'primary',
    startIcon: '🚀',
  },
}
