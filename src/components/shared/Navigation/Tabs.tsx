/**
 * Tabs Component
 * Tab navigation with content switching
 * Includes tab panels, lazy loading, and keyboard navigation
 */

import {
  Tabs as MuiTabs,
  TabsProps as MuiTabsProps,
  Tab,
  Box,
  BoxProps,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { FC, ReactNode } from 'react'

interface TabItem {
  label: string
  value: string
  icon?: ReactNode
  badge?: string | number
  disabled?: boolean
}

interface TabsProps extends Omit<MuiTabsProps, 'children' | 'onChange'> {
  // Tabs configuration
  items: TabItem[]
  value: string
  onChange: (value: string) => void
  
  // Panels
  children?: ReactNode
  renderPanel?: (item: TabItem, index: number) => ReactNode
  
  // Variant
  variant?: 'standard' | 'scrollable' | 'fullWidth'
  orientation?: 'horizontal' | 'vertical'
  
  // Styling
  indicatorColor?: 'primary' | 'secondary'
  textColor?: 'primary' | 'secondary' | 'inherit'
  centered?: boolean
  scrollButtons?: 'auto' | true | false
  allowScrollButtonsMobile?: boolean
  
  // Behavior
  keepMounted?: boolean // Keep panels mounted for better performance
  
  // Panel props
  panelProps?: BoxProps
}

export const Tabs: FC<TabsProps> = ({
  items,
  value,
  onChange,
  children,
  renderPanel,
  variant = 'standard',
  orientation = 'horizontal',
  indicatorColor = 'primary',
  textColor = 'primary',
  centered = false,
  scrollButtons = 'auto',
  allowScrollButtonsMobile = false,
  keepMounted = false,
  panelProps,
  ...props
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    onChange(newValue)
  }
  
  const tabProps = {
    variant,
    orientation,
    indicatorColor,
    textColor,
    centered: !isMobile && centered,
    scrollButtons: isMobile ? allowScrollButtonsMobile ? scrollButtons : false : scrollButtons,
  }
  
  return (
    <>
      <MuiTabs
        value={value}
        onChange={handleTabChange}
        {...tabProps}
        sx={{
          ...(props.sx || {}),
          '& .MuiTabs-indicator': {
            transition: theme.transitions.create(['width', 'left'], {
              duration: theme.transitions.duration.short,
            }),
          },
        }}
        {...props}
      >
        {items.map((item) => (
          <Tab
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon as React.ReactElement | undefined}
            disabled={item.disabled}
            iconPosition="start"
            sx={{
              minHeight: 48,
              textTransform: 'none',
              fontWeight: value === item.value ? 600 : 400,
              ...(item.badge && {
                '&::after': {
                  content: `"${item.badge}"`,
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  fontSize: '0.7rem',
                  bgcolor: 'error.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 18,
                  height: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }),
            }}
          />
        ))}
      </MuiTabs>
      
      {/* Tab Panels */}
      {children || (renderPanel && items.map((item, index) => (
        <Box
          key={item.value}
          role="tabpanel"
          hidden={value !== item.value}
          id={`tabpanel-${item.value}`}
          aria-labelledby={`tab-${item.value}`}
          sx={{
            ...(keepMounted && {
              display: value === item.value ? 'block' : 'none',
            }),
          }}
          {...panelProps}
        >
          {(!keepMounted || value === item.value) && renderPanel(item, index)}
        </Box>
      )))}
    </>
  )
}

interface TabPanelProps extends BoxProps {
  value: string
  activeValue: string
  keepMounted?: boolean
  children: ReactNode
}

export const TabPanel: FC<TabPanelProps> = ({
  value,
  activeValue,
  keepMounted = false,
  children,
  ...props
}) => {
  const isActive = value === activeValue
  
  return (
    <Box
      role="tabpanel"
      hidden={!isActive}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      sx={{
        ...(keepMounted && {
          display: isActive ? 'block' : 'none',
        }),
      }}
      {...props}
    >
      {(!keepMounted || isActive) && children}
    </Box>
  )
}

export default Tabs

